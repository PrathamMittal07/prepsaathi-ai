import Link from 'next/link'
import { AuthCard, AuthButton } from '@/components/auth/AuthPrimitives'

export default function EmailVerificationPage() {
  return (
    <div className="w-full animate-fade-in-up">
      <AuthCard>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          
          <h2 className="text-2xl font-sans font-bold text-text-primary tracking-tight mb-3">Check your email</h2>
          <p className="text-text-secondary text-sm mb-8 px-4 text-pretty leading-relaxed">
            We've sent a verification link to <span className="font-semibold text-text-primary">you@example.com</span>. Please click the link to verify your account.
          </p>
          
          <AuthButton variant="secondary" className="mb-6">Resend verification email</AuthButton>
          
          <Link href="/login" className="text-sm font-semibold text-[var(--color-accent-maroon)] hover:text-[#A93C5D] transition-colors">
            Return to login
          </Link>
        </div>
      </AuthCard>
    </div>
  )
}
