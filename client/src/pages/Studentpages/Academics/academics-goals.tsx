import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Plus, Target, CheckCircle } from "lucide-react"

const goals = [
  {
    id: 1,
    title: "Maintain 3.8+ GPA",
    target: 3.8,
    current: 3.85,
    progress: 100,
    status: "achieved",
  },
  {
    id: 2,
    title: "Complete 60 Credits",
    target: 60,
    current: 45,
    progress: 75,
    status: "in-progress",
  },
  {
    id: 3,
    title: "Dean's List Recognition",
    target: 1,
    current: 1,
    progress: 100,
    status: "achieved",
  },
  {
    id: 4,
    title: "Graduate Magna Cum Laude",
    target: 3.7,
    current: 3.73,
    progress: 100,
    status: "on-track",
  },
]

export function AcademicGoals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Academic Goals
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Add Goal
          </Button>
        </CardTitle>
        <CardDescription>Track your academic objectives and milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {goal.status === "achieved" ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Target className="h-4 w-4 text-primary" />
                  )}
                  <span className="text-sm font-medium">{goal.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {goal.current}/{goal.target}
                </span>
              </div>
              <Progress value={goal.progress} className={`h-2 ${goal.status === "achieved" ? "bg-green-100" : ""}`} />
              <div className="text-xs text-muted-foreground">
                {goal.status === "achieved" && "✓ Goal achieved!"}
                {goal.status === "in-progress" && `${goal.progress}% complete`}
                {goal.status === "on-track" && "On track to achieve"}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
