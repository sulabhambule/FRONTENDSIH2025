"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Upload, CheckCircle, Clock, X, Plus, Eye, Users, Crown, Calendar, Award, UserCheck } from "lucide-react"

const memberClubs = [
  {
    id: 1,
    name: "Computer Science Club",
    role: "Member",
    joinDate: "2024-01-15",
    attendance: 85,
    totalMeetings: 20,
    attendedMeetings: 17,
    contributions: [
      {
        id: 1,
        title: "Website Development",
        description: "Developed the club's official website using React and Node.js",
        date: "2024-10-15",
        certificates: ["Web_Dev_Certificate.pdf"],
        status: "approved",
      },
      {
        id: 2,
        title: "Workshop Organization",
        description: "Helped organize the JavaScript fundamentals workshop",
        date: "2024-09-20",
        certificates: [],
        status: "pending",
      },
    ],
  },
  {
    id: 2,
    name: "Robotics Club",
    role: "Technical Lead",
    joinDate: "2024-02-01",
    attendance: 92,
    totalMeetings: 15,
    attendedMeetings: 14,
    contributions: [
      {
        id: 3,
        title: "Robot Competition",
        description: "Led team to victory in inter-college robotics competition",
        date: "2024-11-10",
        certificates: ["Robotics_Winner.pdf"],
        status: "approved",
      },
    ],
  },
]

const leadClubs = [
  {
    id: 3,
    name: "AI/ML Study Group",
    role: "President",
    joinDate: "2024-03-01",
    members: [
      { id: 1, name: "Alice Johnson", role: "Vice President", contributions: 8 },
      { id: 2, name: "Bob Smith", role: "Secretary", contributions: 5 },
      { id: 3, name: "Carol Davis", role: "Member", contributions: 3 },
      { id: 4, name: "David Wilson", role: "Member", contributions: 2 },
    ],
    pendingApprovals: [
      {
        id: 1,
        memberName: "Alice Johnson",
        contributionTitle: "ML Workshop Presentation",
        submissionDate: "2024-12-01",
      },
      {
        id: 2,
        memberName: "Bob Smith",
        contributionTitle: "Research Paper Summary",
        submissionDate: "2024-11-28",
      },
    ],
    monthlyReports: [
      {
        id: 1,
        month: "November 2024",
        activities: "Organized 3 workshops, 2 guest lectures",
        status: "submitted",
      },
      {
        id: 2,
        month: "October 2024",
        activities: "Hackathon participation, study sessions",
        status: "approved",
      },
    ],
  },
]

