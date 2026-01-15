# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with **TanStack Start** (file-based SSR framework) showcasing Prathamesh Chougale's work as a Software Engineer. The application features AI-powered chat, multi-language support (English, Hindi, Marathi), and integrates with external services like LeetCode for displaying coding statistics.

## Development Commands

**Important:** All commands must be run with the `--bun` flag for proper runtime execution.

```bash
bun install              # Install dependencies
bun --bun run dev        # Start dev server at http://localhost:3000
bun --bun run test       # Run Vitest tests
bun --bun run lint       # Run ESLint
bun --bun run format     # Run Prettier
bun --bun run check      # Run Prettier + ESLint fix (format then lint)
bun --bun run build      # Build for production
bun --bun run preview    # Preview production build
```

## Tech Stack

- **Framework:** TanStack Start v1.132.0 (file-based routing with SSR)
- **Router:** TanStack Router v1.132.0 (type-safe, file-based)
- **State:** TanStack React Query v5.66.5 + TanStack Store v0.8.0
- **API Layer:** oRPC v1.13.0 (OpenAPI-compatible RPC with Zod validation)
- **AI:** TanStack AI with Google Gemini (gemini-2.5-flash-lite-preview)
- **Database:** MongoDB (singleton pattern with HMR support)
- **Email:** Nodemailer (contact form submissions)
- **i18n:** Paraglide (file-based, type-safe translations)
- **Styling:** Tailwind CSS 4, shadcn/ui (base-mira style, zinc base, Phosphor icons)
- **Forms:** TanStack Form v1.0.0
- **Backend:** Nitro (SSR server)
- **Testing:** Vitest v3.0.5 with jsdom
- **Code Quality:** ESLint (@tanstack/eslint-config) + Prettier
- **Build Tool:** Vite v7.1.7
- **Runtime:** Bun

## Architecture

### File-Based Routing

Routes are defined in `src/routes/` and auto-generate the route tree in `routeTree.gen.ts`:

