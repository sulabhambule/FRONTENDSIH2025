import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, FileText } from "lucide-react"

const absenceRequests = [
  {
    id: 1,
    date: "2024-12-15",
    course: "CS 315",
    reason: "Medical Appointment",
    status: "approved",
    submittedDate: "2024-12-10",
  },
  {
    id: 2,
    date: "2024-12-20",
    course: "MATH 152",
    reason: "Family Emergency",
    status: "pending",
    submittedDate: "2024-12-12",
  },
  {
    id: 3,
    date: "2024-11-28",
    course: "PHYS 201",
    reason: "Conference Attendance",
    status: "approved",
    submittedDate: "2024-11-20",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "rejected":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function AbsenceRequests() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Absence Requests
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            New Request
          </Button>
        </CardTitle>
        <CardDescription>Manage your absence requests and approvals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {absenceRequests.map((request) => (
            <div key={request.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{request.course}</span>
                    <Badge variant="outline" className={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{request.reason}</p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                    <span>Date: {new Date(request.date).toLocaleDateString()}</span>
                    <span>Submitted: {new Date(request.submittedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <FileText className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {absenceRequests.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No absence requests submitted</p>
            <p className="text-sm">Click "New Request" to submit an absence request</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
