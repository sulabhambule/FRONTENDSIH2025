import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Users, Award } from "lucide-react"

interface BestPerformersProps {
  bestPerformers: {
    student: {
      id: string
      name: string
      department: string
      year: number
      totalPoints: number
      activities: number
      cgpa: number
      profileImage?: string
    }
    teacher: {
      id: string
      name: string
      department: string
      studentsGuided: number
      clubsAdvised: number
      rating: number
      profileImage?: string
    }
    department: {
      name: string
      totalPoints: number
      students: number
      averageCGPA: number
      placementRate: number
    }
  }
}

export function BestPerformers({ bestPerformers }: BestPerformersProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Best Student */}
      <Card className="admin-metric-card p-6 admin-fade-in">
        <div className="flex items-center space-x-2 mb-4">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-admin-foreground">Student of the Month</h3>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-admin-primary rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {bestPerformers.student.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-admin-foreground">{bestPerformers.student.name}</h4>
            <p className="text-sm text-admin-muted-foreground">
              {bestPerformers.student.department} • Year {bestPerformers.student.year}
            </p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-admin-muted-foreground">Total Points</span>
            <Badge variant="secondary" className="bg-admin-success text-white">
              {bestPerformers.student.totalPoints}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-admin-muted-foreground">Activities</span>
            <span className="text-sm font-medium text-admin-foreground">{bestPerformers.student.activities}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-admin-muted-foreground">CGPA</span>
            <span className="text-sm font-medium text-admin-foreground">{bestPerformers.student.cgpa}</span>
          </div>
        </div>
      </Card>

      {/* Best Teacher */}
      <Card className="admin-metric-card p-6 admin-fade-in">
        <div className="flex items-center space-x-2 mb-4">
          <Star className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-admin-foreground">Teacher of the Month</h3>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-admin-primary rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {bestPerformers.teacher.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-admin-foreground">{bestPerformers.teacher.name}</h4>
            <p className="text-sm text-admin-muted-foreground">{bestPerformers.teacher.department}</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-admin-muted-foreground">Students Guided</span>
            <span className="text-sm font-medium text-admin-foreground">{bestPerformers.teacher.studentsGuided}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-admin-muted-foreground">Clubs Advised</span>
            <span className="text-sm font-medium text-admin-foreground">{bestPerformers.teacher.clubsAdvised}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-admin-muted-foreground">Rating</span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-admin-foreground">{bestPerformers.teacher.rating}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Best Department */}
      <Card className="admin-metric-card p-6 admin-fade-in">
        <div className="flex items-center space-x-2 mb-4">
          <Award className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-semibold text-admin-foreground">Top Department</h3>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-admin-success rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-admin-foreground">{bestPerformers.department.name}</h4>
            <p className="text-sm text-admin-muted-foreground">{bestPerformers.department.students} students</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-admin-muted-foreground">Total Points</span>
            <Badge variant="secondary" className="bg-admin-success text-white">
              {bestPerformers.department.totalPoints.toLocaleString()}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-admin-muted-foreground">Avg CGPA</span>
            <span className="text-sm font-medium text-admin-foreground">{bestPerformers.department.averageCGPA}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-admin-muted-foreground">Placement Rate</span>
            <span className="text-sm font-medium text-admin-foreground">
              {bestPerformers.department.placementRate}%
            </span>
          </div>
        </div>
      </Card>
    </div>
  )
}
