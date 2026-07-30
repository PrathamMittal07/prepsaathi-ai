import React from 'react'

interface LayoutContainerProps {
  children: React.ReactNode
  className?: string
  id?: string
  noVerticalPadding?: boolean
  as?: 'section' | 'footer' | 'div' | 'main'
}

export default function LayoutContainer({ children, className = '', id, noVerticalPadding = false, as: Component = 'section' }: LayoutContainerProps) {
  return (
    <Component id={id} className={`relative w-full ${noVerticalPadding ? '' : 'py-16 md:py-20 lg:py-[120px]'} ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        {children}
      </div>
    </Component>
  )
}
