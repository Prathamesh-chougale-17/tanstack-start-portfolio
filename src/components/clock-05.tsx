import React from 'react'
import { Widget, WidgetContent } from '@/components/ui/widget'
import { cn } from '@/lib/utils'

type ClockSize = 'sm' | 'md' | 'lg'

export default function WidgetDemo({
  size = 'sm',
  className,
}: {
  size?: ClockSize
  className?: string
}) {
  const [time, setTime] = React.useState(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const hours = time.getHours() % 12
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  const hoursDegrees = ((hours + minutes / 60) / 12) * 360
  const minutesDegrees = ((minutes + seconds / 60) / 60) * 360
  const secondsDegrees = (seconds / 60) * 360

  // size -> dial and hand dimensions
  const dialSizeClassMap: Record<ClockSize, string> = {
    sm: 'w-40 h-40',
    md: 'w-56 h-56',
    lg: 'w-72 h-72',
  }
  const dialSizeClass = dialSizeClassMap[size]

  const radiusMap: Record<ClockSize, number> = { sm: 70, md: 90, lg: 110 }
  const radius = radiusMap[size]

  const handHeights = {
    hours: { sm: 56, md: 68, lg: 88 },
    minutes: { sm: 68, md: 84, lg: 104 },
    seconds: { sm: 72, md: 90, lg: 112 },
    center: { sm: 10, md: 12, lg: 16 },
  }
  const handWidths = {
    hours: { sm: 4, md: 4, lg: 6 },
    minutes: { sm: 3, md: 4, lg: 5 },
    seconds: 2,
  }

  return (
    <Widget
      className={cn('items-center justify-center', className)}
      size={size}
    >
      <WidgetContent>
        {[...new Array(12)].map((_, i) => {
          const hour = i + 1
          const angle = (hour / 12) * 360
          const radians = (angle * Math.PI) / 180
          const x = Math.sin(radians) * radius
          const y = -Math.cos(radians) * radius
          return (
            <div
              className="absolute font-semibold text-gray-800 text-sm dark:text-gray-200"
              key={hour}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              {hour}
            </div>
          )
        })}
        <div
          className={cn(
            'relative flex items-center justify-center',
            dialSizeClass,
          )}
        >
          {/* clock hands */}
          <div
            className="absolute bottom-1/2 left-1/2 origin-bottom rounded-full bg-gray-800 dark:bg-gray-200"
            style={{
              height: handHeights.hours[size],
              width: handWidths.hours[size],
              transform: `translateX(-50%) rotate(${hoursDegrees}deg)`,
            }}
          />
          <div
            className="absolute bottom-1/2 left-1/2 origin-bottom rounded-full bg-gray-600 dark:bg-gray-400"
            style={{
              height: handHeights.minutes[size],
              width: handWidths.minutes[size],
              transform: `translateX(-50%) rotate(${minutesDegrees}deg)`,
            }}
          />
          <div
            className="absolute bottom-1/2 left-1/2 origin-bottom rounded-full bg-red-500"
            style={{
              height: handHeights.seconds[size],
              width: handWidths.seconds,
              transform: `translateX(-50%) rotate(${secondsDegrees}deg)`,
            }}
          />
          <div
            className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 rounded-full bg-gray-800 dark:bg-gray-200"
            style={{
              width: handHeights.center[size],
              height: handHeights.center[size],
            }}
          />
        </div>
      </WidgetContent>
    </Widget>
  )
}
