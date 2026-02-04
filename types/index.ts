export type ProjectStatus = 'queue' | 'in-progress' | 'review' | 'complete'
export type ProjectCategory = 'Revenue' | 'Personal' | 'VC/PE' | 'Aviation' | 'AI Business' | 'Infrastructure'

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  assignee: 'Donna' | 'AppDev-Associate' | 'SocialMedia-Associate' | string
  category: ProjectCategory
  createdAt: string
  updatedAt: string
  deliverables: Deliverable[]
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

export interface Deliverable {
  id: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'ready-for-review' | 'approved' | 'rejected'
  dueDate: string
  completedAt?: string
  files?: string[]
}

export interface DashboardStats {
  totalProjects: number
  inProgress: number
  readyForReview: number
  completedThisWeek: number
}
