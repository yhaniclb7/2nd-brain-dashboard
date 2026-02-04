'use client'

import { Project } from '@/types'
import ProjectCard from './ProjectCard'

interface KanbanBoardProps {
  projects: Project[]
  onStatusChange?: (projectId: string, newStatus: Project['status']) => void
  onAssignToMe?: (projectId: string) => void
  onDelete?: (projectId: string) => void
}

export default function KanbanBoard({ projects, onStatusChange, onAssignToMe, onDelete }: KanbanBoardProps) {
  const columns: { id: Project['status']; title: string; color: string; border: string }[] = [
    { id: 'queue', title: 'Queue', color: 'bg-slate-800/50', border: 'border-slate-700' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-500/5', border: 'border-blue-500/30' },
    { id: 'review', title: 'Ready for Review', color: 'bg-amber-500/5', border: 'border-amber-500/30' },
    { id: 'complete', title: 'Complete', color: 'bg-emerald-500/5', border: 'border-emerald-500/30' }
  ]

  const handleDrop = (e: React.DragEvent, status: Project['status']) => {
    e.preventDefault()
    const projectId = e.dataTransfer.getData('projectId')
    if (projectId && onStatusChange) {
      onStatusChange(projectId, status)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div className="grid grid-cols-4 gap-4 h-full">
      {columns.map(column => {
        const columnProjects = projects.filter(p => p.status === column.id)
        return (
          <div 
            key={column.id} 
            className={`${column.color} ${column.border} border rounded-xl p-4 flex flex-col`}
            onDrop={(e) => handleDrop(e, column.id)}
            onDragOver={handleDragOver}
          >
            <h3 className="font-semibold text-slate-200 mb-4 flex justify-between items-center">
              {column.title}
              <span className="bg-slate-800 text-slate-400 px-2.5 py-0.5 rounded-full text-xs font-medium">
                {columnProjects.length}
              </span>
            </h3>
            <div className="space-y-3 overflow-y-auto flex-1">
              {columnProjects.map(project => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onAssignToMe={onAssignToMe}
                  onDelete={onDelete}
                />
              ))}
              {columnProjects.length === 0 && (
                <p className="text-sm text-slate-500 italic text-center py-8">Drop projects here</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
