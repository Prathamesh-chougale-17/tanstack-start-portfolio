# Fumadocs (Framework Mode): Tanstack Start

URL: /docs/manual-installation/tanstack-start
Source: https://raw.githubusercontent.com/fuma-nama/fumadocs/refs/heads/main/apps/docs/content/docs/(framework)/manual-installation/tanstack-start.mdx

Setup Fumadocs on Tanstack Start.

## Getting Started

<FeedbackBlock id="e7d939645b9353da" body="Before continuing, make sure to configure:">
  Before continuing, make sure to configure:
</FeedbackBlock>

<FeedbackBlock id="19ef4513e406558a" body="Tailwind CSS 4.Fumadocs MDX: follow the Vite setup guide and create essential files like lib/source.ts.">
  * Tailwind CSS 4.
  * Fumadocs MDX: follow the [Vite setup guide](/docs/mdx/vite) and create essential files like `lib/source.ts`.
</FeedbackBlock>

### Installation

<CodeBlockTabs defaultValue="npm" groupId="package-manager" persist>
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="npm">
      npm
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="pnpm">
      pnpm
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="yarn">
      yarn
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="bun">
      bun
    </CodeBlockTabsTrigger>

  </CodeBlockTabsList>

  <CodeBlockTab value="npm">
    ```bash
    npm i fumadocs-core fumadocs-ui
    ```
  </CodeBlockTab>

  <CodeBlockTab value="pnpm">
    ```bash
    pnpm add fumadocs-core fumadocs-ui
    ```
  </CodeBlockTab>

  <CodeBlockTab value="yarn">
    ```bash
    yarn add fumadocs-core fumadocs-ui
    ```
  </CodeBlockTab>

  <CodeBlockTab value="bun">
    ```bash
    bun add fumadocs-core fumadocs-ui
    ```
  </CodeBlockTab>
</CodeBlockTabs>

### Styles

<FeedbackBlock id="f073e4ac54778d22" body="Add the following to your Tailwind CSS file:">
  Add the following to your Tailwind CSS file:
</FeedbackBlock>

```css title="styles/app.css"
@import 'tailwindcss';
/* [!code ++:2] */
@import 'fumadocs-ui/css/neutral.css';
@import 'fumadocs-ui/css/preset.css';
```

### Create Pages

<FeedbackBlock id="3818ad53cf734345" body="Create the following routes:">
  Create the following routes:
</FeedbackBlock>

<CodeBlockTabs defaultValue="lib/layout.shared.tsx">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="lib/layout.shared.tsx">
      lib/layout.shared.tsx
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="routes/docs/$.tsx">
      routes/docs/$.tsx
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="routes/api/search.ts">
      routes/api/search.ts
    </CodeBlockTabsTrigger>

  </CodeBlockTabsList>

  <CodeBlockTab value="lib/layout.shared.tsx">
    ```tsx
    import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

    export function baseOptions(): BaseLayoutProps {
      return {
        nav: {
          title: 'Tanstack Start',
        },
      };
    }

    ```

  </CodeBlockTab>

  <CodeBlockTab value="routes/docs/$.tsx">
    ```tsx
    import { createFileRoute, notFound } from '@tanstack/react-router';
    import { DocsLayout } from 'fumadocs-ui/layouts/docs';
    import { createServerFn } from '@tanstack/react-start';
    import { source } from '@/lib/source';
    import browserCollections from 'fumadocs-mdx:collections/browser';
    import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
    import defaultMdxComponents from 'fumadocs-ui/mdx';
    import { baseOptions } from '@/lib/layout.shared';
    import { useFumadocsLoader } from 'fumadocs-core/source/client';
    import { Suspense } from 'react';

    export const Route = createFileRoute('/docs/$')({
      component: Page,
      loader: async ({ params }) => {
        const slugs = params._splat?.split('/') ?? [];
        const data = await serverLoader({ data: slugs });
        await clientLoader.preload(data.path);
        return data;
      },
    });

    const serverLoader = createServerFn({
      method: 'GET',
    })
      .inputValidator((slugs: string[]) => slugs)
      .handler(async ({ data: slugs }) => {
        const page = source.getPage(slugs);
        if (!page) throw notFound();

        return {
          path: page.path,
          pageTree: await source.serializePageTree(source.getPageTree()),
        };
      });

    const clientLoader = browserCollections.docs.createClientLoader({
      component(
        { toc, frontmatter, default: MDX },
        // you can define props for the component
        props: {
          className?: string;
        },
      ) {
        return (
          <DocsPage toc={toc} {...props}>
            <DocsTitle>{frontmatter.title}</DocsTitle>
            <DocsDescription>{frontmatter.description}</DocsDescription>
            <DocsBody>
              <MDX
                components={{
                  ...defaultMdxComponents,
                }}
              />
            </DocsBody>
          </DocsPage>
        );
      },
    });

    function Page() {
      const data = useFumadocsLoader(Route.useLoaderData());

      return (
        <DocsLayout {...baseOptions()} tree={data.pageTree}>
          <Suspense>
            {clientLoader.useContent(data.path, {
              className: '',
            })}
          </Suspense>
        </DocsLayout>
      );
    }

    ```

  </CodeBlockTab>

  <CodeBlockTab value="routes/api/search.ts">
    ```ts
    import { createFileRoute } from '@tanstack/react-router';
    import { source } from '@/lib/source';
    import { createFromSource } from 'fumadocs-core/search/server';

    const server = createFromSource(source, {
      // https://docs.orama.com/docs/orama-js/supported-languages
      language: 'english',
    });

    export const Route = createFileRoute('/api/search')({
      server: {
        handlers: {
          GET: async ({ request }) => server.GET(request),
        },
      },
    });

    ```

  </CodeBlockTab>
</CodeBlockTabs>

<FeedbackBlock id="b5e549235bd90f84" body="Wrap your entire app under Fumadocs providers:">
  Wrap your entire app under Fumadocs providers:
</FeedbackBlock>

```tsx title="__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import * as React from 'react'
import { RootProvider } from 'fumadocs-ui/provider/tanstack'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="flex flex-col min-h-screen">
        {/* [!code ++] */}
        <RootProvider>{children}</RootProvider>
        <Scripts />
      </body>
    </html>
  )
}
```

### Done

<FeedbackBlock id="576d2f1dad3ff797" body="You can start writing documents at content/docs:">
  You can start writing documents at `content/docs`:
</FeedbackBlock>

```mdx title="content/docs/index.mdx"
---
title: Hello World
---

I love Fumadocs
```
