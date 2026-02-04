'use client'

import { Project } from '@/types'
import ProjectCard from './ProjectCard'

interface KanbanBoardProps {
  projects: Project[]
}

export default function KanbanBoard({ projects }: KanbanBoardProps) {
  const columns = [
    { id: 'queue', title: 'Queue', color: 'bg-gray-100' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-50' },
    { id: 'review', title: 'Review', color: 'bg-yellow-50' },
    { id: 'complete', title: 'Complete', color: 'bg-green-50' }
  ]

  return (
    <div className="grid grid-cols-4 gap-4 h-full">
      {columns.map(column => {
        const columnProjects = projects.filter(p => p.status === column.id)
        return (
          <div key={column.id} className={`${column.color} rounded-lg p-4`}>
            <h3 className="font-semibold text-gray-700 mb-4 flex justify-between">
              {column.title}
              <span className="bg-white px-2 py-0.5 rounded-full text-sm">
                {columnProjects.length}
              </span>
            </h3>
            <div className="space-y-3">
              {columnProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
              {columnProjects.length === 0 && (
                <p className="text-sm text-gray-400 italic">No projects</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
