import type { StockAnalysis, Verdict } from '@/types'
import styles from './VerdictBox.module.css'

interface VerdictBoxProps {
  analysis: StockAnalysis
}

const VERDICT_COLOR: Record<Verdict, string> = {
  BUY:  'var(--green)',
  HOLD: 'var(--accent3)',
  SELL: 'var(--red)',
}

export function VerdictBox({ analysis }: VerdictBoxProps) {
  const color = VERDICT_COLOR[analysis.verdict]

  return (
    <div className={styles.box}>
      <div className={styles.inner}>
        <div className={styles.score} style={{ borderColor: color, color }}>
          {analysis.overallScore}
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>
            Veredicto IA:{' '}
            <span style={{ color }}>{analysis.verdict}</span>
          </h3>
          <p className={styles.reason}>{analysis.verdictReason}</p>
        </div>
      </div>
    </div>
  )
}
