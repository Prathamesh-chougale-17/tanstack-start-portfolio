import { createFileRoute, notFound } from '@tanstack/react-router'
import { DocsBody, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import { BlogHero } from '@/components/blogs/blog-hero'
import { BlogTOC } from '@/components/blogs/blog-toc'
import { getMDXComponents } from '@/lib/mdx-components'
import blogSource from '@/lib/blog-source'

export const Route = createFileRoute('/blogs/$slug')({
  component: BlogPost,
  loader: async ({ params }) => {
    const page = blogSource.getPage([params.slug])
    if (!page) throw notFound()

    return {
      page,
      toc: page.data.toc,
    }
  },
})

function BlogPost() {
  const data = Route.useLoaderData() as any
  const frontmatter = data?.page?.data

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
        <div>
          <BlogHero
            title={frontmatter.title || 'Untitled'}
            description={frontmatter.description || ''}
            date={frontmatter.date || new Date().toISOString()}
            readTime={frontmatter.readTime || '5 min read'}
            tags={frontmatter.tags || []}
            image={frontmatter.image}
          />
          <DocsPage toc={data.toc}>
            <DocsTitle>{frontmatter.title || 'Untitled'}</DocsTitle>
            <DocsBody>
              <data.page.default
                components={{
                  ...defaultMdxComponents,
                  ...getMDXComponents(),
                }}
              />
            </DocsBody>
          </DocsPage>
        </div>
        <BlogTOC items={data.toc} />
      </div>
    </div>
  )
}
