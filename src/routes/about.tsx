import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '@/components/about/hero-section'
import { ExperienceTimeline } from '@/components/about/experience-timeline'
import { TechStackSection } from '@/components/about/tech-stack-section'
import { StatsSection } from '@/components/about/stats-section'

export const Route = createFileRoute('/about')({
  component: AboutPage,
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
