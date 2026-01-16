# AGENTS.md - Developer Guidelines

This document provides guidelines for agentic coding assistants working in this TanStack Start portfolio application repository.

## Project Overview

A modern portfolio application built with **TanStack Start**, featuring:

- Server-side rendering with TanStack Start + Nitro
- File-based routing with TanStack Router
- React 19 with React Compiler support
- Type-safe environment variables via T3 Env
- Internationalization (i18n) via Paraglide JS
- AI integration (Gemini API)
- Tailwind CSS v4 for styling
- MongoDB for persistence

## Build & Development Commands

### Development

```bash
bun install              # Install dependencies
bun run dev             # Start dev server (http://localhost:3000)
bun run build           # Build for production
bun run preview         # Preview production build locally
```

### Testing

```bash
bun run test            # Run all tests with Vitest
bun run test -- --watch # Watch mode
bun run test -- src/lib/utils.test.ts  # Single test file
bun run test -- -t "test name"         # Run specific test by name
```

### Linting & Formatting

```bash
bun run lint            # Check ESLint violations
bun run lint -- --fix   # Auto-fix ESLint issues
bun run format          # Check Prettier violations
bun run format -- --write  # Auto-format files
bun run check           # Lint + format in one command
```

## Code Style Guidelines

### Imports & Module Organization

- **Path Aliases**: Use `@/*` for imports from `src/` directory
  ```tsx
  import { Button } from '@/components/ui/button'
  import { env } from '@/env'
  import { cn } from '@/lib/utils'
  ```
- **Order imports** as: external packages → aliases → relative paths
- **Group related imports** together with a blank line between groups
- **No unused imports**: `noUnusedLocals: true` enforced via TypeScript

### File Organization

- **Components**: `src/components/` (organized by feature: `ui/`, `layout/`, `home/`, etc.)
- **Routes**: `src/routes/` (file-based routing with special files like `__root.tsx`)
- **Utilities & Types**: `src/lib/`, `src/types/`
- **Server code**: `src/server.ts`, `src/orpc/` for API routes
- **Configuration**: Environment via `src/env.ts` using `@t3-oss/env-core`

### TypeScript & Types

- **Strict mode enabled**: Use explicit types for all public APIs
- **No `any` types**: Properly type function parameters and returns
- **Enforce types**: `noUnusedParameters: true`, `noUnusedLocals: true`
- **Interface pattern for React**: Use `interface Props` for component props
  ```tsx
  interface ButtonProps extends ButtonPrimitive.Props {
    variant?: 'default' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
  }
  ```

### Naming Conventions

- **Components**: PascalCase (`Button`, `HeroSection`, `NavBar`)
- **Functions/variables**: camelCase (`getUserData`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `DEFAULT_TIMEOUT`)
- **Types/Interfaces**: PascalCase (`ButtonProps`, `User`, `ApiResponse`)
- **File names**: kebab-case for utilities (`get-projects.ts`, `layout.shared.tsx`)

### Formatting

- **Quotes**: Single quotes for strings (`'hello'` not `"hello"`)
- **Semicolons**: No semicolons at line ends
- **Trailing commas**: Use `trailingComma: 'all'` in objects/arrays
- **Line length**: Prettier enforces reasonable limits (default 80)
- **Indentation**: 2 spaces (configured in Prettier & ESLint)

### React & JSX Patterns

- **Functional components** only (no class components)
- **Proper prop spreading**:
  ```tsx
  function Button({ className, variant, ...props }: ButtonProps) {
    return <button {...props} className={cn(styles, className)} />
  }
  ```
- **Use `cn()` utility** for conditional Tailwind classes:
  ```tsx
  className={cn(
    'base-class',
    variant === 'primary' && 'primary-class',
    className,
  )}
  ```
- **Type children prop** explicitly:
  ```tsx
  function Card({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>
  }
  ```

### Styling

- **Tailwind CSS v4** with vite plugin
- **Use CSS variables** for theme values (light/dark mode via `next-themes`)
- **CVA (Class Variance Authority)** for component variants:
  ```tsx
  const buttonVariants = cva('base', {
    variants: {
      size: { sm: 'text-sm', lg: 'text-lg' },
    },
  })
  ```
