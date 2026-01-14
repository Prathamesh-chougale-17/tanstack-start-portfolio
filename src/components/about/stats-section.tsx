import { LeetcodeRating } from './leetcode-rating'

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
  const title = 'Statistics'
  const statItems: Array<{ label: string; value: string }> = [
    { label: 'Years of Experience', value: '2+' },
    { label: 'Projects Completed', value: '20+' },
    { label: 'Open Source Contributions', value: '5+' },
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
