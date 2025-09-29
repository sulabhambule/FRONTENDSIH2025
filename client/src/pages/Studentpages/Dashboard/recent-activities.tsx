import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

// Mock data - will be replaced with API data
const recentActivities = [
  {
    id: 1,
    title: "Completed Machine Learning Course",
    type: "Course",
    timestamp: "2 hours ago",
    status: "completed",
    description: "Successfully completed Advanced ML course with 95% score"
  },
  {
    id: 2,
    title: "Submitted Research Paper",
    type: "Research",
    timestamp: "1 day ago",
    status: "pending",
    description: "Paper on AI Ethics submitted to IEEE conference"
  },
  {
    id: 3,
    title: "Joined Coding Club",
    type: "Club",
    timestamp: "2 days ago",
    status: "approved",
    description: "Became an active member of University Coding Club"
  },
  {
    id: 4,
    title: "Volunteered at Tech Expo",
    type: "Volunteering",
    timestamp: "3 days ago",
    status: "verified",
    description: "10 hours of community service at annual tech exhibition"
  },
  {
    id: 5,
    title: "Workshop: Cloud Computing",
    type: "Workshop",
    timestamp: "1 week ago",
    status: "completed",
    description: "Attended AWS cloud computing fundamentals workshop"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
    case "verified":
    case "approved":
      return "bg-green-100 text-green-700 border-green-200"
    case "pending":
      return "bg-yellow-100 text-yellow-700 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

const getTypeEmoji = (type: string) => {
  switch (type) {
    case "Course":
      return "📚"
    case "Research":
      return "🔬"
    case "Club":
      return "👥"
    case "Volunteering":
      return "🤝"
    case "Workshop":
      return "🛠️"
    default:
      return "📋"
  }
}

export function RecentActivities() {
  return (
    <Card className="border border-gray-200 bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Recent Activities</CardTitle>
        <CardDescription className="text-gray-600">
          Your latest academic updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentActivities.slice(0, 4).map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
              <div className="text-lg flex-shrink-0">{getTypeEmoji(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-800 truncate">{activity.title}</h4>
                  <Badge variant="outline" className={`${getStatusColor(activity.status)} text-xs flex-shrink-0`}>
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{activity.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100 h-6 px-2">
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <Button variant="outline" className="w-full border-gray-200 text-gray-600 hover:bg-gray-50">
            View All Activities
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
