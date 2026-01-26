# Fumadocs (Framework Mode): AI & LLMs

URL: /docs/integrations/llms
Source: https://raw.githubusercontent.com/fuma-nama/fumadocs/refs/heads/main/apps/docs/content/docs/(framework)/integrations/llms.mdx

Integrate AI functionality to Fumadocs.

Docs for LLM [#docs-for-llm]

<FeedbackBlock id="39fe97b09f9c4d5c" body="You can make your docs site more AI-friendly with dedicated docs content for large language models.">
  You can make your docs site more AI-friendly with dedicated docs content for large language models.
</FeedbackBlock>

<FeedbackBlock id="03c0dea77fb23711" body="To begin, make a getLLMText function that converts pages into static MDX content.">
  To begin, make a `getLLMText` function that converts pages into static MDX content.
</FeedbackBlock>

<FeedbackBlock id="6c0ca565ff861ea6" body="In Fumadocs MDX, you can do:">
  In **Fumadocs MDX**, you can do:
</FeedbackBlock>

```ts title="lib/get-llm-text.ts"
import { source } from '@/lib/source'
import type { InferPageType } from 'fumadocs-core/source'

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed')

  return `# ${page.data.title} (${page.url})

${processed}`
}
```

<FeedbackBlock id="07581bcec5802fd2" body="It requires includeProcessedMarkdown to be enabled:">
  It requires `includeProcessedMarkdown` to be enabled:
</FeedbackBlock>

```ts title="source.config.ts"
import { defineDocs } from 'fumadocs-mdx/config'

export const docs = defineDocs({
  docs: {
    // [!code ++:3]
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
})
```

llms-full.txt [#llms-fulltxt]

<FeedbackBlock id="99138c6d3c97de24" body="A version of docs for AIs to read.">
  A version of docs for AIs to read.
</FeedbackBlock>

<CodeBlockTabs defaultValue="Next.js">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="Next.js">
      Next.js
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="React Router">
      React Router
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Tanstack Start">
      Tanstack Start
    </CodeBlockTabsTrigger>

  </CodeBlockTabsList>

  <CodeBlockTab value="Next.js">
    ```ts  title="app/llms-full.txt/route.ts"
    import { source } from '@/lib/source';
    import { getLLMText } from '@/lib/get-llm-text';

    // cached forever
    export const revalidate = false;

    export async function GET() {
      const scan = source.getPages().map(getLLMText);
      const scanned = await Promise.all(scan);

      return new Response(scanned.join('\n\n'));
    }
    ```

  </CodeBlockTab>

  <CodeBlockTab value="React Router">
    ```ts  title="app/routes.ts"
    import { index, route, type RouteConfig } from '@react-router/dev/routes';

    export default [
      // [!code ++]
      route('llms-full.txt', 'routes/llms-full.ts'),
    ] satisfies RouteConfig;
    ```

    ```ts  title="app/routes/llms-full.ts"
    import { source } from '@/lib/source';
    import { getLLMText } from '@/lib/get-llm-text';

    export async function loader() {
      const scan = source.getPages().map(getLLMText);
      const scanned = await Promise.all(scan);

      return new Response(scanned.join('\n\n'));
    }
    ```

  </CodeBlockTab>

  <CodeBlockTab value="Tanstack Start">
    ```ts  title="src/routes/llms-full[.]txt.ts"
    import { createFileRoute } from '@tanstack/react-router';
    import { source } from '@/lib/source';
    import { getLLMText } from '@/lib/get-llm-text';

    export const Route = createFileRoute('/llms-full.txt')({
      server: {
        handlers: {
          GET: async () => {
            const scan = source.getPages().map(getLLMText);
            const scanned = await Promise.all(scan);
            return new Response(scanned.join('\n\n'));
          },
        },
      },
    });
    ```

  </CodeBlockTab>
</CodeBlockTabs>

\*.mdx [#mdx-extension]

<FeedbackBlock id="d6452249407b0e99" body="Allow AI agents to get the content of a page as Markdown/MDX, by appending .mdx to the end of path.">
  Allow AI agents to get the content of a page as Markdown/MDX, by appending `.mdx` to the end of path.
</FeedbackBlock>

<FeedbackBlock id="ff4835a32fb3c8f7" body="Make a route handler to return page content, and a middleware to point to it:">
  Make a route handler to return page content, and a middleware to point to it:
</FeedbackBlock>

<CodeBlockTabs defaultValue="Next.js">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="Next.js">
      Next.js
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="React Router">
      React Router
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Tanstack Start">
      Tanstack Start
    </CodeBlockTabsTrigger>

  </CodeBlockTabsList>

  <CodeBlockTab value="Next.js">
    ```ts  title="app/llms.mdx/docs/[[...slug]]/route.ts"
    import { getLLMText } from '@/lib/get-llm-text';
    import { source } from '@/lib/source';
    import { notFound } from 'next/navigation';

    export const revalidate = false;

    export async function GET(_req: Request, { params }: RouteContext<'/llms.mdx/docs/[[...slug]]'>) {
      const { slug } = await params;
      const page = source.getPage(slug);
      if (!page) notFound();

      return new Response(await getLLMText(page), {
        headers: {
          'Content-Type': 'text/markdown',
        },
      });
    }

    export function generateStaticParams() {
      return source.generateParams();
    }
    ```

    ```ts  title="next.config.ts"
    import type { NextConfig } from 'next';

    const config: NextConfig = {
      // [!code ++:8]
      async rewrites() {
        return [
          {
            source: '/docs/:path*.mdx',
            destination: '/llms.mdx/docs/:path*',
          },
        ];
      },
    };
    ```

  </CodeBlockTab>

  <CodeBlockTab value="React Router">
    ```ts  title="app/routes.ts"
    import { index, route, type RouteConfig } from '@react-router/dev/routes';

    export default [
      // [!code ++]
      route('llms.mdx/docs/*', 'routes/docs/llms-mdx.ts'),
    ] satisfies RouteConfig;
    ```

    ```ts  title="app/routes/docs/llms-mdx.ts"
    import type { Route } from './+types/llms-mdx';
    import { source } from '@/lib/source';
    import { getLLMText } from '@/lib/get-llm-text';

    export async function loader({ params }: Route.LoaderArgs) {
      const slugs = params['*'].split('/').filter((v) => v.length > 0);
      const page = source.getPage(slugs);
      if (!page) {
        return new Response('not found', { status: 404 });
      }

      return new Response(await getLLMText(page), {
        headers: {
          'Content-Type': 'text/markdown',
        },
      });
    }
    ```

    ```ts  title="app/root.tsx"
    import { rewritePath } from 'fumadocs-core/negotiation';
    import type { Route } from './+types/root';

    // [!code ++:20]
    const { rewrite: rewriteLLM } = rewritePath('/docs{/*path}.mdx', '/llms.mdx/docs{/*path}');
    const serverMiddleware: Route.MiddlewareFunction = async ({ request }, next) => {
      const url = new URL(request.url);
      const path = rewriteLLM(url.pathname);
      if (path) return Response.redirect(new URL(path, url));

      return next();
    };

    export const middleware = [serverMiddleware];
    ```

  </CodeBlockTab>

  <CodeBlockTab value="Tanstack Start">
    ```ts  title="src/routes/llms[.]mdx.docs.$.ts"
    import { createFileRoute, notFound } from '@tanstack/react-router';
    import { source } from '@/lib/source';

    export const Route = createFileRoute('/llms.mdx/docs/$')({
      server: {
        handlers: {
          GET: async ({ params }) => {
            const slugs = params._splat?.split('/') ?? [];
            const page = source.getPage(slugs);
            if (!page) throw notFound();

            return new Response(await page.data.getText('raw'), {
              headers: {
                'Content-Type': 'text/markdown',
              },
            });
          },
        },
      },
    });
    ```

    ```ts  title="src/start.ts"
    import { createMiddleware, createStart } from '@tanstack/react-start';
    import { rewritePath } from 'fumadocs-core/negotiation';
    import { redirect } from '@tanstack/react-router';

    const { rewrite: rewriteLLM } = rewritePath('/docs{/*path}.mdx', 'llms.mdx/docs{/*path}');

    const llmMiddleware = createMiddleware().server(({ next, request }) => {
      const url = new URL(request.url);
      const path = rewriteLLM(url.pathname);

      if (path) {
        throw redirect(new URL(path, url));
      }

      return next();
    });

    export const startInstance = createStart(() => {
      return {
        requestMiddleware: [llmMiddleware],
      };
    });
    ```

  </CodeBlockTab>
</CodeBlockTabs>

Accept [#accept]

<FeedbackBlock id="8f543ea681b53654" body="To serve the Markdown content instead for AI agents, you can leverage the Accept header.">
  To serve the Markdown content instead for AI agents, you can leverage the `Accept` header.
</FeedbackBlock>

```ts title="proxy.ts (Next.js)"
import { NextRequest, NextResponse } from 'next/server'
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation'

const { rewrite: rewriteLLM } = rewritePath(
  '/docs{/*path}',
  '/llms.mdx/docs{/*path}',
)

export default function proxy(request: NextRequest) {
  if (isMarkdownPreferred(request)) {
    const result = rewriteLLM(request.nextUrl.pathname)

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl))
    }
  }

  return NextResponse.next()
}
```

Page Actions [#page-actions]

<FeedbackBlock id="0d16bfb9714ade78" body="Common page actions for AI, require *.mdx to be implemented first.">
  Common page actions for AI, require [`*.mdx`](#mdx-extension) to be implemented first.
</FeedbackBlock>

<img alt="AI Page Actions" src={__img0} placeholder="blur" />

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
    npx @fumadocs/cli add ai/page-actions
    ```
  </CodeBlockTab>

  <CodeBlockTab value="pnpm">
    ```bash
    pnpm dlx @fumadocs/cli add ai/page-actions
    ```
  </CodeBlockTab>

  <CodeBlockTab value="yarn">
    ```bash
    yarn dlx @fumadocs/cli add ai/page-actions
    ```
  </CodeBlockTab>

  <CodeBlockTab value="bun">
    ```bash
    bun x @fumadocs/cli add ai/page-actions
    ```
  </CodeBlockTab>
</CodeBlockTabs>

<FeedbackBlock id="00010b155da4ebbe" body="Use it in your docs page like:">
  Use it in your docs page like:
</FeedbackBlock>

```tsx title="app/docs/[[...slug]]/page.tsx"
<div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
  <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
  <ViewOptions
    markdownUrl={`${page.url}.mdx`}
    githubUrl={`https://github.com/${owner}/${repo}/blob/dev/apps/docs/content/docs/${page.path}`}
  />
</div>
```

Ask AI [#ask-ai]

<img alt="AI Search" src={__img1} placeholder="blur" />

<FeedbackBlock id="0eecb0cd20980db6" body="You can install the AI search dialog using Fumadocs CLI:">
  You can install the AI search dialog using Fumadocs CLI:
</FeedbackBlock>

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
    npx @fumadocs/cli add ai/search
    ```
  </CodeBlockTab>

  <CodeBlockTab value="pnpm">
    ```bash
    pnpm dlx @fumadocs/cli add ai/search
    ```
  </CodeBlockTab>

  <CodeBlockTab value="yarn">
    ```bash
    yarn dlx @fumadocs/cli add ai/search
    ```
  </CodeBlockTab>

  <CodeBlockTab value="bun">
    ```bash
    bun x @fumadocs/cli add ai/search
    ```
  </CodeBlockTab>
</CodeBlockTabs>

<FeedbackBlock id="1706856f72deaf2e" body="Then, add the <AISearchTrigger /> component to your root layout.">
  Then, add the `<AISearchTrigger />` component to your root layout.
</FeedbackBlock>

AI Model [#ai-model]

<FeedbackBlock id="ab45a2e53de8b4c6" body="By default, it's configured for Inkeep AI using Vercel AI SDK.">
  By default, it's configured for [Inkeep AI](https://inkeep.com) using Vercel AI SDK.
</FeedbackBlock>

<FeedbackBlock id="fa4cffcae8522b28" body="To setup for Inkeep AI:">
  To setup for Inkeep AI:
</FeedbackBlock>

<FeedbackBlock
id="2ad7288da487f98a"
body="Add your Inkeep API key to environment variables:INKEEP_API_KEY=&#x22;...&#x22;Add the AISearchTrigger component to root layout (or anywhere you prefer):import { AISearchTrigger } from '@/components/search';

export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang=&#x22;en&#x22;>
<body>
{/_ [!code ++] _/}
<AISearchTrigger />
{children}
</body>
</html>
);
}"

>

1.  Add your Inkeep API key to environment variables:

    ```dotenv
    INKEEP_API_KEY="..."
    ```

2.  Add the `AISearchTrigger` component to root layout (or anywhere you prefer):

         ```tsx
         import { AISearchTrigger } from '@/components/search';

         export default function RootLayout({ children }: { children: React.ReactNode }) {
           return (
             <html lang="en">
               <body>
                 {/* [!code ++] */}
                 <AISearchTrigger />
                 {children}
               </body>
             </html>
           );
         }
         ```

    </FeedbackBlock>

<FeedbackBlock id="6def29546619e262" body="To use your own AI models, update the configurations in useChat and /api/chat route.">
  To use your own AI models, update the configurations in `useChat` and `/api/chat` route.
</FeedbackBlock>

<FeedbackBlock
id="97e90a4131bbe1e7"
body="Note that Fumadocs doesn't provide the AI model, it's up to you.
Your AI model can use the llms-full.txt file generated above, or more diversified sources of information when combined with 3rd party solutions."

> Note that Fumadocs doesn't provide the AI model, it's up to you.
> Your AI model can use the `llms-full.txt` file generated above, or more diversified sources of information when combined with 3rd party solutions.
> </FeedbackBlock>
