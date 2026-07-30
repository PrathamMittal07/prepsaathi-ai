'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthCard, AuthInput, PasswordInput, AuthButton, SocialLogin } from '@/components/auth/AuthPrimitives'
import { z } from 'zod'
import { authApi } from '@/lib/api/auth'
import { useAuth } from '@/features/auth/context/AuthContext'
import { useEffect } from 'react'
import { Check, X } from 'lucide-react'

const signupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})
type SignupFormData = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  const { login, isAuthenticated, isLoading } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard')
    }
  }, [isLoading, isAuthenticated, router])

  
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  })

  const passwordValue = watch('password', '')
  const hasLength = passwordValue.length >= 8
  const hasUpper = /[A-Z]/.test(passwordValue)
  const hasLower = /[a-z]/.test(passwordValue)
  const hasNumber = /[0-9]/.test(passwordValue)
  const hasSpecial = /[^A-Za-z0-9]/.test(passwordValue)

  const onSubmit = async (data: SignupFormData) => {
    try {
      setError(null)
      setSuccessMessage(null)
      const nameParts = data.fullName.split(' ')
      const firstName = nameParts[0]
      const lastName = nameParts.slice(1).join(' ') || ''
      
      const res = await authApi.register({
        email: data.email,
        password: data.password,
        firstName,
        lastName
      })
      login(res.accessToken, res.user, res.refreshToken)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Failed to create account.')
    }
  }

  return (
    <div className="w-full animate-fade-in-up">
      <AuthCard title="Create Account" subtitle="Join Prep2Place and start your preparation.">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {error && <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium">{error}</div>}
          {successMessage && <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm font-medium">{successMessage}</div>}
          
          <AuthInput 
            id="fullName" 
            label="Full Name" 
            placeholder="John Doe" 
            {...register('fullName')}
            error={errors.fullName?.message}
          />
          <AuthInput 
            id="email" 
            label="Email Address" 
            type="email" 
            placeholder="you@example.com" 
            {...register('email')}
            error={errors.email?.message}
          />
          <PasswordInput 
            id="password" 
            label="Password" 
            placeholder="••••••••" 
            {...register('password')}
            error={errors.password?.message}
          />
          
          {passwordValue.length > 0 && (
            <div className="mb-5 -mt-3 p-3 bg-gray-50 rounded-xl text-xs space-y-1 border border-gray-100">
              <div className={`flex items-center gap-1.5 ${hasLength ? 'text-green-600' : 'text-gray-500'}`}>
                {hasLength ? <Check size={14} /> : <X size={14} />} At least 8 characters
              </div>
              <div className={`flex items-center gap-1.5 ${hasUpper ? 'text-green-600' : 'text-gray-500'}`}>
                {hasUpper ? <Check size={14} /> : <X size={14} />} One uppercase letter
              </div>
              <div className={`flex items-center gap-1.5 ${hasLower ? 'text-green-600' : 'text-gray-500'}`}>
                {hasLower ? <Check size={14} /> : <X size={14} />} One lowercase letter
              </div>
              <div className={`flex items-center gap-1.5 ${hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                {hasNumber ? <Check size={14} /> : <X size={14} />} One number
              </div>
              <div className={`flex items-center gap-1.5 ${hasSpecial ? 'text-green-600' : 'text-gray-500'}`}>
                {hasSpecial ? <Check size={14} /> : <X size={14} />} One special character
              </div>
            </div>
          )}

          <PasswordInput 
            id="confirmPassword" 
            label="Confirm Password" 
            placeholder="••••••••" 
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          
          <div className="mt-2 mb-4">
            <AuthButton type="submit" loading={isSubmitting}>Continue</AuthButton>
          </div>
        </form>
        <div className="mt-8 text-center text-sm font-medium text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-[#8E2F52] hover:text-[#A93C5D] font-bold transition-colors">
            Sign in
          </Link>
        </div>
      </AuthCard>
    </div>
  )
}
