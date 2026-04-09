import { useAnalysis } from '@/hooks/useAnalysis'
import { Navbar } from '@/components/layout'
import {
  SearchBar,
  LoadingState,
  AnalysisResults,
  HistoryPanel,
} from '@/components/analysis'
import styles from './DashboardPage.module.css'

export function DashboardPage() {
  const { current, history, isLoading, error, analyze } = useAnalysis()

  const handleAnalyze = (ticker: string) => {
    analyze(ticker)
  }

  const handleHistorySelect = (ticker: string) => {
    analyze(ticker)
  }

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <SearchBar onAnalyze={handleAnalyze} isLoading={isLoading} />

        {history.length > 0 && !isLoading && (
          <HistoryPanel history={history} onSelect={handleHistorySelect} />
        )}

        {isLoading && <LoadingState />}

        {error && !isLoading && (
          <div className={styles.errorBox}>
            <p className={styles.errorTitle}>Error al analizar</p>
            <p className={styles.errorMsg}>{error}</p>
          </div>
        )}

        {!isLoading && !error && current && (
          <AnalysisResults analysis={current} />
        )}

        {!isLoading && !error && !current && (
          <EmptyState />
        )}
      </main>
    </div>
  )
}

function EmptyState() {
  return (
    <div className={styles.empty}>
      <div className={styles.emptyIcon}>📈</div>
      <h3 className={styles.emptyTitle}>Analiza cualquier acción</h3>
      <p className={styles.emptyDesc}>
        Ingresa un ticker arriba para obtener análisis con IA en horizontes
        corto, mediano y largo plazo, junto con métricas de valoración
        PER, CPER y PEG.
      </p>
      <div className={styles.emptyHints}>
        <span>Prueba con</span>
        <code>AAPL</code>
        <span>o</span>
        <code>NVDA</code>
      </div>
    </div>
  )
}
