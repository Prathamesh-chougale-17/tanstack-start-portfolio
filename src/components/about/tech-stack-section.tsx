import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Icons } from '@/components/icons'
import * as m from '@/paraglide/messages'

type TechSkill = {
  name: string
  level: number
  Icon: React.ComponentType<{ className?: string }>
}

export function TechStackSection() {
  const title = m.aboutSection_techStackTitle()
  
  // Build skills array from Paraglide messages
  const skills: TechSkill[] = Array.from({ length: 10 }, (_, i) => {
    const nameKey = `about_techSkills_${i}_name` as keyof typeof m
    const levelKey = `about_techSkills_${i}_level` as keyof typeof m
    const iconKey = `about_techSkills_${i}_icon` as keyof typeof m
    
    const iconName = (m[iconKey] as () => string)()
    
    return {
      name: (m[nameKey] as () => string)(),
      level: Number((m[levelKey] as () => string)()),
      Icon: Icons[iconName as keyof typeof Icons] || Icons.react,
    }
  })

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
