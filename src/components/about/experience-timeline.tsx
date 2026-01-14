import * as m from '@/paraglide/messages'

type WorkExperience = {
  title: string
  company: string
  period: string
  description: string
}

export function ExperienceTimeline() {
  const title = m.aboutSection_experienceTitle()

  // Build experiences array from Paraglide messages
  const experiences: Array<WorkExperience> = Array.from(
    { length: 3 },
    (_, i) => ({
      title: (
        m[`about_experiences_${i}_title` as keyof typeof m] as () => string
      )(),
      company: (
        m[`about_experiences_${i}_company` as keyof typeof m] as () => string
      )(),
      period: (
        m[`about_experiences_${i}_period` as keyof typeof m] as () => string
      )(),
      description: (
        m[
          `about_experiences_${i}_description` as keyof typeof m
        ] as () => string
      )(),
    }),
  )

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
