'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthCard, AuthInput, AuthButton } from '@/components/auth/AuthPrimitives'
import { z } from 'zod'

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setError(null)
      setSuccessMessage(null)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
      setSuccessMessage('Password reset is not implemented in this demo.')
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link.')
    }
  }

  return (
    <div className="w-full animate-fade-in-up">
      <AuthCard title="Reset Password" subtitle="Enter your email to receive a reset link.">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {error && <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium">{error}</div>}
          {successMessage && <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm font-medium">{successMessage}</div>}

          <AuthInput 
            id="email" 
            label="Email Address" 
            type="email" 
            placeholder="you@example.com" 
            {...register('email')}
            error={errors.email?.message}
          />
          
          <div className="mt-4 mb-4">
            <AuthButton type="submit" loading={isSubmitting}>Send Reset Link</AuthButton>
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm font-medium text-gray-500">
          <Link href="/login" className="text-[#8E2F52] hover:text-[#A93C5D] font-bold transition-colors flex items-center justify-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to login
          </Link>
        </div>
      </AuthCard>
    </div>
  )
}
