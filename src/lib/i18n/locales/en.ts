export const en = {
  // Common
  common: {
    back: 'Back',
    login: 'Login',
    logout: 'Logout',
    loading: 'Loading...',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
  },

  // Home
  home: {
    title: '📚 JLPT Resources',
    subtitle: 'Vocabulary, Kanji, Grammar and more',
    selectLevel: 'Select your level',
    footer: 'Good luck! 💪',
  },

  // Levels
  levels: {
    n5: {
      name: 'N5',
      badge: 'Beginner',
      description: 'Basic level · ~800 words · Basic Kanji',
    },
    n4: {
      name: 'N4',
      badge: 'Elementary',
      description: 'Basic conversation · ~1,500 words',
    },
    n3: {
      name: 'N3',
      badge: 'Intermediate',
      description: 'Daily conversation · ~3,700 words',
    },
    n2: {
      name: 'N2',
      badge: 'Advanced',
      description: 'Formal contexts · ~6,000 words',
    },
    n1: {
      name: 'N1',
      badge: 'Expert',
      description: 'Native level · ~10,000 words',
    },
  },

  // Categories
  categories: {
    vocabulary: {
      name: 'Vocabulary',
      description: 'Essential words',
    },
    kanji: {
      name: 'Kanji',
      description: 'Characters',
    },
    grammar: {
      name: 'Grammar',
      description: 'Grammatical structures',
    },
    reading: {
      name: 'Reading',
      description: 'Reading comprehension',
    },
    listening: {
      name: 'Listening',
      description: 'Listening comprehension',
    },
    comingSoon: 'Coming Soon',
  },

  // Auth
  auth: {
    loginTitle: 'Sign In',
    loginSubtitle: 'Access your JLPT account',
    email: 'Email',
    password: 'Password',
    emailPlaceholder: 'your@email.com',
    passwordPlaceholder: '••••••••',
    loginButton: 'Sign In',
    loggingIn: 'Signing in...',
    noAccount: "Don't have an account?",
    register: 'Register',
    mockModeTitle: '🧪 Demo Mode (Mock)',
    mockModeInfo: 'Any email/password works',
    mockModePremium: 'For premium content, use:',
  },

  // Premium
  premium: {
    title: 'Get Premium',
    subtitle: 'Unlock all content',
    heroTitle: 'Full access to all JLPT levels',
    heroSubtitle: 'All vocabulary, kanji, grammar and exercises',
    pricePerMonth: '/month',
    features: {
      allLevels: 'Access to all levels (N5-N1)',
      vocabulary: '+10,000 vocabulary words',
      kanji: '+2,000 kanji with examples',
      grammar: 'Unlimited grammar exercises',
      comprehension: 'Listening and reading comprehension',
      progress: 'Progress tracking',
      noAds: 'No ads',
      offline: 'Offline access',
    },
    subscribeButton: '🚀 Subscribe now',
    trial: '7 days free trial · Cancel anytime',
    demoNote: 'Demo Mode',
    demoInfo: 'This is a demo page. Stripe or other payment processor integration will be added when you have the backend ready.',
  },

  // Vocabulary
  vocabulary: {
    title: 'Vocabulary',
    wordsCount: 'words',
    freeVersion: '🔒 Free Version',
    viewing: 'Viewing',
    of: 'of',
    unlockAll: 'Unlock all →',
    example: 'Example:',
    premiumBadge: 'Premium',
    upgradeFooter: 'Want access to the',
    remainingWords: 'remaining words?',
    getPremium: 'Get Premium',
  },

  // Errors
  errors: {
    loginError: 'Error signing in',
    connectionError: 'Connection error',
    unauthorized: 'Unauthorized',
    notFound: 'Not found',
    serverError: 'Server error',
  },
}

export type TranslationKeys = typeof en

