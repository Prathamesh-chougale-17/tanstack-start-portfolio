import { createFileRoute, notFound } from '@tanstack/react-router'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { createServerFn } from '@tanstack/react-start'
import browserCollections from 'fumadocs-mdx:collections/browser'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import { useFumadocsLoader } from 'fumadocs-core/source/client'
import { Suspense } from 'react'
import { source } from '@/lib/source'
import { baseOptions } from '@/lib/layout.shared'
import { Mermaid } from '@/components/mermaid'

export const Route = createFileRoute('/blogs/$')({
  component: Page,
  loader: async ({ params }) => {
    const slugs = params._splat?.split('/') ?? []
    const data = await serverLoader({ data: slugs })
    await clientLoader.preload(data.path)
    return data
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        title: 'Blogs | Prathamesh Chougale',
      }
    }
    const fm = loaderData.frontmatter

    return {
      title: `${fm.title} | Prathamesh Chougale`,

      meta: [
        {
          name: 'description',
          content: fm.description,
        },

        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: fm.title },
        { property: 'og:description', content: fm.description },
        {
          property: 'og:image',
          content: '/profile.webp',
        },
        {
          property: 'og:url',
          content: `https://prathamesh-chougale.vercel.app/blogs/${fm.path}`,
        },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: fm.title },
        { name: 'twitter:description', content: fm.description },
        {
          name: 'twitter:image',
          content: '/profile.webp',
        },
        {
          name: 'twitter:url',
          content: `https://prathamesh-chougale.vercel.app/blogs/${fm.path}`,
        },
      ],
    }
  },
})

const serverLoader = createServerFn({
  method: 'GET',
})
  .inputValidator((slugs: Array<string>) => slugs)
  .handler(async ({ data: slugs }) => {
    const page = source.getPage(slugs)
    if (!page) throw notFound()

    let cleanPath = page.path.replace(/\.mdx$/, '')

    // if last segment is "index", make it ""
    if (cleanPath.endsWith('/index') || cleanPath === 'index') {
      cleanPath = cleanPath.replace(/\/?index$/, '')
    }
    return {
      path: page.path,
      frontmatter: {
        title: page.data.title,
        description: page.data.description,
        path: cleanPath,
      },
      pageTree: await source.serializePageTree(source.getPageTree()),
    }
  })

const clientLoader = browserCollections.docs.createClientLoader({
  component(
    { toc, frontmatter, default: MDX },
    // you can define props for the component
    props: {
      className?: string
    },
  ) {
    return (
      <DocsPage breadcrumb={{ className: 'pt-4' }} toc={toc} {...props}>
        <DocsTitle>{frontmatter.title}</DocsTitle>
        <DocsDescription>{frontmatter.description}</DocsDescription>
        <DocsBody>
          <MDX
            components={{
              ...defaultMdxComponents,
              Mermaid,
            }}
          />
        </DocsBody>
      </DocsPage>
    )
  },
})

function Page() {
  const data = useFumadocsLoader(Route.useLoaderData())

  return (
    <DocsLayout {...baseOptions()} tree={data.pageTree}>
      <Suspense>
        {clientLoader.useContent(data.path, {
          className: '',
        })}
      </Suspense>
    </DocsLayout>
  )
}
