import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, GraduationCap, Trophy, Briefcase, TrendingUp, Star } from "lucide-react"

interface StudentsOverviewProps {
  stats: {
    totalStudents: number
    activeStudents: number
    graduatedStudents: number
    averageCGPA: number
    topPerformers: number
    placementReady: number
  }
}

export function StudentsOverview({ stats }: StudentsOverviewProps) {
  const overviewCards = [
    {
      title: "Total Students",
      value: stats.totalStudents.toLocaleString(),
      change: "+124 this month",
      trend: "up",
      icon: Users,
      color: "bg-admin-primary",
    },
    {
      title: "Active Students",
      value: stats.activeStudents.toLocaleString(),
      change: "95.5% active rate",
      trend: "up",
      icon: GraduationCap,
      color: "bg-admin-success",
    },
    {
      title: "Average CGPA",
      value: stats.averageCGPA.toFixed(1),
      change: "+0.2 this semester",
      trend: "up",
      icon: Star,
      color: "bg-admin-warning",
    },
    {
      title: "Top Performers",
      value: stats.topPerformers,
      change: "CGPA > 9.0",
      trend: "neutral",
      icon: Trophy,
      color: "bg-yellow-500",
    },
    {
      title: "Placement Ready",
      value: stats.placementReady,
      change: "82% readiness",
      trend: "up",
      icon: Briefcase,
      color: "bg-admin-info",
    },
    {
      title: "Graduated",
      value: stats.graduatedStudents,
      change: "This year",
      trend: "neutral",
      icon: TrendingUp,
      color: "bg-purple-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {overviewCards.map((card, index) => (
        <Card key={index} className="admin-metric-card p-6 admin-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-admin-muted-foreground">{card.title}</p>
              <p className="text-2xl font-bold text-admin-foreground mt-2">{card.value}</p>
              <div className="flex items-center mt-2">
                <Badge
                  variant="secondary"
                  className={`text-xs ${card.trend === "up"
                    ? "bg-admin-success/20 text-admin-success"
                    : card.trend === "down"
                      ? "bg-red-500/20 text-red-500"
                      : "bg-admin-muted text-admin-muted-foreground"
                    }`}
                >
                  {card.change}
                </Badge>
              </div>
            </div>
            <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
