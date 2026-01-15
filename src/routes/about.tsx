import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '@/components/about/hero-section'
import { ExperienceTimeline } from '@/components/about/experience-timeline'
import { TechStackSection } from '@/components/about/tech-stack-section'
import { StatsSection } from '@/components/about/stats-section'
import { orpc } from '@/orpc/client'
import * as m from '@/paraglide/messages'

export const Route = createFileRoute('/about')({
  component: AboutPage,
  head: () => ({
    meta: [
      {
        title: 'About | Prathamesh Chougale - Software Engineer',
      },
      {
        name: 'description',
        content:
          'Learn about Prathamesh Chougale, a full-stack Software Engineer at RDM. 1850+ LeetCode rating, Smart India Hackathon Winner, and contributor to Next.js SaaS Starter. Experienced in React, Next.js, TypeScript, and MongoDB.',
      },
      {
        name: 'keywords',
        content:
          'About Prathamesh, Software Engineer RDM, LeetCode Expert, React Developer, Next.js Expert, TypeScript, MongoDB, Full Stack Engineer, Hackathon Winner',
      },
      // Open Graph tags
      {
        property: 'og:type',
        content: 'profile',
      },
      {
        property: 'og:title',
        content: 'About Prathamesh Chougale - Software Engineer',
      },
      {
        property: 'og:description',
        content:
          'Full-stack engineer with expertise in React, Next.js, and TypeScript. 1850+ LeetCode rating and national hackathon winner.',
      },
      {
        property: 'og:image',
        content: '/profile.webp',
      },
      {
        property: 'og:url',
        content: 'https://prathamesh-chougale.vercel.app/about',
      },
      // Twitter Card tags
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'About Prathamesh Chougale',
      },
      {
        name: 'twitter:description',
        content:
          'Software Engineer specializing in React and Next.js. Hackathon winner and open source contributor.',
      },
      {
        name: 'twitter:image',
        content: '/profile.webp',
      },
      {
        name: 'twitter:url',
        content: 'https://prathamesh-chougale.vercel.app/about',
      },
    ],
  }),
  loader: async ({ context }) => {
    // Prefetch LeetCode rating data during SSR for better performance
    const username = m.leetcode_username()
    await context.queryClient.prefetchQuery(
      orpc.getLeetcodeRating.queryOptions({
        input: { username },
      }),
    )
  },
})

function AboutPage() {
  return (
    <main className="py-12">
      <HeroSection />
      <StatsSection />
      <TechStackSection />
      <ExperienceTimeline />
    </main>
  )
}
