/**
 * Mock Data - Temporary data
 * When you have backend, this will be removed
 */

export interface User {
  id: string
  email: string
  name: string
  isPremium: boolean
  createdAt: string
}

export interface Level {
  id: string
  name: string
  badge: string
  description: string
  color: string
  totalVocab: number
  totalKanji: number
}

export interface VocabularyWord {
  id: number
  word: string
  reading: string
  meaning: string
  example?: string
  premium?: boolean
}

export const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  name: 'Demo User',
  isPremium: true, // All logged in users are paid users
  createdAt: '2024-01-01',
}

export const mockLevels: Level[] = [
  {
    id: 'n5',
    name: 'N5',
    badge: 'Principiante',
    description: 'Basic level · ~800 words · Basic Kanji',
    color: '#34c759',
    totalVocab: 800,
    totalKanji: 80,
  },
  {
    id: 'n4',
    name: 'N4',
    badge: 'Elemental',
    description: 'Basic conversation · ~1,500 words',
    color: '#5ac8fa',
    totalVocab: 1500,
    totalKanji: 170,
  },
  {
    id: 'n3',
    name: 'N3',
    badge: 'Intermedio',
    description: 'Daily conversation · ~3,700 words',
    color: '#ffd60a',
    totalVocab: 3700,
    totalKanji: 370,
  },
  {
    id: 'n2',
    name: 'N2',
    badge: 'Avanzado',
    description: 'Formal contexts · ~6,000 words',
    color: '#ff9f0a',
    totalVocab: 6000,
    totalKanji: 1000,
  },
  {
    id: 'n1',
    name: 'N1',
    badge: 'Experto',
    description: 'Native level · ~10,000 words',
    color: '#ff453a',
    totalVocab: 10000,
    totalKanji: 2000,
  },
]

export const mockVocabulary: Record<string, VocabularyWord[]> = {
  n1: [
    { id: 1, word: '普及', reading: 'ふきゅう', meaning: 'diffusion, spread', example: '携帯電話が普及する' },
    { id: 2, word: '把握', reading: 'はあく', meaning: 'grasp, comprehension', example: '状況を把握する' },
    { id: 3, word: '顕著', reading: 'けんちょ', meaning: 'remarkable, notable', example: '顕著な効果' },
    { id: 4, word: '著しい', reading: 'いちじるしい', meaning: 'remarkable, striking', example: '著しい発展' },
    { id: 5, word: '妥当', reading: 'だとう', meaning: 'appropriate, reasonable', example: '妥当な判断' },
    { id: 6, word: '妨げる', reading: 'さまたげる', meaning: 'hinder, obstruct', example: '進歩を妨げる' },
    { id: 7, word: '促進', reading: 'そくしん', meaning: 'promotion, encouragement', example: '経済の促進' },
    { id: 8, word: '抑制', reading: 'よくせい', meaning: 'control, restraint', example: '感情を抑制する' },
    { id: 9, word: '緩和', reading: 'かんわ', meaning: 'relief, relaxation', example: '規制を緩和する' },
    { id: 10, word: '軽減', reading: 'けいげん', meaning: 'reduction, alleviation', example: '負担を軽減する' },
    // Premium content
    { id: 11, word: '排除', reading: 'はいじょ', meaning: 'exclusion, elimination', example: '危険を排除する', premium: true },
    { id: 12, word: '克服', reading: 'こくふく', meaning: 'overcome', example: '困難を克服する', premium: true },
    { id: 13, word: '遂行', reading: 'すいこう', meaning: 'execution, accomplishment', example: '任務を遂行する', premium: true },
    { id: 14, word: '遵守', reading: 'じゅんしゅ', meaning: 'observance, compliance', example: '規則を遵守する', premium: true },
    { id: 15, word: '逸脱', reading: 'いつだつ', meaning: 'deviation', example: '基準から逸脱する', premium: true },
  ],
  n2: [
    { id: 1, word: '著す', reading: 'あらわす', meaning: 'write (a book)', example: '本を著す' },
    { id: 2, word: '従う', reading: 'したがう', meaning: 'follow, obey', example: '指示に従う' },
    { id: 3, word: '携わる', reading: 'たずさわる', meaning: 'engage in', example: '仕事に携わる' },
    { id: 4, word: '補う', reading: 'おぎなう', meaning: 'supplement, compensate', example: '不足を補う' },
    { id: 5, word: '募る', reading: 'つのる', meaning: 'recruit, solicit', example: '参加者を募る' },
  ],
  // n3: Moved to src/lib/data/n3-vocabulary.ts (800 words)
}

