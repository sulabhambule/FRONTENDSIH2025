"use client"

import { useState, useEffect } from "react"
import { Users, BookOpen, Trophy, Clock, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Import components
import { StatCard } from "./StatCard"
import { AssignedClasses } from "./AssignedClasses"
import { QuickActions } from "./QuickActions"
import { PendingApprovals } from "./PendingApprovals"

// Import data
import dashboardData from "./dashboard.json"

export function Dashboard() {
  const [data] = useState(dashboardData)
  // const [loading, setLoading] = useState(false)

  useEffect(() => {
    // TODO: Replace with actual API call
    // fetchDashboardData();
  }, [])

  /*
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const data = await api.getDashboardStats();
      setData(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };
  */

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Overview of your teaching activities and pending tasks</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs sm:text-sm text-gray-500">Last updated</p>
          <p className="text-xs sm:text-sm font-medium text-gray-900">{new Date().toLocaleString()}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
        <StatCard
          title="Total Classes"
          value={data.stats.totalClasses}
          icon={BookOpen}
          description="Assigned this semester"
        />
        <StatCard
          title="Total Students"
          value={data.stats.totalStudents}
          icon={Users}
          description="Across all classes"
        />
        <StatCard title="Club Advisor" value={data.stats.clubsAsAdvisor} icon={Trophy} description="Active clubs" />
        <StatCard
          title="Pending Approvals"
          value={data.stats.pendingApprovals}
          icon={Clock}
          description="Require your attention"
        />
        <StatCard
          title="Avg. Attendance"
          value={`${data.stats.averageAttendance}%`}
          icon={TrendingUp}
          description="This month"
          trend="+5% from last month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <AssignedClasses classes={data.assignedClasses} />
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <PendingApprovals approvals={data.pendingApprovals} />

        {/* Club Overview */}
        <Card className="animate-slide-up">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center text-base sm:text-lg">
              <Trophy className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 flex-shrink-0" />
              Club Advisor Role
            </CardTitle>
            <CardDescription className="text-sm">Clubs where you serve as faculty advisor</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {data.clubs.map((club) => (
                <div key={club.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm sm:text-base">{club.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{club.memberCount} active members</p>
                  </div>
                  <Button size="sm" variant="outline" className="w-full sm:w-auto">
                    Manage
                  </Button>
                </div>
              ))}
            </div>

            {/* Attendance Progress */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Overall Class Attendance</h4>
              <Progress value={data.stats.averageAttendance} className="mb-2" />
              <p className="text-xs sm:text-sm text-gray-600">{data.stats.averageAttendance}% average across all classes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="animate-slide-up">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg">Recent Activities</CardTitle>
          <CardDescription className="text-sm">Your latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-2 sm:space-y-3">
            {data.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                <div className="h-2 w-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-900 truncate">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
