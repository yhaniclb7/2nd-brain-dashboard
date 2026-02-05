'use client'

import { AssociatePerformance, AssociateStats } from '@/types'
import { CheckCircle2, Clock, TrendingUp, TrendingDown, Minus, Zap } from 'lucide-react'

interface AssociatePerformancePanelProps {
  stats: AssociateStats
}

export default function AssociatePerformancePanel({ stats }: AssociatePerformancePanelProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-emerald-400" />
      case 'declining': return <TrendingDown className="h-4 w-4 text-rose-400" />
      default: return <Minus className="h-4 w-4 text-slate-400" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-emerald-400 bg-emerald-500/10'
      case 'medium': return 'text-amber-400 bg-amber-500/10'
      case 'low': return 'text-slate-400 bg-slate-500/10'
      default: return 'text-slate-400 bg-slate-500/10'
    }
  }

  return (
    <div className="bg-[#13131f] border border-slate-800 rounded-xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Associate Performance</h3>
            <p className="text-sm text-slate-400">Overnight work & impact</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="text-right">
            <p className="text-xs text-slate-400">Tasks Done</p>
            <p className="text-lg font-bold text-white">{stats.totalTasksCompleted}</p>
          </div>
          <div className="text-right ml-4">
            <p className="text-xs text-slate-400">Hours Saved</p>
            <p className="text-lg font-bold text-emerald-400">{stats.totalTimeSaved}h</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {stats.associates.map((associate) => (
          <div key={associate.associateId} className="bg-slate-900/50 rounded-lg p-3 sm:p-4 border border-slate-800 hover:border-indigo-500/30 transition-colors">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{associate.avatar}</div>
                <div>
                  <h4 className="font-semibold text-white">{associate.name}</h4>
                  <p className="text-xs text-slate-400">{associate.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(associate.trend)}
                <span className={`text-xs px-2 py-0.5 rounded-full ${getImpactColor(associate.revenueImpact)}`}>
                  {associate.revenueImpact} impact
                </span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              <div className="bg-slate-800/50 rounded-lg p-2 text-center">
                <p className="text-lg font-bold text-emerald-400">{associate.tasksCompleted}</p>
                <p className="text-[10px] text-slate-400">Done</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-2 text-center">
                <p className="text-lg font-bold text-amber-400">{associate.tasksInProgress}</p>
                <p className="text-[10px] text-slate-400">In Progress</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-2 text-center">
                <p className="text-lg font-bold text-blue-400">{associate.deliverablesApproved}</p>
                <p className="text-[10px] text-slate-400">Approved</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-2 text-center">
                <p className="text-lg font-bold text-violet-400">{associate.timeSavedHours}h</p>
                <p className="text-[10px] text-slate-400">Saved</p>
              </div>
            </div>

            {/* Current Work */}
            {associate.currentTask && (
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-3 w-3 text-amber-400" />
                <span className="text-xs text-slate-300">Now: {associate.currentTask}</span>
              </div>
            )}

            {/* Next Queue */}
            {associate.nextTaskQueue.length > 0 && (
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-0.5" />
                <div className="text-xs text-slate-400">
                  Next: {associate.nextTaskQueue[0]}
                  {associate.nextTaskQueue.length > 1 && (
                    <span className="text-slate-500"> (+{associate.nextTaskQueue.length - 1} more)</span>
                  )}
                </div>
              </div>
            )}

            {/* Last Active */}
            <div className="mt-2 pt-2 border-t border-slate-800">
              <p className="text-[10px] text-slate-500">
                Last active: {new Date(associate.lastActive).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">{stats.topPerformer}</p>
          <p className="text-xs text-slate-400">Top Performer</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-emerald-400">${(stats.totalRevenueGenerated / 1000).toFixed(1)}k</p>
          <p className="text-xs text-slate-400">Revenue Generated</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-violet-400">{stats.associates.length}</p>
          <p className="text-xs text-slate-400">Active Associates</p>
        </div>
      </div>
    </div>
  )
}
