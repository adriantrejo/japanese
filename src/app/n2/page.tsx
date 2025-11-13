'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import Header from '@/components/Header'
import styles from '../n1/n1.module.css'

export default function N2Page() {
  const { t } = useLanguage()
  
  const categories = [
    { id: 'vocabulario', icon: '📝', name: t.categories.vocabulary.name, description: t.categories.vocabulary.description + ' N2' },
    { id: 'kanji', icon: '✍️', name: t.categories.kanji.name, description: t.categories.kanji.description + ' N2' },
    { id: 'gramatica', icon: '📖', name: t.categories.grammar.name, description: t.categories.grammar.description },
    { id: 'reading', icon: '📚', name: t.categories.reading.name, description: t.categories.reading.description },
    { id: 'listening', icon: '🎧', name: t.categories.listening.name, description: t.categories.listening.description },
  ]

  return (
    <>
      <Header 
        title="N2" 
        subtitle={t.levels.n2.badge}
        backHref="/"
        gradient="linear-gradient(135deg, #ff9f0a 0%, #ff8c00 100%)"
      />
      <main className={styles.container}>
        {categories.map((category) => (
          <div key={category.id} className={`${styles.categoryCard} ${styles.disabled}`}>
            <div className={styles.categoryLink}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon}>{category.icon}</div>
                <div className={styles.categoryInfo}>
                  <div className={styles.categoryName}>
                    {category.name}
                    <span className={styles.comingSoonBadge}>{t.categories.comingSoon}</span>
                  </div>
                  <div className={styles.categoryDescription}>{category.description}</div>
                </div>
                <div className={styles.arrow}>›</div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  )
}
