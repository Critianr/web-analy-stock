import { TrendingUp, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { getInitials } from '@/utils'
import styles from './Navbar.module.css'

export function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <div className={styles.logoMark}>
          <TrendingUp size={16} strokeWidth={2.5} />
        </div>
        <span className={styles.logoText}>StockIQ</span>
      </div>

      <div className={styles.right}>
        {user && (
          <>
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName ?? 'avatar'} className={styles.avatar} referrerPolicy="no-referrer" />
            ) : (
              <div className={styles.avatarFallback}>
                {getInitials(user.displayName)}
              </div>
            )}
            <span className={styles.userName}>{user.displayName ?? user.email}</span>
            <button className={styles.logoutBtn} onClick={logout} title="Cerrar sesión">
              <LogOut size={14} />
              Salir
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
