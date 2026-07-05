'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Bot, 
  FileText, 
  Map, 
  Video, 
  LineChart, 
  Settings,
  BrainCircuit,
  LogOut
} from 'lucide-react'

const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Assistant', href: '/dashboard/assistant', icon: Bot },
  { name: 'Resume Analyzer', href: '/dashboard/resume', icon: FileText },
  { name: 'DSA Roadmap', href: '/dashboard/dsa-roadmap', icon: Map },
  { name: 'Mock Interview', href: '/dashboard/interview', icon: Video },
  { name: 'Progress Tracker', href: '/dashboard/progress', icon: LineChart },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 flex-shrink-0 border-r border-white/10 bg-bg-card hidden md:flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 group">
          <BrainCircuit className="w-6 h-6 text-indigo-500" />
          <span className="font-syne font-bold text-lg tracking-tight text-text-primary">
            Prep<span className="text-indigo-400">Saathi</span> AI
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
          href="/dashboard/settings"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
            pathname === '/dashboard/settings'
              ? 'bg-indigo-500/10 text-indigo-400 font-medium border border-indigo-500/20' 
              : 'text-text-secondary hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <Settings className={`w-5 h-5 transition-colors ${pathname === '/dashboard/settings' ? 'text-indigo-400' : 'text-text-secondary group-hover:text-indigo-400'}`} />
          <span className="text-sm">Settings</span>
        </Link>
      </div>

      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-secondary hover:text-white hover:bg-white/5 transition-colors w-full group">
          <LogOut className="w-5 h-5 text-text-secondary group-hover:text-red-400 transition-colors" />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </aside>
  )
}
