"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock data - will be replaced with API data
const pendingApprovals = [
  {
    id: 1,
    title: "AWS Cloud Practitioner Certification",
    type: "Certification",
    submittedDate: "2024-03-12",
    approver: "Dr. Sarah Johnson",
    department: "Computer Science",
    priority: "high",
    daysWaiting: 3
  },
  {
    id: 2,
    title: "Hackathon Participation - TechFest 2024",
    type: "Competition",
    submittedDate: "2024-03-10",
    approver: "Prof. Mike Chen",
    department: "Engineering",
    priority: "medium",
    daysWaiting: 5
  },
  {
    id: 3,
    title: "Student Council Leadership Role",
    type: "Leadership",
    submittedDate: "2024-03-08",
    approver: "Dean Robert Smith",
    department: "Student Affairs",
    priority: "high",
    daysWaiting: 7
  },
  {
    id: 4,
    title: "Research Paper Publication",
    type: "Research",
    submittedDate: "2024-03-05",
    approver: "Dr. Lisa Wang",
    department: "Research Committee",
    priority: "low",
    daysWaiting: 10
  }
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700 border-red-200"
    case "medium":
      return "bg-yellow-100 text-yellow-700 border-yellow-200"
    case "low":
      return "bg-green-100 text-green-700 border-green-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Certification":
      return "🏆"
    case "Competition":
      return "🏁"
    case "Leadership":
      return "👑"
    case "Research":
      return "🔬"
    default:
      return "📋"
  }
}

export function PendingApprovals() {
  return (
    <Card className="border border-gray-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">Pending Approvals</CardTitle>
            <CardDescription className="text-gray-600">
              Activities awaiting review
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            {pendingApprovals.length} Pending
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {pendingApprovals.slice(0, 3).map((approval) => (
            <div key={approval.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <div className="flex items-start justify-between mb-3 gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="text-lg flex-shrink-0">{getTypeIcon(approval.type)}</div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-gray-800 mb-1 truncate pr-2">{approval.title}</h4>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                      <span>{approval.submittedDate}</span>
                      <span>•</span>
                      <span>{approval.daysWaiting} days waiting</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className={`${getPriorityColor(approval.priority)} text-xs flex-shrink-0 ml-2`}>
                  {approval.priority}
                </Badge>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 gap-3">
                <div className="text-sm text-gray-600 truncate flex-1 min-w-0 pr-2">
                  <span>{approval.approver} • {approval.department}</span>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:bg-gray-100 px-3">
                    Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {pendingApprovals.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">✅</div>
            <p className="text-gray-600">No pending approvals!</p>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-200">
          <Button variant="outline" className="w-full border-gray-200 text-gray-600 hover:bg-gray-50">
            View All Approvals
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}