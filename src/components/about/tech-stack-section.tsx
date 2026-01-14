import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Icons } from '@/components/icons'

type TechSkill = {
  name: string
  level: number
  Icon: React.ComponentType<{ className?: string }>
}

export function TechStackSection() {
  const title = 'Tech Stack'
  const skills: TechSkill[] = [
    { name: 'React', level: 5, Icon: Icons.react },
    { name: 'TypeScript', level: 5, Icon: Icons.typescript },
    { name: 'Next.js', level: 5, Icon: Icons.nextjs },
    { name: 'Node.js', level: 4, Icon: Icons.nodejs },
    { name: 'Tailwind CSS', level: 5, Icon: Icons.tailwindcss },
    { name: 'Python', level: 3, Icon: Icons.python },
    { name: 'Docker', level: 3, Icon: Icons.docker },
    { name: 'Git/GitHub', level: 5, Icon: Icons.gitHub },
    { name: 'Databases', level: 4, Icon: Icons.database },
    { name: 'Arch Linux', level: 3, Icon: Icons.arch },
  ]

  return (
    <section className="mb-16">
      <h2 className="mb-8 font-bold text-3xl tracking-tight">{title}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {skills.map((skill, index) => (
          <Card
            className="animate-fade-in"
            key={skill.name}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-center text-primary">
                <skill.Icon className="h-8 w-8" />
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <h3 className="font-medium">{skill.name}</h3>
              <div className="mt-2 flex justify-center space-x-1">
                {[...new Array(5)].map((_, i) => (
                  <div
                    className={`h-1.5 w-4 rounded-full ${
                      i < skill.level ? 'bg-primary' : 'bg-muted'
                    }`}
                    key={i}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
