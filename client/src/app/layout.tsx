import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppProviders } from '@/providers/AppProviders'
import { Toaster } from 'react-hot-toast'
import { UserProfileProvider } from '@/features/profile/context/UserProfileContext'
import { AuthProvider } from '@/features/auth/context/AuthContext'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Prep2Place ?" Your AI-Powered Placement Companion',
  description:
    'Prep2Place helps students prepare for interviews, DSA, aptitude, resumes, and technical subjects using personalized AI-driven workflows.',
  keywords: ['placement preparation', 'AI interview prep', 'DSA', 'resume analyzer', 'mock interview'],
  authors: [{ name: 'Prep2Place' }],
  openGraph: {
    title: 'Prep2Place ?" Your AI-Powered Placement Companion',
    description: 'Land your dream job with AI-powered placement preparation.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className="antialiased bg-bg-primary text-text-primary font-sans overflow-x-hidden">
        <AppProviders>
          <AuthProvider>
            <UserProfileProvider>
              {children}
            </UserProfileProvider>
          </AuthProvider>
          <Toaster position="top-right" />
        </AppProviders>
      </body>
    </html>
  )
}
