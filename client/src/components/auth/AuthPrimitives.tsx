'use client'

import { ReactNode, forwardRef, useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export function AuthCard({ children, title, subtitle }: { children: ReactNode, title?: string, subtitle?: string }) {
  return (
    <div className="w-full saas-card p-[32px] sm:p-[56px] shadow-[0_30px_80px_rgba(60,45,30,0.10)] border border-[rgba(80,60,40,0.08)] relative">
      {(title || subtitle) && (
        <div className="mb-[40px] text-center sm:text-left">
          {title && <h2 className="text-[46px] font-sans font-bold text-[#1E1E1E] tracking-tight mb-[8px] leading-[1.1]">{title}</h2>}
          {subtitle && <p className="text-[#555555] text-[18px] leading-[1.6]">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

export interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, id, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 mb-5 w-full">
        <label htmlFor={id} className="block text-[15px] font-semibold text-[#1E1E1E] mb-2">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className={`w-full h-[56px] px-5 rounded-[16px] border ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-[rgba(80,60,40,0.08)] focus:border-[#8E2F52] focus:ring-[#D9A441]/10'
          } bg-[#FFFDF8] focus:bg-white focus:ring-4 transition-all duration-200 outline-none text-[#1E1E1E] placeholder:text-gray-400 text-[16px] font-medium shadow-sm ${className}`}
          {...props}
        />
        {error && <span className="text-red-500 text-sm font-medium mt-1">{error}</span>}
      </div>
    )
  }
)
AuthInput.displayName = 'AuthInput'

export const PasswordInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, id, error, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="flex flex-col gap-2 mb-5 w-full">
        <label htmlFor={id} className="block text-[15px] font-semibold text-[#1E1E1E] mb-2">
          {label}
        </label>
        <div className="relative">
          <input
            id={id}
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            className={`w-full h-[56px] pl-5 pr-12 rounded-[16px] border ${
              error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-[rgba(80,60,40,0.08)] focus:border-[#8E2F52] focus:ring-[#D9A441]/10'
            } bg-[#FFFDF8] focus:bg-white focus:ring-4 transition-all duration-200 outline-none text-[#1E1E1E] placeholder:text-gray-400 text-[16px] font-medium shadow-sm ${className}`}
            {...props}
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {error && <span className="text-red-500 text-sm font-medium mt-1">{error}</span>}
      </div>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'

export function AuthButton({ 
  children, 
  href, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  onClick, 
  disabled = false,
  loading = false
}: { 
  children: ReactNode, 
  href?: string, 
  type?: 'button' | 'submit', 
  variant?: 'primary' | 'secondary', 
  className?: string, 
  onClick?: () => void, 
  disabled?: boolean,
  loading?: boolean
}) {
  const commonClasses = `w-full h-[56px] rounded-[16px] flex items-center justify-center gap-2 font-bold text-[16px] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed ${
    variant === 'primary' 
      ? 'bg-gradient-to-r from-[#8E2F52] to-[#A6385D] text-white shadow-[0_8px_16px_rgba(142,47,82,0.15)] hover:shadow-[0_12px_24px_rgba(142,47,82,0.25)] hover:-translate-y-[2px]' 
      : 'bg-white text-[#1E1E1E] border border-[rgba(80,60,40,0.12)] hover:bg-[#F8F5EF] hover:border-[rgba(80,60,40,0.2)]'
  } ${className}`

  if (href) {
    return (
      <a href={href} className={commonClasses}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={commonClasses} onClick={onClick} disabled={disabled || loading}>
      {loading && <Loader2 className="animate-spin" size={20} />}
      {children}
    </button>
  )
}

export function SocialLogin({ onClick, loading = false }: { onClick?: () => void, loading?: boolean }) {
  return (
    <div className="w-full mt-6">
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[rgba(80,60,40,0.12)]"></div>
        </div>
        <div className="relative z-10 bg-white px-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
          OR
        </div>
      </div>
      <button 
        type="button"
        onClick={onClick}
        disabled={loading}
        className="w-full h-[56px] px-5 rounded-[16px] flex items-center justify-center gap-3 bg-white text-[#1E1E1E] border border-[rgba(80,60,40,0.12)] hover:bg-[#F8F5EF] hover:border-[rgba(80,60,40,0.2)] hover:-translate-y-[1px] shadow-sm hover:shadow-md transition-all duration-200 font-semibold text-[16px] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        )}
        Continue with Google
      </button>
    </div>
  )
}
