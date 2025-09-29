import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const courseData = [
  {
    code: "CS 315",
    name: "Database Systems",
    grade: "A",
    percentage: 92,
    credits: 3,
    progress: 78,
    assignments: { completed: 7, total: 9 },
  },
  {
    code: "MATH 152",
    name: "Calculus II",
    grade: "A-",
    percentage: 89,
    credits: 4,
    progress: 82,
    assignments: { completed: 8, total: 10 },
  },
  {
    code: "PHYS 201",
    name: "Physics I",
    grade: "B+",
    percentage: 87,
    credits: 4,
    progress: 75,
    assignments: { completed: 6, total: 8 },
  },
  {
    code: "ENG 104",
    name: "Technical Writing",
    grade: "A",
    percentage: 94,
    credits: 2,
    progress: 85,
    assignments: { completed: 5, total: 6 },
  },
  {
    code: "CS 201",
    name: "Data Structures",
    grade: "B+",
    percentage: 85,
    credits: 3,
    progress: 80,
    assignments: { completed: 9, total: 11 },
  },
]

function getGradeColor(grade: string) {
  if (grade.startsWith("A")) return "bg-green-100 text-green-800"
  if (grade.startsWith("B")) return "bg-blue-100 text-blue-800"
  if (grade.startsWith("C")) return "bg-yellow-100 text-yellow-800"
  return "bg-red-100 text-red-800"
}

export function CoursePerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Courses</CardTitle>
        <CardDescription>Your performance in each course this semester</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courseData.map((course) => (
            <div key={course.code} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{course.code}</span>
                    <Badge variant="outline" className={getGradeColor(course.grade)}>
                      {course.grade}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{course.name}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{course.percentage}%</div>
                  <div className="text-xs text-muted-foreground">
                    {course.assignments.completed}/{course.assignments.total} assignments
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Course Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
