import { Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { StockAnalysis, Verdict } from '@/types'
import { formatPrice } from '@/utils'
import styles from './HistoryPanel.module.css'

interface HistoryPanelProps {
  history: StockAnalysis[]
  onSelect: (ticker: string) => void
}

const VerdictIcon = ({ verdict }: { verdict: Verdict }) => {
  if (verdict === 'BUY')  return <TrendingUp  size={12} style={{ color: 'var(--green)' }} />
  if (verdict === 'SELL') return <TrendingDown size={12} style={{ color: 'var(--red)'   }} />
  return <Minus size={12} style={{ color: 'var(--accent3)' }} />
}

export function HistoryPanel({ history, onSelect }: HistoryPanelProps) {
  if (history.length === 0) return null

  return (
    <aside className={styles.panel}>
      <div className={styles.panelHeader}>
        <Clock size={13} />
        <span>Recientes</span>
      </div>
      <ul className={styles.list}>
        {history.map((item) => (
          <li key={item.ticker}>
            <button className={styles.item} onClick={() => onSelect(item.ticker)}>
              <div className={styles.itemLeft}>
                <span className={styles.itemTicker}>{item.ticker}</span>
                <span className={styles.itemName}>{item.companyName}</span>
              </div>
              <div className={styles.itemRight}>
                <span className={styles.itemPrice}>{formatPrice(item.price)}</span>
                <VerdictIcon verdict={item.verdict} />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
