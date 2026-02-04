'use client'

import { useState } from 'react'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  onAssignToMe?: (projectId: string) => void
  onDelete?: (projectId: string) => void
}

export default function ProjectCard({ project, onAssignToMe, onDelete }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false)

  const priorityColors = {
    low: 'text-slate-400 bg-slate-800',
    medium: 'text-amber-400 bg-amber-500/10',
    high: 'text-orange-400 bg-orange-500/10',
    urgent: 'text-rose-400 bg-rose-500/10 font-bold'
  }

  const categoryColors: Record<string, string> = {
    'Revenue': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    'Personal': 'bg-pink-500/10 text-pink-400 border-pink-500/30',
    'VC/PE': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'Aviation': 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    'AI Business': 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    'Infrastructure': 'bg-slate-500/10 text-slate-400 border-slate-500/30'
  }

  const assigneeColors: Record<string, string> = {
    'Donna': 'text-violet-400',
    'Yhanic': 'text-blue-400',
    'AppDev-Associate': 'text-emerald-400',
    'SocialMedia-Associate': 'text-pink-400',
    'Associates': 'text-amber-400'
  }

  const readyForReview = project.deliverables.filter(d => d.status === 'ready-for-review').length
  const completedDeliverables = project.deliverables.filter(d => d.status === 'approved').length
  const totalDeliverables = project.deliverables.length

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('projectId', project.id)
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div 
      draggable
      onDragStart={handleDragStart}
      className="bg-[#1a1a2e] border border-slate-700 rounded-lg p-2.5 sm:p-4 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all cursor-grab active:cursor-grabbing group"
    >
      {/* Header */}
      <div className="flex justify-between items-start gap-2 mb-1.5 sm:mb-2">
        <h3 
          className="font-semibold text-white text-sm sm:text-base cursor-pointer hover:text-indigo-400 transition-colors flex-1 truncate"
          onClick={() => setExpanded(!expanded)}
        >
          {project.name}
        </h3>
        <div className="flex items-center gap-1 flex-shrink-0">
          <span className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full border ${categoryColors[project.category] || 'text-slate-400 bg-slate-800'}`}>
            {project.category.slice(0, 3)}
          </span>
        </div>
      </div>
      
      {/* Description - Hidden on mobile unless expanded */}
      <p className="hidden sm:block text-sm text-slate-400 mb-2 line-clamp-1">{project.description}</p>
      
      {/* Assignee & Progress Row */}
      <div className="flex justify-between items-center mb-1.5 sm:mb-2">
        <span className={`text-[10px] sm:text-xs font-medium ${assigneeColors[project.assignee] || 'text-slate-400'}`}>
          @{project.assignee.split('-')[0]}
        </span>
        {readyForReview > 0 && (
          <span className="text-[10px] sm:text-xs text-amber-400">
            ⚡ {readyForReview}
          </span>
        )}
      </div>

      {/* Progress bar - thinner on mobile */}
      <div className="h-0.5 sm:h-1 bg-slate-800 rounded-full overflow-hidden mb-2 sm:mb-3">
        <div 
          className="h-full bg-indigo-500 transition-all"
          style={{ width: `${(completedDeliverables / totalDeliverables) * 100}%` }}
        />
      </div>

      {/* Actions - Always visible on mobile, compact */}
      <div className="flex gap-1.5 sm:gap-2">
        {project.assignee !== 'Donna' && onAssignToMe && (
          <button
            onClick={() => onAssignToMe(project.id)}
            className="text-[10px] sm:text-xs bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded transition-colors"
          >
            Take
          </button>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[10px] sm:text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded transition-colors flex-1"
        >
          {expanded ? 'Less' : 'More'}
        </button>
        {onDelete && (
          <button
            onClick={() => onDelete(project.id)}
            className="text-[10px] sm:text-xs bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded transition-colors"
          >
            🗑
          </button>
        )}
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-700 space-y-1 sm:space-y-2">
          <p className="text-xs text-slate-400 sm:hidden line-clamp-2">{project.description}</p>
          <p className="text-[10px] sm:text-xs text-slate-500">
            {completedDeliverables}/{totalDeliverables} done • Updated {new Date(project.updatedAt).toLocaleDateString()}
          </p>
          <div className="space-y-1">
            {project.deliverables.slice(0, 3).map(d => (
              <div key={d.id} className="flex items-center gap-2 text-[10px] sm:text-xs">
                <span className={`
                  w-1.5 h-1.5 rounded-full
                  ${d.status === 'approved' ? 'bg-emerald-500' : ''}
                  ${d.status === 'ready-for-review' ? 'bg-amber-500' : ''}
                  ${d.status === 'in-progress' ? 'bg-blue-500' : ''}
                  ${d.status === 'pending' ? 'bg-slate-600' : ''}
                `} />
                <span className="text-slate-400 truncate">{d.title}</span>
              </div>
            ))}
            {project.deliverables.length > 3 && (
              <p className="text-[10px] text-slate-500">+{project.deliverables.length - 3} more</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
