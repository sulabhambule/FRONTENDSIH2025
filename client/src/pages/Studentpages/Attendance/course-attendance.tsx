import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const courseAttendanceData = [
  {
    code: "CS 315",
    name: "Database Systems",
    attended: 9,
    total: 10,
    percentage: 90,
    status: "good",
    lastClass: "Present",
  },
  {
    code: "MATH 152",
    name: "Calculus II",
    attended: 12,
    total: 12,
    percentage: 100,
    status: "excellent",
    lastClass: "Present",
  },
  {
    code: "PHYS 201",
    name: "Physics I",
    attended: 7,
    total: 9,
    percentage: 78,
    status: "warning",
    lastClass: "Absent",
  },
  {
    code: "ENG 104",
    name: "Technical Writing",
    attended: 8,
    total: 8,
    percentage: 100,
    status: "excellent",
    lastClass: "Present",
  },
  {
    code: "CS 201",
    name: "Data Structures",
    attended: 11,
    total: 11,
    percentage: 100,
    status: "excellent",
    lastClass: "Late",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "excellent":
      return "bg-green-100 text-green-800"
    case "good":
      return "bg-blue-100 text-blue-800"
    case "warning":
      return "bg-yellow-100 text-yellow-800"
    case "critical":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function getLastClassColor(lastClass: string) {
  switch (lastClass) {
    case "Present":
      return "text-green-600"
    case "Late":
      return "text-yellow-600"
    case "Absent":
      return "text-red-600"
    default:
      return "text-muted-foreground"
  }
}

export function CourseAttendance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Attendance</CardTitle>
        <CardDescription>Attendance breakdown by individual courses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courseAttendanceData.map((course) => (
            <div key={course.code} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{course.code}</span>
                    <Badge variant="outline" className={getStatusColor(course.status)}>
                      {course.percentage}%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{course.name}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {course.attended}/{course.total} classes
                  </div>
                  <div className={`text-xs ${getLastClassColor(course.lastClass)}`}>Last: {course.lastClass}</div>
                </div>
              </div>
              <Progress value={course.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
