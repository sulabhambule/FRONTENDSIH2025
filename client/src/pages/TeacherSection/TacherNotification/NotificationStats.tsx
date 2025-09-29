import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Bell, MessageSquare, CheckCircle } from "lucide-react"

interface NotificationStatsProps {
  pendingTasks: any[]
  reminders: any[]
  messages: any[]
}

export const NotificationStats: React.FC<NotificationStatsProps> = ({ pendingTasks, reminders, messages }) => {
  const overdueTasks = pendingTasks.filter((task) => new Date(task.dueDate) < new Date()).length

  const urgentReminders = reminders.filter((reminder) => reminder.daysLeft <= 3).length

  const unreadMessages = messages.filter((message) => message.status === "unread").length

  const highPriorityItems = [
    ...pendingTasks.filter((task) => task.priority === "high"),
    ...reminders.filter((reminder) => reminder.priority === "high"),
    ...messages.filter((message) => message.priority === "high"),
  ].length

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{overdueTasks}</div>
              <div className="text-sm text-gray-600">Overdue Tasks</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Bell className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">{urgentReminders}</div>
              <div className="text-sm text-gray-600">Urgent Reminders</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{unreadMessages}</div>
              <div className="text-sm text-gray-600">Unread Messages</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{highPriorityItems}</div>
              <div className="text-sm text-gray-600">High Priority</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
