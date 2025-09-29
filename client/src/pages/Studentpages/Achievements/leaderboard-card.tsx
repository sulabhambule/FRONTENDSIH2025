import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from "lucide-react"

const leaderboardData = [
  {
    rank: 1,
    name: "Sarah Johnson",
    points: 3250,
    avatar: "/placeholder.svg?key=sarah",
    badge: "Gold",
    change: "↑2",
  },
  {
    rank: 2,
    name: "Mike Chen",
    points: 2890,
    avatar: "/placeholder.svg?key=mike",
    badge: "Silver",
    change: "↓1",
  },
  {
    rank: 3,
    name: "John Smith",
    points: 2450,
    avatar: "/placeholder.svg?key=john",
    badge: "Bronze",
    change: "↑1",
    isCurrentUser: true,
  },
  {
    rank: 4,
    name: "Emma Davis",
    points: 2200,
    avatar: "/placeholder.svg?key=emma",
    badge: "",
    change: "↓2",
  },
  {
    rank: 5,
    name: "Alex Wilson",
    points: 2100,
    avatar: "/placeholder.svg?key=alex",
    badge: "",
    change: "→",
  },
]

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="h-4 w-4 text-yellow-600" />
    case 2:
      return <Medal className="h-4 w-4 text-gray-400" />
    case 3:
      return <Award className="h-4 w-4 text-amber-600" />
    default:
      return <span className="text-sm font-medium text-muted-foreground">#{rank}</span>
  }
}

function getBadgeColor(badge: string) {
  switch (badge) {
    case "Gold":
      return "bg-yellow-100 text-yellow-800"
    case "Silver":
      return "bg-gray-100 text-gray-800"
    case "Bronze":
      return "bg-amber-100 text-amber-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function LeaderboardCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Leaderboard</CardTitle>
        <CardDescription>Top performers in your year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboardData.map((student) => (
            <div
              key={student.rank}
              className={`flex items-center space-x-3 p-3 rounded-lg ${student.isCurrentUser ? "bg-primary/5 border border-primary/20" : "bg-muted/50"
                }`}
            >
              <div className="flex items-center justify-center w-8">{getRankIcon(student.rank)}</div>
              <Avatar className="h-8 w-8">
                <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                <AvatarFallback>
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${student.isCurrentUser ? "text-primary" : ""}`}>
                    {student.name}
                  </span>
                  {student.badge && (
                    <Badge variant="outline" className={getBadgeColor(student.badge)}>
                      {student.badge}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{student.points.toLocaleString()} pts</span>
                  <span
                    className={`${student.change.includes("↑")
                      ? "text-green-600"
                      : student.change.includes("↓")
                        ? "text-red-600"
                        : "text-muted-foreground"
                      }`}
                  >
                    {student.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
