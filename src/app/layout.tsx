import { AuthProvider } from '@/lib/auth/AuthContext'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '📚 JLPT Resources',
  description: 'Vocabulary, Kanji, Grammar and more to prepare for the JLPT',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'JLPT Resources',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

