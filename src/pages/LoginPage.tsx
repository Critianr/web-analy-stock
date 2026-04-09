import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui'
import styles from './LoginPage.module.css'

export function LoginPage() {
  const { loginWithGoogle, loginAsDemo } = useAuth()
  const [loadingGoogle, setLoadingGoogle] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoogle = async () => {
    setError(null)
    setLoadingGoogle(true)
    try {
      await loginWithGoogle()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al iniciar sesión'
      setError(msg.includes('not configured')
        ? 'Firebase no configurado. Usa el modo demo o añade credenciales en .env'
        : 'Error al conectar con Google. Inténtalo de nuevo.')
    } finally {
      setLoadingGoogle(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.glow1} />
      <div className={styles.glow2} />

      <div className={styles.card}>
        <div className={styles.logoMark}>
          <TrendingUp size={28} strokeWidth={2} />
        </div>

        <h1 className={styles.title}>StockIQ</h1>
        <p className={styles.subtitle}>
          Análisis de acciones con inteligencia artificial. Horizontes corto, mediano y largo plazo
          con métricas PER, CPER y PEG.
        </p>

        <div className={styles.features}>
          {['Análisis IA en tiempo real', 'Métricas PER · CPER · PEG', '3 horizontes temporales', 'Veredicto con score'].map((f) => (
            <div key={f} className={styles.feature}>
              <span className={styles.featureDot} />
              {f}
            </div>
          ))}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <Button
          variant="secondary"
          size="lg"
          className={styles.googleBtn}
          onClick={handleGoogle}
          loading={loadingGoogle}
        >
          <GoogleIcon />
          Continuar con Google
        </Button>

        <div className={styles.divider}>
          <span>o</span>
        </div>

        <Button
          variant="ghost"
          size="md"
          className={styles.demoBtn}
          onClick={loginAsDemo}
        >
          Probar demo sin cuenta →
        </Button>

        <p className={styles.terms}>
          Al continuar, aceptas los{' '}
          <a href="#" className={styles.link}>Términos de servicio</a> y la{' '}
          <a href="#" className={styles.link}>Política de privacidad</a>.
          No somos asesores financieros.
        </p>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}
