'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/features/auth/context/AuthContext'
import toast from 'react-hot-toast'
import { 
  LayoutDashboard, 
  TrendingUp, 
  Sparkles, 
  FileText, 
  Map, 
  Users, 
  Component,
  LogOut,
  Briefcase,
  Crosshair,
  Settings,
  BrainCircuit,
  Building2
} from 'lucide-react'

const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Progress Tracker', href: '/dashboard/progress', icon: TrendingUp },
  { name: 'Opportunities', href: '/dashboard/opportunities', icon: Briefcase },
  { name: 'Resume Analyzer', href: '/dashboard/resume', icon: FileText },
  { name: 'AI Career Coach', href: '/dashboard/ai-career-coach', icon: Sparkles },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { logout } = useAuth()

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await logout()
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Failed to log out')
      setIsLoggingOut(false)
    }
  }

  return (
    <aside className="w-64 flex-shrink-0 border-r border-white/10 bg-bg-card hidden md:flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 group">
          <BrainCircuit className="w-6 h-6 text-indigo-500" />
          <span className="font-syne font-bold text-lg tracking-tight text-text-primary">
            Prep2Place
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4 px-2">
          Menu
        </div>
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-indigo-500/10 text-indigo-400 font-medium border border-indigo-500/20 shadow-[inset_0_0_12px_rgba(99,102,241,0.1)]' 
                  : 'text-text-secondary hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-indigo-400' : 'text-text-secondary group-hover:text-indigo-400'}`} />
              <span className="text-sm">{item.name}</span>
            </Link>
          )
        })}

        <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mt-8 mb-4 px-2">
          System
        </div>
        <Link
          href="/dashboard/settings/profile"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
            pathname.startsWith('/dashboard/settings')
              ? 'bg-indigo-500/10 text-indigo-400 font-medium border border-indigo-500/20 shadow-[inset_0_0_12px_rgba(99,102,241,0.1)]' 
              : 'text-text-secondary hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <Settings className={`w-5 h-5 transition-colors ${pathname.startsWith('/dashboard/settings') ? 'text-indigo-400' : 'text-text-secondary group-hover:text-indigo-400'}`} />
          <span className="text-sm">Settings</span>
        </Link>
      </div>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-secondary hover:text-red-600 hover:bg-red-50 transition-colors w-full group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? (
             <div className="w-5 h-5 border-2 border-text-secondary border-t-white rounded-full animate-spin" />
          ) : (
            <LogOut className="w-5 h-5 text-text-secondary group-hover:text-red-600 transition-colors" />
          )}
          <span className="text-sm font-medium">{isLoggingOut ? 'Logging out...' : 'Log out'}</span>
        </button>
      </div>
    </aside>
  )
}
