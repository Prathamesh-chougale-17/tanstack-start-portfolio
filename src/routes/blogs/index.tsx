import { createFileRoute, Link } from '@tanstack/react-router'
import { BlogCard } from '@/components/blogs/blog-card'
import blogSource from '@/lib/blog-source'

export const Route = createFileRoute('/blogs/')({
  component: BlogList,
  loader: async () => {
    const pages = await blogSource.getPages()
    return { posts: pages }
  },
})

type BlogListLoaderData = { posts: Array<any> }

function BlogList() {
  const data = Route.useLoaderData() as BlogListLoaderData
  const posts = data.posts || []

  return (
    <div className="mx-auto max-w-6xl py-12">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Blog Posts</h1>
        <p className="text-lg text-muted-foreground">
          Thoughts, tutorials, and insights from my journey in software
          development
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-muted-foreground">
            No blog posts yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => {
            const frontmatter = post.data as any
            return (
              <Link key={post.url} to={post.url} className="block">
                <BlogCard
                  post={{
                    slug: post.url.split('/').pop() || '',
                    title: frontmatter.title || 'Untitled',
                    description: frontmatter.description || '',
                    date: frontmatter.date || new Date().toISOString(),
                    readTime: frontmatter.readTime || '5 min read',
                    tags: frontmatter.tags || [],
                    image: frontmatter.image,
                  }}
                />
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
