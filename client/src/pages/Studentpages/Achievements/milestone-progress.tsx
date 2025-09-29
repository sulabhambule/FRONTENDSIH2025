import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, Clock } from "lucide-react"

const milestones = [
  {
    id: 1,
    title: "Freshman Year Completion",
    description: "Complete 30 credit hours with 3.0+ GPA",
    progress: 100,
    status: "completed",
    completedDate: "2023-05-15",
    points: 500,
  },
  {
    id: 2,
    title: "Sophomore Standing",
    description: "Complete 60 credit hours with 3.2+ GPA",
    progress: 75,
    status: "in-progress",
    targetDate: "2024-05-15",
    points: 750,
  },
  {
    id: 3,
    title: "Junior Year Excellence",
    description: "Complete 90 credit hours with 3.5+ GPA",
    progress: 45,
    status: "in-progress",
    targetDate: "2025-05-15",
    points: 1000,
  },
  {
    id: 4,
    title: "Senior Capstone",
    description: "Complete capstone project with distinction",
    progress: 0,
    status: "locked",
    targetDate: "2026-05-15",
    points: 1500,
  },
  {
    id: 5,
    title: "Graduation Ready",
    description: "Complete 120 credit hours with 3.7+ GPA",
    progress: 0,
    status: "locked",
    targetDate: "2026-05-15",
    points: 2000,
  },
]

function getStatusIcon(status: string) {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-5 w-5 text-green-600" />
    case "in-progress":
      return <Clock className="h-5 w-5 text-blue-600" />
    case "locked":
      return <Circle className="h-5 w-5 text-gray-400" />
    default:
      return <Circle className="h-5 w-5 text-gray-400" />
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "border-green-200 bg-green-50"
    case "in-progress":
      return "border-blue-200 bg-blue-50"
    case "locked":
      return "border-gray-200 bg-gray-50"
    default:
      return "border-gray-200 bg-gray-50"
  }
}

export function MilestoneProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Academic Milestones</CardTitle>
        <CardDescription>Track your progress through major academic achievements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative">
              {index < milestones.length - 1 && <div className="absolute left-6 top-12 w-0.5 h-16 bg-border"></div>}
              <div className={`flex items-start space-x-4 p-4 rounded-lg border ${getStatusColor(milestone.status)}`}>
                <div className="flex-shrink-0 mt-1">{getStatusIcon(milestone.status)}</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{milestone.title}</h3>
                    <span className="text-sm text-muted-foreground">+{milestone.points} pts</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>

                  {milestone.status === "completed" && (
                    <p className="text-xs text-green-600">
                      Completed: {new Date(milestone.completedDate!).toLocaleDateString()}
                    </p>
                  )}

                  {milestone.status === "in-progress" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{milestone.progress}%</span>
                      </div>
                      <Progress value={milestone.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Target: {new Date(milestone.targetDate!).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {milestone.status === "locked" && (
                    <p className="text-xs text-muted-foreground">
                      Unlocks: {new Date(milestone.targetDate!).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
