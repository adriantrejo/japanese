import Header from '@/components/Header'
import styles from '../n1/n1.module.css'

export default function N5Page() {
  const categories = [
    { id: 'vocabulario', icon: '📝', name: 'Vocabulario', description: 'Palabras esenciales N5' },
    { id: 'kanji', icon: '✍️', name: 'Kanji', description: 'Caracteres nivel N5' },
    { id: 'gramatica', icon: '📖', name: 'Gramática', description: 'Estructuras gramaticales' },
    { id: 'reading', icon: '📚', name: 'Reading', description: 'Comprensión lectora' },
    { id: 'listening', icon: '🎧', name: 'Listening', description: 'Comprensión auditiva' },
  ]

  return (
    <>
      <Header 
        title="N5" 
        subtitle="Nivel Principiante"
        backHref="/"
        gradient="linear-gradient(135deg, #34c759 0%, #30d158 100%)"
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
                    <span className={styles.comingSoonBadge}>Próximamente</span>
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

