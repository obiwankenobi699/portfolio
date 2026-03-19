import * as React from 'react'

type VideoSource = string | { src: string }

type VideoProps = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src'> & {
  src: VideoSource
}

const Video = React.forwardRef<HTMLVideoElement, VideoProps>(({ src, ...props }, ref) => {
  const resolvedSrc = typeof src === 'string' ? src : src.src
  return <video ref={ref} src={resolvedSrc} {...props} />
})

Video.displayName = 'Video'

export default Video
