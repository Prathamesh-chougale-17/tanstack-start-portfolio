import { AchievementCard } from '@/components/home/achievement-card'
import type { Achievement } from '@/types/home'

export function AchievementsSection({
  achievements,
  title,
}: {
  achievements: Achievement[]
  title: string
}) {
  return (
    <section className="py-12">
      <h2 className="mb-12 text-center font-bold text-3xl">{title}</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {achievements.map((achievement, index) => (
          <AchievementCard
            description={achievement.description}
            Icon={achievement.Icon}
            key={index}
            title={achievement.title}
          />
        ))}
      </div>
    </section>
  )
}
