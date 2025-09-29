import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Award, Clock, CheckCircle } from "lucide-react"

// Updated stats for Smart Student Hub - focusing on activity tracking
const statsData = [
  {
    title: "Total Activities",
    value: "47",
    change: "+8",
    changeType: "positive" as const,
    icon: FileText,
    description: "documented this semester",
  },
  {
    title: "Certificates Earned",
    value: "12",
    change: "+3",
    changeType: "positive" as const,
    icon: Award,
    description: "verified achievements",
  },
  {
    title: "Pending Approvals",
    value: "5",
    change: "-2",
    changeType: "positive" as const,
    icon: Clock,
    description: "awaiting faculty review",
  },
  {
    title: "Portfolio Completeness",
    value: "78%",
    change: "+15%",
    changeType: "positive" as const,
    icon: CheckCircle,
    description: "profile completion",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <Card key={stat.title} className="border border-gray-200 bg-white hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${index === 0 ? 'bg-blue-50 text-blue-600' :
                index === 1 ? 'bg-green-50 text-green-600' :
                  index === 2 ? 'bg-yellow-50 text-yellow-600' :
                    'bg-purple-50 text-purple-600'
              }`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="flex items-center text-xs">
              <span className={`font-medium ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"} mr-1`}>
                {stat.change}
              </span>
              <span className="text-gray-500">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
