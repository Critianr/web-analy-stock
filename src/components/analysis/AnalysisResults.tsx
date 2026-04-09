import type { StockAnalysis, ValuationStatus } from '@/types'
import { MetricCard } from '@/components/ui'
import { HorizonCard } from './HorizonCard'
import { ValuationSection } from './ValuationSection'
import { VerdictBox } from './VerdictBox'
import { formatPrice, formatPct } from '@/utils'
import styles from './AnalysisResults.module.css'

interface AnalysisResultsProps {
  analysis: StockAnalysis
}

const STATUS_VARIANT: Record<ValuationStatus, 'highlight' | 'default' | 'danger'> = {
  undervalued: 'highlight',
  fair: 'default',
  overvalued: 'danger',
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const isPositive = analysis.priceChange >= 0

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.stockInfo}>
          <h2 className={styles.companyName}>{analysis.companyName}</h2>
          <p className={styles.meta}>
            <span className={styles.ticker}>{analysis.ticker}</span>
            <span className={styles.dot}>·</span>
            {analysis.sector}
            <span className={styles.dot}>·</span>
            Cap. {analysis.marketCap}
          </p>
        </div>
        <div className={styles.priceBlock}>
          <p className={styles.price}>{formatPrice(analysis.price)}</p>
          <p className={`${styles.change} ${isPositive ? styles.pos : styles.neg}`}>
            {isPositive ? '+' : ''}{formatPrice(analysis.priceChange)}{' '}
            ({formatPct(analysis.priceChangePct)})
          </p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className={styles.metricsGrid}>
        <MetricCard
          label="PER"
          value={`${analysis.per.toFixed(1)}×`}
          note="Price / Earnings"
          variant={STATUS_VARIANT[analysis.per_status]}
        />
        <MetricCard
          label="CPER / CAPE"
          value={`${analysis.cper.toFixed(1)}×`}
          note="Cyclically Adjusted"
          variant={STATUS_VARIANT[analysis.cper_status]}
        />
        <MetricCard
          label="PEG"
          value={`${analysis.peg.toFixed(2)}`}
          note="Price / Earnings / Growth"
          variant={STATUS_VARIANT[analysis.peg_status]}
        />
        <MetricCard
          label="Beta"
          value={analysis.beta.toFixed(2)}
          note="Volatilidad relativa"
        />
        <MetricCard
          label="Dividendo"
          value={`${analysis.dividendYield.toFixed(2)}%`}
          note="Yield anual"
        />
        <MetricCard
          label="Score IA"
          value={`${analysis.overallScore}/100`}
          note={analysis.verdict}
          variant="highlight"
        />
      </div>

      {/* Horizon Analysis */}
      <div className={styles.horizonGrid}>
        <HorizonCard horizon="short"  data={analysis.short}  />
        <HorizonCard horizon="medium" data={analysis.medium} />
        <HorizonCard horizon="long"   data={analysis.long}   />
      </div>

      {/* Valuation Ratios Deep Dive */}
      <ValuationSection analysis={analysis} />

      {/* AI Verdict */}
      <VerdictBox analysis={analysis} />

      {/* Disclaimer */}
      <p className={styles.disclaimer}>
        ⚠ Este análisis es generado por inteligencia artificial con fines exclusivamente informativos.
        No constituye asesoramiento financiero ni recomendación de inversión. Los mercados implican
        riesgo de pérdida de capital. Consulta siempre a un asesor financiero certificado.
      </p>
    </div>
  )
}
