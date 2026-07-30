'use client'

import { BrainCircuit, Search, Bell } from 'lucide-react'
import { useAuth } from '@/features/auth/context/AuthContext'

export default function TopNavbar() {
  const { user } = useAuth()
  
  const initials = user?.profile?.firstName
    ? `${user.profile.firstName[0]}${user.profile.lastName?.[0] || ''}`.toUpperCase()
    : 'U'
    
  return (
    <header className="h-16 flex-shrink-0 bg-bg-card border-b border-white/10 flex items-center justify-between px-6 lg:px-8">
      <div className="flex-1 flex items-center gap-4 md:hidden">
        <BrainCircuit className="w-6 h-6 text-indigo-500" />
      </div>
      
      <div className="hidden md:flex items-center flex-1">
        <div className="max-w-md w-full relative group">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search resources, topics, or interviews..." 
            className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full text-text-secondary hover:text-white hover:bg-white/5 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-bg-card"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-bg-card cursor-pointer flex items-center justify-center text-sm font-bold text-white shadow-[0_0_10px_rgba(99,102,241,0.4)] hover:shadow-[0_0_15px_rgba(99,102,241,0.6)] transition-shadow duration-300">
          {initials}
        </div>
      </div>
    </header>
  )
}
