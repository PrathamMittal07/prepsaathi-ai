import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PrepSaathi AI — Your AI-Powered Placement Companion',
  description:
    'PrepSaathi AI helps students prepare for interviews, DSA, aptitude, resumes, and technical subjects using personalized AI-driven workflows.',
  keywords: ['placement preparation', 'AI interview prep', 'DSA', 'resume analyzer', 'mock interview'],
  authors: [{ name: 'PrepSaathi AI' }],
  openGraph: {
    title: 'PrepSaathi AI — Your AI-Powered Placement Companion',
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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased noise-overlay">
        {children}
      </body>
    </html>
  )
}
