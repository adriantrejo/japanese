'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { getLevelCategories } from '@/lib/helpers/levelCategories'
import Header from '@/components/Header'
import styles from '../n1/n1.module.css'

export default function N2Page() {
  const { t } = useLanguage()
  const categories = getLevelCategories('n2', t)

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
