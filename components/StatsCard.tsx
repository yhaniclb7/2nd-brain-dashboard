'use client'

interface StatsCardProps {
  title: string
  value: number
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
}

export default function StatsCard({ title, value, color }: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500/10 border-blue-500/30',
    green: 'bg-emerald-500/10 border-emerald-500/30',
    yellow: 'bg-amber-500/10 border-amber-500/30',
    red: 'bg-rose-500/10 border-rose-500/30',
    purple: 'bg-violet-500/10 border-violet-500/30'
  }

  const textClasses = {
    blue: 'text-blue-400',
    green: 'text-emerald-400',
    yellow: 'text-amber-400',
    red: 'text-rose-400',
    purple: 'text-violet-400'
  }

  return (
    <div className={`p-5 rounded-xl border ${colorClasses[color]} backdrop-blur-sm`}>
      <p className="text-sm font-medium text-slate-400">{title}</p>
      <p className={`text-3xl font-bold ${textClasses[color]} mt-1`}>{value}</p>
    </div>
  )
}
