import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  colorClass: string
  bgClass: string
}

export default function StatCard({ label, value, icon: Icon, colorClass, bgClass }: StatCardProps) {
  return (
    <div className="glass-card p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden group">
      <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-white/5 blur-xl group-hover:bg-indigo-500/10 transition-colors duration-500" />
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgClass} shadow-inner`}>
        <Icon className={`w-6 h-6 ${colorClass}`} />
      </div>
      <div className="relative z-10">
        <p className="text-sm text-text-secondary font-medium tracking-wide">{label}</p>
        <p className="text-2xl font-bold font-syne text-text-primary mt-0.5 tracking-tight">{value}</p>
      </div>
    </div>
  )
}
