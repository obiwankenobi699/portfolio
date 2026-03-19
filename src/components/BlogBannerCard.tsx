import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/types/blog'
import { Link as LinkIcon, Bookmark } from 'lucide-react'

interface BlogBannerCardProps {
  blog: BlogPost
  muted?: boolean
}

export default function BlogBannerCard({ blog, muted = false }: BlogBannerCardProps) {
  const preview =
    blog.description ||
    (blog.content ? blog.content.replace(/\n+/g, ' ').slice(0, 120) + (blog.content.length > 120 ? '…' : '') : '')

  return (
    <Link
      href={`/blogs/${blog.id}`}
      className={`group block rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 transition-all duration-300 ${muted ? 'opacity-80' : 'hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_18px_42px_rgba(0,0,0,0.45)]'}`}
    >
      <div className={`relative h-28 sm:h-40 w-full rounded-2xl overflow-hidden`}>
        {blog.image ? (
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, 100vw"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700" />
        )}
        <div className={`absolute inset-0 transition-all duration-300 bg-gradient-to-l ${muted ? 'from-black/60 via-black/45 to-transparent' : 'from-black/50 via-black/30 to-transparent group-hover:from-black/60 group-hover:via-black/35'}`} />

        {/* Title overlay on right center */}
        {!muted && (
          <h3 className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 max-w-[65%] text-right text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] text-sm sm:text-lg font-semibold leading-snug transition-transform duration-300 group-hover:-translate-y-[54%]">
            {blog.title}
          </h3>
        )}

        {/* Bottom meta: date left, icons right */}
        <div className={`absolute left-3 sm:left-4 bottom-2 text-neutral-200 text-[11px] sm:text-xs ${muted ? 'opacity-60' : 'opacity-90'}`}>
          {blog.date}
        </div>
        <div className={`absolute right-3 sm:right-4 bottom-2 flex items-center gap-2 text-neutral-200 transition-transform duration-300 ${muted ? 'opacity-60' : 'group-hover:translate-x-0.5'}`}>
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm transition-all duration-300 group-hover:bg-black/45">
            <LinkIcon className="w-3.5 h-3.5" />
          </span>
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm transition-all duration-300 group-hover:bg-black/45">
            <Bookmark className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
