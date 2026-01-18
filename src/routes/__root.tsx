import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { RootProvider } from 'fumadocs-ui/provider/tanstack'
import AiDevtools from '../lib/ai-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'
import { getLocale } from '@/paraglide/runtime'
import { ThemeProvider } from '@/providers/theme-provider'
import { NavbarComponent } from '@/components/layout/navbar'
import { ChatButton } from '@/components/layout/chat-button'
import { NotFound } from '@/components/not-found'
import { Toaster } from '@/components/ui/sonner'
import { PWARegister } from '@/components/pwa-register'

interface MyRouterContext {
  queryClient: QueryClient
}

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
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

  server: {
    handlers: {
      GET: async ({ request, next }) => {
        const url = new URL(request.url)
        // Rewrite /blogs/*.mdx requests to /llms.mdx/blogs/*
        if (
          url.pathname.startsWith('/blogs/') &&
          url.pathname.endsWith('.mdx')
        ) {
          const pathWithoutExtension = url.pathname.replace(/\.mdx$/, '')
          const newPath = `/llms.mdx${pathWithoutExtension}`
          return Response.redirect(new URL(newPath, url))
        }
        return next()
      },
    },
  },

  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
      },
      {
        title: 'Prathamesh Chougale | Software Engineer',
      },
      {
        name: 'description',
        content:
          'Full Stack Software Engineer specializing in React, Next.js, TanStack Start, AI & Machine Learning. Explore my portfolio of projects and technical expertise.',
      },
      {
        name: 'author',
        content: 'Prathamesh Chougale',
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
      {
        name: 'theme-color',
        content: '#000000',
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'default',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'Prathamesh Chougale',
      },
      {
        property: 'og:title',
        content: 'Prathamesh Chougale | Software Engineer',
      },
      {
        property: 'og:description',
        content:
          'Full Stack Software Engineer specializing in React, Next.js, TanStack Start, AI & Machine Learning',
      },
      {
        property: 'og:type',
        content: 'website',
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

  shellComponent: RootComponent,
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
          <NavbarComponent />
          <RootProvider>{children}</RootProvider>
          <Toaster position="bottom-right" closeButton richColors />
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
            ]}
          />
          <PWARegister />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
