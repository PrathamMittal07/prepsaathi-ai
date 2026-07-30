import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  dot?: boolean
}

export default function Badge({ children, className = '', dot = false }: BadgeProps) {
  return (
    <span className={`badge rounded-[var(--radius-badge)] ${className}`}>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441] animate-pulse" />
      )}
      {children}
    </span>
  )
}
