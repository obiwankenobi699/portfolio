'use client'

import { FC, useMemo, useState } from 'react'
import { BlogPost } from '@/types/blog'
import ReactMarkdown from 'react-markdown'
import BlogReaderControls from './BlogReaderControls'
import { useTheme } from 'next-themes'

interface BlogContentProps {
  blog: BlogPost
}

export const BlogContent: FC<BlogContentProps> = ({ blog }) => {
  const [mode, setMode] = useState<'read' | 'listen'>('read')
  const [fontStep, setFontStep] = useState<0 | 1 | 2>(0)
  const { resolvedTheme, setTheme } = useTheme()

  const fontScale = useMemo(() => {
    if (fontStep === 1) return 0.86
    if (fontStep === 2) return 0.94
    return 0.78
  }, [fontStep])

  return (
    <article className="max-w-none md:pb-0">
      <header className="mb-8 sm:mb-10 md:mb-12 not-prose mx-auto max-w-[42rem] text-center">
        <h1 className="mx-auto max-w-[32rem] text-[1.05rem] sm:text-[1.2rem] md:text-[1.35rem] font-bold leading-snug tracking-[-0.01em] mb-2 sm:mb-3 whitespace-normal break-words text-center">
          {blog.title}
        </h1>
      </header>

      {blog.content && (
        <div
          className="mx-auto max-w-[42rem] transition-colors duration-300"
          style={{
            fontSize: `${fontScale}rem`,
            opacity: mode === 'listen' ? 0.92 : 1,
          }}
        >
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-2.5 leading-[1.45] tracking-[0.001em] text-justify">{children}</p>,
              h1: ({ children }) => <h1 className="text-3xl sm:text-4xl font-semibold mt-5 mb-2.5 leading-tight">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl sm:text-3xl font-semibold mt-4 mb-2 leading-tight">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl sm:text-2xl font-medium mt-3 mb-1.5 leading-tight">{children}</h3>,
              strong: ({ children }) => <strong className="font-bold">{children}</strong>,
              ul: ({ children }) => <ul className="list-disc pl-6 mb-2.5 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-6 mb-2.5 space-y-1">{children}</ol>,
              li: ({ children }) => <li className="leading-[1.45] text-justify">{children}</li>,
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      )}
      <BlogReaderControls
        mode={mode}
        onModeChange={setMode}
        fontStep={fontStep}
        onFontStepChange={setFontStep}
        themeMode={resolvedTheme === 'light' ? 'light' : 'dark'}
        onThemeToggle={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      />
    </article>
  )
}
