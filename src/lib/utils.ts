import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export function truncate(text: string, maxLength = 15): string {
  if (typeof text !== 'string') {
    return ''
  }
  if (text.length <= maxLength) {
    return text
  }
  return `${text.slice(0, maxLength - 3)}...`
}
