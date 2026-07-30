'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/Button'
import { NAV_ITEMS } from '@/lib/constants'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-[#E8E2DA] shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Left: Logo */}
        <div className="flex items-center justify-start">
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              {/* Sleek Geometric Logo */}
              <div className="absolute inset-0 rounded-[10px] bg-[#8E2C4B] rotate-3 opacity-90 transition-transform duration-300 group-hover:rotate-6"></div>
              <div className="absolute inset-0 rounded-[10px] border-2 border-[#C89A3D] -rotate-3 transition-transform duration-300 group-hover:-rotate-6 bg-white/20 backdrop-blur-sm"></div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="relative z-10 text-white" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h6a6 6 0 0 1 0 12H4V4z"></path>
                <path d="M4 16h6"></path>
              </svg>
            </div>
            <span className="font-sans font-extrabold text-[1.15rem] tracking-tight text-[#1D1D1D] transition-colors">
              Prep2Place
            </span>
          </Link>
        </div>

        {/* Center: Navigation (Desktop) */}
        <div className="hidden md:flex items-center justify-center">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="px-4 py-2 text-sm text-[#6B6B6B] hover:text-[#1D1D1D] rounded-full hover:bg-black/5 transition-all duration-300 font-medium"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: CTA (Desktop) */}
        <div className="hidden md:flex items-center justify-end gap-3">
          <Button variant="ghost" href="/login" size="sm">
            Sign in
          </Button>
          <Button variant="primary" href="/signup" size="sm">
            Get Started
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="flex justify-end md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-xl hover:bg-black/5 transition-colors relative z-50"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-[#1D1D1D] rounded-full transition-all duration-300 origin-center ${
                menuOpen ? 'rotate-45 translate-y-[8px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#1D1D1D] rounded-full transition-all duration-300 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#1D1D1D] rounded-full transition-all duration-300 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-[8px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-[#E8E2DA] transition-all duration-400 ease-in-out overflow-hidden ${
          menuOpen ? 'max-h-[400px] opacity-100 shadow-xl' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 space-y-2 flex flex-col">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-base text-[#6B6B6B] hover:text-[#1D1D1D] rounded-xl hover:bg-black/5 transition-all duration-200 font-medium"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 mt-2 border-t border-[#E8E2DA] flex flex-col gap-3">
            <Button variant="ghost" href="/login" size="md" className="w-full justify-center">
              Sign in
            </Button>
            <Button variant="primary" href="/signup" size="md" className="w-full justify-center">
              Get Started Free
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}