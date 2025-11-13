'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import Header from '@/components/Header'
import styles from './upgrade.module.css'

export default function UpgradePage() {
  const { t } = useLanguage()
  
  return (
    <>
      <Header 
        title={t.premium.title}
        subtitle={t.premium.subtitle}
        backHref="/"
        gradient="linear-gradient(135deg, #ff9f0a 0%, #ff453a 100%)"
      />

      <main className={styles.container}>
        <div className={styles.hero}>
          <h2>{t.premium.heroTitle}</h2>
          <p className={styles.heroSubtitle}>
            {t.premium.heroSubtitle}
          </p>
        </div>

        <div className={styles.pricingCard}>
          <div className={styles.price}>
            <span className={styles.currency}>$</span>
            <span className={styles.amount}>9.99</span>
            <span className={styles.period}>{t.premium.pricePerMonth}</span>
          </div>

          <ul className={styles.features}>
            <li>✅ {t.premium.features.allLevels}</li>
            <li>✅ {t.premium.features.vocabulary}</li>
            <li>✅ {t.premium.features.kanji}</li>
            <li>✅ {t.premium.features.grammar}</li>
            <li>✅ {t.premium.features.comprehension}</li>
            <li>✅ {t.premium.features.progress}</li>
            <li>✅ {t.premium.features.noAds}</li>
            <li>✅ {t.premium.features.offline}</li>
          </ul>

          <a href="/login" className={styles.subscribeButton}>
            {t.premium.subscribeButton}
          </a>

          <p className={styles.trial}>
            {t.premium.trial}
          </p>
        </div>

        <div className={styles.mockNote}>
          <p><strong>{t.premium.demoNote}</strong></p>
          <p>{t.premium.demoInfo}</p>
        </div>
      </main>
    </>
  )
}
