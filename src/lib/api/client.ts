/**
 * API Client - Abstraction Layer
 * 
 * NOW: Uses local mock data
 * FUTURE: Connect to your real backend
 */

import { mockLevels, mockVocabulary, mockUser } from '../data/mockData'
import { getN3Vocabulary } from '../data/n3-vocabulary'
import { APP_CONFIG } from '../config'

const isMockMode = APP_CONFIG.MOCK_MODE
const BASE_URL = APP_CONFIG.API_URL

interface User {
  id: string
  email: string
  name: string
  isPremium: boolean
  createdAt: string
}

interface LoginResponse {
  user: User
  token: string
  isPremium: boolean
}

interface VocabularyWord {
  id: number
  word: string
  reading: string
  meaning: string
  example?: string
  premium?: boolean
}

interface VocabularyResponse {
  words: VocabularyWord[]
  isPremium: boolean
  total: number
}

class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor() {
    this.baseUrl = BASE_URL
  }

  setToken(token: string | null) {
    this.token = token
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token)
      } else {
        localStorage.removeItem('auth_token')
      }
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && !this.token) {
      this.token = localStorage.getItem('auth_token')
    }
    return this.token
  }

  async fetch(endpoint: string, options: RequestInit = {}): Promise<any> {
    if (isMockMode) {
      return this.mockFetch(endpoint, options)
    }

    const token = this.getToken()
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      })

      if (!response.ok) {
        if (response.status === 401) {
          this.setToken(null)
          throw new Error('Unauthorized')
        }
        throw new Error(`API Error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  private async mockFetch(endpoint: string, options: RequestInit): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const token = this.getToken()
    const method = options.method || 'GET'

    if (endpoint === '/auth/login' && method === 'POST') {
      const { email, password } = JSON.parse(options.body as string)
      // Any login = paid user with full access
      if (email && password) {
        const newToken = 'mock_token_' + Date.now()
        return { 
          user: { ...mockUser, email, isPremium: true },
          token: newToken,
          isPremium: true // All logged users are paid users
        }
      }
      throw new Error('Invalid credentials')
    }

    if (endpoint === '/auth/me' && method === 'GET') {
      if (!token) throw new Error('Unauthorized')
      return { user: mockUser }
    }

    if (endpoint === '/auth/logout' && method === 'POST') {
      return { success: true }
    }

    if (endpoint === '/levels' && method === 'GET') {
      return { levels: mockLevels }
    }

    if (endpoint.match(/\/levels\/\w+/) && method === 'GET') {
      const levelId = endpoint.split('/').pop()!
      const level = mockLevels.find(l => l.id === levelId)
      return { level }
    }

    if (endpoint.match(/\/vocabulary\/\w+/) && method === 'GET') {
      const levelId = endpoint.split('/').pop()!
      
      // If auth is disabled, give full access to everything
      if (!APP_CONFIG.ENABLE_AUTH) {
        if (levelId === 'n3') {
          const n3Data = getN3Vocabulary('es')
          const allWords = n3Data.words.map(w => ({
            id: w.id,
            word: w.word,
            reading: w.reading,
            meaning: w.meaning,
            example: w.exampleJp,
            exampleEs: w.exampleEs,
            premium: false,
          }))
          return {
            words: allWords,
            isPremium: true,
            total: allWords.length
          }
        }
        const words = mockVocabulary[levelId as keyof typeof mockVocabulary] || []
        return {
          words,
          isPremium: true,
          total: words.length
        }
      }
      
      // Auth is enabled - check token
      if (!token) {
        // No auth: show preview (first 10 words) to encourage signup
        if (levelId === 'n3') {
          const n3Data = getN3Vocabulary('es')
          const preview = n3Data.words.slice(0, 10).map(w => ({
            id: w.id,
            word: w.word,
            reading: w.reading,
            meaning: w.meaning,
            example: w.exampleJp,
            exampleEs: w.exampleEs,
            premium: false,
          }))
          return {
            words: preview,
            isPremium: false,
            total: n3Data.words.length
          }
        }
        
        const words = mockVocabulary[levelId as keyof typeof mockVocabulary] || []
        return {
          words: words.slice(0, 10),
          isPremium: false,
          total: words.length
        }
      }
      
      // Authenticated = Paid user = Full access
      if (levelId === 'n3') {
        const n3Data = getN3Vocabulary('es')
        const allWords = n3Data.words.map(w => ({
          id: w.id,
          word: w.word,
          reading: w.reading,
          meaning: w.meaning,
          example: w.exampleJp,
          exampleEs: w.exampleEs,
          premium: false,
        }))
        
        return {
          words: allWords,
          isPremium: true,
          total: allWords.length
        }
      }
      
      // Other levels - full access for authenticated users
      const words = mockVocabulary[levelId as keyof typeof mockVocabulary] || []
      return { 
        words,
        isPremium: true,
        total: words.length
      }
    }

    throw new Error(`Mock endpoint not found: ${endpoint}`)
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const data = await this.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    this.setToken(data.token)
    return data
  }

  async logout(): Promise<void> {
    await this.fetch('/auth/logout', { method: 'POST' })
    this.setToken(null)
  }

  async getCurrentUser(): Promise<{ user: User }> {
    return await this.fetch('/auth/me')
  }

  async getLevels() {
    return await this.fetch('/levels')
  }

  async getLevel(levelId: string) {
    return await this.fetch(`/levels/${levelId}`)
  }

  async getVocabulary(levelId: string): Promise<VocabularyResponse> {
    return await this.fetch(`/vocabulary/${levelId}`)
  }
}

export const apiClient = new ApiClient()

