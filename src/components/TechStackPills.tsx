import Image from 'next/image'
import { useState } from 'react'
import NeumorphButton from './NeumorphButton'

const techs = [
  { name: 'JavaScript', icon: '/tech-icons/javascript.svg' },
  { name: 'TypeScript', icon: '/tech-icons/typescript.svg' },
  { name: 'Java', icon: '/tech-icons/java.svg' },
  { name: 'Python', icon: '/tech-icons/python.svg' },
  { name: 'SQL', icon: '/tech-icons/sql.svg' },
  { name: 'React', icon: '/tech-icons/react.svg' },
  { name: 'Next.js', icon: '/tech-icons/nextjs.svg' },
  { name: 'Express', icon: '/tech-icons/express.svg' },
  { name: 'Node.js', icon: '/tech-icons/nodejs.svg' },
  { name: 'FastAPI', icon: '/tech-icons/fastapi.svg' },
  { name: 'Tailwind', icon: '/tech-icons/tailwind.svg' },
  { name: 'Redis', icon: '/tech-icons/redis.svg' },
  { name: 'MongoDB', icon: '/tech-icons/mongodb.svg' },
  { name: 'PostgreSQL', icon: '/tech-icons/postgresql.svg' },
  { name: 'Git', icon: '/tech-icons/Git.svg' },
  { name: 'Docker', icon: '/tech-icons/docker.svg' },
  { name: 'Azure', icon: '/tech-icons/Azure.svg' },
  { name: 'AWS', icon: '/tech-icons/AWS.svg' },
  { name: 'GCP', icon: '/tech-icons/gcp.svg' },
]

export default function TechStackPills({ className = '' }: { className?: string }) {
  const [expanded, setExpanded] = useState(false)
  const limit = 8
  const restCount = Math.max(techs.length - limit, 0)

  return (
    <div className={className}>
      <div className="mb-3 sm:mb-4">
        <h2 className="text-base sm:text-xl opacity-20 font-[family-name:var(--font-hk-grotesk)]">techstack</h2>
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-2 sm:gap-x-3 sm:gap-y-3 items-center">
        {techs.map((t, idx) => {
          const hiddenMobile = !expanded && idx >= limit
          return (
            <span key={t.name} className={`${hiddenMobile ? 'hidden' : 'inline-flex'} sm:inline-flex`}>
              <NeumorphButton className="px-2.5 py-1 rounded-full sm:px-3.5 sm:py-2">
                <span className="inline-flex items-center gap-1.5 sm:gap-2">
                  <span className="relative inline-flex items-center justify-center w-3.5 h-3.5 sm:w-5 sm:h-5">
                    <Image
                      src={t.icon}
                      alt={t.name}
                      width={18}
                      height={18}
                      className="w-full h-full object-contain select-none"
                    />
                  </span>
                  <span className="text-[11px] sm:text-sm text-neutral-800 dark:text-white/80 whitespace-nowrap">{t.name}</span>
                </span>
              </NeumorphButton>
            </span>
          )
        })}

        {/* Mobile-only +N toggle */}
        {restCount > 0 && (
          <span className="sm:hidden inline-flex">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="touch-manipulation active:opacity-75"
              style={{
                WebkitTapHighlightColor: 'transparent',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none',
              }}
            >
              <NeumorphButton className="px-3 py-1 rounded-full min-w-[44px]">
                <span className="text-[11px] text-neutral-800 dark:text-white/80 whitespace-nowrap text-center">
                  {expanded ? 'Hide' : `+${restCount}`}
                </span>
              </NeumorphButton>
            </button>
          </span>
        )}
      </div>
    </div>
  )
}
