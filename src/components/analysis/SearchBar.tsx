import { useState, type KeyboardEvent } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui'
import styles from './SearchBar.module.css'

const QUICK_PICKS = ['AAPL', 'MSFT', 'NVDA', 'GOOGL', 'AMZN', 'TSLA', 'META', 'BRK.B']

interface SearchBarProps {
  onAnalyze: (ticker: string) => void
  isLoading: boolean
}

export function SearchBar({ onAnalyze, isLoading }: SearchBarProps) {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    const clean = value.trim().toUpperCase()
    if (clean) onAnalyze(clean)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit()
  }

  const handleQuickPick = (ticker: string) => {
    setValue(ticker)
    onAnalyze(ticker)
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Analizar acción</label>

      <div className={styles.row}>
        <div className={styles.inputWrap}>
          <Search size={16} className={styles.icon} />
          <input
            type="text"
            className={styles.input}
            placeholder="Ej. AAPL, MSFT, NVDA, GOOGL..."
            value={value}
            onChange={(e) => setValue(e.target.value.toUpperCase())}
            onKeyDown={handleKeyDown}
            maxLength={10}
            spellCheck={false}
            autoCapitalize="characters"
          />
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={handleSubmit}
          loading={isLoading}
          disabled={!value.trim()}
          className={styles.analyzeBtn}
        >
          Analizar →
        </Button>
      </div>

      <div className={styles.quickPicks}>
        <span className={styles.quickLabel}>Populares:</span>
        {QUICK_PICKS.map((ticker) => (
          <button
            key={ticker}
            className={styles.quickPick}
            onClick={() => handleQuickPick(ticker)}
            disabled={isLoading}
          >
            {ticker}
          </button>
        ))}
      </div>
    </div>
  )
}
