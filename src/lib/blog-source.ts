import { blogs } from 'fumadocs-mdx:collections/server'
import { loader } from 'fumadocs-core/source'

export const blogSource = loader({
  baseUrl: '/blogs',
  source: blogs.toFumadocsSource(),
})

export default blogSource
