'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth/AuthContext'
import { apiClient } from '@/lib/api/client'
import Header from '@/components/Header'
import styles from './vocabulario.module.css'

interface VocabularyWord {
  id: number
  word: string
  reading: string
  meaning: string
  example?: string
  premium?: boolean
}

export default function N1VocabularioPage() {
  const [words, setWords] = useState<VocabularyWord[]>([])
  const [loading, setLoading] = useState(true)
  const [isPremium, setIsPremium] = useState(false)
  const [total, setTotal] = useState(0)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    loadVocabulary()
  }, [])

  async function loadVocabulary() {
    try {
      const data = await apiClient.getVocabulary('n1')
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
          title="Vocabulario N1" 
          subtitle="Cargando..."
          backHref="/n1"
          gradient="linear-gradient(135deg, #ff453a 0%, #ff3b30 100%)"
        />
      </>
    )
  }

  return (
    <>
      <Header 
        title="Vocabulario N1" 
        subtitle={`${words.length} de ${total} palabras`}
        backHref="/n1"
        gradient="linear-gradient(135deg, #ff453a 0%, #ff3b30 100%)"
      />

      <main className={styles.container}>
        {!isPremium && (
          <div className={styles.premiumNotice}>
            <h3>🔒 Preview</h3>
            <p>Viewing {words.length} of {total} words</p>
            <a href="/login" className={styles.upgradeButton}>
              Sign in to unlock all →
            </a>
          </div>
        )}

        <div className={styles.wordList}>
          {words.map((word) => (
            <div key={word.id} className={styles.wordCard}>
              <div className={styles.wordHeader}>
                <div className={styles.word}>{word.word}</div>
                <div className={styles.reading}>{word.reading}</div>
                {word.premium && <span className={styles.premiumBadge}>Premium</span>}
              </div>
              <div className={styles.meaning}>{word.meaning}</div>
              {word.example && (
                <div className={styles.example}>
                  例：{word.example}
                </div>
              )}
            </div>
          ))}
        </div>

        {!isPremium && (
          <div className={styles.upgradeFooter}>
            <p>Want access to the remaining {total - words.length} words?</p>
            <a href="/login" className={styles.upgradeButtonLarge}>
              Sign In to Access All
            </a>
          </div>
        )}
      </main>
    </>
  )
}

