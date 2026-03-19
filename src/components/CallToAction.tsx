'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import NeumorphButton from './NeumorphButton'

declare global {
  interface Window {
    Cal?: any
  }
}

interface CallToActionProps {
  profileImage?: string
  profileAlt?: string
  linkText?: string
  linkUrl?: string
  preText?: string
  backgroundVideo?: string
}

export default function CallToAction({
  profileImage = "/pfp.jpg",
  profileAlt = "Yuvraj Sharma",
  linkText = "Book a Call",
  linkUrl = "https://cal.com/yuvrajsharma/quickchat",
  preText = "If this resonates, let’s connect.",
  backgroundVideo = "/globe.mp4"
}: CallToActionProps) {
  useEffect(() => {
    ;((C: Window & { Cal?: any }, A: string, L: string) => {
      const p = (a: any, ar: IArguments | any[]) => { a.q.push(ar) }
      const d = C.document
      C.Cal = C.Cal || function () {
        const cal = C.Cal as any
        const ar = arguments
        if (!cal.loaded) {
          cal.ns = {}
          cal.q = cal.q || []
          d.head.appendChild(d.createElement('script')).src = A
          cal.loaded = true
        }
        if (ar[0] === L) {
          const api: any = function () { p(api, arguments) }
          const namespace = ar[1]
          api.q = api.q || []
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api
            p(cal.ns[namespace], ar)
            p(cal, ['initNamespace', namespace])
          } else {
            p(cal, ar)
          }
          return
        }
        p(cal, ar)
      }
    })(window as Window & { Cal?: any }, 'https://app.cal.com/embed/embed.js', 'init')

    window.Cal?.('init', 'quickchat', { origin: 'https://app.cal.com' })
    window.Cal?.ns?.quickchat?.('ui', { hideEventTypeDetails: false, layout: 'month_view' })
  }, [])

  return (
    <div
      className="mt-3 sm:mt-4 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 w-full"
    >
      <div className="relative h-[140px] sm:h-[180px]">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={backgroundVideo}
          preload="metadata"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        {/* Content */}
        <div className="relative z-20 flex flex-col items-center pt-3 sm:pt-4">
          <p className="font-[family-name:var(--font-instrument-serif)] italic text-base sm:text-xl mb-3 text-center">
            <span className="px-3 py-1 rounded-md bg-black/45 text-white shadow-[0_1px_6px_rgba(0,0,0,0.25)] backdrop-blur-[2px]">
              {preText}
            </span>
          </p>
          <div className="mt-1">
            <button
              type="button"
              onClick={() => {
                if (!window.Cal) {
                  window.open(linkUrl, '_blank', 'noopener,noreferrer')
                }
              }}
              className="group inline-flex touch-manipulation active:opacity-75"
              data-cal-link="yuvrajsharma/quickchat"
              data-cal-namespace="quickchat"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              style={{ 
                WebkitTapHighlightColor: 'transparent',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none'
              }}
              aria-label="Book a Call"
            >
              <NeumorphButton variant="glass" className="px-5 py-2.5 sm:py-2 text-sm sm:text-base text-white">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden shrink-0">
                    <Image 
                      alt={profileAlt} 
                      width={28} 
                      height={28} 
                      className="w-full h-full object-cover" 
                      src={profileImage}
                      style={{ color: 'transparent' }}
                    />
                  </div>
                  <span className="overflow-hidden max-w-0 group-hover:max-w-[110px] sm:group-hover:max-w-[132px] transition-[max-width] duration-300 ease-out">
                    <span className="inline-flex items-center gap-1 whitespace-nowrap opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pr-1">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                      </svg>
                      <span className="italic font-[family-name:var(--font-instrument-serif)] text-[12px] sm:text-[14px]">
                        you
                      </span>
                    </span>
                  </span>
                  <span className="whitespace-nowrap">
                    {linkText}
                  </span>
                </div>
              </NeumorphButton>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
