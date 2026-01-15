# tRPC सह Type-Safe API तयार करणे

tRPC कोड जनरेशनशिवाय तुमच्या फुल-स्टॅक TypeScript अॅप्लिकेशनसाठी एंड-टू-एंड टाइप सुरक्षा देते. चला पाहू की हे कसे कार्य करते आणि ते वेगाने लोकप्रिय का होत आहे.

## tRPC काय आहे?

tRPC ही एक लायब्ररी आहे जी तुम्हाला TypeScript सह टाइप-सेफ API तयार करू देते. ते तुमच्या बॅकएंडपासून तुमच्या फ्रंटएंडपर्यंत स्वयंचलित टाइप अनुमान प्रदान करते, कोड जनरेशन किंवा मॅन्युअल टाइप व्याख्यांची आवश्यकता काढून टाकते.

## tRPC का निवडावे?

### 1. एंड-टू-एंड टाइप सुरक्षा

tRPC सह, तुमचे फ्रंटएंड आपोआप तुमच्या API प्रतिसादांचा अचूक आकार जाणते:

```typescript
// Backend
const appRouter = router({
  getUser: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.user.findUnique({ where: { id: input } })
    }),
})

// Frontend - टाइप्स स्वयंचलितपणे अनुमानित आहेत!
const user = await trpc.getUser.query('user-123')
// user User म्हणून टाइप केलेले आहे
```

### 2. कोड जनरेशन नाही

GraphQL किंवा इतर उपायांच्या विपरीत, tRPC ला टाइप तयार करण्यासाठी बिल्ड स्टेपची आवश्यकता नाही. तुमच्या बॅकएंडमधील बदल तात्काळ तुमच्या फ्रंटएंडमध्ये प्रतिबिंबित होतात.

### 3. किमान Boilerplate

tRPC सेटअप सरळ आहे आणि किमान कॉन्फिगरेशन आवश्यक आहे.

## सुरुवात करणे

### इन्स्टॉलेशन

```bash
bun add @trpc/server @trpc/client @trpc/react-query
bun add zod
```

### मूलभूत सेटअप

तुमचा tRPC राउटर तयार करा:

```typescript
// server/trpc.ts
import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure
```

## वास्तविक जगाचे उदाहरण

येथे ब्लॉग पोस्ट API चे एक संपूर्ण उदाहरण आहे:

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

      return { posts }
    }),
})
```

## सर्वोत्तम पद्धती

### 1. प्रमाणीकरणासाठी Zod वापरा

नेहमी Zod स्कीमासह इनपुट प्रमाणित करा:

```typescript
const createUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.email(),
  age: z.number().min(18).max(120).optional(),
})
```

### 2. Routes आयोजित करा

तुमचा राउटर तार्किक मॉड्यूलमध्ये विभाजित करा:

```typescript
export const appRouter = router({
  user: userRouter,
  post: postRouter,
  comment: commentRouter,
  auth: authRouter,
})
```

## निष्कर्ष

tRPC फुल-स्टॅक TypeScript अॅप्लिकेशनसाठी एक उत्कृष्ट निवड आहे. ते GraphQL च्या जटिलतेशिवाय टाइप सुरक्षा आणि REST APIs च्या तुलनेत किमान boilerplate प्रदान करते.

जर तुम्ही TypeScript अॅप्लिकेशन तयार करत असाल आणि सर्वोत्तम डेव्हलपर अनुभव हवा असेल, तर tRPC वापरून पहा!
