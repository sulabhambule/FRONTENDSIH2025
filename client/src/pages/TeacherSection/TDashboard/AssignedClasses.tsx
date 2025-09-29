import { BookOpen, Upload, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Class {
  id: string
  name: string
  subject: string
  semester: string
  studentCount: number
  schedule: string
}

interface AssignedClassesProps {
  classes: Class[]
}

export function AssignedClasses({ classes }: AssignedClassesProps) {
  return (
    <Card className="lg:col-span-2 animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
          Assigned Classes
        </CardTitle>
        <CardDescription>Your current semester teaching assignments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{classItem.name}</h3>
                <p className="text-sm text-gray-600">
                  {classItem.subject} • {classItem.semester}
                </p>
                <p className="text-xs text-gray-500 mt-1">{classItem.schedule}</p>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="mb-2">
                  {classItem.studentCount} students
                </Badge>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Upload className="h-3 w-3 mr-1" />
                    Upload
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
