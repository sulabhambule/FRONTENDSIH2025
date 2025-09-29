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
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center text-base sm:text-lg">
          <BookOpen className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
          Assigned Classes
        </CardTitle>
        <CardDescription className="text-sm">Your current semester teaching assignments</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{classItem.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {classItem.subject} • {classItem.semester}
                </p>
                <p className="text-xs text-gray-500 mt-1">{classItem.schedule}</p>
              </div>
              <div className="flex flex-col sm:text-right gap-2">
                <Badge variant="secondary" className="w-fit text-xs">
                  {classItem.studentCount} students
                </Badge>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    <Upload className="h-3 w-3 mr-1 flex-shrink-0" />
                    Upload
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    <Eye className="h-3 w-3 mr-1 flex-shrink-0" />
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
