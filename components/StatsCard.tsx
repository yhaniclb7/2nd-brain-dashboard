'use client'

interface StatsCardProps {
  title: string
  value: number
  color: 'blue' | 'green' | 'yellow' | 'red'
}

export default function StatsCard({ title, value, color }: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    red: 'bg-red-50 border-red-200'
  }

  const textClasses = {
    blue: 'text-blue-700',
    green: 'text-green-700',
    yellow: 'text-yellow-700',
    red: 'text-red-700'
  }

  return (
    <div className={`p-6 rounded-lg border ${colorClasses[color]}`}>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className={`text-3xl font-bold ${textClasses[color]}`}>{value}</p>
    </div>
  )
}
