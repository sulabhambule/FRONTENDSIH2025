import { StatsCards } from "./stats-cards"
import { ActivityTracker } from "./activity-tracker"
import { RecentActivities } from "./recent-activities"
import { PortfolioProgress } from "./portfolio-progress"
import { QuickActions } from "./quick-actions"
import { PendingApprovals } from "./pending-approvals"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Simple Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Student Dashboard</h1>
        <p className="text-gray-600">Track your academic activities and build your digital portfolio</p>
      </div>

      {/* Stats Overview */}
      <div className="mb-8">
        <StatsCards />
      </div>

      {/* Main Content Grid - Fixed responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-6">
          <ActivityTracker />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentActivities />
            <PendingApprovals />
          </div>
        </div>

        {/* Right Column - 1/3 width on large screens, full width on mobile */}
        <div className="lg:col-span-1 space-y-6">
          <PortfolioProgress />
          <QuickActions />
        </div>
      </div>
    </div>
  )
}