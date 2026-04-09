import { useAnalysisStore } from '@/store/analysisStore'
import { analyzeStock } from '@/services/anthropic'

export function useAnalysis() {
  const { current, history, isLoading, error, setCurrent, setLoading, setError, clearCurrent } =
    useAnalysisStore()

  const analyze = async (ticker: string) => {
    const clean = ticker.trim().toUpperCase()
    if (!clean) return

    setLoading(true)
    setError(null)

    try {
      const result = await analyzeStock(clean)
      setCurrent(result)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido'
      setError(message)
    }
  }

  return { current, history, isLoading, error, analyze, clearCurrent }
}
