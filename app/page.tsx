import { mockProjects, getStats } from '@/lib/data'
import StatsCard from '@/components/StatsCard'
import KanbanBoard from '@/components/KanbanBoard'

export default function Dashboard() {
  const stats = getStats()

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">2nd Brain Dashboard</h1>
        <p className="text-gray-600">Command Center - All Associate Work</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatsCard title="Total Projects" value={stats.totalProjects} color="blue" />
        <StatsCard title="In Progress" value={stats.inProgress} color="yellow" />
        <StatsCard title="Ready for Review" value={stats.readyForReview} color="red" />
        <StatsCard title="Completed This Week" value={stats.completedThisWeek} color="green" />
      </div>

      {/* Kanban Board */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Board</h2>
        <div className="h-[calc(100vh-300px)]">
          <KanbanBoard projects={mockProjects} />
        </div>
      </div>
    </div>
  )
}
