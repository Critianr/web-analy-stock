// ─── Auth ───────────────────────────────────────────────────────────────────

export interface User {
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string | null
}

// ─── Stock Analysis ──────────────────────────────────────────────────────────

export type Sentiment = 'bullish' | 'neutral' | 'bearish'
export type ValuationStatus = 'undervalued' | 'fair' | 'overvalued'
export type Verdict = 'BUY' | 'HOLD' | 'SELL'

export interface HorizonAnalysis {
  sentiment: Sentiment
  score: number          // 0–100
  summary: string
  points: string[]
}

export interface StockAnalysis {
  companyName: string
  ticker: string
  price: number
  priceChange: number
  priceChangePct: number
  marketCap: string
  sector: string
  // Valuation ratios
  per: number
  cper: number
  peg: number
  beta: number
  dividendYield: number
  per_status: ValuationStatus
  cper_status: ValuationStatus
  peg_status: ValuationStatus
  per_interp: string
  cper_interp: string
  peg_interp: string
  // Horizons
  short: HorizonAnalysis
  medium: HorizonAnalysis
  long: HorizonAnalysis
  // Verdict
  overallScore: number
  verdict: Verdict
  verdictReason: string
}

// ─── Store ───────────────────────────────────────────────────────────────────

export interface AnalysisState {
  current: StockAnalysis | null
  history: StockAnalysis[]
  isLoading: boolean
  error: string | null
}
