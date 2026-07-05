'use client'

import { 
  Bot, 
  FileText, 
  Map, 
  Video, 
  Trophy,
  Target,
  Flame
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import StatCard from '@/components/StatCard'
import DashboardCard from '@/components/DashboardCard'

export default function DashboardPage() {
  const router = useRouter()

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold font-syne text-text-primary tracking-tight">Welcome back 👋</h1>
        <p className="mt-2 text-base text-text-secondary">Continue your AI-powered placement journey.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="DSA Problems Solved" 
          value="0" 
          icon={Trophy} 
          colorClass="text-indigo-400" 
          bgClass="bg-indigo-400/10" 
        />
        <StatCard 
          label="Mock Interviews" 
          value="0" 
          icon={Target} 
          colorClass="text-emerald-400" 
          bgClass="bg-emerald-400/10" 
        />
        <StatCard 
          label="Current Streak" 
          value="1 Day" 
          icon={Flame} 
          colorClass="text-orange-400" 
          bgClass="bg-orange-400/10" 
        />
      </div>

      {/* Quick Actions */}
      <div className="space-y-5">
        <h2 className="text-xl font-bold font-syne text-text-primary tracking-tight">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard 
            title="Generate DSA Roadmap"
            description="Create personalized DSA plans."
            icon={Map}
            colorClass="from-cyan-500/10 to-cyan-500/0 border-cyan-500/20"
            onClick={() => router.push('/dashboard/dsa-roadmap')}
          />
          <DashboardCard 
            title="Analyze Resume"
            description="Improve ATS score using AI."
            icon={FileText}
            colorClass="from-purple-500/10 to-purple-500/0 border-purple-500/20"
            onClick={() => router.push('/dashboard/resume')}
          />
          <DashboardCard 
            title="Start Mock Interview"
            description="Practice technical interviews."
            icon={Video}
            colorClass="from-emerald-500/10 to-emerald-500/0 border-emerald-500/20"
            onClick={() => router.push('/dashboard/interview')}
          />
          <DashboardCard 
            title="Ask AI Assistant"
            description="Get instant placement guidance."
            icon={Bot}
            colorClass="from-pink-500/10 to-pink-500/0 border-pink-500/20"
            onClick={() => router.push('/dashboard/assistant')}
          />
        </div>
      </div>
    </div>
  )
}
