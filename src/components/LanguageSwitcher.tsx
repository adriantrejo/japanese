'use client'

import { useLanguage, Locale } from '@/lib/i18n/LanguageContext'
import styles from './LanguageSwitcher.module.css'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  const languages: { code: Locale; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
  ]

  return (
    <div className={styles.switcher}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`${styles.langButton} ${locale === lang.code ? styles.active : ''}`}
          onClick={() => setLocale(lang.code)}
          aria-label={`Switch to ${lang.label}`}
        >
          <span className={styles.flag}>{lang.flag}</span>
          <span className={styles.label}>{lang.label}</span>
        </button>
      ))}
    </div>
  )
}

