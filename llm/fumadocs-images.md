# Fumadocs Core (the core library of Fumadocs): Remark Image

URL: /docs/headless/mdx/remark-image
Source: https://raw.githubusercontent.com/fuma-nama/fumadocs/refs/heads/main/apps/docs/content/docs/headless/mdx/remark-image.mdx

Adding size attributes to images.

<FeedbackBlock id="ac0a6d957fa147e1" body="This plugin adds width and height attributes to your image elements, which is needed for Image Optimization on Next.js and some other frameworks.">
  This plugin adds `width` and `height` attributes to your image elements, which is needed for Image Optimization on Next.js and some other frameworks.
</FeedbackBlock>

## Usage

<FeedbackBlock id="d3332f4f55efed4a" body="Add it to your Remark plugins.">
  Add it to your Remark plugins.
</FeedbackBlock>

```ts title="MDX Compiler"
import { compile } from '@mdx-js/mdx'
import { remarkImage } from 'fumadocs-core/mdx-plugins'

await compile('...', {
  remarkPlugins: [remarkImage],
})
```

> <FeedbackBlock id="6628829b25475241" body="This plugin is included by default on Fumadocs MDX.">
>   This plugin is included by default on Fumadocs MDX.
> </FeedbackBlock>

<FeedbackBlock id="a5e899adbf324b77" body="Supported:">
  Supported:
</FeedbackBlock>

<FeedbackBlock id="a7de085352e2c79f" body="Local ImagesExternal URLsNext.js static imports">
  * Local Images
  * External URLs
  * Next.js static imports
</FeedbackBlock>

### How It Works

<FeedbackBlock
id="f9bda98e9905422b"
body="For Next.js, it uses static imports to import local images, which supports the placeholder option of Next.js Image.
Next.js can handle image imports with its built-in image loader."

> For Next.js, it uses **static imports** to import local images, which supports the `placeholder` option of Next.js Image.
> Next.js can handle image imports with its built-in image loader.
> </FeedbackBlock>

<FeedbackBlock id="834a3cc4c3f81a8f" body="Otherwise, it uses the file system or an HTTP request to download the image and obtain its size.">
  Otherwise, it uses the file system or an HTTP request to download the image and obtain its size.
</FeedbackBlock>

### Options

<TypeTable
type={{
  "name": "RemarkImageOptions",
  "description": "",
  "entries": [
    {
      "name": "publicDir",
      "description": "Directory or base URL to resolve absolute image paths",
      "tags": [],
      "type": "string | undefined",
      "simplifiedType": "string",
      "required": false,
      "deprecated": false
    },
    {
      "name": "placeholder",
      "description": "Preferred placeholder type, only available with `useImport` + local images.",
      "tags": [
        {
          "name": "defaultValue",
          "text": "'blur'"
        }
      ],
      "type": "\"blur\" | \"none\" | undefined",
      "simplifiedType": "\"none\" | \"blur\"",
      "required": false,
      "deprecated": false
    },
    {
      "name": "onError",
      "description": "Define how to handle errors when fetching image size.\n\n- `error` (default): throw an error.\n- `ignore`: do absolutely nothing (Next.js Image component may complain).\n- `hide`: remove that image element.",
      "tags": [
        {
          "name": "defaultValue",
          "text": "'error'"
        }
      ],
      "type": "\"error\" | \"hide\" | \"ignore\" | ((error: Error) => void) | undefined",
      "simplifiedType": "function | \"ignore\" | \"hide\" | \"error\"",
      "required": false,
      "deprecated": false
    },
    {
      "name": "useImport",
      "description": "Import images in the file, and let bundlers handle it.\n\n```tsx\nimport MyImage from \"./public/img.png\";\n\n<img src={MyImage} />\n```\n\nWhen disabled, `placeholder` will be ignored.",
      "tags": [
        {
          "name": "defaultValue",
          "text": "true"
        }
      ],
      "type": "boolean | undefined",
      "simplifiedType": "boolean",
      "required": false,
      "deprecated": false
    },
    {
      "name": "external",
      "description": "Fetch image size of external URLs",
      "tags": [
        {
          "name": "defaultValue",
          "text": "true"
        }
      ],
      "type": "ExternalImageOptions | undefined",
      "simplifiedType": "object | boolean",
      "required": false,
      "deprecated": false
    }
  ]
}}
/>

### Example: With Imports

```mdx
![Hello](/hello.png)
![Test](https://example.com/image.png)
```

<FeedbackBlock id="b0462e06695a9adc" body="Yields:">
  Yields:
</FeedbackBlock>

```mdx
import HelloImage from './public/hello.png'

<img alt="Hello" src={HelloImage} />
<img
  alt="Test"
  src="https://example.com/image.png"
  width="1980"
  height="1080"
/>
```

<FeedbackBlock id="044e7046decc9f14" body="Where ./public/hello.png points to the image in public directory.">
  Where `./public/hello.png` points to the image in public directory.
</FeedbackBlock>

### Example: Without Imports

<FeedbackBlock id="50453f5e23fa6d97" body="For Next.js, you can disable static imports on local images.">
  For Next.js, you can disable static imports on local images.
</FeedbackBlock>

```ts
import { remarkImage } from 'fumadocs-core/mdx-plugins'

export default {
  remarkPlugins: [[remarkImage, { useImport: false }]],
}
```

```mdx
![Hello](/hello.png)
![Test](https://example.com/image.png)
```

<FeedbackBlock id="b0462e06695a9adc-1" body="Yields:">
  Yields:
</FeedbackBlock>

```mdx
<img alt="Hello" src="/hello.png" width="1980" height="1080" />
<img
  alt="Test"
  src="https://example.com/image.png"
  width="1980"
  height="1080"
/>
```

### Example: Relative Paths

<FeedbackBlock id="bb5a07645fb3fd4e" body="When useImport is enabled, you can reference local images using relative paths.">
  When `useImport` is enabled, you can reference local images using relative paths.
</FeedbackBlock>

```mdx
![Hello](./hello.png)
```

<FeedbackBlock
id="058ffb947772bb58"
body="Be careful that using it with useImport disabled doesn't work.
Next.js will not add the image to public assets unless you have imported it in code.
For images in public directory, you can just reference them without relative paths."

> Be careful that using it with `useImport` disabled **doesn't work**.
> Next.js will not add the image to public assets unless you have imported it in code.
> For images in public directory, you can just reference them without relative paths.
> </FeedbackBlock>

### Example: Public Directory

<FeedbackBlock id="73806982cf86500b" body="Customise the path of public directory">
  Customise the path of public directory
</FeedbackBlock>

```ts
import { remarkImage } from 'fumadocs-core/mdx-plugins'
import path from 'node:path'

export default {
  remarkPlugins: [
    remarkImage,
    {
      publicDir: path.join(process.cwd(), 'dir'),
    },
  ],
}
```

<FeedbackBlock id="71a068433ebb1974" body="You can pass a URL too.">
  You can pass a URL too.
</FeedbackBlock>

```ts
import { remarkImage } from 'fumadocs-core/mdx-plugins'

export default {
  remarkPlugins: [
    remarkImage,
    {
      publicDir: 'https://my-cdn.com/images',
    },
  ],
}
```
