import { FC } from 'react'
import { BlogPost } from '@/types/blog'
import Link from 'next/link'
import Image from 'next/image'

interface BlogCardProps {
  blog: BlogPost
}

export const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  const preview =
    blog.description ||
    (blog.content ? blog.content.replace(/\n+/g, ' ').slice(0, 180) + (blog.content.length > 180 ? '…' : '') : '')

  const CardContent = () => (
    <article className="group/item cursor-pointer touch-manipulation rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/35 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_18px_42px_rgba(0,0,0,0.38)]">
      <div className="relative h-40 sm:h-52 w-full">
        {blog.image ? (
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover/item:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, 768px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700" />
        )}
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-[1rem] sm:text-[1.15rem] leading-snug text-neutral-900 dark:text-neutral-100 font-semibold">
            {blog.title}
          </h2>
          <span className="shrink-0 text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
            {blog.readTime}
          </span>
        </div>
        {preview && (
          <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300 line-clamp-2">
            {preview}
          </p>
        )}
      </div>
    </article>
  )

  return (
    <Link 
      href={`/blogs/${blog.id}`}
      className="block w-full touch-manipulation active:opacity-75"
      style={{
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none'
      }}
      aria-label={`Open blog: ${blog.title}`}
    >
      <CardContent />
    </Link>
  )
}
