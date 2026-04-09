import { cn } from '@/utils'
import styles from './MetricCard.module.css'

interface MetricCardProps {
  label: string
  value: string | number
  note?: string
  variant?: 'default' | 'highlight' | 'warn' | 'danger'
}

export function MetricCard({ label, value, note, variant = 'default' }: MetricCardProps) {
  return (
    <div className={cn(styles.card, styles[variant])}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
      {note && <p className={styles.note}>{note}</p>}
    </div>
  )
}
