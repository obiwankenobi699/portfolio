declare module 'next/link' {
  import type { ComponentProps } from 'react'
  import Link from '@/compat/next-link'
  type LinkProps = ComponentProps<typeof Link>
  export default function NextLink(props: LinkProps): JSX.Element
}

declare module 'next/image' {
  import type { ComponentProps } from 'react'
  import Image from '@/compat/next-image'
  type ImageProps = ComponentProps<typeof Image>
  export default function NextImage(props: ImageProps): JSX.Element
}

declare module 'next/navigation' {
  export const usePathname: () => string
  export const useRouter: () => {
    push: (href: string) => void
    replace: (href: string) => void
    back: () => void
    forward: () => void
  }
  export const notFound: () => never
}

declare module 'next-video' {
  import type { ComponentProps } from 'react'
  import Video from '@/compat/next-video'
  type VideoProps = ComponentProps<typeof Video>
  export default function NextVideo(props: VideoProps): JSX.Element
}

declare module 'next/font/google' {
  type FontOptions = {
    variable?: string
    weight?: string | string[]
    style?: string | string[]
    subsets?: string[]
    display?: string
  }

  type FontResult = {
    className: string
    variable: string
  }

  export const Instrument_Serif: (options?: FontOptions) => FontResult
  export const Montserrat: (options?: FontOptions) => FontResult
  export const Pixelify_Sans: (options?: FontOptions) => FontResult
}

declare module 'next' {
  export type Metadata = {
    title?: string
    description?: string
    metadataBase?: URL
    openGraph?: Record<string, unknown>
    twitter?: Record<string, unknown>
    [key: string]: unknown
  }
}

declare module 'next/server' {
  export class NextRequest extends Request {}
  export class NextResponse extends Response {
    static json(data: unknown, init?: ResponseInit): NextResponse
  }
}

declare module 'next/headers' {
  export function headers(): Promise<Headers>
}
