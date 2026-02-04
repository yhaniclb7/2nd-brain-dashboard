'use client'

import { useState, useEffect } from 'react'
import { Project, Deliverable, ProjectCategory } from '@/types'
import { mockProjects, getStats, categories, assignees } from '@/lib/data'
import StatsCard from '@/components/StatsCard'
import KanbanBoard from '@/components/KanbanBoard'
import NewTaskForm from '@/components/NewTaskForm'

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const [showNewTask, setShowNewTask] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('All')
  const [filterAssignee, setFilterAssignee] = useState<string>('All')
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null)

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

  // Filter projects
  const filteredProjects = projects.filter(p => {
    const categoryMatch = filterCategory === 'All' || p.category === filterCategory
    const assigneeMatch = filterAssignee === 'All' || p.assignee === filterAssignee
    return categoryMatch && assigneeMatch
  })

  const stats = {
    totalProjects: filteredProjects.length,
    inProgress: filteredProjects.filter(p => p.status === 'in-progress').length,
    readyForReview: filteredProjects.flatMap(p => p.deliverables).filter(d => d.status === 'ready-for-review').length,
    completedThisWeek: filteredProjects.filter(p => p.status === 'complete').length,
    myTasks: filteredProjects.filter(p => p.assignee === 'Donna' && p.status !== 'complete').length
  }

  const handleAddTask = (task: {
    name: string
    description: string
    assignee: string
    priority: 'low' | 'medium' | 'high' | 'urgent'
    deliverable: string
    category: ProjectCategory
  }) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: task.name,
      description: task.description,
      status: 'queue',
      assignee: task.assignee,
      category: task.category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      priority: task.priority,
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

  const handleDelete = (projectId: string) => {
    const project = projects.find(p => p.id === projectId)
    if (project) {
      setProjects(projects.filter(p => p.id !== projectId))
      showNotification(`Deleted: ${project.name}`)
    }
    setProjectToDelete(null)
  }

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }

  const resetToDefault = () => {
    if (confirm('Reset all projects to default? This will lose your changes.')) {
      setProjects(mockProjects)
      setFilterCategory('All')
      setFilterAssignee('All')
      showNotification('Dashboard reset to default')
    }
  }

  const clearFilters = () => {
    setFilterCategory('All')
    setFilterAssignee('All')
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

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#13131f] border border-slate-700 rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-white mb-2">Delete Project?</h3>
            <p className="text-slate-400 mb-4">This cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setProjectToDelete(null)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(projectToDelete)}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">2nd Brain Dashboard</h1>
          <p className="text-slate-400">Command Center - All Associate Work</p>
        </div>
        <div className="flex gap-3 flex-wrap">
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

      {/* Filters */}
      <div className="mb-6 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Filter:</span>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={filterAssignee}
            onChange={e => setFilterAssignee(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          >
            {assignees.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          {(filterCategory !== 'All' || filterAssignee !== 'All') && (
            <button
              onClick={clearFilters}
              className="text-sm text-indigo-400 hover:text-indigo-300"
            >
              Clear
            </button>
          )}
        </div>
        <span className="text-sm text-slate-500">
          Showing {filteredProjects.length} of {projects.length} projects
        </span>
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
            Drag cards to update status • Click to expand • Hover for actions
          </div>
        </div>
        <div className="h-[calc(100vh-380px)]">
          <KanbanBoard 
            projects={filteredProjects}
            onStatusChange={handleStatusChange}
            onAssignToMe={handleAssignToMe}
            onDelete={setProjectToDelete}
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
