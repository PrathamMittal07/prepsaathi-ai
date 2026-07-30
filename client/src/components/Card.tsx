import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  interactive?: boolean
}

export default function Card({ children, className = '', interactive = false }: CardProps) {
  return (
    <div 
      className={`
        bg-white border border-[#E8E2DA] rounded-[24px] overflow-hidden
        shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-300
        ${interactive ? 'hover:-translate-y-[8px] hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] hover:border-[var(--color-accent-maroon)]/30' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
