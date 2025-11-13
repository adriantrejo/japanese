'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiClient } from '../api/client'

interface User {
  id: string
  email: string
  name: string
  isPremium: boolean
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isPremium: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      const token = apiClient.getToken()
      if (token) {
        const data = await apiClient.getCurrentUser()
        setUser(data.user)
        setIsPremium(data.user?.isPremium || false)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      apiClient.setToken(null)
    } finally {
      setLoading(false)
    }
  }

  async function login(email: string, password: string) {
    try {
      const data = await apiClient.login(email, password)
      setUser(data.user)
      setIsPremium(data.isPremium || data.user?.isPremium || false)
      return { success: true }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  }

  async function logout() {
    try {
      await apiClient.logout()
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setUser(null)
      setIsPremium(false)
    }
  }

  const value: AuthContextType = {
    user,
    isPremium,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

