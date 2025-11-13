'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth/AuthContext'
import { APP_CONFIG } from '@/lib/config'
import styles from './Header.module.css'

interface HeaderProps {
  title: string
  subtitle?: string
  backHref?: string
  gradient?: string
}

export default function Header({ title, subtitle, backHref, gradient }: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header 
      className={styles.header}
      style={{ background: gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      <div className={styles.topBar}>
        {backHref && (
          <Link href={backHref} className={styles.backButton}>
            ← Volver
          </Link>
        )}
        
        {APP_CONFIG.ENABLE_AUTH && isAuthenticated && (
          <div className={styles.userMenu}>
            <span className={styles.userName}>{user?.email}</span>
            <button onClick={logout} className={styles.logoutButton}>
              Salir
            </button>
          </div>
        )}
      </div>

      <h1 className={styles.title}>{title}</h1>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    </header>
  )
}