- **Avoid inline styles**: Use Tailwind utilities

### Error Handling

- **Try-catch blocks** for async operations
- **Proper error logging**: Use Sonner toast for user-facing errors
- **Type error responses**: Define error shapes with Zod
  ```tsx
  const errorSchema = z.object({
    message: z.string(),
    code: z.string(),
  })
  ```
- **Graceful degradation**: Provide fallbacks and sensible defaults
- **Environment validation**: All required env vars validated at startup via `src/env.ts`

### Database & API

- **MongoDB**: Use `mongodb` driver (see `src/db/`)
- **API Routes**: Use oRPC (Open RPC) in `src/orpc/` for type-safe client-server calls
- **Validation**: Use Zod schemas for all inputs
- **Type safety**: Extend types from API definitions, not manual copies

### Comments & Documentation

- **Document complex logic** only (avoid obvious comments)
- **JSDoc for public APIs**:
  ```tsx
  /**
   * Fetches user data by ID
   * @param userId - The user's unique identifier
   * @returns Promise containing user object
   */
  export async function getUser(userId: string) {}
  ```

### Testing with Vitest

- **Test location**: Colocate tests with source (`file.test.ts` next to `file.ts`)
- **DOM testing**: Use `@testing-library/react` for component tests
- **Configuration**: Vitest configured in `vite.config.ts` (jsdom environment)
- **Assertions**: Use Vitest's built-in assertions

## ESLint Configuration

The project uses **@tanstack/eslint-config** which enforces:

- No console logs in production code (use logger or remove before deploy)
- Proper React hook dependencies
- No unused variables or parameters
- No unsafe type assertions
- React best practices

Fix linting issues automatically with `bun run lint -- --fix`.

## Development Workflow

1. **Create/modify files** following style guidelines above
2. **Run tests**: `bun run test -- src/file.test.ts`
3. **Check linting**: `bun run lint` and `bun run format`
4. **Auto-fix issues**: `bun run check` (lint + format in one go)
5. **Test in browser**: `bun run dev` then validate locally
6. **Build check**: `bun run build` before committing

## Performance Considerations

- **React Compiler**: Enabled via Babel plugin (auto-optimization)
- **Code splitting**: Let Vite handle via imports
- **Lazy components**: Use React.lazy() for route components if needed
- **Image optimization**: Place optimized images in `public/`
- **DevTools**: Inspect with TanStack Devtools (included in root layout)

## TanStack Ecosystem

- **TanStack Router**: File-based routing, preloading, data loaders
- **TanStack Query**: Server state management (integrated)
- **TanStack AI**: Stream AI responses via `@tanstack/ai`
- **TanStack Devtools**: Debug routes, queries, and custom plugins

## Internationalization (i18n)

- **Paraglide JS** for i18n (in `project.inlang/messages/`)
- **Localized URLs**: Configured via router rewrite hooks
- **Runtime access**: Import from `@/paraglide/runtime`
  ```tsx
  import { getLocale, t } from '@/paraglide/runtime'
  ```
- **Generate outputs**: Run dev or build to regenerate `src/paraglide/`

## Common Patterns

### Query Data Fetching

```tsx
import { useQuery } from '@tanstack/react-query'

function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then((r) => r.json()),
  })
}
```

### Environment Variables

```tsx
import { env } from '@/env'

// Only works on server; define schema in src/env.ts
const dbUri = env.MONGODB_URI
```

### Routing with Type Safety

```tsx
import { createRoute } from '@tanstack/react-router'

export const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users/$userId',
  component: UserPage,
})
```

## Notes for Agents

- **No database migrations** needed for portfolio updates (schema-less MongoDB)
- **Build artifacts** go to `.output/` (not committed)
- **Environment required**: Set up `.env` with MongoDB and API keys before dev/build
- **Type checking**: Run TypeScript check as part of test/build validation
- **Devtools enabled**: Included by default—useful for debugging but ensure removed if sensible for production
