import { ReactNode } from 'react'
import Link from 'next/link'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  href?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  onClick,
  disabled = false,
  type = 'button'
}: ButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center font-sans font-medium rounded-[14px] transition-all duration-200 cursor-pointer"
  
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }
  
  const variantStyles = {
    primary: "bg-[#1D1D1D] hover:bg-black text-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)] hover:-translate-y-[2px]",
    secondary: "bg-white border border-[rgba(15,23,42,0.06)] text-[#1D1D1D] shadow-[0_4px_12px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] hover:-translate-y-[2px]",
    ghost: "bg-transparent text-[#6B6B6B] hover:text-[#1D1D1D] hover:bg-black/5 hover:-translate-y-[1px]",
    destructive: "bg-red-500 hover:bg-red-600 text-white shadow-[0_8px_30px_rgba(239,68,68,0.2)] hover:-translate-y-[2px]"
  }
  
  const styles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`
  
  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    )
  }
  
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles}>
      {children}
    </button>
  )
}
