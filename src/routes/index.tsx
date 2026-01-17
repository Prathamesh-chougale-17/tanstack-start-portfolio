import { createFileRoute } from '@tanstack/react-router'
import { AchievementsSection } from '@/components/home/achievements-section'
import { HeroSection } from '@/components/home/hero-section'
import { ProjectsSection } from '@/components/home/projects-section'
import { Icons } from '@/components/icons'
import * as m from '@/paraglide/messages'

export const Route = createFileRoute('/')({
  component: PortfolioHome,
  head: () => ({
    meta: [
      {
        title: 'Prathamesh Chougale | Software Engineer at RDM',
      },
      {
        name: 'description',
        content:
          'Full-stack Software Engineer specializing in React, Next.js, and TypeScript. Winner of Smart India Hackathon and HSBC Hackathon 2024. Building scalable web applications with real-world impact.',
      },
      {
        name: 'keywords',
        content:
          'Prathamesh Chougale, Software Engineer, React Developer, Next.js, TypeScript, Full Stack Developer, RDM, Smart India Hackathon, HSBC Hackathon',
      },
      // Open Graph tags
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:title',
        content: 'Prathamesh Chougale | Software Engineer',
      },
      {
        property: 'og:description',
        content:
          'Full-stack developer building performant, accessible, and scalable web applications. Hackathon winner and open source contributor.',
      },
      {
        property: 'og:image',
        content: '/profile.webp',
      },
      {
        property: 'og:url',
        content: 'https://prathamesh-chougale.vercel.app',
      },
      // Twitter Card tags
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'Prathamesh Chougale | Software Engineer',
      },
      {
        name: 'twitter:description',
        content:
          'Full-stack developer specializing in React, Next.js, and TypeScript. Winner of national hackathons.',
      },
      {
        name: 'twitter:image',
        content: '/profile.webp',
      },
      {
        name: 'twitter:url',
        content: 'https://prathamesh-chougale.vercel.app',
      },
    ],
  }),
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
    <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-12 lg:pt-16">
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
    </div>
  )
}
