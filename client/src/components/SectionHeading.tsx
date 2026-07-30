import React from 'react'
import Badge from './Badge'

interface SectionHeadingProps {
  badgeText?: string
  title: React.ReactNode
  highlightText?: string
  description?: React.ReactNode
  centered?: boolean
  className?: string
}

export default function SectionHeading({
  badgeText,
  title,
  highlightText,
  description,
  centered = true,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`${centered ? 'text-center mx-auto' : 'text-left'} max-w-3xl mb-16 lg:mb-20 ${className}`}>
      {badgeText && (
        <div className={`mb-6 ${centered ? 'flex justify-center' : 'flex justify-start'}`}>
          <Badge dot>{badgeText}</Badge>
        </div>
      )}
      
      <h2 className="text-section-title mb-6">
        {title}{' '}
        {highlightText && <span className="gradient-text">{highlightText}</span>}
      </h2>
      
      {description && (
        <p className="text-body-text">
          {description}
        </p>
      )}
    </div>
  )
}
