'use client'

import React from 'react'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-accent-blue/30 border-t-accent-blue animate-spin"></div>
        <p className="text-text-secondary font-medium animate-pulse">Loading Prep2Place...</p>
      </div>
    </div>
  )
}
