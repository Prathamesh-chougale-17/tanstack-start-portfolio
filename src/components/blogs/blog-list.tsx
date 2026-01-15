import { BlogCard } from './blog-card'
import type { Blog } from '@/types/blog'

type BlogListProps = {
  blogs: Array<Blog>
}

export function BlogList({ blogs }: BlogListProps) {
  if (blogs.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        No articles found matching your filters.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog, index) => (
        <BlogCard blog={blog} index={index} key={blog.slug} />
      ))}
    </div>
  )
}
