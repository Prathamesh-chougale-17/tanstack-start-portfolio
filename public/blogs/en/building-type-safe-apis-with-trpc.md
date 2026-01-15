# Building Type-Safe APIs with tRPC

tRPC offers end-to-end type safety for your full-stack TypeScript applications without code generation. Let's explore how it works and why it's becoming increasingly popular.

## What is tRPC?

tRPC is a library that lets you build type-safe APIs with TypeScript. It provides automatic type inference from your backend to your frontend, eliminating the need for code generation or manual type definitions.

## Why Choose tRPC?

### 1. End-to-End Type Safety

With tRPC, your frontend automatically knows the exact shape of your API responses:

```typescript
// Backend
const appRouter = router({
  getUser: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.user.findUnique({ where: { id: input } })
    }),
})

// Frontend - Types are automatically inferred!
const user = await trpc.getUser.query('user-123')
// user is typed as User
```

### 2. No Code Generation

Unlike GraphQL or other solutions, tRPC doesn't require a build step to generate types. Changes to your backend are immediately reflected in your frontend.

### 3. Minimal Boilerplate

Setting up tRPC is straightforward and requires minimal configuration.

## Getting Started

### Installation

```bash
bun add @trpc/server @trpc/client @trpc/react-query
bun add zod
```

### Basic Setup

Create your tRPC router:

```typescript
// server/trpc.ts
import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure
```

Define your API routes:

```typescript
// server/routers/user.ts
import { router, publicProcedure } from '../trpc'
import { z } from 'zod'

export const userRouter = router({
  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.user.findUnique({
        where: { id: input },
      })
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.email(),
      })
    )
    .mutation(async ({ input }) => {
      return await db.user.create({
        data: input,
      })
    }),
})
```

## Advanced Features

### Middleware

Add authentication and logging with middleware:

```typescript
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      session: ctx.session,
    },
  })
})

const protectedProcedure = t.procedure.use(isAuthed)
```

### Context

Share data across all procedures:

```typescript
export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const session = await getSession({ req })

  return {
    session,
    db,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
```

### React Query Integration

tRPC works seamlessly with React Query:

```typescript
// pages/user/[id].tsx
import { trpc } from '@/utils/trpc'

function UserProfile({ id }: { id: string }) {
  const { data: user, isLoading } = trpc.user.getById.useQuery(id)

  if (isLoading) return <div>Loading...</div>

  return <div>Hello {user.name}!</div>
}
```

## Real-World Example

Here's a complete example of a blog post API:

```typescript
export const postRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const posts = await db.post.findMany({
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: 'desc' },
      })

      let nextCursor: string | undefined
      if (posts.length > input.limit) {
        const nextItem = posts.pop()!
        nextCursor = nextItem.id
      }

      return {
        posts,
        nextCursor,
      }
    }),

  byId: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.post.findUnique({
        where: { id: input },
      })
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await db.post.create({
        data: {
          ...input,
          authorId: ctx.session.user.id,
        },
      })
    }),
})
```

## Best Practices

### 1. Use Zod for Validation

Always validate input with Zod schemas:

```typescript
const createUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.email(),
  age: z.number().min(18).max(120).optional(),
})

export const userRouter = router({
  create: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input }) => {
      // input is fully typed and validated
      return await createUser(input)
    }),
})
```

### 2. Organize Routes

Split your router into logical modules:

```typescript
export const appRouter = router({
  user: userRouter,
  post: postRouter,
  comment: commentRouter,
  auth: authRouter,
})

export type AppRouter = typeof appRouter
```

### 3. Error Handling

Use tRPC's built-in error handling:

```typescript
import { TRPCError } from '@trpc/server'

export const userRouter = router({
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const user = await db.user.findUnique({ where: { id: input } })

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        })
      }

      if (user.id !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only delete your own account',
        })
      }

      return await db.user.delete({ where: { id: input } })
    }),
})
```

## Conclusion

tRPC is an excellent choice for full-stack TypeScript applications. It provides type safety without the complexity of GraphQL and minimal boilerplate compared to REST APIs.

If you're building a TypeScript application and want the best developer experience, give tRPC a try!
