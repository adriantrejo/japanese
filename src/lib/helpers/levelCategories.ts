/**
 * Helper to generate level categories
 * Centralizes category structure to avoid duplication
 */

import type { TranslationKeys } from '@/lib/i18n/locales/en'

export interface LevelCategory {
  id: string
  icon: string
  name: string
  description: string
  href: string
  available: boolean
  count?: string
}

/**
 * Get categories for a specific JLPT level
 * @param level - JLPT level (n1, n2, n3, n4, n5)
 * @param t - Translation object
 * @param availableCategories - Array of available category IDs (default: only 'vocabulary')
 */
export function getLevelCategories(
  level: 'n1' | 'n2' | 'n3' | 'n4' | 'n5',
  t: TranslationKeys,
  availableCategories: string[] = ['vocabulary']
): LevelCategory[] {
  const levelUpper = level.toUpperCase()
  
  const categories: LevelCategory[] = [
    {
      id: 'vocabulary',
      icon: '📝',
      name: t.categories.vocabulary.name,
      description: `${t.categories.vocabulary.description} ${levelUpper}`,
      href: `/${level}/vocabulary`,
      available: availableCategories.includes('vocabulary'),
    },
    {
      id: 'kanji',
      icon: '✍️',
      name: t.categories.kanji.name,
      description: `${t.categories.kanji.description} ${levelUpper}`,
      href: `/${level}/kanji`,
      available: availableCategories.includes('kanji'),
    },
    {
      id: 'grammar',
      icon: '📖',
      name: t.categories.grammar.name,
      description: t.categories.grammar.description,
      href: `/${level}/grammar`,
      available: availableCategories.includes('grammar'),
    },
    {
      id: 'reading',
      icon: '📚',
      name: t.categories.reading.name,
      description: t.categories.reading.description,
      href: `/${level}/reading`,
      available: availableCategories.includes('reading'),
    },
    {
      id: 'listening',
      icon: '🎧',
      name: t.categories.listening.name,
      description: t.categories.listening.description,
      href: `/${level}/listening`,
      available: availableCategories.includes('listening'),
    },
  ]

  return categories
}

/**
 * Add special metadata to categories (e.g., word count for N3)
 */
export function addCategoryMetadata(
  categories: LevelCategory[],
  metadata: Record<string, { count?: string }>
): LevelCategory[] {
  return categories.map((cat) => ({
    ...cat,
    ...(metadata[cat.id] || {}),
  }))
}

