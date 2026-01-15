import { Link, createFileRoute } from '@tanstack/react-router'
import { BlogCard } from '@/components/blogs/blog-card'
import blogSource from '@/lib/blog-source'

type SerializableBlogPost = {
  url: string
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  tags: Array<string>
  image?: string
}

export const Route = createFileRoute('/blogs/')({
  component: BlogList,
  loader: async () => {
    const pages = await blogSource.getPages()
    // Extract only serializable data
    const posts: Array<SerializableBlogPost> = pages.map((page) => {
      const pageData = page.data as any
      return {
        url: page.url,
        slug: page.url.split('/').pop() || '',
        title: pageData.title || 'Untitled',
        description: pageData.description || '',
        date: pageData.date || new Date().toISOString(),
        readTime: pageData.readTime || '5 min read',
        tags: pageData.tags || [],
        image: pageData.image,
      }
    })
    return { posts }
  },
})

function BlogList() {
  const data = Route.useLoaderData()

  return (
    <div className="mx-auto max-w-6xl py-12">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Blog Posts</h1>
        <p className="text-lg text-muted-foreground">
          Thoughts, tutorials, and insights from my journey in software
          development
        </p>
      </div>

      {data.posts.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-muted-foreground">
            No blog posts yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.posts.map((post: any) => (
            <Link key={post.url} to={post.url} className="block">
              <BlogCard post={post} />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
