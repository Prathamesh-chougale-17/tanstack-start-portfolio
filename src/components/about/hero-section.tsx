import { Badge } from '@/components/ui/badge'

export function HeroSection() {
  const title = 'About Me'
  const image = '/profile.webp'
  const subtitle = 'Full Stack Developer | Open Source Contributor | Problem Solver'
  const description =
    "I'm a passionate full-stack developer with a strong foundation in computer science and hands-on experience building scalable web applications. My journey includes developing enterprise dashboards for HSBC, leading hackathon teams, and contributing to open source projects."
  const skills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB']

  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          <h1 className="animate-fade-in font-bold text-4xl tracking-tight">
            {title}
          </h1>
          <p className="text-muted-foreground text-xl">{subtitle}</p>
          <div className="mt-6 space-y-4">
            <p>{description}</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge
                  className="animate-fade-in"
                  key={skill}
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  variant="outline"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center lg:col-span-2 lg:justify-end">
          <div className="animation-delay-300 relative h-64 w-64 animate-fade-in overflow-hidden rounded-full md:h-80 md:w-80">
            <img
              alt="Profile Image"
              className="object-cover h-full w-full"
              src={image}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
