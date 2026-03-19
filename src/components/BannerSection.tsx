'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { ModeToggle } from '@/components/theme-toggle'

interface BannerSectionProps {
  bannerImage?: string
  bannerImages?: string[]
}

export default function BannerSection({ 
  bannerImage = "/banner.jpg",
  bannerImages
}: BannerSectionProps) {
  const { resolvedTheme } = useTheme()
  const [activeIndex, setActiveIndex] = useState(0)
  const dragStartXRef = useRef<number | null>(null)
  const dragStartYRef = useRef<number | null>(null)
  const dragMovedRef = useRef(false)
  const wheelLockRef = useRef(0)
  const images = useMemo(() => {
    if (bannerImages && bannerImages.length > 0) return bannerImages
    return ['/pic1.jpg', '/pic2.jpg', '/pic3.jpg', '/pic4.jpg', '/pic5.jpg', '/pic6.jpg', '/pic7.jpg']
  }, [bannerImages])
  const activeBannerImage = images[activeIndex] || bannerImage
  const getObjectPosition = (src: string) => {
    if (src.includes('pic7')) return 'center 20%'
    return 'center center'
  }
  const goNext = () => {
    if (images.length <= 1) return
    setActiveIndex(prev => (prev + 1) % images.length)
  }
  const goPrev = () => {
    if (images.length <= 1) return
    setActiveIndex(prev => (prev - 1 + images.length) % images.length)
  }

  useEffect(() => {
    const root = document.documentElement
    let idleId: number | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    const clearDynamicVars = () => {
      root.style.removeProperty('--background')
      root.style.removeProperty('--loader-bg')
      root.style.removeProperty('--veil-solid')
      root.style.removeProperty('--veil-mid')
      root.style.removeProperty('--primary')
      root.style.removeProperty('--accent')
      root.style.removeProperty('--ring')
    }

    if (resolvedTheme !== 'light') {
      clearDynamicVars()
      return
    }

    const rgbToHsl = (r: number, g: number, b: number) => {
      const rn = r / 255
      const gn = g / 255
      const bn = b / 255
      const max = Math.max(rn, gn, bn)
      const min = Math.min(rn, gn, bn)
      let h = 0
      let s = 0
      const l = (max + min) / 2
      const d = max - min
      if (d !== 0) {
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case rn:
            h = (gn - bn) / d + (gn < bn ? 6 : 0)
            break
          case gn:
            h = (bn - rn) / d + 2
            break
          default:
            h = (rn - gn) / d + 4
        }
        h /= 6
      }
      return { h: h * 360, s: s * 100, l: l * 100 }
    }

    const hslToRgb = (h: number, s: number, l: number) => {
      const hn = h / 360
      const sn = s / 100
      const ln = l / 100
      if (sn === 0) {
        const v = Math.round(ln * 255)
        return { r: v, g: v, b: v }
      }
      const hue2rgb = (p: number, q: number, t: number) => {
        let tt = t
        if (tt < 0) tt += 1
        if (tt > 1) tt -= 1
        if (tt < 1 / 6) return p + (q - p) * 6 * tt
        if (tt < 1 / 2) return q
        if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6
        return p
      }
      const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn
      const p = 2 * ln - q
      return {
        r: Math.round(hue2rgb(p, q, hn + 1 / 3) * 255),
        g: Math.round(hue2rgb(p, q, hn) * 255),
        b: Math.round(hue2rgb(p, q, hn - 1 / 3) * 255),
      }
    }

    const run = () => {
      const image = new window.Image()
      image.src = activeBannerImage
      image.crossOrigin = 'anonymous'

      image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      canvas.width = 48
      canvas.height = 24
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)

      let rSum = 0
      let gSum = 0
      let bSum = 0
      let count = 0
      let vividR = 0
      let vividG = 0
      let vividB = 0
      let vividScore = -1

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const alpha = data[i + 3]
        if (alpha < 24) continue
        rSum += r
        gSum += g
        bSum += b
        count += 1

        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const sat = max === 0 ? 0 : (max - min) / max
        const lum = (r + g + b) / 3
        const score = sat * 1.4 + lum / 255
        if (score > vividScore) {
          vividScore = score
          vividR = r
          vividG = g
          vividB = b
        }
      }

      if (count === 0) return

      const avgR = Math.round(rSum / count)
      const avgG = Math.round(gSum / count)
      const avgB = Math.round(bSum / count)

      const avgHsl = rgbToHsl(avgR, avgG, avgB)
      const bgRgb = hslToRgb(avgHsl.h, Math.min(30, Math.max(6, avgHsl.s * 0.5)), Math.min(95, Math.max(88, avgHsl.l + 22)))

      const accentHsl = rgbToHsl(vividR, vividG, vividB)
      const accentRgb = hslToRgb(accentHsl.h, Math.min(88, Math.max(42, accentHsl.s + 10)), Math.min(60, Math.max(45, accentHsl.l)))

      root.style.setProperty('--background', `rgb(${bgRgb.r}, ${bgRgb.g}, ${bgRgb.b})`)
      root.style.setProperty('--loader-bg', `rgb(${bgRgb.r}, ${bgRgb.g}, ${bgRgb.b})`)
      root.style.setProperty('--veil-solid', `rgb(${bgRgb.r}, ${bgRgb.g}, ${bgRgb.b})`)
      root.style.setProperty('--veil-mid', `rgba(${bgRgb.r}, ${bgRgb.g}, ${bgRgb.b}, 0.62)`)
      root.style.setProperty('--primary', `rgb(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b})`)
      root.style.setProperty('--accent', `rgb(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b})`)
      root.style.setProperty('--ring', `rgb(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b})`)
      }

      image.onerror = () => {
        clearDynamicVars()
      }
    }

    if ('requestIdleCallback' in window) {
      idleId = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(run, { timeout: 900 })
    } else {
      timeoutId = setTimeout(run, 260)
    }

    return () => {
      if (idleId !== null && 'cancelIdleCallback' in window) {
        ;(window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId)
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
      clearDynamicVars()
    }
  }, [activeBannerImage, resolvedTheme])

  return (
    <div className="w-full mb-2 relative">
      <div className="relative" style={{ height: 'auto' }}>
        <div
          className="absolute inset-0 z-10 touch-pan-y"
          onWheel={(event) => {
            const now = Date.now()
            if (now - wheelLockRef.current < 280) return
            const delta = event.deltaY + event.deltaX
            if (Math.abs(delta) < 12) return
            wheelLockRef.current = now
            if (delta > 0) goNext()
            else goPrev()
          }}
          onPointerDown={(event) => {
            dragStartXRef.current = event.clientX
            dragStartYRef.current = event.clientY
            dragMovedRef.current = false
            if (event.pointerType === 'mouse') {
              event.currentTarget.setPointerCapture(event.pointerId)
            }
          }}
          onPointerMove={(event) => {
            if (dragStartXRef.current === null || dragMovedRef.current) return
            const deltaX = event.clientX - dragStartXRef.current
            const deltaY = event.clientY - (dragStartYRef.current ?? event.clientY)
            if (Math.abs(deltaX) < 36 || Math.abs(deltaX) < Math.abs(deltaY)) return
            dragMovedRef.current = true
            if (deltaX < 0) goNext()
            else goPrev()
          }}
          onPointerUp={() => {
            dragStartXRef.current = null
            dragStartYRef.current = null
            dragMovedRef.current = false
          }}
          onPointerCancel={() => {
            dragStartXRef.current = null
            dragStartYRef.current = null
            dragMovedRef.current = false
          }}
        />
        {images.map((src, idx) => (
          <Image
            key={src}
            alt={`Banner ${idx + 1}`}
            width={1240}
            height={900}
            className={`rounded-none w-full h-[180px] sm:h-[270px] object-cover absolute inset-0 transition-opacity duration-700 ${idx === activeIndex ? 'opacity-100' : 'opacity-0'}`}
            src={src}
            style={{ color: 'transparent', minHeight: '100px', objectPosition: getObjectPosition(src) }}
            priority={idx === 0}
            loading={idx === 0 ? 'eager' : 'lazy'}
            fetchPriority={idx === 0 ? 'high' : 'low'}
            sizes="(max-width: 640px) 100vw, 1240px"
            quality={60}
          />
        ))}
        <div className="w-full h-[180px] sm:h-[270px]" />
        {/* Theme toggle pinned to top-right of banner */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20">
          <ModeToggle />
        </div>
        <div className="absolute inset-x-0 bottom-2 sm:bottom-3 z-20 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full bg-black/35 backdrop-blur-md px-2 py-1 border border-white/20">
            {images.map((src, idx) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-5 bg-white/95' : 'w-1.5 bg-white/45 hover:bg-white/70'}`}
                aria-label={`Show banner image ${idx + 1}`}
                aria-pressed={idx === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
