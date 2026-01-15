# React Server Components समजून घेणे

React Server Components हे React अॅप्लिकेशन कसे तयार करावे यात मोठा बदल आहे. हे तंत्रज्ञान आम्हाला फक्त सर्व्हरवर चालणारे घटक लिहण्याची परवानगी देते, JavaScript बंडल आकार कमी करते आणि कार्यप्रदर्शन सुधारते.

## Server Components काय आहेत?

Server Components हे React घटक आहेत जे फक्त सर्व्हरवर चालतात. क्लायंटवर रेंडर केलेल्या पारंपारिक React घटकांच्या विपरीत, Server Components ब्राउझरमध्ये कोणताही JavaScript पाठवत नाहीत.

### मुख्य फायदे

1. **शून्य बंडल आकार** - Server Components तुमच्या JavaScript बंडलमध्ये जोडले जात नाहीत
2. **थेट बॅकएंड प्रवेश** - डेटाबेस, फाइल सिस्टम आणि इतर सर्व्हर-साइड संसाधनांमध्ये थेट प्रवेश
3. **स्वयंचलित कोड विभाजन** - फक्त क्लायंट घटक ब्राउझरसाठी बंडल केले जातात
4. **सुधारित कार्यप्रदर्शन** - कमी JavaScript म्हणजे जलद पेज लोड

## हे कसे कार्य करते

येथे Server Component चे एक साधे उदाहरण आहे:

```tsx
// app/BlogPost.server.tsx
async function BlogPost({ id }: { id: string }) {
  // हे फक्त सर्व्हरवर चालते
  const post = await db.posts.findById(id)

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}

export default BlogPost
```

## Client विरुद्ध Server Components

सर्व काही Server Component होऊ शकत नाही. परस्परसंवादी वैशिष्ट्यांना अजूनही Client Components आवश्यक आहेत:

```tsx
'use client' // हे त्याला Client Component म्हणून चिन्हांकित करते

import { useState } from 'react'

function LikeButton() {
  const [likes, setLikes] = useState(0)

  return (
    <button onClick={() => setLikes(likes + 1)}>
      आवडी: {likes}
    </button>
  )
}
```

## Server Components चा वापर केव्हा करावा

Server Components चा वापर करा जेव्हा:

- डेटाबेस किंवा API मधून डेटा मिळवणे
- सर्व्हर-साइड संसाधनांमध्ये प्रवेश
- संवेदनशील माहितीसह कार्य करणे (API keys, tokens)
- स्थिर सामग्री रेंडर करणे
- SEO-अनुकूल पृष्ठे तयार करणे

Client Components चा वापर करा जेव्हा:

- वापरकर्ता परस्परसंवाद हाताळणे (क्लिक, फॉर्म इनपुट)
- React hooks वापरणे (useState, useEffect)
- फक्त-ब्राउझर APIs वापरणे
- परस्परसंवाद जोडणे

## कार्यप्रदर्शन प्रभाव

React Server Components तुमच्या अॅप्लिकेशनच्या कार्यप्रदर्शनात लक्षणीय सुधारणा करू शकतात:

- **कमी बंडल आकार**: माझे प्रोडक्शन ॲप 250KB वरून 180KB JavaScript पर्यंत गेले
- **जलद First Contentful Paint**: वापरकर्ते सामग्री 30% जलद पाहतात
- **चांगले SEO**: सर्च इंजिन तात्काळ सर्व्हर-रेंडर सामग्री क्रॉल करू शकतात

## निष्कर्ष

React Server Components जलद, अधिक कार्यक्षम वेब अॅप्लिकेशन तयार करण्यासाठी एक शक्तिशाली साधन आहे. Server विरुद्ध client components चा वापर केव्हा करायचा हे समजून, तुम्ही कोड गुणवत्ता राखता चांगले वापरकर्ता अनुभव तयार करू शकता.

React चे भविष्य server-first आहे, आणि Server Components त्याचे नेतृत्व करत आहेत. आज तुमच्या Next.js प्रकल्पांमध्ये त्यांच्याबरोबर प्रयोग सुरू करा!
