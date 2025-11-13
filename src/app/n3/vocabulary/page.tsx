'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth/AuthContext'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { apiClient } from '@/lib/api/client'
import Header from '@/components/Header'
import styles from '../../n1/vocabulary/vocabulary.module.css'

interface VocabularyWord {
  id: number
  word: string
  reading: string
  meaning: string
  example?: string
  premium?: boolean
}

export default function N3VocabularioPage() {
  const [words, setWords] = useState<VocabularyWord[]>([])
  const [loading, setLoading] = useState(true)
  const [isPremium, setIsPremium] = useState(false)
  const [total, setTotal] = useState(0)
  const { isAuthenticated } = useAuth()
  const { t } = useLanguage()

  useEffect(() => {
    loadVocabulary()
  }, [])

  async function loadVocabulary() {
    try {
      const data = await apiClient.getVocabulary('n3')
      setWords(data.words)
      setIsPremium(data.isPremium)
      setTotal(data.total)
    } catch (error) {
      console.error('Error loading vocabulary:', error)
      // Show preview even without login
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header 
          title={`${t.vocabulary.title} N3`}
          subtitle={t.common.loading}
          backHref="/n3"
          gradient="linear-gradient(135deg, #ffd60a 0%, #ff9f0a 100%)"
        />
      </>
    )
  }

  return (
    <>
      <Header 
        title={`${t.vocabulary.title} N3 - Top 800`}
        subtitle={`${words.length} ${t.vocabulary.of} ${total} ${t.vocabulary.wordsCount}`}
        backHref="/n3"
        gradient="linear-gradient(135deg, #ffd60a 0%, #ff9f0a 100%)"
      />

      <main className={styles.container}>
        {!isPremium && (
          <div className={styles.premiumNotice}>
            <h3>🔒 Preview</h3>
            <p>{t.vocabulary.viewing} {words.length} {t.vocabulary.of} {total} {t.vocabulary.wordsCount}</p>
            <a href="/login" className={styles.upgradeButton}>
              {t.common.login} {t.vocabulary.unlockAll}
            </a>
          </div>
        )}

        <div className={styles.wordList}>
          {words.map((word) => (
            <div key={word.id} className={styles.wordCard}>
              <div className={styles.wordHeader}>
                <div className={styles.word}>{word.word}</div>
                <div className={styles.reading}>{word.reading}</div>
                {word.premium && <span className={styles.premiumBadge}>{t.vocabulary.premiumBadge}</span>}
              </div>
              <div className={styles.meaning}>{word.meaning}</div>
              {word.example && (
                <div className={styles.example}>
                  {t.vocabulary.example} {word.example}
                </div>
              )}
            </div>
          ))}
        </div>

        {!isPremium && (
          <div className={styles.upgradeFooter}>
            <p>{t.vocabulary.upgradeFooter} {total - words.length} {t.vocabulary.remainingWords}</p>
            <a href="/login" className={styles.upgradeButtonLarge}>
              {t.common.login}
            </a>
          </div>
        )}
      </main>
    </>
  )
}

