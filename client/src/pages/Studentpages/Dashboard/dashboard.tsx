import { StatsCards } from "./stats-cards"
import { ActivityTracker } from "./activity-tracker"
import { RecentActivities } from "./recent-activities"
import { PortfolioProgress } from "./portfolio-progress"
import { QuickActions } from "./quick-actions"
import { PendingApprovals } from "./pending-approvals"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Simple Header - Mobile responsive */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">Student Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600">Track your academic activities and build your digital portfolio</p>
      </div>

      {/* Stats Overview */}
      <div className="mb-6 sm:mb-8">
        <StatsCards />
      </div>

      {/* Main Content Grid - Enhanced responsive layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column - 2/3 width on large screens */}
        <div className="xl:col-span-2 space-y-4 sm:space-y-6">
          <ActivityTracker />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <RecentActivities />
            <PendingApprovals />
          </div>
        </div>

        {/* Right Column - 1/3 width on large screens, full width on mobile */}
        <div className="xl:col-span-1 space-y-4 sm:space-y-6">
          <PortfolioProgress />
          <QuickActions />
        </div>
      </div>
    </div>
  )
}