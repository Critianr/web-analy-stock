import { useEffect, useState } from 'react'
import styles from './LoadingState.module.css'

const STEPS = [
  'Obteniendo datos de mercado',
  'Calculando métricas de valoración',
  'Analizando horizontes temporales',
  'Generando recomendación IA',
]

export function LoadingState() {
  const [doneSteps, setDoneSteps] = useState<number[]>([])

  useEffect(() => {
    setDoneSteps([])
    const timers = STEPS.map((_, i) =>
      setTimeout(() => setDoneSteps((prev) => [...prev, i]), 600 + i * 500)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.ring} />
      <p className={styles.title}>Analizando con IA...</p>
      <ul className={styles.steps}>
        {STEPS.map((step, i) => (
          <li key={step} className={`${styles.step} ${doneSteps.includes(i) ? styles.done : ''}`}>
            <span className={styles.dot} />
            {step}
          </li>
        ))}
      </ul>
    </div>
  )
}
