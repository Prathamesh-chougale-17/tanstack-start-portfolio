import { cva } from 'class-variance-authority'
import React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const widgetVariants = cva('relative flex flex-col whitespace-nowrap', {
  variants: {
    size: {
      sm: 'size-48',
      md: 'h-48 w-96',
      lg: 'size-96',
    },
    design: {
      default: 'p-6',
      mumbai: 'p-4',
    },
    variant: {
      default: 'bg-background text-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
    },
  },
  defaultVariants: {
    size: 'sm',
    design: 'default',
    variant: 'default',
  },
})

export interface WidgetProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof widgetVariants> {
  asChild?: boolean
}

const Widget = React.forwardRef<HTMLDivElement, WidgetProps>(
  ({ className, size, design, variant, ...props }, ref) => (
    <div
      className={cn(widgetVariants({ size, design, variant, className }))}
      ref={ref}
      {...props}
    />
  ),
)
Widget.displayName = 'Widget'

const WidgetHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      'flex flex-none items-start justify-between text-semibold',
      className,
    )}
    ref={ref}
    {...props}
  />
))
WidgetHeader.displayName = 'WidgetHeader'

const WidgetTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    className={cn('font-semibold leading-none tracking-tight', className)}
    ref={ref}
    {...props}
  />
))
WidgetTitle.displayName = 'WidgetTitle'

const WidgetContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn('flex flex-1 items-center justify-center', className)}
    ref={ref}
    {...props}
  />
))
WidgetContent.displayName = 'WidgetContent'

const WidgetFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn('flex flex-none items-center justify-between', className)}
    ref={ref}
    {...props}
  />
))
WidgetFooter.displayName = 'WidgetFooter'

export {
  Widget,
  WidgetHeader,
  WidgetTitle,
  WidgetContent,
  WidgetFooter,
  widgetVariants,
}
