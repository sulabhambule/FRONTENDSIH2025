import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react"

const attendanceData = [
  {
    title: "Overall Attendance",
    value: "94%",
    change: "+2%",
    changeType: "positive" as const,
    icon: CheckCircle,
    description: "this semester",
  },
  {
    title: "Classes Attended",
    value: "47",
    change: "+3",
    changeType: "positive" as const,
    icon: Calendar,
    description: "out of 50 total",
  },
  {
    title: "Absences",
    value: "3",
    change: "-1",
    changeType: "positive" as const,
    icon: XCircle,
    description: "this month",
  },
  {
    title: "Late Arrivals",
    value: "2",
    change: "0",
    changeType: "neutral" as const,
    icon: Clock,
    description: "this semester",
  },
]

export function AttendanceOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {attendanceData.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span
                className={`${stat.changeType === "positive"
                  ? "text-green-600"
                  : stat.changeType === "neutral"
                    ? "text-muted-foreground"
                    : "text-red-600"
                  }`}
              >
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
