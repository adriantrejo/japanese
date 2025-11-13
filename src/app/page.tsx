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
  color: string
}

export default function Home() {
  const { t } = useLanguage()

  const levels: Level[] = [
    {
      id: 'n5',
      name: t.levels.n5.name,
      badge: t.levels.n5.badge,
      description: t.levels.n5.description,
      color: 'n5',
    },
    {
      id: 'n4',
      name: t.levels.n4.name,
      badge: t.levels.n4.badge,
      description: t.levels.n4.description,
      color: 'n4',
    },
    {
      id: 'n3',
      name: t.levels.n3.name,
      badge: t.levels.n3.badge,
      description: t.levels.n3.description,
      color: 'n3',
    },
    {
      id: 'n2',
      name: t.levels.n2.name,
      badge: t.levels.n2.badge,
      description: t.levels.n2.description,
      color: 'n2',
    },
    {
      id: 'n1',
      name: t.levels.n1.name,
      badge: t.levels.n1.badge,
      description: t.levels.n1.description,
      color: 'n1',
    },
  ]

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h1>{t.home.title}</h1>
          <LanguageSwitcher />
        </div>
        <p className={styles.subtitle}>{t.home.subtitle}</p>
      </header>

      <main className={styles.container}>
        <div className={styles.sectionTitle}>{t.home.selectLevel}</div>

        {levels.map((level) => (
          <Link
            key={level.id}
            href={`/${level.id}`}
            className={`${styles.levelCard} ${styles[level.color]}`}
          >
            <div className={styles.levelHeader}>
              <span className={styles.levelName}>{level.name}</span>
              <span className={styles.levelBadge}>{level.badge}</span>
            </div>
            <div className={styles.levelDescription}>{level.description}</div>
            <div className={styles.resources}>
              <span className={styles.resourceTag}>📝 {t.categories.vocabulary.name}</span>
              <span className={styles.resourceTag}>✍️ {t.categories.kanji.name}</span>
              <span className={styles.resourceTag}>📖 {t.categories.grammar.name}</span>
              <span className={styles.resourceTag}>📚 {t.categories.reading.name}</span>
              <span className={styles.resourceTag}>🎧 {t.categories.listening.name}</span>
            </div>
          </Link>
        ))}

        <div className={styles.footer}>{t.home.footer}</div>
      </main>
    </>
  )
}
