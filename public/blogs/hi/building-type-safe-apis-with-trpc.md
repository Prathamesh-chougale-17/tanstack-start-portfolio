# tRPC के साथ Type-Safe API बनाना

tRPC कोड जनरेशन के बिना आपके फुल-स्टैक TypeScript एप्लिकेशन के लिए एंड-टू-एंड टाइप सुरक्षा प्रदान करता है। आइए जानें कि यह कैसे काम करता है और यह तेजी से लोकप्रिय क्यों हो रहा है।

## tRPC क्या है?

tRPC एक लाइब्रेरी है जो आपको TypeScript के साथ टाइप-सेफ API बनाने देती है। यह आपके बैकएंड से आपके फ्रंटएंड तक स्वचालित टाइप अनुमान प्रदान करता है, कोड जनरेशन या मैनुअल टाइप परिभाषाओं की आवश्यकता को समाप्त करता है।

## tRPC क्यों चुनें?

### 1. एंड-टू-एंड टाइप सुरक्षा

tRPC के साथ, आपका फ्रंटएंड स्वचालित रूप से आपके API प्रतिक्रियाओं के सटीक आकार को जानता है:

```typescript
// Backend
const appRouter = router({
  getUser: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.user.findUnique({ where: { id: input } })
    }),
})

// Frontend - टाइप्स स्वचालित रूप से अनुमानित हैं!
const user = await trpc.getUser.query('user-123')
// user User के रूप में टाइप किया गया है
```

### 2. कोड जनरेशन नहीं

GraphQL या अन्य समाधानों के विपरीत, tRPC को टाइप उत्पन्न करने के लिए बिल्ड स्टेप की आवश्यकता नहीं है। आपके बैकएंड में परिवर्तन तुरंत आपके फ्रंटएंड में प्रतिबिंबित होते हैं।

### 3. न्यूनतम Boilerplate

tRPC सेटअप करना सीधा है और न्यूनतम कॉन्फ़िगरेशन की आवश्यकता है।

## शुरुआत करना

### इंस्टॉलेशन

```bash
bun add @trpc/server @trpc/client @trpc/react-query
bun add zod
```

### बुनियादी सेटअप

अपना tRPC राउटर बनाएं:

```typescript
// server/trpc.ts
import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure
```

## वास्तविक दुनिया का उदाहरण

यहाँ एक ब्लॉग पोस्ट API का एक पूर्ण उदाहरण है:

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

## सर्वोत्तम प्रथाएं

### 1. सत्यापन के लिए Zod का उपयोग करें

हमेशा Zod स्कीमा के साथ इनपुट को मान्य करें:

```typescript
const createUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.email(),
  age: z.number().min(18).max(120).optional(),
})
```

### 2. Routes को व्यवस्थित करें

अपने राउटर को तार्किक मॉड्यूल में विभाजित करें:

```typescript
export const appRouter = router({
  user: userRouter,
  post: postRouter,
  comment: commentRouter,
  auth: authRouter,
})
```

## निष्कर्ष

tRPC फुल-स्टैक TypeScript एप्लिकेशन के लिए एक उत्कृष्ट विकल्प है। यह GraphQL की जटिलता के बिना टाइप सुरक्षा और REST APIs की तुलना में न्यूनतम boilerplate प्रदान करता है।

यदि आप एक TypeScript एप्लिकेशन बना रहे हैं और सर्वोत्तम डेवलपर अनुभव चाहते हैं, तो tRPC को आज़माएं!
