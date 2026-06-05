import { LucideIcon } from 'lucide-react'

interface DashboardCardProps {
  title: string
  description: string
  icon: LucideIcon
  colorClass: string
  onClick?: () => void
}

export default function DashboardCard({ title, description, icon: Icon, colorClass, onClick }: DashboardCardProps) {
  return (
    <button 
      onClick={onClick}
      className={`w-full text-left p-6 rounded-2xl border bg-gradient-to-br ${colorClass} bg-bg-card hover:-translate-y-1.5 transition-all duration-300 group shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]`}
    >
      <Icon className="w-8 h-8 text-text-primary mb-4 drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
      <h3 className="font-semibold font-syne text-text-primary text-lg group-hover:text-white transition-colors">{title}</h3>
      <p className="text-sm text-text-secondary mt-1">{description}</p>
    </button>
  )
}
