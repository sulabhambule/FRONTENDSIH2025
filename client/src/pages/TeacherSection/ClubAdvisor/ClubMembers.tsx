import { Plus, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Member {
  id: string
  name: string
  rollNumber: string
  role: string
  joinDate: string
  attendance: number
  contributions: number
  clubId: string
}

interface ClubMembersProps {
  members: Member[]
  selectedClub: { id: string; name: string }
}

export function ClubMembers({ members, selectedClub }: ClubMembersProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Club Members</h3>
          <p className="text-gray-600">Manage {selectedClub.name} members and roles</p>
        </div>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      <Card className="animate-slide-up">
        <CardContent className="p-0">
          <div className="space-y-0">
            {members.map((member, index) => (
              <div
                key={member.id}
                className={`flex items-center justify-between p-4 ${
                  index !== members.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.rollNumber}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <Badge
                    variant={
                      member.role === "President"
                        ? "default"
                        : member.role === "Vice President"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {member.role}
                  </Badge>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{member.attendance}%</p>
                    <p className="text-xs text-gray-500">Attendance</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{member.contributions}</p>
                    <p className="text-xs text-gray-500">Contributions</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
