import type { StockAnalysis, ValuationStatus } from '@/types'
import styles from './ValuationSection.module.css'

interface ValuationSectionProps {
  analysis: StockAnalysis
}

const STATUS_MAP: Record<ValuationStatus, { label: string; cls: string }> = {
  undervalued: { label: 'Infravalorado', cls: styles.under },
  fair:        { label: 'Precio justo', cls: styles.fair  },
  overvalued:  { label: 'Sobrevalorado', cls: styles.over  },
}

const GAUGE_WIDTH: Record<ValuationStatus, number> = {
  undervalued: 28,
  fair:        55,
  overvalued:  85,
}

const GAUGE_COLOR: Record<ValuationStatus, string> = {
  undervalued: 'var(--accent)',
  fair:        'var(--green)',
  overvalued:  'var(--red)',
}

interface ValCardProps {
  name: string
  value: number
  description: string
  interpretation: string
  status: ValuationStatus
  accentColor: string
}

function ValCard({ name, value, description, interpretation, status, accentColor }: ValCardProps) {
  const s = STATUS_MAP[status]
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.name} style={{ color: accentColor }}>{name}</span>
        <span className={`${styles.status} ${s.cls}`}>{s.label}</span>
      </div>

      <p className={styles.valueText} style={{ color: accentColor }}>
        {value.toFixed(name === 'PEG' ? 2 : 1)}×
      </p>

      <p className={styles.desc}>{description}</p>
      <p className={styles.interp}>{interpretation}</p>

      <div className={styles.gauge}>
        <div
          className={styles.gaugeFill}
          style={{
            width: `${GAUGE_WIDTH[status]}%`,
            background: GAUGE_COLOR[status],
          }}
        />
      </div>
    </div>
  )
}

export function ValuationSection({ analysis }: ValuationSectionProps) {
  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Métricas de valoración</h3>
      <div className={styles.grid}>
        <ValCard
          name="PER"
          value={analysis.per}
          description="Relación precio/beneficio actual. PER < 15 suele indicar valor; > 25 puede ser caro según sector."
          interpretation={analysis.per_interp}
          status={analysis.per_status}
          accentColor="var(--accent)"
        />
        <ValCard
          name="CPER"
          value={analysis.cper}
          description="PER ajustado cíclicamente (CAPE de Shiller). Suaviza ciclos económicos con beneficios de 10 años."
          interpretation={analysis.cper_interp}
          status={analysis.cper_status}
          accentColor="var(--accent2)"
        />
        <ValCard
          name="PEG"
          value={analysis.peg}
          description="PER dividido entre la tasa de crecimiento esperada. PEG < 1 puede indicar infravaloración."
          interpretation={analysis.peg_interp}
          status={analysis.peg_status}
          accentColor="var(--accent3)"
        />
      </div>
    </section>
  )
}
