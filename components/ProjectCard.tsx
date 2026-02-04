'use client'

import { useState } from 'react'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  onAssignToMe?: (projectId: string) => void
}

export default function ProjectCard({ project, onAssignToMe }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false)

  const priorityColors = {
    low: 'text-slate-400 bg-slate-800',
    medium: 'text-amber-400 bg-amber-500/10',
    high: 'text-orange-400 bg-orange-500/10',
    urgent: 'text-rose-400 bg-rose-500/10 font-bold'
  }

  const assigneeColors: Record<string, string> = {
    'Donna': 'text-violet-400',
    'Yhanic': 'text-blue-400',
    'AppDev-Associate': 'text-emerald-400',
    'SocialMedia-Associate': 'text-pink-400'
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
      className="bg-[#1a1a2e] border border-slate-700 rounded-lg p-4 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all cursor-grab active:cursor-grabbing group"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <h3 
          className="font-semibold text-white cursor-pointer hover:text-indigo-400 transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
          {project.name}
        </h3>
        <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[project.priority]}`}>
          {project.priority}
        </span>
      </div>
      
      {/* Description */}
      <p className="text-sm text-slate-400 mb-3 line-clamp-2">{project.description}</p>
      
      {/* Assignee & Progress */}
      <div className="flex justify-between items-center mb-3">
        <span className={`text-xs font-medium ${assigneeColors[project.assignee] || 'text-slate-400'}`}>
          @{project.assignee}
        </span>
        <span className="text-xs text-slate-500">
          {completedDeliverables}/{totalDeliverables} done
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-slate-800 rounded-full overflow-hidden mb-3">
        <div 
          className="h-full bg-indigo-500 transition-all"
          style={{ width: `${(completedDeliverables / totalDeliverables) * 100}%` }}
        />
      </div>

      {/* Ready for review badge */}
      {readyForReview > 0 && (
        <div className="mb-3 p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <span className="text-sm font-medium text-amber-400">
            ⚡ {readyForReview} ready for review
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {project.assignee !== 'Donna' && onAssignToMe && (
          <button
            onClick={() => onAssignToMe(project.id)}
            className="text-xs bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 px-2 py-1 rounded transition-colors"
          >
            Assign to me
          </button>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded transition-colors"
        >
          {expanded ? 'Less' : 'More'}
        </button>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-slate-700 space-y-2">
          <p className="text-xs text-slate-500">
            Created: {new Date(project.createdAt).toLocaleDateString()}
          </p>
          <p className="text-xs text-slate-500">
            Updated: {new Date(project.updatedAt).toLocaleDateString()}
          </p>
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-400">Deliverables:</p>
            {project.deliverables.map(d => (
              <div key={d.id} className="flex items-center gap-2 text-xs">
                <span className={`
                  w-2 h-2 rounded-full
                  ${d.status === 'approved' ? 'bg-emerald-500' : ''}
                  ${d.status === 'ready-for-review' ? 'bg-amber-500' : ''}
                  ${d.status === 'in-progress' ? 'bg-blue-500' : ''}
                  ${d.status === 'pending' ? 'bg-slate-600' : ''}
                `} />
                <span className="text-slate-400">{d.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
