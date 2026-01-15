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
      <header className="mx-auto mb-8 max-w-4xl">
        <div className="mb-4 flex flex-wrap gap-2">
          {blog.tags.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="mb-4 font-bold text-4xl tracking-tight md:text-5xl">
          {blog.title}
        </h1>

        <p className="mb-6 text-muted-foreground text-xl">{blog.excerpt}</p>

        <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarBlank className="h-4 w-4" />
            <span>{new Date(blog.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
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
