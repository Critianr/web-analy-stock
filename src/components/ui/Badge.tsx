import { cn } from '@/utils'
import styles from './Badge.module.css'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'accent' | 'blue' | 'amber' | 'green' | 'red' | 'gray'
  className?: string
}

export function Badge({ children, variant = 'accent', className }: BadgeProps) {
  return (
    <span className={cn(styles.badge, styles[variant], className)}>
      {children}
    </span>
  )
}
