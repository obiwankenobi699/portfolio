'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { BlogPost } from '@/types/blog'

interface BlogMagazineCarouselProps {
  blogs: BlogPost[]
}

export default function BlogMagazineCarousel({ blogs }: BlogMagazineCarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const hoveredRef = useRef(false)
  const dragStateRef = useRef({
    startX: 0,
    startY: 0,
    moved: false,
  })
  const metricsRef = useRef({
    offset: 0,
    velocity: 0,
    cardWidth: 240,
    cardHeight: 300,
    spacing: 150,
    total: 1,
    containerWidth: 1,
    pointerDown: false,
    lastPointerX: 0,
  })
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [stageHeight, setStageHeight] = useState(420)

  const sortedBlogs = useMemo(() => {
    return [...blogs].sort((a, b) => {
      const ad = a.date ? new Date(a.date).getTime() : 0
      const bd = b.date ? new Date(b.date).getTime() : 0
      return bd - ad
    })
  }, [blogs])

  const wrapSigned = (value: number, range: number) => {
    return ((((value + range / 2) % range) + range) % range) - range / 2
  }

  const refreshMetrics = () => {
    const container = containerRef.current
    if (!container) return
    const containerWidth = Math.max(container.clientWidth, 320)
    const isMobile = containerWidth < 640
    const cardWidth = isMobile
      ? Math.min(320, Math.max(220, containerWidth * 0.72))
      : Math.min(290, Math.max(160, containerWidth * 0.4))
    const cardHeight = Math.round(cardWidth * 1.28)
    const spacing = Math.round(cardWidth * (isMobile ? 0.82 : 0.58))
    const total = Math.max(spacing * sortedBlogs.length, 1)
    metricsRef.current.containerWidth = containerWidth
    metricsRef.current.cardWidth = cardWidth
    metricsRef.current.cardHeight = cardHeight
    metricsRef.current.spacing = spacing
    metricsRef.current.total = total
    setStageHeight(cardHeight + 84)
  }

  useEffect(() => {
    if (sortedBlogs.length === 0) return
    refreshMetrics()
    const onResize = () => refreshMetrics()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [sortedBlogs.length])

  useEffect(() => {
    if (sortedBlogs.length === 0) return

    const tick = () => {
      const state = metricsRef.current
      if (!state.pointerDown) {
        state.offset += state.velocity
        state.velocity *= 0.9
      } else {
        state.offset += state.velocity
        state.velocity *= 0.8
      }

      let nearestIndex = 0
      let nearestDistance = Number.POSITIVE_INFINITY

      for (let i = 0; i < sortedBlogs.length; i += 1) {
        const item = itemRefs.current[i]
        if (!item) continue
        const baseX = i * state.spacing + state.offset
        const curveX = wrapSigned(baseX, state.total)
        const screenX = state.containerWidth / 2 + curveX - state.cardWidth / 2
        const normalized = Math.min(Math.abs(curveX) / (state.containerWidth * 0.48), 1.8)
        const rise = Math.min(78, Math.pow(normalized, 1.5) * 78)
        const yBase = 26
        const scale = 1.08 - Math.min(0.42, normalized * 0.28)
        const opacity = 1 - Math.min(0.62, normalized * 0.45)
        const rotate = (curveX / (state.containerWidth * 0.5)) * 7
        const zIndex = 1000 - Math.round(Math.abs(curveX))

        gsap.set(item, {
          x: screenX,
          y: rise + yBase,
          width: state.cardWidth,
          height: state.cardHeight,
          scale,
          rotate,
          opacity,
          zIndex,
        })

        if (Math.abs(curveX) < nearestDistance) {
          nearestDistance = Math.abs(curveX)
          nearestIndex = i
        }
      }

      setActiveIndex((prev) => (prev === nearestIndex ? prev : nearestIndex))
    }

    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
    }
  }, [sortedBlogs])

  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    metricsRef.current.pointerDown = true
    metricsRef.current.lastPointerX = event.clientX
    dragStateRef.current.startX = event.clientX
    dragStateRef.current.startY = event.clientY
    dragStateRef.current.moved = false
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (!metricsRef.current.pointerDown) return
    const delta = event.clientX - metricsRef.current.lastPointerX
    const totalDeltaX = Math.abs(event.clientX - dragStateRef.current.startX)
    const totalDeltaY = Math.abs(event.clientY - dragStateRef.current.startY)
    if (totalDeltaX > 8 || totalDeltaY > 8) {
      dragStateRef.current.moved = true
    }
    metricsRef.current.lastPointerX = event.clientX
    metricsRef.current.offset += delta * 1.3
    metricsRef.current.velocity = delta * 0.7
  }

  const handlePointerEnd: React.PointerEventHandler<HTMLDivElement> = () => {
    metricsRef.current.pointerDown = false
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onWheel = (event: WheelEvent) => {
      if (!hoveredRef.current) return
      event.preventDefault()
      event.stopPropagation()
      const delta = event.deltaY + event.deltaX
      metricsRef.current.velocity -= delta * 0.08
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      container.removeEventListener('wheel', onWheel)
    }
  }, [])

  const displayIndex = hoveredIndex ?? activeIndex

  return (
    <div className="w-full select-none mt-3 sm:mt-4 mb-2">
      <div
        ref={containerRef}
        onPointerEnter={() => {
          hoveredRef.current = true
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onPointerLeave={(event) => {
          hoveredRef.current = false
          handlePointerEnd(event)
        }}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
        style={{ height: `${stageHeight}px` }}
      >
        {sortedBlogs.map((blog, idx) => {
          return (
            <Link
              key={blog.id}
              ref={(node) => {
                itemRefs.current[idx] = node
              }}
              href={`/blogs/${blog.id}`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={(event) => {
                if (dragStateRef.current.moved) {
                  event.preventDefault()
                }
              }}
              className="group absolute left-0 top-0 block overflow-hidden rounded-xl border border-neutral-200/60 dark:border-neutral-800/70 bg-black/20 backdrop-blur-[1px] shadow-[0_14px_38px_rgba(0,0,0,0.28)] will-change-transform"
              aria-label={`Open ${blog.title}`}
            >
              <div className="relative h-full w-full">
                {blog.image ? (
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/15" />
                <div className="absolute left-3 right-3 bottom-2.5">
                  <p className="text-white/80 text-[11px] sm:text-xs">
                    {blog.date} • {blog.readTime}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="-mt-6 sm:-mt-5 flex w-full justify-center">
        <div className="w-full max-w-[46rem] text-center">
          <div className="text-[9px] uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400 mb-0.5">
            Blog
          </div>
          <div className="space-y-0">
            <div className="h-[1.125rem] overflow-hidden">
              <div
                className="transition-transform duration-500 ease-out"
                style={{ transform: `translateY(-${displayIndex * 1.125}rem)` }}
              >
                {sortedBlogs.map((blog) => (
                  <div
                    key={`${blog.id}-title`}
                    className="h-[1.125rem] leading-[1.125rem] text-[12px] sm:text-[13px] text-neutral-700 dark:text-neutral-200 whitespace-nowrap overflow-hidden text-ellipsis px-2"
                    title={blog.title}
                  >
                    {blog.title}
                  </div>
                ))}
              </div>
            </div>

            <div className="h-[1.125rem] overflow-hidden">
              <div
                className="transition-transform duration-500 ease-out"
                style={{ transform: `translateY(-${displayIndex * 1.125}rem)` }}
              >
                {sortedBlogs.map((blog) => (
                  <div
                    key={`${blog.id}-meta`}
                    className="h-[1.125rem] leading-[1.125rem] text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 whitespace-nowrap overflow-hidden text-ellipsis px-2"
                  >
                    {(blog.tags && blog.tags.length > 0 ? blog.tags[0] : 'Article') + ' • ' + (blog.date || '')}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
