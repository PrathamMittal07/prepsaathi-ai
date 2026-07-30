'use client'

import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary text-text-primary px-4 text-center">
      <div className="relative mb-8">
        <h1 className="text-8xl md:text-9xl font-bold font-syne text-transparent bg-clip-text bg-gradient-to-br from-white to-white/20">
          404
        </h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-blue/20 blur-[100px] -z-10 rounded-full" />
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold font-syne mb-4">Page not found</h2>
      <p style={{ maxWidth: '448px' }} className="text-text-secondary text-lg mx-auto mb-10">
        We couldn't find the page you were looking for. It might have been moved or doesn't exist.
      </p>
      
      <Link href="/" className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20">
        Return Home
      </Link>
    </div>
  )
}
