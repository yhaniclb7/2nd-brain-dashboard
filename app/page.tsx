'use client'

import { useState, useEffect } from 'react'
import { Project, Deliverable } from '@/types'
import { mockProjects, getStats } from '@/lib/data'
import StatsCard from '@/components/StatsCard'
import KanbanBoard from '@/components/KanbanBoard'
import NewTaskForm from '@/components/NewTaskForm'

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const [showNewTask, setShowNewTask] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('donna-dashboard-projects')
    if (saved) {
      try {
        setProjects(JSON.parse(saved))
      } catch {
        setProjects(mockProjects)
      }
    }
  }, [])

  // Save to LocalStorage whenever projects change
  useEffect(() => {
    localStorage.setItem('donna-dashboard-projects', JSON.stringify(projects))
  }, [projects])

  const stats = {
    totalProjects: projects.length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    readyForReview: projects.flatMap(p => p.deliverables).filter(d => d.status === 'ready-for-review').length,
    completedThisWeek: projects.filter(p => p.status === 'complete').length,
    myTasks: projects.filter(p => p.assignee === 'Donna' && p.status !== 'complete').length
  }

  const handleAddTask = (task: {
    name: string
    description: string
    assignee: string
    priority: 'low' | 'medium' | 'high' | 'urgent'
    deliverable: string
  }) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: task.name,
      description: task.description,
      status: 'queue',
      assignee: task.assignee,
      priority: task.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deliverables: [
        {
          id: `d-${Date.now()}`,
          title: task.deliverable,
          description: 'Task assigned via dashboard',
          status: 'pending',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ]
    }
    setProjects([newProject, ...projects])
    setShowNewTask(false)
    showNotification(`Task "${task.name}" assigned to ${task.assignee}`)
  }

  const handleStatusChange = (projectId: string, newStatus: Project['status']) => {
    setProjects(projects.map(p => 
      p.id === projectId 
        ? { ...p, status: newStatus, updatedAt: new Date().toISOString() }
        : p
    ))
    showNotification(`Project moved to ${newStatus.replace('-', ' ')}`)
  }

  const handleAssignToMe = (projectId: string) => {
    setProjects(projects.map(p => 
      p.id === projectId 
        ? { ...p, assignee: 'Donna', updatedAt: new Date().toISOString() }
        : p
    ))
    showNotification('Project assigned to Donna')
  }

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }

  const resetToDefault = () => {
    if (confirm('Reset all projects to default? This will lose your changes.')) {
      setProjects(mockProjects)
      showNotification('Dashboard reset to default')
    }
  }

  return (
    <div className="min-h-screen p-6 bg-[#0a0a0f]">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg">
            {notification}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">2nd Brain Dashboard</h1>
          <p className="text-slate-400">Command Center - All Associate Work</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowNewTask(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <span>+</span> New Task
          </button>
          <button
            onClick={resetToDefault}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <StatsCard title="Total Projects" value={stats.totalProjects} color="blue" />
        <StatsCard title="In Progress" value={stats.inProgress} color="yellow" />
        <StatsCard title="Ready for Review" value={stats.readyForReview} color="red" />
        <StatsCard title="Completed" value={stats.completedThisWeek} color="green" />
        <StatsCard title="My Tasks" value={stats.myTasks} color="purple" />
      </div>

      {/* Kanban Board */}
      <div className="bg-[#13131f] rounded-xl border border-slate-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Project Board</h2>
          <div className="text-sm text-slate-400">
            Drag cards to update status • Click to expand
          </div>
        </div>
        <div className="h-[calc(100vh-320px)]">
          <KanbanBoard 
            projects={projects} 
            onStatusChange={handleStatusChange}
            onAssignToMe={handleAssignToMe}
          />
        </div>
      </div>

      {/* New Task Modal */}
      {showNewTask && (
        <NewTaskForm 
          onClose={() => setShowNewTask(false)}
          onSubmit={handleAddTask}
        />
      )}
    </div>
  )
}
