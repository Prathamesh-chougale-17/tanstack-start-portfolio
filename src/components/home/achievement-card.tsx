import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Achievement } from '@/types/home'

export function AchievementCard({ title, description, Icon }: Achievement) {
  return (
    <Card className="cursor-pointer transition-all duration-300 hover:scale-105 hover:border-blue-400/50 hover:shadow-blue-400/20">
      <CardHeader className="flex flex-row items-center gap-4">
        <Icon className="h-8 w-8 text-primary" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
