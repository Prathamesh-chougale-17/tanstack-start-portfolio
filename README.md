# TanStack Start Portfolio

A high-performance, type-safe portfolio application built with the modern TanStack ecosystem.

## 🚀 Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (Full-stack React)
- **Routing**: [TanStack Router](https://tanstack.com/router) (Type-safe, file-based)
- **State Management**: [TanStack Query](https://tanstack.com/query) & [TanStack Store](https://tanstack.com/store)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **API**: [oRPC](https://orpc.sh/) (Type-safe client-server communication)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **AI**: [TanStack AI](https://tanstack.com/ai) with Gemini
- **i18n**: [Paraglide JS](https://inlang.com/m/gerrepf4/library-inlang-paraglideJs)
- **Docs/Blogs**: [Fumadocs](https://fumadocs.vercel.app/)

## ✨ Key Features

- **Full-stack SSR**: Server-side rendering with Nitro/TanStack Start for optimal performance.
- **Type Safety**: End-to-end type safety from the database to the UI using Zod and oRPC.
- **Internationalization**: Full i18n support with localized routing.
- **AI Chat**: Integrated AI assistant powered by Gemini.
- **Blog Engine**: MDX-based blogging with Fumadocs integration.
- **Modern UI**: Accessible components with Tailwind CSS v4 and Framer Motion.

## 🛠️ Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (Recommended) or Node.js

### Installation

```bash
bun install
```

### Environment Setup

Create a `.env` file in the root directory and add your credentials:

```env
MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
```

### Development

```bash
bun run dev
```

The app will be available at `http://localhost:3000`.

### Building for Production

```bash
bun run build
bun run preview
```

## 📂 Project Structure

- `src/routes/`: File-based routes.
- `src/components/`: Reusable React components.
- `src/orpc/`: API definitions and server procedures.
- `src/db/`: MongoDB client and schemas.
- `src/lib/`: Shared utilities and constants.
- `public/blogs/`: MDX blog content.

## 📄 License

MIT
