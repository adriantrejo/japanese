'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Locale, getTranslations, defaultLocale } from './index'
import type { TranslationKeys } from './locales/en'

// Re-export Locale type for components
export type { Locale }

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: TranslationKeys
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [t, setT] = useState<TranslationKeys>(getTranslations(defaultLocale))

  useEffect(() => {
    // Load saved locale from localStorage
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale') as Locale
      if (savedLocale && ['en', 'es', 'ja'].includes(savedLocale)) {
        setLocaleState(savedLocale)
        setT(getTranslations(savedLocale))
      }
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    setT(getTranslations(newLocale))
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale)
    }
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

