import { 
  Bot, 
  FileText, 
  Map, 
  Video, 
  ArrowRight,
  TrendingUp,
  Clock,
  Target
} from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold font-syne text-text-primary">Welcome back, John! 👋</h1>
        <p className="mt-1 text-sm text-text-secondary">Here's your preparation overview for today.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Overall Progress', value: '68%', icon: TrendingUp, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
          { label: 'Hours Practiced', value: '24h', icon: Clock, color: 'text-purple-400', bg: 'bg-purple-400/10' },
          { label: 'Interviews Cleared', value: '3/5', icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-5 rounded-2xl flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-text-secondary font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-text-primary mt-0.5">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold font-syne text-text-primary">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Start Mock Interview', desc: 'Practice with AI interviewer', icon: Video, color: 'from-indigo-500/20 to-indigo-500/0 border-indigo-500/30' },
              { title: 'Resume Analysis', desc: 'Get instant ATS score', icon: FileText, color: 'from-purple-500/20 to-purple-500/0 border-purple-500/30' },
              { title: 'DSA Practice', desc: 'Continue array roadmap', icon: Map, color: 'from-cyan-500/20 to-cyan-500/0 border-cyan-500/30' },
              { title: 'Ask Assistant', desc: 'Clarify technical concepts', icon: Bot, color: 'from-pink-500/20 to-pink-500/0 border-pink-500/30' },
            ].map((action, i) => (
              <button key={i} className={`text-left p-5 rounded-2xl border bg-gradient-to-br ${action.color} bg-bg-card hover:-translate-y-1 transition-all duration-300 group`}>
                <action.icon className="w-8 h-8 text-text-primary mb-3" />
                <h3 className="font-semibold text-text-primary group-hover:text-white transition-colors">{action.title}</h3>
                <p className="text-xs text-text-secondary mt-1">{action.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold font-syne text-text-primary">Recent Activity</h2>
          <div className="glass-card rounded-2xl p-5">
            <div className="space-y-6">
              {[
                { title: 'Completed React Quiz', time: '2 hours ago', score: '8/10' },
                { title: 'Updated Resume v2', time: 'Yesterday', score: 'ATS: 85%' },
                { title: 'Mock Interview (HR)', time: '2 days ago', score: 'Good' },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== 2 && <div className="absolute left-1.5 top-5 bottom-[-20px] w-px bg-white/10" />}
                  <div className="w-3 h-3 rounded-full bg-indigo-500 mt-1.5 ring-4 ring-bg-card relative z-10" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">{activity.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-text-secondary">{activity.time}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-indigo-300">{activity.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm text-indigo-400 font-medium hover:text-indigo-300 transition-colors flex items-center justify-center gap-1">
              View all activity <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
