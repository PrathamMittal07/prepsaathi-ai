'use client'

import React from 'react'

export function AppProviders({ children }: { children: React.ReactNode }) {
  // We can add ThemeProvider, AuthProvider, etc. here later
  return <>{children}</>
}
