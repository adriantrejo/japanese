import Header from '@/components/Header'
import styles from './upgrade.module.css'

export default function UpgradePage() {
  return (
    <>
      <Header 
        title="Subscribe" 
        subtitle="Get full access to all JLPT content"
        backHref="/"
        gradient="linear-gradient(135deg, #ff9f0a 0%, #ff453a 100%)"
      />

      <main className={styles.container}>
        <div className={styles.hero}>
          <h2>Full access to all JLPT levels</h2>
          <p className={styles.heroSubtitle}>
            All vocabulary, kanji, grammar and exercises
          </p>
        </div>

        <div className={styles.pricingCard}>
          <div className={styles.price}>
            <span className={styles.currency}>$</span>
            <span className={styles.amount}>9.99</span>
            <span className={styles.period}>/month</span>
          </div>

          <ul className={styles.features}>
            <li>✅ Access to all levels (N5-N1)</li>
            <li>✅ +10,000 vocabulary words</li>
            <li>✅ +2,000 kanji with examples</li>
            <li>✅ Unlimited grammar exercises</li>
            <li>✅ Listening and reading comprehension</li>
            <li>✅ Progress tracking</li>
            <li>✅ No ads</li>
            <li>✅ Offline access</li>
          </ul>

          <a href="/login" className={styles.subscribeButton}>
            🚀 Sign up now
          </a>

          <p className={styles.trial}>
            7 days free trial · Cancel anytime
          </p>
        </div>

        <div className={styles.mockNote}>
          <p><strong>🧪 Demo Mode</strong></p>
          <p>This is a demo page. Payment integration (Stripe) will be added when you have the backend ready. For now, just login with any email/password to get full access.</p>
        </div>
      </main>
    </>
  )
}
