import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Award, FileText, Clock } from "lucide-react"
import type { RecentActivityItem } from "@/types/admin"

interface RecentActivityProps {
  activities: RecentActivityItem[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: RecentActivityItem['type']) => {
    switch (type) {
      case "approval":
        return <CheckCircle className="w-4 h-4 text-admin-success" />
      case "achievement":
        return <Award className="w-4 h-4 text-yellow-500" />
      case "report":
        return <FileText className="w-4 h-4 text-admin-primary" />
      default:
        return <Clock className="w-4 h-4 text-admin-muted-foreground" />
    }
  }

  const getActivityBadge = (type: RecentActivityItem['type']) => {
    switch (type) {
      case "approval":
        return <Badge className="bg-admin-success text-white">Approved</Badge>
      case "achievement":
        return <Badge className="bg-yellow-500 text-white">Achievement</Badge>
      case "report":
        return <Badge className="bg-admin-primary text-white">Report</Badge>
      default:
        return <Badge variant="secondary">Activity</Badge>
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <Card className="admin-metric-card p-6 admin-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-admin-foreground">Recent Activity</h3>
        <Badge variant="outline" className="text-admin-muted-foreground">
          {activities.length} items
        </Badge>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-4 p-3 rounded-lg hover:bg-admin-secondary transition-colors"
          >
            <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-admin-foreground truncate">{activity.title}</h4>
                {getActivityBadge(activity.type)}
              </div>
              <p className="text-sm text-admin-muted-foreground mb-2">{activity.description}</p>
              <div className="flex items-center justify-between text-xs text-admin-muted-foreground">
                <span>by {activity.user}</span>
                <span>{formatTimestamp(activity.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-admin-border">
        <button className="text-sm text-admin-primary hover:text-admin-primary/80 font-medium">
          View all activities →
        </button>
      </div>
    </Card>
  )
}
