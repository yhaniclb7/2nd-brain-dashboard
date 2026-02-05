'use client'

import { GoldenPrisonMetrics } from '@/types'
import { TrendingUp, TrendingDown, AlertTriangle, Users, BookOpen, DollarSign, Target } from 'lucide-react'

interface GoldenPrisonPanelProps {
  metrics: GoldenPrisonMetrics
}

export default function GoldenPrisonPanel({ metrics }: GoldenPrisonPanelProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
      case 'at-risk': return 'text-amber-400 bg-amber-500/10 border-amber-500/30'
      case 'golden-prison-warning': return 'text-rose-400 bg-rose-500/10 border-rose-500/30'
      default: return 'text-slate-400 bg-slate-500/10'
    }
  }

  const getTrendIcon = (current: number, target: number) => {
    const pct = (current / target) * 100
    if (pct >= 80) return <TrendingUp className="h-4 w-4 text-emerald-400" />
    if (pct >= 50) return <TrendingUp className="h-4 w-4 text-amber-400" />
    return <TrendingDown className="h-4 w-4 text-rose-400" />
  }

  return (
    <div className="bg-[#13131f] border border-slate-800 rounded-xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <Target className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Golden Prison Escape</h3>
            <p className="text-sm text-slate-400">Staying sharp for VC/PE career</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(metrics.overallStatus === 'sharp' ? 'on-track' : metrics.overallStatus === 'comfortable' ? 'at-risk' : 'golden-prison-warning')}`}>
          {metrics.overallStatus === 'sharp' ? '✨ Sharp' : metrics.overallStatus === 'comfortable' ? '⚠️ Comfortable' : '🚨 Golden Prison Warning'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* VC Network */}
        <div className="bg-slate-900/50 rounded-lg p-3 sm:p-4 border border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-slate-200">VC Network</span>
          </div>
          <div className="flex items-end gap-2 mb-1">
            <span className="text-2xl font-bold text-white">{metrics.vcNetworkOutreach.contactsMadeThisMonth}</span>
            <span className="text-xs text-slate-400 mb-1">/ {metrics.vcNetworkOutreach.target}</span>
          </div>
          <div className="flex items-center gap-2">
            {getTrendIcon(metrics.vcNetworkOutreach.contactsMadeThisMonth, metrics.vcNetworkOutreach.target)}
            <span className={`text-xs ${metrics.vcNetworkOutreach.status === 'on-track' ? 'text-emerald-400' : 'text-amber-400'}`}>
              {metrics.vcNetworkOutreach.meetingsScheduled} meetings scheduled
            </span>
          </div>
        </div>

        {/* Deal Flow */}
        <div className="bg-slate-900/50 rounded-lg p-3 sm:p-4 border border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-violet-400" />
            <span className="text-sm font-medium text-slate-200">Deal Flow</span>
          </div>
          <div className="flex items-end gap-2 mb-1">
            <span className="text-2xl font-bold text-white">{metrics.dealFlowPipeline.opportunitiesIdentified}</span>
            <span className="text-xs text-slate-400 mb-1">/ {metrics.dealFlowPipeline.target}</span>
          </div>
          <div className="flex items-center gap-2">
            {getTrendIcon(metrics.dealFlowPipeline.opportunitiesIdentified, metrics.dealFlowPipeline.target)}
            <span className={`text-xs ${metrics.dealFlowPipeline.status === 'on-track' ? 'text-emerald-400' : 'text-amber-400'}`}>
              {metrics.dealFlowPipeline.dealsReviewed} reviewed
            </span>
          </div>
        </div>

        {/* Side Business Revenue */}
        <div className="bg-slate-900/50 rounded-lg p-3 sm:p-4 border border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium text-slate-200">Side Revenue</span>
          </div>
          <div className="flex items-end gap-2 mb-1">
            <span className="text-2xl font-bold text-white">${(metrics.sideBusinessRevenue.currentMonth / 1000).toFixed(1)}k</span>
            <span className="text-xs text-slate-400 mb-1">/ ${(metrics.sideBusinessRevenue.target / 1000).toFixed(0)}k</span>
          </div>
          <div className="flex items-center gap-2">
            {metrics.sideBusinessRevenue.growth > 0 ? (
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-rose-400" />
            )}
            <span className={`text-xs ${metrics.sideBusinessRevenue.growth > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {metrics.sideBusinessRevenue.growth > 0 ? '+' : ''}{metrics.sideBusinessRevenue.growth}% vs last month
            </span>
          </div>
        </div>

        {/* Learning */}
        <div className="bg-slate-900/50 rounded-lg p-3 sm:p-4 border border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-medium text-slate-200">Learning</span>
          </div>
          <div className="flex items-end gap-2 mb-1">
            <span className="text-2xl font-bold text-white">{metrics.learningProgress.booksReadThisMonth}</span>
            <span className="text-xs text-slate-400 mb-1">/ {metrics.learningProgress.target} books</span>
          </div>
          <div className="flex items-center gap-2">
            {metrics.learningProgress.booksReadThisMonth >= metrics.learningProgress.target ? (
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-amber-400" />
            )}
            <span className={`text-xs ${metrics.learningProgress.booksReadThisMonth >= metrics.learningProgress.target ? 'text-emerald-400' : 'text-amber-400'}`}>
              {metrics.learningProgress.coursesCompleted} course{metrics.learningProgress.coursesCompleted !== 1 ? 's' : ''} done
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800">
        <p className="text-xs text-slate-500">
          Last updated: {new Date(metrics.lastUpdated).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
