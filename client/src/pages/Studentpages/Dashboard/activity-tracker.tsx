"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Upload, ExternalLink } from "lucide-react"
import { AddActivityModal } from "@/components/modals/AddActivityModal"

// Mock data - will be replaced with API data
const recentActivities = [
  {
    id: 1,
    title: "Machine Learning Workshop",
    type: "Workshop",
    date: "2024-03-15",
    status: "approved",
    progress: 100
  },
  {
    id: 2,
    title: "Google Cloud Certification",
    type: "Certification",
    date: "2024-03-10",
    status: "pending",
    progress: 80
  },
  {
    id: 3,
    title: "IEEE Conference Presentation",
    type: "Conference",
    date: "2024-03-08",
    status: "approved",
    progress: 100
  },
  {
    id: 4,
    title: "Community Service - Tech Drive",
    type: "Volunteering",
    date: "2024-03-05",
    status: "under_review",
    progress: 60
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-700 border-green-200"
    case "pending":
      return "bg-yellow-100 text-yellow-700 border-yellow-200"
    case "under_review":
      return "bg-blue-100 text-blue-700 border-blue-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

export function ActivityTracker() {
  return (
    <Card className="border border-gray-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">Activity Tracker</CardTitle>
            <CardDescription className="text-gray-600">
              Manage your academic and extracurricular activities
            </CardDescription>
          </div>
          <AddActivityModal>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Activity
            </Button>
          </AddActivityModal>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-gray-800">{activity.title}</h4>
                    <Badge variant="outline" className={getStatusColor(activity.status)}>
                      {activity.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {activity.type} • {activity.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={activity.progress} className="flex-1 h-2" />
                    <span className="text-sm text-gray-600">{activity.progress}%</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:bg-gray-100">
                    <Upload className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:bg-gray-100">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <Button variant="outline" className="w-full border-gray-200 text-gray-600 hover:bg-gray-50">
            View All Activities
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}