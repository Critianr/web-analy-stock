import type { HorizonAnalysis, Sentiment } from '@/types'
import { Badge } from '@/components/ui'
import styles from './HorizonCard.module.css'

type Horizon = 'short' | 'medium' | 'long'

interface HorizonCardProps {
  horizon: Horizon
  data: HorizonAnalysis
}

const CONFIG: Record<Horizon, { label: string; range: string; badgeVariant: 'accent' | 'blue' | 'amber' }> = {
  short:  { label: 'Corto plazo',   range: '1–3 meses',   badgeVariant: 'accent' },
  medium: { label: 'Mediano plazo', range: '6–18 meses',  badgeVariant: 'blue'   },
  long:   { label: 'Largo plazo',   range: '3–10 años',   badgeVariant: 'amber'  },
}

const SENTIMENT_LABEL: Record<Sentiment, string> = {
  bullish: 'Alcista',
  neutral: 'Neutral',
  bearish: 'Bajista',
}

const SENTIMENT_CLASS: Record<Sentiment, string> = {
  bullish: styles.bullish,
  neutral: styles.neutral,
  bearish: styles.bearish,
}

export function HorizonCard({ horizon, data }: HorizonCardProps) {
  const cfg = CONFIG[horizon]

  return (
    <div className={`${styles.card} ${styles[horizon]}`}>
      <div className={styles.header}>
        <span className={styles.title}>{cfg.label}</span>
        <Badge variant={cfg.badgeVariant}>{cfg.range}</Badge>
      </div>

      <div className={styles.sentiment}>
        <div className={styles.bar}>
          <div
            className={`${styles.fill} ${SENTIMENT_CLASS[data.sentiment]}`}
            style={{ width: `${data.score}%` }}
          />
        </div>
        <span className={styles.sentimentLabel}>{SENTIMENT_LABEL[data.sentiment]}</span>
        <span className={styles.score}>{data.score}</span>
      </div>

      <p className={styles.summary}>{data.summary}</p>

      <ul className={styles.points}>
        {data.points.map((point, i) => (
          <li key={i} className={styles.point}>
            <span className={styles.arrow}>›</span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}