- `__root.tsx` - Root layout with Navbar, Footer, ChatButton, and Devtools
- `index.tsx` - Homepage (/)
- `about.tsx` - About page (/about)
- `projects.tsx` - Projects page (/projects)
- `contact.tsx` - Contact page (/contact)
- `api.portfolio.chat.ts` - AI chat API endpoint (/api/portfolio/chat)
- `api.rpc.$.ts` - oRPC HTTP handler (/api/rpc/*)

### oRPC API Layer

**Architecture:**
```
src/orpc/router/
├── index.ts           # Main router (exports all procedures)
├── contact.ts         # Contact form submission (nodemailer)
└── leetcode.ts        # LeetCode rating fetching
```

**Setup (`src/orpc/client.ts`):**
- **Isomorphic client** - works on server and client
- **Server:** Uses `createRouterClient` with router directly
- **Client:** Uses `createORPCClient` with fetch to `/api/rpc`
- **TanStack Query integration:** Via `createTanstackQueryUtils`

**Usage pattern:**
```typescript
import { orpc } from '@/orpc/client'

// In components or routes
const { data } = orpc.getLeetcodeRating.useQuery({})
const mutation = orpc.submitContact.useMutation()
```

**Key procedures:**
- `submitContact` - Sends email to admin + thank-you email to user (Zod validation: name min 2, email valid, subject min 5, message min 10)
- `getLeetcodeRating` - Fetches LeetCode statistics via GraphQL API

### AI Chat System

**API Route:** `src/routes/api.portfolio.chat.ts`

**Features:**
- Streaming responses via Server-Sent Events (SSE)
- Multi-language support (English, Hindi, Marathi)
- MongoDB persistence for user messages
- Google Gemini 2.5 Flash Lite integration via TanStack AI
- Personalized system prompt with professional data
- Request abort handling (returns 499 on client disconnect)

**System prompt builder:**
- Locale-aware (responds in English, Hindi, or Marathi)
- First-person narrative as Prathamesh Chougale
- Includes bio, skills, achievements, projects
- Professional yet friendly tone

**Hook:** `src/lib/portfolio-chat-hook.ts` - Client-side chat management

### Database Layer

**MongoDB Setup (`src/db/client.ts`):**
- Singleton pattern with HMR support (development mode uses global variable)
- Server API version v1 with strict mode
- Production mode creates new client instance

**Schema (`src/db/schema/chat.ts`):**
```typescript
type ChatMessage = {
  queryId?: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}
```

**Operations:**
- `insertChatMessage(db, message)` - Insert chat message
- `getChatHistory(db, sessionId)` - Retrieve chat history sorted by timestamp

### Internationalization (i18n)

**Paraglide Setup:**
- **Messages:** `project.inlang/messages/` (auto-generated runtime in `src/paraglide/`)
- **Router integration:** URL rewriting via `deLocalizeUrl` / `localizeUrl` in `src/router.tsx`
- **Server middleware:** `src/server.ts` handles URL localization/redirects
- **Supported locales:** English (en), Hindi (hi), Marathi (mr)

**Usage:**
```typescript
import * as m from '@/paraglide/messages'
import { getLocale } from '@/paraglide/runtime'

// Access translations
const title = m.projects_0_title()
const locale = getLocale() // 'en' | 'hi' | 'mr'
```

**Project data loading (`src/lib/get-projects.ts`):**
- Dynamically loads projects from Paraglide messages
- Follows naming pattern: `projects_{index}_{field}`
- Supports nested arrays for tags: `projects_{index}_tags_{tagIndex}`

### Component Organization

```
src/components/
├── about/              # About page sections
│   ├── experience-timeline.tsx
│   ├── hero-section.tsx
│   ├── leetcode-rating.tsx
│   ├── stats-section.tsx
│   └── tech-stack-section.tsx
├── contact/            # Contact form and related
│   ├── contact-form.tsx
│   ├── contact-image.tsx
│   ├── social-links.tsx
│   └── thought-section.tsx
├── home/               # Homepage sections
│   ├── achievement-card.tsx
│   ├── achievements-section.tsx
│   ├── hero-section.tsx
│   ├── project-card.tsx
│   └── projects-section.tsx
├── layout/             # Site-wide layout components
│   ├── chat-button.tsx      # AI chat trigger
│   ├── chat-window.tsx      # AI chat interface
│   ├── footer.tsx
│   ├── mobile-nav.tsx
│   └── navbar.tsx
├── projects/           # Project page components
│   ├── project-card.tsx
│   ├── project-filters.tsx
│   └── project-list.tsx
├── ui/                 # shadcn/ui primitives
│   ├── animated-link.tsx
│   ├── avatar.tsx
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── checkbox.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── language-switcher.tsx
│   ├── select.tsx
│   ├── sheet.tsx
│   ├── skeleton.tsx
│   └── sonner.tsx (toast notifications)
├── icons.tsx           # Custom icon components
├── LocaleSwitcher.tsx  # Language switcher
└── not-found.tsx       # 404 page
```

### Environment Variables

**Validated with Zod in `src/env.ts` using @t3-oss/env-core:**

**Server-only (required):**
- `MONGODB_URI` - MongoDB connection string
- `DATABASE_NAME` - Database name
- `EMAIL_SERVER_HOST` - SMTP host
- `EMAIL_SERVER_PORT` - SMTP port
- `EMAIL_SERVER_USER` - SMTP username
- `EMAIL_SERVER_PASSWORD` - SMTP password
- `EMAIL_ADMIN` - Admin email for contact form
- `GEMINI_API_KEY` - Google Gemini API key

**Server-only (optional):**
- `NODE_ENV` - Environment mode (development, production, test) - defaults to 'development'

**Usage:**
```typescript
import { env } from '@/env'
console.log(env.GEMINI_API_KEY) // Type-safe access
```

### State Management

**TanStack Store Pattern:**
```typescript
import { Store, Derived } from '@tanstack/store'
import { useStore } from '@tanstack/react-store'

const countStore = new Store(0)
const doubledStore = new Derived({
  fn: () => countStore.state * 2,
  deps: [countStore],
})
doubledStore.mount() // Required for Derived stores

// In component
const count = useStore(countStore)
```

**TanStack Query:**
- Configured in `src/integrations/tanstack-query/root-provider.tsx`
- Context created with `getContext()` and provided via `Provider`
- SSR integration via `setupRouterSsrQueryIntegration` in `src/router.tsx`

### Styling

**Tailwind CSS 4:**
- Configuration embedded in `src/styles.css`
- Vite plugin: `@tailwindcss/vite`

**shadcn/ui:**
- Style: `base-mira`
- Base color: `zinc`
- Icon library: Phosphor (`@phosphor-icons/react`)
- CSS variables: enabled
- No prefix

**Adding components:**
```bash
pnpm dlx shadcn@latest add button
```

**Utility function (`src/lib/utils.ts`):**
```typescript
import { cn } from '@/lib/utils' // tailwind-merge + clsx
```

### Type Safety

**TypeScript strict mode enabled in `tsconfig.json`:**
- Path alias: `@/*` maps to `./src/*`
- Target: ES2022
- Module resolution: bundler
- JSX: react-jsx (React 19)

**Type definitions (`src/types/`):**
- `home.ts` - Achievement, Project (homepage), HeroSectionProps
- `project.ts` - Project (projects page)

### Devtools Integration

**TanStack Devtools (`src/routes/__root.tsx`):**
- Combined devtools panel with plugins:
  - TanStack Router Devtools
  - TanStack AI Devtools (`src/lib/ai-devtools.tsx`)
  - TanStack Query Devtools (`src/integrations/tanstack-query/devtools.tsx`)
- Position: bottom-left

### Build Configuration

**Vite (`vite.config.ts`):**
- Plugins: TanStack Start, TanStack Devtools, Paraglide, Nitro, Tailwind CSS, React (with React Compiler)
- Path aliases via `vite-tsconfig-paths`
- Ignored watch paths: `**/project.inlang/messages/**`

**Code Quality:**
- ESLint: `@tanstack/eslint-config`
- Prettier: No semicolons, single quotes, trailing commas

## Key Patterns

### Route with Server Handler

```typescript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/portfolio/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json()
        // Handle request
        return new Response(JSON.stringify(data))
      },
    },
  },
})
```

### oRPC Procedure Definition

```typescript
import { os } from '@orpc/server'
import { z } from 'zod'

export const submitContact = os
  .input(z.object({
    name: z.string().min(2),
    email: z.email(),
  }))
  .handler(async ({ input }) => {
    // Handle logic
    return { success: true }
  })
```

### Loading Projects from Paraglide

Projects are stored in Paraglide messages with the pattern `projects_{index}_{field}`. Use `getAllProjects()` from `src/lib/get-projects.ts` to load them dynamically.

### Chat System Integration

The chat window (`src/components/layout/chat-window.tsx`) uses the hook from `src/lib/portfolio-chat-hook.ts` which communicates with the API endpoint at `/api/portfolio/chat`. Messages are streamed via SSE and rendered with markdown support.

## Important Notes

- **Always use `--bun` flag** when running development commands
- **Path aliases:** Use `@/*` for imports (e.g., `@/components/ui/button`)
- **MongoDB client:** Already configured with HMR support - don't create new instances
- **i18n messages:** Auto-generated in `src/paraglide/` - don't edit manually
- **Route tree:** Auto-generated in `src/routeTree.gen.ts` - don't edit manually
- **Environment validation:** Add new variables to `src/env.ts` first before using
- **React Compiler:** Enabled via babel-plugin-react-compiler in Vite config
- **Toaster:** Already configured in root layout (Sonner) - use `toast()` from `sonner`
