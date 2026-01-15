import { createFileRoute, notFound } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { BlogWithContent } from '@/types/blog'
import { getBlogBySlug } from '@/lib/get-blogs'
import { loadBlogContent } from '@/lib/load-blog-content'
import { BlogPost } from '@/components/blogs/blog-post'
import { getLocale } from '@/paraglide/runtime'

export const Route = createFileRoute('/blogs/$slug')({
  component: BlogPostPage,
  beforeLoad: ({ params }) => {
    const blog = getBlogBySlug(params.slug)
    if (!blog) {
      throw notFound()
    }
  },
  head: ({ params }) => {
    const blog = getBlogBySlug(params.slug)
    if (!blog) return { meta: [] }

    return {
      meta: [
        {
          title: `${blog.title} | Prathamesh Chougale`,
        },
        {
          name: 'description',
          content: blog.excerpt,
        },
        {
          name: 'keywords',
          content: blog.tags.join(', '),
        },
        {
          property: 'og:type',
          content: 'article',
        },
        {
          property: 'og:title',
          content: blog.title,
        },
        {
          property: 'og:description',
          content: blog.excerpt,
        },
        {
          property: 'og:image',
          content: blog.image,
        },
        {
          property: 'og:url',
          content: `https://prathamesh-chougale.vercel.app/blogs/${blog.slug}`,
        },
        {
          property: 'article:published_time',
          content: blog.date,
        },
        {
          property: 'article:author',
          content: blog.author,
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    }
  },
})

function BlogPostPage() {
  const { slug } = Route.useParams()
  const locale = getLocale()
  const blog = getBlogBySlug(slug)!
  const [blogWithContent, setBlogWithContent] =
    useState<BlogWithContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      const content = await loadBlogContent(blog, locale)
      setBlogWithContent(content)
      setIsLoading(false)
    }
    load()
  }, [blog, locale])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!blogWithContent) {
    return <div>Error loading blog content</div>
  }

  return <BlogPost blog={blogWithContent} />
}
