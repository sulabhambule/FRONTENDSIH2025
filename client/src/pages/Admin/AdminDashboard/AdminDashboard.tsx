import type { SystemStats, RecentActivityItem, QuickStat } from "@/types/admin"
import { StatsOverview } from "./StatsOverview"
import { BestPerformers } from "./BestPerformers"
import { QuickActions } from "./QuickActions"
import { RecentActivity } from "./RecentActivity"
import dashboardData from "./dashboard.json"

export function AdminDashboard() {
  // TODO: Replace with actual API calls
  /*
  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard')
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      return dashboardData
    }
  }
  */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Page Header */}
        <div className="admin-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 mt-3 text-lg">
                Comprehensive overview of your college management system
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-white/80 backdrop-blur-sm border border-blue-200/60 rounded-xl px-4 py-2 shadow-lg">
                <p className="text-sm text-slate-500">Last Updated</p>
                <p className="font-semibold text-slate-700">{new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* System Statistics */}
        <div className="admin-fade-in transform hover:scale-[1.01] transition-all duration-300">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-blue-200/60 shadow-xl p-6">
            <StatsOverview stats={dashboardData.systemStats as SystemStats} quickStats={dashboardData.quickStats as QuickStat[]} />
          </div>
        </div>

        {/* Best Performers Section */}
        <div className="admin-fade-in">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                This Month's Highlights
              </h2>
              <p className="text-slate-600 mt-1">Outstanding performers across the institution</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-medium">
              September 2025
            </div>
          </div>
          <div className="transform hover:scale-[1.01] transition-all duration-300">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-blue-200/60 shadow-xl overflow-hidden">
              <BestPerformers bestPerformers={dashboardData.bestPerformers} />
            </div>
          </div>
        </div>

        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="transform hover:scale-[1.02] transition-all duration-300">
            <QuickActions />
          </div>
          <div className="transform hover:scale-[1.02] transition-all duration-300">
            <RecentActivity activities={dashboardData.recentActivities as RecentActivityItem[]} />
          </div>
        </div>
      </div>
    </div>
  )
}
