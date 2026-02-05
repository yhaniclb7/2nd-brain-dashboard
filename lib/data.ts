import { Project, DashboardStats, GoldenPrisonMetrics, AssociatePerformance, AssociateStats } from '@/types'

export const mockProjects: Project[] = [
  {
    id: '1',
    name: '2nd Brain Dashboard',
    description: 'Command Center for monitoring all Associate work and Donna tasks',
    status: 'complete',
    assignee: 'Donna',
    category: 'Infrastructure',
    createdAt: '2026-02-04T08:00:00Z',
    updatedAt: '2026-02-04T21:30:00Z',
    priority: 'high',
    deliverables: [
      { id: 'd1', title: 'Dashboard UI', description: 'Kanban board with drag-drop', status: 'approved', dueDate: '2026-02-04', completedAt: '2026-02-04T21:30:00Z' },
      { id: 'd2', title: 'Vercel Deployment', description: 'Live at 2nd-brain-dashboard.vercel.app', status: 'approved', dueDate: '2026-02-04', completedAt: '2026-02-04T21:29:00Z' },
      { id: 'd3', title: 'GitHub Integration', description: 'Auto-deploy on push', status: 'approved', dueDate: '2026-02-04', completedAt: '2026-02-04T21:29:00Z' }
    ]
  },
  {
    id: '2',
    name: 'SaaS Market Research',
    description: 'Research revenue-generating app opportunities ($5M+ ARR potential)',
    status: 'complete',
    assignee: 'AppDev-Associate',
    category: 'Revenue',
    createdAt: '2026-02-03T22:00:00Z',
    updatedAt: '2026-02-03T22:15:00Z',
    priority: 'high',
    deliverables: [
      { id: 'd4', title: 'Market Analysis Report', description: '5 SaaS concepts: AI Contract Review, Aviation Compliance, Voice AI Reception, Niche Job Board, AI Form Filler', status: 'approved', dueDate: '2026-02-04', completedAt: '2026-02-03T22:15:00Z' }
    ]
  },
  {
    id: '3',
    name: 'Social Media Brand Strategy',
    description: 'LinkedIn and Instagram content strategy for Yhanic personal brand',
    status: 'complete',
    assignee: 'SocialMedia-Associate',
    category: 'Personal',
    createdAt: '2026-02-03T22:00:00Z',
    updatedAt: '2026-02-03T22:05:00Z',
    priority: 'medium',
    deliverables: [
      { id: 'd5', title: 'LinkedIn Drafts', description: '3 posts: Fighter to Founder, Kellogg Journey, United Airlines transition', status: 'approved', dueDate: '2026-02-04', completedAt: '2026-02-03T22:05:00Z' },
      { id: 'd6', title: 'Instagram Strategy', description: '10-page brand strategy doc', status: 'approved', dueDate: '2026-02-04', completedAt: '2026-02-03T22:05:00Z' }
    ]
  },
  {
    id: '4',
    name: 'Infrastructure Setup',
    description: 'Full tooling stack: Telegram, GitHub, Vercel, API integrations',
    status: 'complete',
    assignee: 'Donna',
    category: 'Infrastructure',
    createdAt: '2026-02-04T06:00:00Z',
    updatedAt: '2026-02-04T21:00:00Z',
    priority: 'urgent',
    deliverables: [
      { id: 'd7', title: 'GitHub Connection', description: 'Repo created and code pushed', status: 'approved', dueDate: '2026-02-04', completedAt: '2026-02-04T20:45:00Z' },
      { id: 'd8', title: 'Telegram Restoration', description: 'Two-way messaging restored', status: 'approved', dueDate: '2026-02-04', completedAt: '2026-02-04T21:20:00Z' },
      { id: 'd9', title: 'API Key Rotation', description: 'All keys rotated after security incident', status: 'approved', dueDate: '2026-02-04', completedAt: '2026-02-04T15:00:00Z' }
    ]
  },
  {
    id: '5',
    name: "Valentine's Day - Alexa",
    description: 'Coordinate gifts and logistics for Feb 14 (Moldovan/Eastern European - flowers required)',
    status: 'in-progress',
    assignee: 'Donna',
    category: 'Personal',
    createdAt: '2026-02-03T21:00:00Z',
    updatedAt: '2026-02-04T16:00:00Z',
    priority: 'high',
    deliverables: [
      { id: 'd10', title: 'Celine Parade EDP', description: 'Order from celine.com - $320', status: 'pending', dueDate: '2026-02-10' },
      { id: 'd11', title: 'Montreal Flower Delivery', description: 'Westmount Florist recommended - arrange delivery for Feb 14', status: 'pending', dueDate: '2026-02-10' },
      { id: 'd12', title: 'Card + Message', description: 'Draft personalized message for approval', status: 'ready-for-review', dueDate: '2026-02-10' }
    ]
  },
  {
    id: '6',
    name: 'Revenue App Build #1',
    description: 'First B2B SaaS app from Associate research - targeting quick revenue',
    status: 'in-progress',
    assignee: 'AppDev-Associate',
    category: 'Revenue',
    createdAt: '2026-02-04T21:00:00Z',
    updatedAt: '2026-02-04T21:00:00Z',
    priority: 'high',
    deliverables: [
      { id: 'd13', title: 'Select App Concept', description: 'Choose from 5 researched ideas (recommend: AI Contract Review or Aviation Compliance)', status: 'ready-for-review', dueDate: '2026-02-05' },
      { id: 'd14', title: 'MVP Build', description: 'Build and deploy first version', status: 'pending', dueDate: '2026-02-10' },
      { id: 'd15', title: 'Landing Page + Stripe', description: 'Payment processing ready', status: 'pending', dueDate: '2026-02-12' }
    ]
  },
  {
    id: '7',
    name: 'United Airlines Training Prep',
    description: 'Preparation for pilot training starting next month',
    status: 'queue',
    assignee: 'Yhanic',
    category: 'Aviation',
    createdAt: '2026-02-04T21:00:00Z',
    updatedAt: '2026-02-04T21:00:00Z',
    priority: 'medium',
    deliverables: [
      { id: 'd16', title: 'Schedule Review', description: 'Confirm training dates and logistics', status: 'pending', dueDate: '2026-02-15' },
      { id: 'd17', title: 'Documentation', description: 'Gather required certs and paperwork', status: 'pending', dueDate: '2026-02-15' }
    ]
  },
  {
    id: '8',
    name: 'VC/PE Job Search',
    description: 'Traction for breaking into larger VC/PE firms',
    status: 'queue',
    assignee: 'Yhanic',
    category: 'VC/PE',
    createdAt: '2026-02-04T21:00:00Z',
    updatedAt: '2026-02-04T21:00:00Z',
    priority: 'medium',
    deliverables: [
      { id: 'd18', title: 'Network Outreach', description: 'Leverage Kellogg + DOD SkillBridge contacts', status: 'pending', dueDate: '2026-02-28' },
      { id: 'd19', title: 'Fundraising Materials', description: 'Pitch deck for small fund concept', status: 'pending', dueDate: '2026-02-28' }
    ]
  },
  {
    id: '9',
    name: 'AI Automation Business',
    description: 'Co-founded with Kellogg classmate - ongoing operations',
    status: 'queue',
    assignee: 'Associates',
    category: 'AI Business',
    createdAt: '2026-02-04T21:00:00Z',
    updatedAt: '2026-02-04T21:00:00Z',
    priority: 'medium',
    deliverables: [
      { id: 'd20', title: 'Client Pipeline', description: 'Identify and qualify leads', status: 'pending', dueDate: '2026-02-15' },
      { id: 'd21', title: 'Service Packages', description: 'Standardize AI automation offerings', status: 'pending', dueDate: '2026-02-15' }
    ]
  }
]

