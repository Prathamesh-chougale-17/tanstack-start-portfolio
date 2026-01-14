import { LeetcodeRating } from './leetcode-rating'
import * as m from '@/paraglide/messages'

type StatItemProps = {
  value: string
  label: string
}

function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="text-center">
      <div className="mb-2 font-bold text-4xl text-primary">{value}</div>
      <div className="text-muted-foreground text-sm">{label}</div>
    </div>
  )
}

export function StatsSection() {
  const title = m.aboutSection_statsTitle()
  const statItems: Array<{ label: string; value: string }> = [
    { label: m.about_stats_statItems_0_label(), value: m.about_stats_statItems_0_value() },
    { label: m.about_stats_statItems_1_label(), value: m.about_stats_statItems_1_value() },
  ]

  return (
    <section className="py-12">
      <h2 className="mb-8 font-bold text-3xl">{title}</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {statItems.map((stat, index) => (
          <StatItem key={index} label={stat.label} value={stat.value} />
        ))}
        <LeetcodeRating />
      </div>
    </section>
  )
}
