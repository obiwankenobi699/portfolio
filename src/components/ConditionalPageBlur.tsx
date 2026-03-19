'use client'

import { usePathname } from 'next/navigation'
import GradualBlur from '@/components/GradualBlur'

export default function ConditionalPageBlur() {
  const pathname = usePathname()
  const isBlogPostPage = pathname.startsWith('/blogs/')

  if (isBlogPostPage) {
    return null
  }

  return (
    <GradualBlur
      position="bottom"
      height="5rem"
      target="page"
      zIndex={1}
      strength={2}
      divCount={5}
    />
  )
}