export default function ClubsPage() {
  const [isContributionOpen, setIsContributionOpen] = useState(false)
  const [isReportOpen, setIsReportOpen] = useState(false)
  // const [selectedClub, setSelectedClub] = useState<(typeof memberClubs)[0] | null>(null)
  const [activeTab, setActiveTab] = useState("member")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "rejected":
        return <X className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const totalContributions = memberClubs.reduce((acc, club) => acc + club.contributions.length, 0)
  const approvedContributions = memberClubs.reduce(
    (acc, club) => acc + club.contributions.filter((c) => c.status === "approved").length,
    0,
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Club Activities & Management</h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Track club memberships, contributions, and leadership activities
                </p>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800 border border-blue-200 text-xs sm:text-sm">
              Extracurricular Records
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Active Clubs</CardTitle>
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">{memberClubs.length + leadClubs.length}</div>
              <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                <Crown className="h-2 w-2 sm:h-3 sm:w-3 text-purple-600" />
                <span className="hidden sm:inline">{leadClubs.length} leadership roles</span>
                <span className="sm:hidden">{leadClubs.length} lead</span>
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Total Contributions</CardTitle>
              <Award className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-xl sm:text-2xl font-bold text-green-600">{totalContributions}</div>
              <p className="text-xs text-gray-600">
                <span className="hidden sm:inline">{approvedContributions} approved contributions</span>
                <span className="sm:hidden">{approvedContributions} approved</span>
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Attendance Rate</CardTitle>
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-xl sm:text-2xl font-bold text-purple-600">
                {Math.round(memberClubs.reduce((acc, club) => acc + club.attendance, 0) / memberClubs.length)}%
              </div>
              <p className="text-xs text-gray-600">
                <span className="hidden sm:inline">Average across all clubs</span>
                <span className="sm:hidden">Average</span>
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Pending Approvals</CardTitle>
              <UserCheck className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-xl sm:text-2xl font-bold text-orange-600">
                {leadClubs.reduce((acc, club) => acc + club.pendingApprovals.length, 0)}
              </div>
              <p className="text-xs text-gray-600">
                <span className="hidden sm:inline">As club leader</span>
                <span className="sm:hidden">As leader</span>
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 border border-gray-200 rounded-lg p-1">
            <TabsTrigger
              value="member"
              className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-200 transition-all duration-200 text-xs sm:text-sm"
            >
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Club Memberships</span>
              <span className="sm:hidden">Memberships</span>
            </TabsTrigger>
            <TabsTrigger
              value="leader"
              className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-200 transition-all duration-200 text-xs sm:text-sm"
            >
              <Crown className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Leadership Roles</span>
              <span className="sm:hidden">Leadership</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="member" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Club Memberships & Contributions</h2>
                <p className="text-gray-600 text-sm sm:text-base">Your active club memberships and contribution records</p>
              </div>
              <Dialog open={isContributionOpen} onOpenChange={setIsContributionOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-sm">
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    <span className="hidden sm:inline">Add Contribution</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto mx-2 sm:mx-auto">
                  <DialogHeader className="pb-4 sm:pb-6">
                    <DialogTitle className="text-lg sm:text-xl">Add Club Contribution</DialogTitle>
                    <DialogDescription className="text-gray-600 text-sm">Record your contribution to club activities for approval.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-3 sm:gap-4 py-2 sm:py-4 px-1">
                    <div className="space-y-2">
                      <Label htmlFor="club" className="text-xs sm:text-sm font-medium text-gray-700">Club Name</Label>
                      <Select>
                        <SelectTrigger className="focus:ring-2 focus:ring-blue-500 text-sm">
                          <SelectValue placeholder="Select club" />
                        </SelectTrigger>
                        <SelectContent>
                          {memberClubs.map((club) => (
                            <SelectItem key={club.id} value={club.name}>
                              {club.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-xs sm:text-sm font-medium text-gray-700">Contribution Title</Label>
                      <Input id="title" placeholder="Brief title of your contribution" className="focus:ring-2 focus:ring-blue-500 text-sm" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-xs sm:text-sm font-medium text-gray-700">Description</Label>
                      <Textarea id="description" placeholder="Detailed description of your contribution" className="focus:ring-2 focus:ring-blue-500 text-sm" rows={3} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-xs sm:text-sm font-medium text-gray-700">Date</Label>
                      <Input id="date" type="date" className="focus:ring-2 focus:ring-blue-500 text-sm" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="certificates" className="text-xs sm:text-sm font-medium text-gray-700">Upload Certificates/Proof (Optional)</Label>
                      <div className="relative">
                        <input
                          type="file"
                          id="certificates"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          multiple
                        />
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors">
                          <Upload className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-xs sm:text-sm text-gray-600">Upload any certificates or proof of contribution</p>
                          <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG, DOC up to 5MB each</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter className="pt-4 sm:pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => setIsContributionOpen(false)} className="w-full sm:w-auto text-sm">
                      Cancel
                    </Button>
                    <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-sm" onClick={() => setIsContributionOpen(false)}>
                      Submit for Approval
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 sm:gap-6">
              {memberClubs.map((club) => (
                <Card key={club.id} className="border border-gray-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-base sm:text-lg">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                            </div>
                            <span>{club.name}</span>
                          </div>
                          <Badge
                            variant={club.role === "Technical Lead" ? "default" : "secondary"}
                            className={club.role === "Technical Lead"
                              ? "bg-purple-100 text-purple-800 border border-purple-300"
                              : "bg-blue-100 text-blue-800 border border-blue-300"
                            }
                          >
                            {club.role}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-gray-600">Member since {club.joinDate}</CardDescription>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-2xl font-bold text-green-600">{club.attendance}%</div>
                        <p className="text-xs text-green-700">Attendance Rate</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">Meeting Attendance</Label>
                        <div className="flex items-center gap-3">
                          <Progress value={club.attendance} className="h-3 flex-1 bg-gray-200" />
                          <span className="text-sm font-medium text-gray-600">
                            {club.attendedMeetings}/{club.totalMeetings}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">Contribution Summary</Label>
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">
                            {club.contributions.length} total • {" "}
                            {club.contributions.filter((c) => c.status === "approved").length} approved
                          </span>
                        </div>
                      </div>
                    </div>

                    {club.contributions.length > 0 && (
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">Recent Contributions</Label>
                        <div className="space-y-3">
                          {club.contributions.map((contribution) => (
                            <div key={contribution.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <div className="flex-1">
                                <div className="font-medium text-sm text-gray-800">{contribution.title}</div>
                                <div className="text-xs text-gray-600 mt-1">{contribution.date}</div>
                              </div>
                              <Badge
                                className={`${getStatusColor(contribution.status)} border`}
                              >
                                <div className="flex items-center gap-1">
                                  {getStatusIcon(contribution.status)}
                                  {contribution.status}
                                </div>
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leader" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Leadership Responsibilities</h2>
                <p className="text-gray-600">Manage your club leadership activities and member approvals</p>
              </div>
              <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Submit Monthly Report
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Submit Monthly Report</DialogTitle>
                    <DialogDescription>Submit your monthly club activity report.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="club-lead">Club</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select club" />
                        </SelectTrigger>
                        <SelectContent>
                          {leadClubs.map((club) => (
                            <SelectItem key={club.id} value={club.name}>
                              {club.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="month">Month</Label>
                      <Input id="month" type="month" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="activities">Activities Summary</Label>
                      <Textarea id="activities" placeholder="Summarize the club activities for this month..." rows={4} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="achievements">Key Achievements</Label>
                      <Textarea id="achievements" placeholder="List any notable achievements or milestones..." rows={3} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="challenges">Challenges & Solutions</Label>
                      <Textarea
                        id="challenges"
                        placeholder="Describe any challenges faced and how they were addressed..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsReportOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsReportOpen(false)}>
                      Submit Report
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6">
              {leadClubs.map((club) => (
                <Card key={club.id} className="border border-gray-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-3 text-lg">
                          <div className="p-2 bg-purple-50 rounded-lg border border-purple-200">
                            <Crown className="h-5 w-5 text-purple-600" />
                          </div>
                          {club.name}
                          <Badge className="bg-purple-100 text-purple-800 border border-purple-300">
                            {club.role}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-gray-600">Leading since {club.joinDate}</CardDescription>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-2xl font-bold text-blue-600">{club.members.length}</div>
                        <p className="text-xs text-blue-700">Active Members</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Members Management */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700">Club Members</Label>
                      <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-blue-50 border-b border-blue-200">
                              <TableHead className="text-blue-800 font-medium">Name</TableHead>
                              <TableHead className="text-blue-800 font-medium">Role</TableHead>
                              <TableHead className="text-blue-800 font-medium">Contributions</TableHead>
                              <TableHead className="text-blue-800 font-medium">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {club.members.map((member) => (
                              <TableRow key={member.id} className="hover:bg-blue-50">
                                <TableCell className="font-medium text-gray-800">{member.name}</TableCell>
                                <TableCell>
                                  <Badge className="bg-blue-100 text-blue-800 border border-blue-300">
                                    {member.role}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-gray-600">{member.contributions}</TableCell>
                                <TableCell>
                                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    {/* Pending Approvals */}
                    {club.pendingApprovals.length > 0 && (
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">Pending Approvals</Label>
                        <div className="space-y-3">
                          {club.pendingApprovals.map((approval) => (
                            <div key={approval.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                              <div>
                                <div className="font-medium text-sm text-gray-800">{approval.contributionTitle}</div>
                                <div className="text-xs text-gray-600 mt-1">
                                  by {approval.memberName} • {approval.submissionDate}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                                  <X className="h-4 w-4" />
                                </Button>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Monthly Reports */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700">Monthly Reports</Label>
                      <div className="space-y-3">
                        {club.monthlyReports.map((report) => (
                          <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div>
                              <div className="font-medium text-sm text-gray-800">{report.month}</div>
                              <div className="text-xs text-gray-600 mt-1">{report.activities}</div>
                            </div>
                            <Badge className={`${getStatusColor(report.status)} border`}>
                              {report.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
