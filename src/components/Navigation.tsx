'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Moon, Sun, House, ChevronLeft } from 'lucide-react'
import * as React from 'react'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

interface PageNavigationProps {
  hideThemeToggle?: boolean
}

export default function PageNavigation({ hideThemeToggle = false }: PageNavigationProps) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const showBackArrow = pathname !== '/projects' && pathname !== '/blogs' && pathname !== '/sponsors'
  const backHref = pathname.startsWith('/blogs/') ? '/blogs' : '/projects'
  const backLabel = pathname.startsWith('/blogs/') ? 'Back to blogs' : 'Back to projects'

  return (
    <section className="flex items-center justify-between w-full will-change-transform" style={{ opacity: 1, filter: 'blur(0px)', transform: 'none' }}>
      <div className="flex items-center gap-2 h-[32px]">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/"
              className="h-7 w-7 inline-flex items-center justify-center text-black/80 dark:text-white/85 has-hover:hover:text-black dark:has-hover:hover:text-white transition-colors duration-200"
              aria-label="Home"
            >
              <House className="size-[15px]" strokeWidth={2.3} />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            Home
          </TooltipContent>
        </Tooltip>
        {showBackArrow && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={backHref}
                className="h-7 w-7 inline-flex items-center justify-center text-black/80 dark:text-white/85 has-hover:hover:text-black dark:has-hover:hover:text-white transition-colors duration-200"
                aria-label={backLabel}
              >
                <ChevronLeft className="size-[16px]" strokeWidth={2.6} />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              {backLabel}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="flex items-center h-[32px]">
        {mounted && !hideThemeToggle && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => {
                  const newTheme = theme === 'light' ? 'dark' : 'light'
                  if (typeof document !== "undefined" && "startViewTransition" in document) {
                    ;(document as Document & { startViewTransition: (callback: () => void) => void }).startViewTransition(() => {
                      setTheme(newTheme)
                    })
                  } else {
                    setTheme(newTheme)
                  }
                }}
                className="h-7 w-7 inline-flex items-center justify-center text-black/75 dark:text-white/80 has-hover:hover:text-black dark:has-hover:hover:text-white transition-colors duration-200"
                aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
              >
                {theme === 'light' ? (
                  <Moon className="size-[15px]" aria-hidden="true" />
                ) : (
                  <Sun className="size-[15px]" aria-hidden="true" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              {theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </section>
  )
}
