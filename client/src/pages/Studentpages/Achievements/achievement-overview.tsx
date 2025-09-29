import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Star, Target, Zap } from "lucide-react"

const achievementStats = [
  {
    title: "Total Badges",
    value: "12",
    change: "+3",
    changeType: "positive" as const,
    icon: Trophy,
    description: "earned this semester",
  },
  {
    title: "Achievement Points",
    value: "2,450",
    change: "+180",
    changeType: "positive" as const,
    icon: Star,
    description: "total points",
  },
  {
    title: "Milestones Completed",
    value: "8",
    change: "+2",
    changeType: "positive" as const,
    icon: Target,
    description: "out of 15 total",
  },
  {
    title: "Current Streak",
    value: "15",
    change: "+1",
    changeType: "positive" as const,
    icon: Zap,
    description: "days active",
  },
]

export function AchievementOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {achievementStats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={`${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                {stat.change}
              </span>{" "}
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
