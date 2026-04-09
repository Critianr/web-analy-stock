import { create } from 'zustand'
import type { StockAnalysis, AnalysisState } from '@/types'

interface AnalysisStore extends AnalysisState {
  setCurrent: (analysis: StockAnalysis) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearCurrent: () => void
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  current: null,
  history: [],
  isLoading: false,
  error: null,

  setCurrent: (analysis) =>
    set((state) => ({
      current: analysis,
      history: [
        analysis,
        ...state.history.filter((h) => h.ticker !== analysis.ticker),
      ].slice(0, 10), // keep last 10
      error: null,
    })),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  clearCurrent: () => set({ current: null, error: null }),
}))
