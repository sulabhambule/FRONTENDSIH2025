import type React from "react"
import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "../../../lib/utils"
import type { SystemStats, QuickStat } from "@/types/admin"

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  trend?: "up" | "down" | "neutral"
  icon?: React.ReactNode
}

function StatCard({ title, value, change, trend, icon }: StatCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-admin-success" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-admin-muted-foreground" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-admin-success"
      case "down":
        return "text-red-500"
      default:
        return "text-admin-muted-foreground"
    }
  }

  return (
    <Card className="admin-metric-card p-6 admin-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-admin-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-admin-foreground mt-2">{value}</p>
          {change && (
            <div className="flex items-center mt-2 space-x-1">
              {getTrendIcon()}
              <span className={cn("text-sm font-medium", getTrendColor())}>{change}</span>
            </div>
          )}
        </div>
        {icon && <div className="text-admin-primary">{icon}</div>}
      </div>
    </Card>
  )
}

interface StatsOverviewProps {
  stats: SystemStats
  quickStats: QuickStat[]
}

export function StatsOverview({ stats, quickStats }: StatsOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.totalStudents.toLocaleString()}
          change="+124 this month"
          trend="up"
        />
        <StatCard title="Total Teachers" value={stats.totalTeachers} change="+3 this month" trend="up" />
        <StatCard title="Active Clubs" value={stats.totalClubs} change="No change" trend="neutral" />
        <StatCard title="Pending Approvals" value={stats.pendingApprovals} change="-12 today" trend="down" />
      </div>

      {/* Secondary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Activities"
          value={stats.totalActivities.toLocaleString()}
          change="+89 this week"
          trend="up"
        />
        <StatCard title="Average CGPA" value={stats.averageCGPA.toFixed(1)} change="+0.2 this sem" trend="up" />
        <StatCard title="Placement Rate" value={`${stats.placementRate}%`} change="+2.3% this year" trend="up" />
        <StatCard title="Active Projects" value={stats.activeProjects} change="+15 this month" trend="up" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <StatCard key={index} title={stat.label} value={stat.value} change={stat.change} trend={stat.trend} />
        ))}
      </div>
    </div>
  )
}
