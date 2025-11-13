'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import Header from '@/components/Header'
import styles from './n1.module.css'

interface Category {
  id: string
  icon: string
  name: string
  description: string
  href: string
  available: boolean
}

export default function N1Page() {
  const { t } = useLanguage()
  
  const categories: Category[] = [
    {
      id: 'vocabulario',
      icon: '📝',
      name: t.categories.vocabulary.name,
      description: t.categories.vocabulary.description + ' N1',
      href: '/n1/vocabulario',
      available: true,
    },
    {
      id: 'kanji',
      icon: '✍️',
      name: t.categories.kanji.name,
      description: t.categories.kanji.description + ' N1',
      href: '/n1/kanji',
      available: false,
    },
    {
      id: 'gramatica',
      icon: '📖',
      name: t.categories.grammar.name,
      description: t.categories.grammar.description,
      href: '/n1/gramatica',
      available: false,
    },
    {
      id: 'reading',
      icon: '📚',
      name: t.categories.reading.name,
      description: t.categories.reading.description,
      href: '/n1/reading',
      available: false,
    },
    {
      id: 'listening',
      icon: '🎧',
      name: t.categories.listening.name,
      description: t.categories.listening.description,
      href: '/n1/listening',
      available: false,
    },
  ]

  return (
    <>
      <Header 
        title="N1" 
        subtitle={t.levels.n1.badge}
        backHref="/"
        gradient="linear-gradient(135deg, #ff453a 0%, #ff3b30 100%)"
      />

      <main className={styles.container}>
        {categories.map((category) => (
          <div 
            key={category.id}
            className={`${styles.categoryCard} ${!category.available ? styles.disabled : ''}`}
          >
            {category.available ? (
              <Link href={category.href} className={styles.categoryLink}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryIcon}>{category.icon}</div>
                  <div className={styles.categoryInfo}>
                    <div className={styles.categoryName}>{category.name}</div>
                    <div className={styles.categoryDescription}>
                      {category.description}
                    </div>
                  </div>
                  <div className={styles.arrow}>›</div>
                </div>
              </Link>
            ) : (
              <div className={styles.categoryLink}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryIcon}>{category.icon}</div>
                  <div className={styles.categoryInfo}>
                    <div className={styles.categoryName}>
                      {category.name}
                      <span className={styles.comingSoonBadge}>{t.categories.comingSoon}</span>
                    </div>
                    <div className={styles.categoryDescription}>
                      {category.description}
                    </div>
                  </div>
                  <div className={styles.arrow}>›</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </main>
    </>
  )
}

