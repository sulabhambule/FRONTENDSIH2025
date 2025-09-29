
import { Users, CheckCircle, Calendar, Trophy } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Club {
  id: string
  name: string
  description: string
  memberCount: number
  activeMembers: number
  establishedDate: string
  category: string
  status: string
}

interface ClubOverviewProps {
  selectedClub: Club
  clubApprovals: any[]
  clubEvents: any[]
}

export function ClubOverview({ selectedClub, clubApprovals, clubEvents }: ClubOverviewProps) {
  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="animate-slide-up">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-4 w-4 text-blue-600" />
              Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{selectedClub.memberCount}</div>
            <p className="text-sm text-gray-600">{selectedClub.activeMembers} active</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{clubApprovals.length}</div>
            <p className="text-sm text-gray-600">Pending review</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-purple-600" />
              Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{clubEvents.length}</div>
            <p className="text-sm text-gray-600">This semester</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Trophy className="mr-2 h-4 w-4 text-yellow-600" />
              Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-gray-900">{selectedClub.category}</div>
            <p className="text-sm text-gray-600">Since {new Date(selectedClub.establishedDate).getFullYear()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Summary and Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest club activities and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { activity: "AI/ML Workshop completed", time: "2 days ago", type: "event" },
                { activity: "New member Alice Brown joined", time: "3 days ago", type: "member" },
                { activity: "Hackathon certificate approved", time: "5 days ago", type: "approval" },
                { activity: "Monthly report submitted", time: "1 week ago", type: "report" },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div
                    className={`h-2 w-2 rounded-full ${item.type === "event"
                      ? "bg-purple-500"
                      : item.type === "member"
                        ? "bg-blue-500"
                        : item.type === "approval"
                          ? "bg-green-500"
                          : "bg-orange-500"
                      }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{item.activity}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle>Member Engagement</CardTitle>
            <CardDescription>Club member participation statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Active Participation</span>
                  <span className="text-sm font-medium">88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Event Attendance</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Contribution Rate</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
