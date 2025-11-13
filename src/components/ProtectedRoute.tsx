'use client'

import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/AuthContext'

interface ProtectedRouteProps {
  children: ReactNode
  requirePremium?: boolean
  fallbackUrl?: string
}

export default function ProtectedRoute({ 
  children, 
  requirePremium = false,
  fallbackUrl = '/login' 
}: ProtectedRouteProps) {
  const { isAuthenticated, isPremium, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (!isAuthenticated) {
      router.push(fallbackUrl)
      return
    }

    if (requirePremium && !isPremium) {
      router.push('/upgrade')
    }
  }, [isAuthenticated, isPremium, loading, requirePremium, fallbackUrl, router])

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh' 
      }}>
        <p>Cargando...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (requirePremium && !isPremium) {
    return null
  }

  return <>{children}</>
}

