import { createFileRoute } from '@tanstack/react-router'
import { AchievementsSection } from '@/components/home/achievements-section'
import { HeroSection } from '@/components/home/hero-section'
import { ProjectsSection } from '@/components/home/projects-section'
import { Icons } from '@/components/icons'
import { Footer } from '@/components/layout/footer'
import * as m from '@/paraglide/messages'

export const Route = createFileRoute('/')({
  component: PortfolioHome,
})

function PortfolioHome() {
  // Build achievements array from Paraglide messages
  const achievements = [
    {
      title: m.achievements_0_title(),
      description: m.achievements_0_description(),
      Icon: Icons[m.achievements_0_Icon() as keyof typeof Icons],
    },
    {
      title: m.achievements_1_title(),
      description: m.achievements_1_description(),
      Icon: Icons[m.achievements_1_Icon() as keyof typeof Icons],
    },
    {
      title: m.achievements_2_title(),
      description: m.achievements_2_description(),
      Icon: Icons[m.achievements_2_Icon() as keyof typeof Icons],
    },
  ]

  // Build projects array from Paraglide messages
  const projects = [
    {
      title: m.projects_0_title(),
      description: m.projects_0_description(),
      tags: [
        m.projects_0_tags_0(),
        m.projects_0_tags_1(),
        m.projects_0_tags_2(),
      ],
      githubLink: undefined,
      liveLink: m.projects_0_liveLink() || undefined,
    },
    {
      title: m.projects_1_title(),
      description: m.projects_1_description(),
      tags: [
        m.projects_1_tags_0(),
        m.projects_1_tags_1(),
        m.projects_1_tags_2(),
        m.projects_1_tags_3(),
      ].filter(Boolean),
      githubLink: undefined,
      liveLink: m.projects_1_liveLink() || undefined,
    },
    {
      title: m.projects_2_title(),
      description: m.projects_2_description(),
      tags: [
        m.projects_2_tags_0(),
        m.projects_2_tags_1(),
        m.projects_2_tags_2(),
        m.projects_2_tags_3(),
      ].filter(Boolean),
      githubLink: m.projects_2_githubLink() || undefined,
      liveLink: m.projects_2_liveLink() || undefined,
    },
  ]

  return (
    <main className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
      <HeroSection
        company={m.hero_company()}
        companyLink={m.hero_companyLink()}
        description={m.hero_description()}
        image={m.hero_image()}
        intro={m.hero_intro()}
        name={m.hero_name()}
        title={m.hero_title()}
      />
      <AchievementsSection
        achievements={achievements.slice(0, 3)}
        title={m.homeSection_achievementSectionTitle()}
      />
      <ProjectsSection
        projects={projects.slice(0, 3)}
        title={m.homeSection_projectSectionTitle()}
      />
    </main>
  )
}
