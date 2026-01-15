import { Outlet, createFileRoute, useMatch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { Blog } from '@/types/blog'
import { BlogFilters } from '@/components/blogs/blog-filters'
import { BlogList } from '@/components/blogs/blog-list'
import { FeaturedBlog } from '@/components/blogs/featured-blog'
import { getAllBlogs } from '@/lib/get-blogs'
import * as m from '@/paraglide/messages'

export const Route = createFileRoute('/blogs')({
  component: BlogsLayout,
  head: () => ({
    meta: [
      {
        title: 'Blog | Prathamesh Chougale - Web Development Insights',
      },
      {
        name: 'description',
        content:
          'Read articles about React, Next.js, TypeScript, and modern web development. Learn from real-world experience building scalable applications.',
      },
      {
        name: 'keywords',
        content:
          'React Blog, Next.js Articles, TypeScript Tutorials, Web Development Blog, TanStack Guide, Full Stack Development',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:title',
        content: 'Blog - Prathamesh Chougale',
      },
      {
        property: 'og:description',
        content:
          'Articles about React, Next.js, and modern web development practices.',
      },
      {
        property: 'og:url',
        content: 'https://prathamesh-chougale.vercel.app/blogs',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
  }),
})

// Layout component that handles both parent and child routes
function BlogsLayout() {
  // Check if we're on a child route (blogs/$slug)
  const childMatch = useMatch({
    from: '/blogs/$slug',
    shouldThrow: false,
  })

  // If we're on a child route, render the Outlet (child component)
  if (childMatch) {
    return <Outlet />
  }

  // Otherwise, render the blogs listing page
  return <BlogsListPage />
}

function BlogsListPage() {
  const allBlogs = getAllBlogs()
  const [filteredBlogs, setFilteredBlogs] = useState<Array<Blog>>(allBlogs)

  // Featured blog is the first featured one
  const featuredBlog = allBlogs.find((blog) => blog.featured)
  const remainingBlogs = filteredBlogs.filter(
    (blog) => !blog.featured || blog.slug !== featuredBlog?.slug,
  )

  useEffect(() => {
    setFilteredBlogs(allBlogs)
  }, [allBlogs])

  return (
    <section className="py-12">
      <div className="mb-8">
        <h1 className="font-bold text-4xl tracking-tight">
          {m.blogsPage_title()}
        </h1>
        <p className="mt-2 text-muted-foreground text-lg">
          {m.blogsPage_description()}
        </p>
      </div>

      <BlogFilters blogs={allBlogs} onFilteredBlogsChange={setFilteredBlogs} />

      {featuredBlog && filteredBlogs.includes(featuredBlog) && (
        <FeaturedBlog blog={featuredBlog} />
      )}

      <BlogList blogs={remainingBlogs} />
    </section>
  )
}
