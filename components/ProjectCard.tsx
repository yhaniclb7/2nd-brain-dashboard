'use client'

import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const statusColors = {
    queue: 'bg-gray-100 border-gray-200',
    'in-progress': 'bg-blue-50 border-blue-200',
    review: 'bg-yellow-50 border-yellow-200',
    complete: 'bg-green-50 border-green-200'
  }

  const statusLabels = {
    queue: 'Queue',
    'in-progress': 'In Progress',
    review: 'Review',
    complete: 'Complete'
  }

  const priorityColors = {
    low: 'text-gray-500',
    medium: 'text-yellow-600',
    high: 'text-orange-600',
    urgent: 'text-red-600 font-bold'
  }

  const readyForReview = project.deliverables.filter(d => d.status === 'ready-for-review').length

  return (
    <div className={`p-4 rounded-lg border ${statusColors[project.status]} hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900">{project.name}</h3>
        <span className={`text-xs ${priorityColors[project.priority]}`}>
          {project.priority.toUpperCase()}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{project.description}</p>
      
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>Assignee: {project.assignee}</span>
        <span className="bg-white px-2 py-1 rounded">
          {statusLabels[project.status]}
        </span>
      </div>

      {readyForReview > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <span className="text-sm font-medium text-yellow-700">
            ⚠️ {readyForReview} deliverable{readyForReview > 1 ? 's' : ''} ready for review
          </span>
        </div>
      )}

      <div className="mt-2 text-xs text-gray-400">
        Updated: {new Date(project.updatedAt).toLocaleDateString()}
      </div>
    </div>
  )
}
