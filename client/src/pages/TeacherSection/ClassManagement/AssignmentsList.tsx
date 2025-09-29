import { CheckCircle, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Assignment {
  id: string
  title: string
  classId: string
  dueDate: string
  submissions: number
  totalStudents: number
  status: string
}

interface AssignmentsListProps {
  assignments: Assignment[]
}

export function AssignmentsList({ assignments }: AssignmentsListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Assignments</h3>
          <p className="text-gray-600">Manage and review student assignments</p>
        </div>
        <Button className="education-gradient text-white">Create Assignment</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="animate-slide-up">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  <CardDescription>Due: {assignment.dueDate}</CardDescription>
                </div>
                <Badge variant={assignment.status === "active" ? "default" : "secondary"}>{assignment.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Submissions</span>
                    <span className="text-sm font-medium">
                      {assignment.submissions}/{assignment.totalStudents}
                    </span>
                  </div>
                  <Progress value={(assignment.submissions / assignment.totalStudents) * 100} className="h-2" />
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <CheckCircle className="mr-2 h-3 w-3" />
                    Review ({assignment.submissions})
                  </Button>
                  <Button size="sm" variant="outline">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