export function getStats(projects: Project[] = mockProjects): DashboardStats {
  return {
    totalProjects: projects.length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    readyForReview: projects.flatMap(p => p.deliverables).filter(d => d.status === 'ready-for-review').length,
    completedThisWeek: projects.filter(p => p.status === 'complete').length
  }
}

export function getProjectsByStatus(status: string, projects: Project[] = mockProjects): Project[] {
  return projects.filter(p => p.status === status)
}

export const categories = ['All', 'Revenue', 'Personal', 'VC/PE', 'Aviation', 'AI Business', 'Infrastructure'] as const
export const assignees = ['All', 'Donna', 'AppDev-Associate', 'SocialMedia-Associate', 'Yhanic', 'Associates'] as const

// Golden Prison Escape Metrics
export const goldenPrisonMetrics: GoldenPrisonMetrics = {
  vcNetworkOutreach: {
    contactsMadeThisMonth: 12,
    meetingsScheduled: 3,
    introductionsReceived: 2,
    target: 20,
    status: 'on-track'
  },
  dealFlowPipeline: {
    opportunitiesIdentified: 8,
    dealsReviewed: 4,
    termSheetsReceived: 0,
    target: 10,
    status: 'on-track'
  },
  sideBusinessRevenue: {
    currentMonth: 3500,
    lastMonth: 2800,
    growth: 25,
    target: 5000,
    status: 'on-track'
  },
  learningProgress: {
    booksReadThisMonth: 2,
    coursesCompleted: 1,
    skillsAcquired: ['Financial Modeling', 'Python Automation'],
    target: 4,
    status: 'at-risk'
  },
  overallStatus: 'sharp',
  lastUpdated: '2026-02-04T21:00:00Z'
}

// Associate Performance Data
export const associatePerformance: AssociatePerformance[] = [
  {
    associateId: 'appdev-1',
    name: 'AppDev Associate',
    role: 'Full-Stack Developer',
    avatar: '💻',
    tasksCompleted: 4,
    tasksInProgress: 2,
    deliverablesSubmitted: 5,
    deliverablesApproved: 4,
    timeSavedHours: 45,
    revenueGenerated: 0,
    revenueImpact: 'medium',
    currentTask: 'Building AI Contract Review MVP',
    nextTaskQueue: ['Aviation Compliance App', 'Landing Page + Stripe Integration'],
    trend: 'improving',
    lastActive: '2026-02-04T20:00:00Z'
  },
  {
    associateId: 'social-1',
    name: 'SocialMedia Associate',
    role: 'Content Strategist',
    avatar: '📱',
    tasksCompleted: 6,
    tasksInProgress: 1,
    deliverablesSubmitted: 7,
    deliverablesApproved: 6,
    timeSavedHours: 25,
    revenueGenerated: 0,
    revenueImpact: 'low',
    currentTask: 'Drafting LinkedIn post series',
    nextTaskQueue: ['Instagram carousel design', 'Content calendar for Feb'],
    trend: 'stable',
    lastActive: '2026-02-04T19:30:00Z'
  }
]

export const getAssociateStats = (): AssociateStats => ({
  associates: associatePerformance,
  totalTasksCompleted: associatePerformance.reduce((sum, a) => sum + a.tasksCompleted, 0),
  totalRevenueGenerated: associatePerformance.reduce((sum, a) => sum + a.revenueGenerated, 0),
  totalTimeSaved: associatePerformance.reduce((sum, a) => sum + a.timeSavedHours, 0),
  topPerformer: 'AppDev Associate',
  needsAttention: []
})
