import Link from 'next/link'
import { 
  LayoutDashboard, 
  Bot, 
  FileText, 
  Map, 
  Video, 
  LineChart, 
  Settings,
  BrainCircuit,
  LogOut,
  Bell,
  Search
} from 'lucide-react'

const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Assistant', href: '/dashboard/assistant', icon: Bot },
  { name: 'Resume Analyzer', href: '/dashboard/resume', icon: FileText },
  { name: 'DSA Roadmap', href: '/dashboard/roadmap', icon: Map },
  { name: 'Mock Interview', href: '/dashboard/interview', icon: Video },
  { name: 'Progress', href: '/dashboard/progress', icon: LineChart },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-white/10 bg-bg-card hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 group">
            <BrainCircuit className="w-6 h-6 text-indigo-500" />
            <span className="font-syne font-bold text-lg tracking-tight text-text-primary">
              Prep<span className="text-indigo-400">Saathi</span>
            </span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4 px-2">
            Menu
          </div>
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-secondary hover:text-white hover:bg-white/5 transition-colors group"
              >
                <Icon className="w-5 h-5 text-text-secondary group-hover:text-indigo-400 transition-colors" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            )
          })}

          <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mt-8 mb-4 px-2">
            System
          </div>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-secondary hover:text-white hover:bg-white/5 transition-colors group"
          >
            <Settings className="w-5 h-5 text-text-secondary group-hover:text-indigo-400 transition-colors" />
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </div>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-secondary hover:text-white hover:bg-white/5 transition-colors w-full group">
            <LogOut className="w-5 h-5 text-text-secondary group-hover:text-red-400 transition-colors" />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation */}
        <header className="h-16 flex-shrink-0 bg-bg-card border-b border-white/10 flex items-center justify-between px-6 lg:px-8">
          <div className="flex-1 flex items-center gap-4 md:hidden">
            {/* Mobile menu button could go here */}
            <BrainCircuit className="w-6 h-6 text-indigo-500" />
          </div>
          
          <div className="hidden md:flex items-center flex-1">
            <div className="max-w-md w-full relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input 
                type="text" 
                placeholder="Search resources, topics, or interviews..." 
                className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full text-text-secondary hover:text-white hover:bg-white/5 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-bg-card"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-bg-card cursor-pointer flex items-center justify-center text-sm font-bold text-white shadow-sm shadow-indigo-500/20">
              JD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-bg-primary p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
