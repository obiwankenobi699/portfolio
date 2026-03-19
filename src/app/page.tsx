'use client'

import { useEffect, useState } from 'react'
import NewHeroSection from "@/components/HomeContent"

export default function Home() {
  const [showLanding, setShowLanding] = useState(false)
  const [isLandingClosing, setIsLandingClosing] = useState(false)

  useEffect(() => {
    setShowLanding(true)
    const closeStartTimer = window.setTimeout(() => {
      setIsLandingClosing(true)
    }, 2250)
    const closeEndTimer = window.setTimeout(() => {
      setShowLanding(false)
      setIsLandingClosing(false)
    }, 2800)
    return () => {
      window.clearTimeout(closeStartTimer)
      window.clearTimeout(closeEndTimer)
    }
  }, [])

  return (
    <div>
      {showLanding && (
        <div className={`fixed inset-0 z-[2147483647] bg-black flex items-center justify-center transition-opacity duration-500 ease-out ${isLandingClosing ? 'opacity-0' : 'opacity-100'}`}>
          <div className={`flex flex-col items-center transition-all duration-500 ease-out ${isLandingClosing ? 'opacity-0 translate-y-2 scale-[0.985]' : 'opacity-100 translate-y-0 scale-100'}`}>
          <div className="w-screen aspect-[5120/1080] overflow-hidden">
            <img
              src="/leaving.gif"
              alt="Landing intro"
              className="w-full h-full object-cover"
            />
          </div>
            <div className="mt-5 flex items-center gap-1.5">
              <span className="typing-dot" />
              <span className="typing-dot delay-1" />
              <span className="typing-dot delay-2" />
            </div>
          </div>
        </div>
      )}
      <NewHeroSection />
      <style>{`
        .typing-dot {
          width: 5px;
          height: 5px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.88);
          animation: typingPulse 1.2s ease-in-out infinite;
        }
        .delay-1 {
          animation-delay: 0.2s;
        }
        .delay-2 {
          animation-delay: 0.4s;
        }
        @keyframes typingPulse {
          0%,
          80%,
          100% {
            transform: translateY(0);
            opacity: 0.45;
          }
          40% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
