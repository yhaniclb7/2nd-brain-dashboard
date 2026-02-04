'use client'

import { useState } from 'react'
import { ProjectCategory } from '@/types'
import { categories } from '@/lib/data'

interface NewTaskFormProps {
  onClose: () => void
  onSubmit: (task: {
    name: string
    description: string
    assignee: string
    priority: 'low' | 'medium' | 'high' | 'urgent'
    deliverable: string
    category: ProjectCategory
  }) => void
}

export default function NewTaskForm({ onClose, onSubmit }: NewTaskFormProps) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    assignee: 'Donna',
    priority: 'medium' as const,
    deliverable: '',
    category: 'Revenue' as ProjectCategory
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.deliverable) return
    onSubmit(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#13131f] border border-slate-700 rounded-xl p-6 w-full max-w-md animate-slide-in max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold text-white mb-4">Assign New Task</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Task Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              placeholder="e.g., Research AI Tools"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 h-20 resize-none"
              placeholder="What needs to be done..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
              <select
                value={form.category}
                onChange={e => setForm({...form, category: e.target.value as ProjectCategory})}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                {categories.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Assign To</label>
              <select
                value={form.assignee}
                onChange={e => setForm({...form, assignee: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Donna">Donna (Me)</option>
                <option value="AppDev-Associate">AppDev Associate</option>
                <option value="SocialMedia-Associate">SocialMedia Associate</option>
                <option value="Yhanic">Yhanic</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Priority</label>
              <select
                value={form.priority}
                onChange={e => setForm({...form, priority: e.target.value as any})}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">First Deliverable</label>
              <input
                type="text"
                value={form.deliverable}
                onChange={e => setForm({...form, deliverable: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g., Compile list"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Assign Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
