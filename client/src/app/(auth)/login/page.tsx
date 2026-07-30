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

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
})
type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated, isLoading } = useAuth()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard')
    }
  }, [isLoading, isAuthenticated, router])

  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null)
      const res = await authApi.login({ email: data.email, password: data.password })
      login(res.accessToken, res.user, res.refreshToken)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.')
    }
  }

  return (
    <div className="w-full animate-fade-in-up">
      <AuthCard title="Welcome back" subtitle="Sign in to continue your preparation.">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {error && <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium">{error}</div>}
          
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
          
          <div className="flex items-center justify-between mb-6 -mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" {...register('rememberMe')} className="w-4 h-4 rounded border-gray-300 text-[#8E2F52] focus:ring-[#8E2F52]" />
              <span className="text-sm font-medium text-gray-600">Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-xs font-semibold text-[#8E2F52] hover:text-[#A93C5D] transition-colors">
              Forgot password?
            </Link>
          </div>
          
          <AuthButton type="submit" loading={isSubmitting}>Sign In</AuthButton>
        </form>
        <div className="mt-8 text-center text-sm font-medium text-gray-500">
          Don't have an account?{' '}
          <Link href="/signup" className="text-[#8E2F52] hover:text-[#A93C5D] font-bold transition-colors">
            Sign up for free
          </Link>
        </div>
      </AuthCard>
    </div>
  )
}
