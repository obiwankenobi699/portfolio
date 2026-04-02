'use client'

import Image from 'next/image'
import NeumorphButton from './NeumorphButton'

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
  profileAlt = "Obiwankenobi699",
  linkText = "Neural Vault",
  linkUrl = "https://neuralvaults.vercel.app",
  preText = "Library",
  backgroundVideo = "/globe.mp4"
}: CallToActionProps) {

  return (
    <div className="mt-3 sm:mt-4 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 w-full">
      
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

        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center pt-3 sm:pt-4">

          {/* Top Label */}
          <p className="font-[family-name:var(--font-instrument-serif)] italic text-base sm:text-xl mb-3 text-center">
            <span className="px-3 py-1 rounded-md bg-black/45 text-white shadow-[0_1px_6px_rgba(0,0,0,0.25)] backdrop-blur-[2px]">
              {preText}
            </span>
          </p>

          {/* CTA Button */}
          <div className="mt-1">
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex touch-manipulation active:opacity-75"
              style={{
                WebkitTapHighlightColor: 'transparent',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none'
              }}
              aria-label="Open Neural Vault"
            >
              <NeumorphButton
                variant="glass"
                className="px-5 py-2.5 sm:py-2 text-sm sm:text-base text-white"
              >
                <div className="flex items-center gap-2.5 sm:gap-3">

                  {/* Profile Image */}
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden shrink-0">
                    <Image
                      alt={profileAlt}
                      width={28}
                      height={28}
                      className="w-full h-full object-cover"
                      src={profileImage}
                    />
                  </div>

                  {/* Hover Expand Text */}
                  <span className="overflow-hidden max-w-0 group-hover:max-w-[110px] sm:group-hover:max-w-[132px] transition-[max-width] duration-300 ease-out">
                    <span className="inline-flex items-center gap-1 whitespace-nowrap opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pr-1">

                      {/* Plus Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>

                      <span className="italic font-[family-name:var(--font-instrument-serif)] text-[12px] sm:text-[14px]">
                        you
                      </span>
                    </span>
                  </span>

                  {/* Main Text */}
                  <span className="whitespace-nowrap">
                    {linkText}
                  </span>

                </div>
              </NeumorphButton>
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}