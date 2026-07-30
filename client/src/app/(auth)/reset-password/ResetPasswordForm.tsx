'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PasswordInput, AuthButton } from '@/components/auth/AuthPrimitives'
import { z } from 'zod'

const resetPasswordSchema = z.object({
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
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
import toast from 'react-hot-toast'
import { Check, X } from 'lucide-react'

export function ResetPasswordForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema)
  })

  const passwordValue = watch('password', '')
  const hasLength = passwordValue.length >= 8
  const hasUpper = /[A-Z]/.test(passwordValue)
  const hasLower = /[a-z]/.test(passwordValue)
  const hasNumber = /[0-9]/.test(passwordValue)
  const hasSpecial = /[^A-Za-z0-9]/.test(passwordValue)

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setError(null)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
      toast.success('Password reset is not implemented in this demo!')
      router.push('/login')
    } catch (err: any) {
      setError(err.message || 'Failed to reset password.')
    }
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      {error && <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium">{error}</div>}
      
      <PasswordInput 
        id="password" 
        label="New Password" 
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
      
      <div className="mt-4 mb-4">
        <AuthButton type="submit" loading={isSubmitting}>Reset Password</AuthButton>
      </div>
    </form>
  )
}
