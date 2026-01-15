# Fumadocs Core (the core library of Fumadocs): Rehype Code

URL: /docs/headless/mdx/rehype-code
Source: https://raw.githubusercontent.com/fuma-nama/fumadocs/refs/heads/main/apps/docs/content/docs/headless/mdx/rehype-code.mdx

Code syntax highlighter

<FeedbackBlock id="f70e0b096754c453" body="A wrapper of @shikijs/rehype, the syntax highlighter used by Fumadocs.">
  A wrapper of [`@shikijs/rehype`](https://shiki.style/packages/rehype), the syntax highlighter used by Fumadocs.
</FeedbackBlock>

<FeedbackBlock id="319438bc8301d8b7" body="It converts raw <pre /> codeblocks into highlighted codeblocks:">
  It converts raw `<pre />` codeblocks into highlighted codeblocks:
</FeedbackBlock>

<CodeBlockTabs defaultValue="Input">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="Input">
      Input
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Output">
      Output
    </CodeBlockTabsTrigger>

  </CodeBlockTabsList>

  <CodeBlockTab value="Input">
    ````md
    ```ts
    console.log('Hello World');
    ```
    ````
  </CodeBlockTab>

  <CodeBlockTab value="Output">
    ```html
    <pre>
      <code>
        <span class="line">
          <span style="--shiki-light: #4C4F69; --shiki-dark: #CDD6F4;">console</span>...
        </span>
      </code>
    </pre>
    ```
  </CodeBlockTab>
</CodeBlockTabs>

## Usage

<FeedbackBlock id="70b0632f9228dd44" body="Add the rehype plugin.">
  Add the rehype plugin.
</FeedbackBlock>

<CodeBlockTabs defaultValue="MDX Compiler">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="MDX Compiler">
      MDX Compiler
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Fumadocs MDX">
      Fumadocs MDX
    </CodeBlockTabsTrigger>

  </CodeBlockTabsList>

  <CodeBlockTab value="MDX Compiler">
    ```ts
    import { compile } from '@mdx-js/mdx';
    import { rehypeCode, type RehypeCodeOptions } from 'fumadocs-core/mdx-plugins';

    const rehypeCodeOptions: RehypeCodeOptions = {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    };

    await compile('...', {
      rehypePlugins: [
        // using default settings
        rehypeCode,
        // or with custom options
        [rehypeCode, rehypeCodeOptions],
      ],
    });
    ```

  </CodeBlockTab>

  <CodeBlockTab value="Fumadocs MDX">
    ```ts
    import { defineConfig } from 'fumadocs-mdx/config';

    export default defineConfig({
      mdxOptions: {
        rehypeCodeOptions: {
          // enabled by default on Fumadocs MDX
          // configure options here
        },
      },
    });
    ```

  </CodeBlockTab>
</CodeBlockTabs>

### Meta

<FeedbackBlock id="decce8f2884a24de" body="It parses the title meta string, and adds it to the pre element as an attribute.">
  It parses the `title` meta string, and adds it to the `pre` element as an attribute.
</FeedbackBlock>

<CodeBlockTabs defaultValue="Input">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="Input">
      Input
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Output">
      Output
    </CodeBlockTabsTrigger>

  </CodeBlockTabsList>

  <CodeBlockTab value="Input">
    ````mdx
    ```js title="Title"
    console.log('Hello');
    ```
    ````
  </CodeBlockTab>

  <CodeBlockTab value="Output">
    ```jsx
    <pre title="Title">...</pre>
    ```
  </CodeBlockTab>
</CodeBlockTabs>

<FeedbackBlock id="9df6898faa374437" body="You may filter the meta string before processing it with the filterMetaString option.">
  You may filter the meta string before processing it with the `filterMetaString` option.
</FeedbackBlock>

### Inline Code

<FeedbackBlock id="ad43d154111f39bb" body="You can enable it with inline option:">
  You can enable it with `inline` option:
</FeedbackBlock>

```ts
import { type RehypeCodeOptions } from 'fumadocs-core/mdx-plugins'

const rehypeCodeOptions: RehypeCodeOptions = {
  // [!code ++]
  inline: 'tailing-curly-colon',
}
```

```md title="Syntax"
This is a highlighted inline code: `console.log("hello world"){:js}`.
```

<FeedbackBlock id="4bc5601a152d0a37" body="This is a highlighted inline code: console.log(&#x22;hello world&#x22;){:js}.">
  This is a highlighted inline code: `console.log("hello world"){:js}`.
</FeedbackBlock>

### Icon

<FeedbackBlock
id="5c7b10275d75e933"
body="The plugin will automatically adds an icon attribute according to the language meta string.
It is a HTML string, you can render it with React dangerouslySetInnerHTML."

> The plugin will automatically adds an `icon` attribute according to the language meta string.
> It is a HTML string, you can render it with React `dangerouslySetInnerHTML`.
> </FeedbackBlock>

<CodeBlockTabs defaultValue="Input">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="Input">
      Input
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Output">
      Output
    </CodeBlockTabsTrigger>

  </CodeBlockTabsList>

  <CodeBlockTab value="Input">
    ````md
    ```ts
    console.log('This should shows the logo of TypeScript');
    ```
    ````
  </CodeBlockTab>

  <CodeBlockTab value="Output">
    ```jsx
    <pre icon="<svg />">...</pre>
    ```
  </CodeBlockTab>
</CodeBlockTabs>

<FeedbackBlock id="f0ec0eb3260bea22" body="Disable or customise icons with the icon option.">
  Disable or customise icons with the `icon` option.
</FeedbackBlock>

### More Options

<FeedbackBlock id="4823a1a8a2905723" body="The options are inherited from Shiki, see their docs for other options.">
  The options are inherited from [Shiki](https://shiki.style), see their docs for other options.
</FeedbackBlock>
