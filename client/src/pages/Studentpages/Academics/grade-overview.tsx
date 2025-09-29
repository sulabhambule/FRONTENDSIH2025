import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

const gradeData = [
  {
    semester: "Fall 2024",
    gpa: 3.85,
    credits: 15,
    trend: "up",
    change: 0.12,
    status: "current",
  },
  {
    semester: "Spring 2024",
    gpa: 3.73,
    credits: 16,
    trend: "up",
    change: 0.08,
    status: "completed",
  },
  {
    semester: "Fall 2023",
    gpa: 3.65,
    credits: 15,
    trend: "down",
    change: -0.05,
    status: "completed",
  },
  {
    semester: "Spring 2023",
    gpa: 3.7,
    credits: 14,
    trend: "up",
    change: 0.15,
    status: "completed",
  },
]

export function GradeOverview() {
  const currentSemester = gradeData.find((item) => item.status === "current")
  const cumulativeGPA = 3.73

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Current GPA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{currentSemester?.gpa}</div>
          <div className="flex items-center space-x-1 text-xs">
            <TrendingUp className="h-3 w-3 text-green-600" />
            <span className="text-green-600">+{currentSemester?.change}</span>
            <span className="text-muted-foreground">from last semester</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Cumulative GPA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{cumulativeGPA}</div>
          <p className="text-xs text-muted-foreground">Overall academic performance</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Credits This Semester</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{currentSemester?.credits}</div>
          <p className="text-xs text-muted-foreground">Total credit hours</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Academic Standing</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
            Dean's List
          </Badge>
          <p className="text-xs text-muted-foreground mt-2">Excellent performance</p>
        </CardContent>
      </Card>
    </div>
  )
}
