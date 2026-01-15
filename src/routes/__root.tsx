import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import AiDevtools from '../lib/ai-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import StoreDevtools from '../lib/demo-store-devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'
import { getLocale } from '@/paraglide/runtime'
import { ThemeProvider } from '@/providers/theme-provider'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ChatButton } from '@/components/layout/chat-button'
import { NotFound } from '@/components/not-found'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    // Other redirect strategies are possible; see
    // https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#offline-redirect
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', getLocale())
    }
  },

  notFoundComponent: NotFound,

  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Prathamesh Chougale | Software Engineer',
      },
      // Additional meta tags for better SEO
      {
        name: 'author',
        content: 'Prathamesh Chougale',
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: '/icons/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/icons/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/icons/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/icons/favicon-16x16.png',
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  // Use baseLocale as fallback during SSR when locale isn't set yet
  const lang = getLocale()

  return (
    <html lang={lang}>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="mx-auto px-4 sm:px-6 md:px-8">{children}</main>
          <Footer />
          <ChatButton />
          <TanStackDevtools
            config={{
              position: 'bottom-left',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              AiDevtools,
              TanStackQueryDevtools,
              StoreDevtools,
            ]}
          />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
