import { TranslationKeys } from './en'

export const ja: TranslationKeys = {
  common: {
    back: '戻る',
    login: 'ログイン',
    logout: 'ログアウト',
    loading: '読み込み中...',
    cancel: 'キャンセル',
    save: '保存',
    delete: '削除',
    edit: '編集',
  },

  home: {
    title: '📚 JLPT リソース',
    subtitle: '語彙、漢字、文法など',
    selectLevel: 'レベルを選択',
    footer: 'がんばって！💪',
  },

  levels: {
    n5: {
      name: 'N5',
      badge: '初級',
      description: '基礎レベル · 約800語 · 基本漢字',
    },
    n4: {
      name: 'N4',
      badge: '初級',
      description: '基本会話 · 約1,500語',
    },
    n3: {
      name: 'N3',
      badge: '中級',
      description: '日常会話 · 約3,700語',
    },
    n2: {
      name: 'N2',
      badge: '上級',
      description: 'フォーマルな場面 · 約6,000語',
    },
    n1: {
      name: 'N1',
      badge: '最上級',
      description: 'ネイティブレベル · 約10,000語',
    },
  },

  categories: {
    vocabulary: {
      name: '語彙',
      description: '必須単語',
    },
    kanji: {
      name: '漢字',
      description: '文字',
    },
    grammar: {
      name: '文法',
      description: '文法構造',
    },
    reading: {
      name: '読解',
      description: '読解力',
    },
    listening: {
      name: '聴解',
      description: 'リスニング',
    },
    comingSoon: '近日公開',
  },

  auth: {
    loginTitle: 'サインイン',
    loginSubtitle: 'JLPTアカウントにアクセス',
    email: 'メール',
    password: 'パスワード',
    emailPlaceholder: 'your@email.com',
    passwordPlaceholder: '••••••••',
    loginButton: 'サインイン',
    loggingIn: 'サインイン中...',
    noAccount: 'アカウントをお持ちでない方',
    register: '登録',
    mockModeTitle: '🧪 デモモード',
    mockModeInfo: 'どのメール/パスワードでも動作します',
    mockModePremium: 'プレミアムコンテンツの場合：',
  },

  premium: {
    title: 'プレミアム取得',
    subtitle: 'すべてのコンテンツをアンロック',
    heroTitle: 'すべてのJLPTレベルへのフルアクセス',
    heroSubtitle: 'すべての語彙、漢字、文法、練習問題',
    pricePerMonth: '/月',
    features: {
      allLevels: 'すべてのレベルにアクセス（N5-N1）',
      vocabulary: '10,000以上の語彙',
      kanji: '2,000以上の漢字と例文',
      grammar: '無制限の文法練習',
      comprehension: 'リスニングと読解',
      progress: '進捗追跡',
      noAds: '広告なし',
      offline: 'オフラインアクセス',
    },
    subscribeButton: '🚀 今すぐ登録',
    trial: '7日間無料トライアル · いつでもキャンセル可',
    demoNote: 'デモモード',
    demoInfo: 'これはデモページです。Stripeまたは他の決済プロセッサの統合は、バックエンドの準備ができたら追加されます。',
  },

  vocabulary: {
    title: '語彙',
    wordsCount: '語',
    freeVersion: '🔒 無料版',
    viewing: '表示中',
    of: '/',
    unlockAll: 'すべてアンロック →',
    example: '例：',
    premiumBadge: 'プレミアム',
    upgradeFooter: '残りの',
    remainingWords: '語にアクセスしますか？',
    getPremium: 'プレミアム取得',
  },

  errors: {
    loginError: 'サインインエラー',
    connectionError: '接続エラー',
    unauthorized: '権限がありません',
    notFound: '見つかりません',
    serverError: 'サーバーエラー',
  },
}

