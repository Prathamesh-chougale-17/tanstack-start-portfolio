import { CalendarBlank, Clock, User } from '@phosphor-icons/react'
import type { BlogWithContent } from '@/types/blog'
import { Badge } from '@/components/ui/badge'
import { TableOfContents } from '@/components/blogs/table-of-contents'
import { ShareButtons } from '@/components/blogs/share-buttons'
import { MarkdownContent } from '@/components/blogs/markdown-content'
import { extractHeadings } from '@/lib/load-blog-content'

type BlogPostProps = {
  blog: BlogWithContent
}

export function BlogPost({ blog }: BlogPostProps) {
  const headings = extractHeadings(blog.content)

  return (
    <article className="py-12">
      {/* Header */}
      <header className="mx-auto mb-12 max-w-4xl">
        <div className="mb-5 flex flex-wrap gap-2">
          {blog.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs font-medium">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="mb-6 font-bold text-5xl tracking-tight leading-tight md:text-6xl">
          {blog.title}
        </h1>

        <p className="mb-8 text-muted-foreground text-lg leading-relaxed">{blog.excerpt}</p>

        <div className="flex flex-wrap items-center gap-6 border-t border-muted pt-6 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span className="font-medium">{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarBlank className="h-5 w-5" />
            <span>{new Date(blog.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span>{blog.readingTime}</span>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="mx-auto mb-12 max-w-4xl">
        <img
          alt={blog.title}
          className="w-full rounded-lg object-cover"
          src={blog.image}
        />
      </div>

      {/* Content Grid */}
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_250px]">
        {/* Main Content */}
        <div className="min-w-0">
          <MarkdownContent content={blog.content} />

          {/* Share Buttons at Bottom */}
          <div className="mt-12 border-t pt-8">
            <ShareButtons blog={blog} />
          </div>
        </div>

        {/* Sidebar - Table of Contents */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      </div>
    </article>
  )
}
