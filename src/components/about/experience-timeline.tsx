type WorkExperience = {
  title: string
  company: string
  period: string
  description: string
}

export function ExperienceTimeline() {
  const title = 'Experience'
  const experiences: WorkExperience[] = [
    {
      title: 'Software Trainee Intern',
      company: 'HSBC',
      period: 'Jan 2025 - Mar 2025',
      description:
        'Developed a full-stack internal web application to consolidate team updates and organizational data into a unified dashboard. Improved internal visibility and collaboration using React.js and Java.',
    },
    {
      title: 'Full Stack Developer',
      company: 'RDM',
      period: 'Jun 2024 - Present',
      description:
        'Built scalable web applications and APIs using React, Next.js, and Node.js. Optimized performance and enhanced user experience across multiple projects.',
    },
    {
      title: 'Open Source Contributor',
      company: 'Next.js SaaS Starter',
      period: '2024 - Present',
      description:
        'Contributed to Next.js SaaS Starter (12k+ stars) by improving developer experience and fixing production-grade issues.',
    },
  ]

  return (
    <section>
      <h2 className="mb-8 font-bold text-3xl tracking-tight">{title}</h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div
            className="relative animate-fade-in border-gray-300 border-l pb-8 pl-8 dark:border-gray-600"
            key={index}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="-left-2 absolute top-0 h-4 w-4 rounded-full bg-primary" />
            <div className="mb-1 font-semibold text-xl">{exp.title}</div>
            <div className="mb-2 flex justify-between">
              <span className="text-muted-foreground">{exp.company}</span>
              <span className="text-muted-foreground">{exp.period}</span>
            </div>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
