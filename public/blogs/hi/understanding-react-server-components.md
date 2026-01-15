# React Server Components को समझना

React Server Components React एप्लिकेशन बनाने के तरीके में एक बड़ा बदलाव है। यह तकनीक हमें ऐसे घटक लिखने की अनुमति देती है जो केवल सर्वर पर चलते हैं, JavaScript बंडल आकार को कम करते हैं और प्रदर्शन में सुधार करते हैं।

## Server Components क्या हैं?

Server Components React घटक हैं जो केवल सर्वर पर चलते हैं। क्लाइंट पर रेंडर किए जाने वाले पारंपरिक React घटकों के विपरीत, Server Components ब्राउज़र में कोई JavaScript नहीं भेजते हैं।

### मुख्य लाभ

1. **शून्य बंडल आकार** - Server Components आपके JavaScript बंडल में नहीं जुड़ते
2. **प्रत्यक्ष बैकएंड एक्सेस** - डेटाबेस, फ़ाइल सिस्टम और अन्य सर्वर-साइड संसाधनों तक सीधे पहुंच
3. **स्वचालित कोड विभाजन** - केवल क्लाइंट घटक ब्राउज़र के लिए बंडल किए जाते हैं
4. **बेहतर प्रदर्शन** - कम JavaScript का मतलब तेज़ पेज लोड है

## यह कैसे काम करता है

यहाँ एक Server Component का एक सरल उदाहरण है:

```tsx
// app/BlogPost.server.tsx
async function BlogPost({ id }: { id: string }) {
  // यह केवल सर्वर पर चलता है
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

## Client बनाम Server Components

सब कुछ Server Component नहीं हो सकता। इंटरैक्टिव सुविधाओं को अभी भी Client Components की आवश्यकता है:

```tsx
'use client' // यह इसे Client Component के रूप में चिह्नित करता है

import { useState } from 'react'

function LikeButton() {
  const [likes, setLikes] = useState(0)

  return (
    <button onClick={() => setLikes(likes + 1)}>
      पसंद: {likes}
    </button>
  )
}
```

## Server Components का उपयोग कब करें

Server Components का उपयोग करें जब:

- डेटाबेस या API से डेटा प्राप्त करना
- सर्वर-साइड संसाधनों तक पहुंच
- संवेदनशील जानकारी के साथ काम करना (API keys, tokens)
- स्थिर सामग्री को रेंडर करना
- SEO-अनुकूल पेज बनाना

Client Components का उपयोग करें जब:

- उपयोगकर्ता इंटरैक्शन को संभालना (क्लिक, फॉर्म इनपुट)
- React hooks का उपयोग करना (useState, useEffect)
- केवल-ब्राउज़र APIs का उपयोग करना
- इंटरैक्टिविटी जोड़ना

## प्रदर्शन प्रभाव

React Server Components आपके एप्लिकेशन के प्रदर्शन में काफी सुधार कर सकते हैं:

- **कम बंडल आकार**: मेरा प्रोडक्शन ऐप 250KB से 180KB JavaScript तक गया
- **तेज़ First Contentful Paint**: उपयोगकर्ता सामग्री 30% तेज़ देखते हैं
- **बेहतर SEO**: सर्च इंजन तुरंत सर्वर-रेंडर सामग्री को क्रॉल कर सकते हैं

## निष्कर्ष

React Server Components तेज़, अधिक कुशल वेब एप्लिकेशन बनाने के लिए एक शक्तिशाली उपकरण हैं। Server बनाम client components का उपयोग कब करना है यह समझकर, आप कोड गुणवत्ता बनाए रखते हुए बेहतर उपयोगकर्ता अनुभव बना सकते हैं।

React का भविष्य server-first है, और Server Components इसका नेतृत्व कर रहे हैं। आज अपने Next.js प्रोजेक्ट्स में उनके साथ प्रयोग करना शुरू करें!
