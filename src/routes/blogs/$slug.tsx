import { Suspense } from 'react'
import { createFileRoute, notFound } from '@tanstack/react-router'
import browserCollections from 'fumadocs-mdx:collections/browser'
import { BlogHero } from '@/components/blogs/blog-hero'
import { BlogTOC } from '@/components/blogs/blog-toc'
import { getMDXComponents } from '@/lib/mdx-components'
import blogSource from '@/lib/blog-source'

type SerializableTOCItem = {
  title: string
  url: string
  depth: number
}

type SerializableFrontmatter = {
  title: string
  description?: string
  date?: string
  readTime?: string
  tags?: Array<string>
  image?: string
}

export const Route = createFileRoute('/blogs/$slug')({
  component: BlogPost,
  loader: async ({ params }) => {
    const page = blogSource.getPage([params.slug])
    if (!page) throw notFound()

    // Preload the client-side content
    await clientLoader.preload(page.path)

    // Extract only serializable TOC data
    const toc: Array<SerializableTOCItem> = page.data.toc.map((item) => ({
      title: typeof item.title === 'string' ? item.title : String(item.title),
      url: item.url,
      depth: item.depth,
    }))

    // Extract only serializable frontmatter
    const pageData = page.data as any
    const frontmatter: SerializableFrontmatter = {
      title: pageData.title || 'Untitled',
      description: pageData.description,
      date: pageData.date,
      readTime: pageData.readTime,
      tags: pageData.tags,
      image: pageData.image,
    }

    return {
      path: page.path,
      toc,
      frontmatter,
    }
  },
})

const clientLoader = browserCollections.blogs.createClientLoader({
  component({ toc, frontmatter, default: MDX }, props: { className?: string }) {
    return (
      <article className={props.className}>
        <MDX components={getMDXComponents()} />
      </article>
    )
  },
})

function BlogPost() {
  const data = Route.useLoaderData()

  if (!data) {
    return (
      <div className="mx-auto max-w-6xl py-8">
        <p>Blog post not found</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl py-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
        <div>
          <BlogHero
            title={data.frontmatter.title}
            description={data.frontmatter.description || ''}
            date={data.frontmatter.date || new Date().toISOString()}
            readTime={data.frontmatter.readTime || '5 min read'}
            tags={data.frontmatter.tags || []}
            image={data.frontmatter.image}
          />
          <Suspense fallback={<div>Loading content...</div>}>
            {clientLoader.useContent(data.path, {
              className: 'prose prose-neutral dark:prose-invert max-w-none',
            })}
          </Suspense>
        </div>
        <BlogTOC items={data.toc} />
      </div>
    </div>
  )
}
