import { Project, DashboardStats } from '@/types'

export const mockProjects: Project[] = [
  {
    id: '1',
    name: '2nd Brain Dashboard',
    description: 'Project management dashboard to monitor all Associate work',
    status: 'in-progress',
    assignee: 'Donna',
    createdAt: '2026-02-04T08:00:00Z',
    updatedAt: '2026-02-04T08:00:00Z',
    priority: 'high',
    deliverables: [
      { id: 'd1', title: 'Dashboard UI', description: 'Main dashboard interface', status: 'in-progress', dueDate: '2026-02-04' },
      { id: 'd2', title: 'Project Tracking', description: 'Queue/In Progress/Complete board', status: 'pending', dueDate: '2026-02-04' },
      { id: 'd3', title: 'Associate Integration', description: 'Connect to OpenClaw session data', status: 'pending', dueDate: '2026-02-05' }
    ]
  },
  {
    id: '2',
    name: 'SaaS Market Research',
    description: 'Research revenue-generating app opportunities',
    status: 'complete',
    assignee: 'AppDev-Associate',
    createdAt: '2026-02-03T22:00:00Z',
    updatedAt: '2026-02-03T22:15:00Z',
    priority: 'high',
    deliverables: [
      { id: 'd4', title: 'Market Analysis Report', description: '5 SaaS concepts with revenue potential', status: 'approved', dueDate: '2026-02-04', completedAt: '2026-02-03T22:15:00Z' }
    ]
  },
  {
    id: '3',
    name: 'Social Media Brand Strategy',
    description: 'LinkedIn and Instagram content strategy for Yhanic',
    status: 'complete',
    assignee: 'SocialMedia-Associate',
    createdAt: '2026-02-03T22:00:00Z',
    updatedAt: '2026-02-03T22:05:00Z',
    priority: 'medium',
    deliverables: [
      { id: 'd5', title: 'LinkedIn Drafts', description: '3 posts ready for review', status: 'ready-for-review', dueDate: '2026-02-04' },
      { id: 'd6', title: 'Content Calendar', description: '2-week schedule', status: 'approved', dueDate: '2026-02-04' },
      { id: 'd7', title: 'Instagram Strategy', description: '10-page brand strategy doc', status: 'approved', dueDate: '2026-02-04' }
    ]
  },
  {
    id: '4',
    name: 'Outlook Calendar Integration',
    description: 'Fix calendar monitoring across all calendars',
    status: 'complete',
    assignee: 'Donna',
    createdAt: '2026-02-04T06:00:00Z',
    updatedAt: '2026-02-04T07:15:00Z',
    priority: 'urgent',
    deliverables: [
      { id: 'd8', title: 'Outlook API Connection', description: 'Microsoft Outlook calendar access', status: 'approved', dueDate: '2026-02-04' }
    ]
  },
  {
    id: '5',
    name: 'Valentine\'s Day Planning',
    description: 'Coordinate gifts and logistics for Alexa',
    status: 'in-progress',
    assignee: 'Donna',
    createdAt: '2026-02-03T21:00:00Z',
    updatedAt: '2026-02-04T07:30:00Z',
    priority: 'high',
    deliverables: [
      { id: 'd9', title: 'Celine Perfume Order', description: 'Order Parade EDP from celine.com', status: 'in-progress', dueDate: '2026-02-10' },
      { id: 'd10', title: 'Flower Delivery', description: 'Arrange Montreal flower delivery', status: 'pending', dueDate: '2026-02-10' },
      { id: 'd11', title: 'Card Message', description: 'Draft card for approval', status: 'ready-for-review', dueDate: '2026-02-10' }
    ]
  }
]

export function getStats(): DashboardStats {
  return {
    totalProjects: mockProjects.length,
    inProgress: mockProjects.filter(p => p.status === 'in-progress').length,
    readyForReview: mockProjects.flatMap(p => p.deliverables).filter(d => d.status === 'ready-for-review').length,
    completedThisWeek: mockProjects.filter(p => p.status === 'complete').length
  }
}

export function getProjectsByStatus(status: string): Project[] {
  return mockProjects.filter(p => p.status === status)
}
