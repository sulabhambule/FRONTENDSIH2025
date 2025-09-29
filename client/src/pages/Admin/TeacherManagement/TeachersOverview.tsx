import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

interface TeachersOverviewProps {
  stats: {
    totalTeachers: number
    activeTeachers: number
    onLeave: number
    averageRating: number
    totalApprovalsPending: number
    totalStudentsGuided: number
    totalClubsAdvised: number
    averageExperience: number
  }
}

export function TeachersOverview({ stats }: TeachersOverviewProps) {
  const overviewCards = [
    {
      title: "Total Faculty",
      value: stats.totalTeachers,
      change: "+3 this month",
      trend: "up",
      icon: Users,
      color: "bg-blue-600",
    },
    {
      title: "Active Faculty",
      value: stats.activeTeachers,
      change: `${((stats.activeTeachers / stats.totalTeachers) * 100).toFixed(1)}% active`,
      trend: "up",
      icon: Users,
      color: "bg-green-600",
    },
    {
      title: "Average Rating",
      value: stats.averageRating.toFixed(1),
      change: "+0.1 this semester",
      trend: "up",
      icon: Users,
      color: "bg-yellow-600",
    },
    {
      title: "Pending Approvals",
      value: stats.totalApprovalsPending,
      change: "-12 today",
      trend: "down",
      icon: Users,
      color: "bg-orange-600",
    },
    {
      title: "Students Guided",
      value: stats.totalStudentsGuided.toLocaleString(),
      change: "Total mentorship",
      trend: "neutral",
      icon: Users,
      color: "bg-purple-600",
    },
    {
      title: "Clubs Advised",
      value: stats.totalClubsAdvised,
      change: "Active clubs",
      trend: "neutral",
      icon: Users,
      color: "bg-pink-600",
    },
    {
      title: "Avg Experience",
      value: `${stats.averageExperience} yrs`,
      change: "Faculty experience",
      trend: "neutral",
      icon: Users,
      color: "bg-indigo-600",
    },
    {
      title: "On Leave",
      value: stats.onLeave,
      change: "Currently absent",
      trend: "neutral",
      icon: Users,
      color: "bg-gray-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {overviewCards.map((card, index) => (
        <Card key={index} className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-600 truncate">{card.title}</p>
              <p className="text-xl sm:text-2xl font-semibold text-gray-900 mt-1">{card.value}</p>
              <div className="mt-2">
                <Badge
                  variant="secondary"
                  className={`text-xs ${card.trend === "up"
                    ? "bg-green-100 text-green-700"
                    : card.trend === "down"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {card.change}
                </Badge>
              </div>
            </div>
            <div className={`w-10 h-10 sm:w-12 sm:h-12 ${card.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <card.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
