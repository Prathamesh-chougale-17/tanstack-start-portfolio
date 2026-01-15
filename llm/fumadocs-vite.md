# Fumadocs MDX (the built-in content source): Vite

URL: /docs/mdx/vite
Source: https://raw.githubusercontent.com/fuma-nama/fumadocs/refs/heads/main/apps/docs/content/docs/mdx/(integrations)/vite.mdx

Use Fumadocs MDX with Vite

## Setup

<div className="fd-steps [&_h3]:fd-step">
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
      npm i fumadocs-mdx fumadocs-core @types/mdx
      ```
    </CodeBlockTab>

    <CodeBlockTab value="pnpm">
      ```bash
      pnpm add fumadocs-mdx fumadocs-core @types/mdx
      ```
    </CodeBlockTab>

    <CodeBlockTab value="yarn">
      ```bash
      yarn add fumadocs-mdx fumadocs-core @types/mdx
      ```
    </CodeBlockTab>

    <CodeBlockTab value="bun">
      ```bash
      bun add fumadocs-mdx fumadocs-core @types/mdx
      ```
    </CodeBlockTab>

  </CodeBlockTabs>

Create the configuration file:

```ts title="source.config.ts"
import { defineDocs } from 'fumadocs-mdx/config'

export const docs = defineDocs({
  dir: 'content/docs',
})
```

Add the Vite plugin:

  <CodeBlockTabs defaultValue="Vite">
    <CodeBlockTabsList>
      <CodeBlockTabsTrigger value="Vite">
        Vite
      </CodeBlockTabsTrigger>

      <CodeBlockTabsTrigger value="Waku">
        Waku
      </CodeBlockTabsTrigger>
    </CodeBlockTabsList>

    <CodeBlockTab value="Vite">
      ```ts  title="vite.config.ts"
      import { defineConfig } from 'vite';
      import mdx from 'fumadocs-mdx/vite';
      import * as MdxConfig from './source.config';

      export default defineConfig({
        plugins: [
          // [!code ++]
          mdx(MdxConfig),
          // ...
        ],
      });
      ```
    </CodeBlockTab>

    <CodeBlockTab value="Waku">
      ```ts  title="waku.config.ts"
      import { type Config, defineConfig } from 'waku/config';
      import mdx from 'fumadocs-mdx/vite';
      import * as MdxConfig from './source.config.js';
      import tsconfigPaths from 'vite-tsconfig-paths';
      import type { UserConfig } from 'vite';

      export default defineConfig({
        vite: {
          plugins: [
            // [!code ++]
            mdx(MdxConfig),
            tsconfigPaths(),
          ],
        } satisfies UserConfig as Config['vite'],
      });
      ```
    </CodeBlockTab>

  </CodeBlockTabs>

Setup an import alias (recommended):

```json title="tsconfig.json"
{
  "compilerOptions": {
    "paths": {
      // [!code ++]
      "fumadocs-mdx:collections/*": [".source/*"]
    }
  }
}
```

> You might need to configure [`vite-tsconfig-paths`](https://github.com/aleclarson/vite-tsconfig-paths) plugin for path alias.

### Integrate with Fumadocs

To integrate with Fumadocs, make a `lib/source.ts` file:

```ts title="app/lib/source.ts"
import { docs } from 'fumadocs-mdx:collections/server'
import { loader } from 'fumadocs-core/source'

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
})
```

The `.source` folder will be generated when you run development server or production build.

### Done

You can now write content in `content/docs` folder.

</div>

## What is Next?

<Cards>
  <Card title="Accessing Collections" href="/docs/mdx/entry">
    Learn how to access collection outputs.
  </Card>

  <Card title="Lazy Loading" href="/docs/mdx/async">
    Hit performance bottleneck? You can try lazy loading.
  </Card>
</Cards>
