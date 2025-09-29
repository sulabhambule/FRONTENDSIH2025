import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Calendar, BookOpen, Star } from "lucide-react"

const recentAchievements = [
  {
    id: 1,
    name: "Study Streak",
    description: "15 consecutive days active",
    icon: Star,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    date: "2024-12-10",
    points: 200,
  },
  {
    id: 2,
    name: "Course Master",
    description: "All CS 315 assignments completed",
    icon: BookOpen,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    date: "2024-12-05",
    points: 400,
  },
  {
    id: 3,
    name: "Dean's List",
    description: "GPA above 3.8 achieved",
    icon: Trophy,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    date: "2024-12-01",
    points: 500,
  },
  {
    id: 4,
    name: "Perfect Attendance",
    description: "100% attendance in November",
    icon: Calendar,
    color: "text-green-600",
    bgColor: "bg-green-100",
    date: "2024-11-30",
    points: 300,
  },
]

export function RecentAchievements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Achievements</CardTitle>
        <CardDescription>Your latest accomplishments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentAchievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
              <div className={`p-2 rounded-full ${achievement.bgColor}`}>
                <achievement.icon className={`h-4 w-4 ${achievement.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{achievement.name}</span>
                  <span className="text-xs text-muted-foreground">+{achievement.points}</span>
                </div>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                <p className="text-xs text-muted-foreground">{new Date(achievement.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
