'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import styles from './page.module.css'

interface Level {
  id: string
  name: string
  badge: string
  description: string
}

export default function Home() {
  const { t } = useLanguage()

  const levels: Level[] = [
    {
      id: 'n5',
      name: t.levels.n5.name,
      badge: t.levels.n5.badge,
      description: t.levels.n5.description,
    },
    {
      id: 'n4',
      name: t.levels.n4.name,
      badge: t.levels.n4.badge,
      description: t.levels.n4.description,
    },
    {
      id: 'n3',
      name: t.levels.n3.name,
      badge: t.levels.n3.badge,
      description: t.levels.n3.description,
    },
    {
      id: 'n2',
      name: t.levels.n2.name,
      badge: t.levels.n2.badge,
      description: t.levels.n2.description,
    },
    {
      id: 'n1',
      name: t.levels.n1.name,
      badge: t.levels.n1.badge,
      description: t.levels.n1.description,
    },
  ]

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.languageSwitcher}>
          <LanguageSwitcher />
        </div>
        <h1 className={styles.title}>📚 {t.home.title}</h1>
        <p className={styles.subtitle}>{t.home.subtitle}</p>
        <p className={styles.selectLevel}>{t.home.selectLevel}</p>
      </header>

      <main className={styles.levelsGrid}>
        {levels.map((level) => (
          <Link
            key={level.id}
            href={`/${level.id}`}
            className={styles.levelCard}
            data-level={level.id}
          >
            <div className={styles.levelContent}>
              <div className={styles.levelName}>{level.name}</div>
              <div className={styles.levelInfo}>
                <div className={styles.levelBadgeRow}>
                  <div className={styles.levelBadge}>{level.badge}</div>
                </div>
                <div className={styles.levelDescription}>{level.description}</div>
              </div>
              <div className={styles.levelArrow}>→</div>
            </div>
          </Link>
        ))}
      </main>

      <footer className={styles.footer}>
        {t.home.footer}
      </footer>
    </div>
  )
}
