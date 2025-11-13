import Link from 'next/link'
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
  const categories: Category[] = [
    {
      id: 'vocabulario',
      icon: '📝',
      name: 'Vocabulario',
      description: 'Palabras esenciales N1',
      href: '/n1/vocabulario',
      available: true,
    },
    {
      id: 'kanji',
      icon: '✍️',
      name: 'Kanji',
      description: 'Caracteres nivel N1',
      href: '/n1/kanji',
      available: false,
    },
    {
      id: 'gramatica',
      icon: '📖',
      name: 'Gramática',
      description: 'Estructuras gramaticales',
      href: '/n1/gramatica',
      available: false,
    },
    {
      id: 'reading',
      icon: '📚',
      name: 'Reading',
      description: 'Comprensión lectora',
      href: '/n1/reading',
      available: false,
    },
    {
      id: 'listening',
      icon: '🎧',
      name: 'Listening',
      description: 'Comprensión auditiva',
      href: '/n1/listening',
      available: false,
    },
  ]

  return (
    <>
      <Header 
        title="N1" 
        subtitle="Nivel Experto"
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
                      <span className={styles.comingSoonBadge}>Próximamente</span>
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

