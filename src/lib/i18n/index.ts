import { en } from './locales/en'
import { es } from './locales/es'
import { ja } from './locales/ja'

export type Locale = 'en' | 'es' | 'ja'

export const locales: Record<Locale, typeof en> = {
  en,
  es,
  ja,
}

export const defaultLocale: Locale = 'en'

export function getTranslations(locale: Locale = defaultLocale) {
  return locales[locale] || locales[defaultLocale]
}

// Helper for client components
export function useTranslations(locale: Locale = defaultLocale) {
  return getTranslations(locale)
}

