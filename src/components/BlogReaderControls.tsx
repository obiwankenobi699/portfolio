'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon, Type, ChevronDown, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BlogReaderControlsProps {
  mode: 'read' | 'listen'
  onModeChange: (mode: 'read' | 'listen') => void
  fontStep: 0 | 1 | 2
  onFontStepChange: (step: 0 | 1 | 2) => void
  themeMode: 'dark' | 'light'
  onThemeToggle: () => void
}

export default function BlogReaderControls({
  mode,
  onModeChange,
  fontStep,
  onFontStepChange,
  themeMode,
  onThemeToggle,
}: BlogReaderControlsProps) {
  const [time, setTime] = useState<string>('--:--')
  const [collapsed, setCollapsed] = useState(true)

  useEffect(() => {
    setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 pointer-events-none md:hidden">
        <div
          className={cn(
            'relative overflow-hidden transition-all duration-300 ease-out',
            collapsed ? 'h-8' : 'h-24 sm:h-28'
          )}
        >
          <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-white/85 via-white/40 to-transparent dark:from-black/55 dark:via-black/20 dark:to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-white/55 via-white/20 to-transparent dark:from-black/40 dark:via-black/15 dark:to-transparent backdrop-blur-[1px]" />
          <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-white/35 via-white/10 to-transparent dark:from-black/28 dark:via-black/10 dark:to-transparent backdrop-blur-[2px]" />
          <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-white/22 via-white/8 to-transparent dark:from-black/18 dark:via-black/8 dark:to-transparent backdrop-blur-sm" />
        </div>
      </div>
      <div className="fixed inset-x-0 z-50 px-3 sm:px-4 md:hidden" style={{ bottom: 'calc(env(safe-area-inset-bottom) + 0.75rem)' }}>
        <div
          className={cn(
            'mx-auto w-full max-w-[24rem] sm:max-w-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 ease-out',
            collapsed ? 'translate-y-4 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
          )}
        >
            <div className="flex items-center gap-1 rounded-full bg-neutral-900/95 dark:bg-neutral-900 px-2.5 sm:px-3.5 py-1.5 sm:py-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/85" />
              <span className="text-[11px] sm:text-xs text-white tabular-nums tracking-wide font-semibold whitespace-nowrap">{time}</span>
            </div>

            <div className="flex items-center rounded-full bg-neutral-900/95 dark:bg-neutral-900 p-0.5 sm:p-1 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
              <button
                onClick={() => onModeChange('read')}
                className={cn(
                  'px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-colors duration-200',
                  mode === 'read' ? 'bg-white text-black' : 'text-white/80 hover:text-white'
                )}
                aria-label="Switch to read mode"
                aria-pressed={mode === 'read'}
              >
                Read
              </button>
              <button
                onClick={() => onModeChange('listen')}
                className={cn(
                  'px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-colors duration-200',
                  mode === 'listen' ? 'bg-white text-black' : 'text-white/80 hover:text-white'
                )}
                aria-label="Switch to listen mode"
                aria-pressed={mode === 'listen'}
              >
                Listen
              </button>
            </div>

            <button
              onClick={onThemeToggle}
              className="rounded-full bg-neutral-900/95 dark:bg-neutral-900 p-2 sm:p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-colors duration-200 hover:bg-neutral-800"
              aria-label="Toggle theme"
              aria-pressed={themeMode === 'light'}
            >
              {themeMode === 'dark' ? <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" /> : <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />}
            </button>
            <button
              onClick={() => onFontStepChange(fontStep === 2 ? 0 : ((fontStep + 1) as 0 | 1 | 2))}
              className="rounded-full bg-neutral-900/95 dark:bg-neutral-900 p-2 sm:p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-colors duration-200 hover:bg-neutral-800"
              aria-label="Adjust text size"
            >
              <Type className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </button>
          </div>
        <div className="mt-1.5 sm:mt-2 flex justify-center">
          <button
            onClick={() => setCollapsed(prev => !prev)}
            className="inline-flex items-center justify-center text-neutral-500 dark:text-neutral-400"
            aria-label={collapsed ? 'Expand reader controls' : 'Collapse reader controls'}
          >
            <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', collapsed ? 'rotate-180' : '')} />
          </button>
        </div>
      </div>
    </>
  )
}
