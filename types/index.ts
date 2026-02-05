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

// Golden Prison Escape Metrics
export interface GoldenPrisonMetrics {
  vcNetworkOutreach: {
    contactsMadeThisMonth: number
    meetingsScheduled: number
    introductionsReceived: number
    target: number
    status: 'on-track' | 'at-risk' | 'golden-prison-warning'
  }
  dealFlowPipeline: {
    opportunitiesIdentified: number
    dealsReviewed: number
    termSheetsReceived: number
    target: number
    status: 'on-track' | 'at-risk' | 'golden-prison-warning'
  }
  sideBusinessRevenue: {
    currentMonth: number
    lastMonth: number
    growth: number
    target: number
    status: 'on-track' | 'at-risk' | 'golden-prison-warning'
  }
  learningProgress: {
    booksReadThisMonth: number
    coursesCompleted: number
    skillsAcquired: string[]
    target: number
    status: 'on-track' | 'at-risk' | 'golden-prison-warning'
  }
  overallStatus: 'sharp' | 'comfortable' | 'golden-prison-warning'
  lastUpdated: string
}

// Associate Performance
export interface AssociatePerformance {
  associateId: string
  name: string
  role: string
  avatar: string
  // Weekly stats
  tasksCompleted: number
  tasksInProgress: number
  deliverablesSubmitted: number
  deliverablesApproved: number
  // Impact metrics
  timeSavedHours: number
  revenueGenerated: number
  revenueImpact: 'high' | 'medium' | 'low'
  // Current work
  currentTask: string | null
  nextTaskQueue: string[]
  // Performance trend
  trend: 'improving' | 'stable' | 'declining'
  lastActive: string
}

export interface AssociateStats {
  associates: AssociatePerformance[]
  totalTasksCompleted: number
  totalRevenueGenerated: number
  totalTimeSaved: number
  topPerformer: string
  needsAttention: string[]
}
