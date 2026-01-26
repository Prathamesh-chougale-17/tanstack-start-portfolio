import handler from '@tanstack/react-start/server-entry'
import { paraglideMiddleware } from './paraglide/server'
import { rewritePath } from 'fumadocs-core/negotiation'

const { rewrite: rewriteLLM } = rewritePath('/blogs{/*path}.mdx', '/llms.mdx/blogs{/*path}')

// Server-side URL localization/redirects for Paraglide
export default {
  fetch(req: Request): Promise<Response> {
    const url = new URL(req.url)
    const path = rewriteLLM(url.pathname)

    if (path) {
      return Promise.resolve(Response.redirect(new URL(path, url)))
    }

    return paraglideMiddleware(req, () => handler.fetch(req))
  },
}
