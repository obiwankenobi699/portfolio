import * as React from 'react'

type ImageSource = string | { src: string }

type NextImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: ImageSource
  alt: string
  fill?: boolean
  priority?: boolean
  quality?: number
  unoptimized?: boolean
}

const Image = React.forwardRef<HTMLImageElement, NextImageProps>(
  ({ src, alt, fill, priority, style, loading, ...props }, ref) => {
    const resolvedSrc = typeof src === 'string' ? src : src.src

    return (
      <img
        ref={ref}
        src={resolvedSrc}
        alt={alt}
        loading={priority ? 'eager' : loading}
        style={
          fill
            ? {
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                ...style,
              }
            : style
        }
        {...props}
      />
    )
  },
)

Image.displayName = 'Image'

export default Image
