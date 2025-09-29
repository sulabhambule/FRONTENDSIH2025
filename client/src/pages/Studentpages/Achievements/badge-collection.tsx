import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, BookOpen, Calendar, Users, Zap } from "lucide-react"

const badges = {
  earned: [
    {
      id: 1,
      name: "Dean's List",
      description: "Achieved GPA above 3.8",
      icon: Trophy,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      category: "academic",
      earnedDate: "2024-12-01",
      points: 500,
    },
    {
      id: 2,
      name: "Perfect Attendance",
      description: "100% attendance for a month",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100",
      category: "attendance",
      earnedDate: "2024-11-30",
      points: 300,
    },
    {
      id: 3,
      name: "Study Streak",
      description: "15 consecutive days of activity",
      icon: Zap,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      category: "engagement",
      earnedDate: "2024-12-10",
      points: 200,
    },
    {
      id: 4,
      name: "Course Master",
      description: "Completed all assignments in CS 315",
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      category: "academic",
      earnedDate: "2024-12-05",
      points: 400,
    },
    {
      id: 5,
      name: "Early Bird",
      description: "Never late to class for a semester",
      icon: Star,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      category: "attendance",
      earnedDate: "2024-11-15",
      points: 250,
    },
  ],
  available: [
    {
      id: 6,
      name: "Magna Cum Laude",
      description: "Maintain 3.7+ GPA for graduation",
      icon: Trophy,
      color: "text-gray-400",
      bgColor: "bg-gray-100",
      category: "academic",
      progress: 85,
      points: 1000,
    },
    {
      id: 7,
      name: "Social Butterfly",
      description: "Join 3 student organizations",
      icon: Users,
      color: "text-gray-400",
      bgColor: "bg-gray-100",
      category: "engagement",
      progress: 33,
      points: 300,
    },
    {
      id: 8,
      name: "Research Pioneer",
      description: "Complete a research project",
      icon: BookOpen,
      color: "text-gray-400",
      bgColor: "bg-gray-100",
      category: "academic",
      progress: 60,
      points: 600,
    },
  ],
}

export function BadgeCollection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Badge Collection</CardTitle>
        <CardDescription>Your earned achievements and available challenges</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="earned" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="earned">Earned ({badges.earned.length})</TabsTrigger>
            <TabsTrigger value="available">Available ({badges.available.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="earned" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {badges.earned.map((badge) => (
                <div key={badge.id} className="flex items-center space-x-4 p-4 rounded-lg border bg-card">
                  <div className={`p-3 rounded-full ${badge.bgColor}`}>
                    <badge.icon className={`h-6 w-6 ${badge.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{badge.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        +{badge.points} pts
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Earned: {new Date(badge.earnedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="available" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {badges.available.map((badge) => (
                <div key={badge.id} className="flex items-center space-x-4 p-4 rounded-lg border bg-card opacity-75">
                  <div className={`p-3 rounded-full ${badge.bgColor}`}>
                    <badge.icon className={`h-6 w-6 ${badge.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{badge.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {badge.points} pts
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{badge.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${badge.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
