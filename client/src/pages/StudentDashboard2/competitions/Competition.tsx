"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, CheckCircle, Clock, X, Plus, Eye, Trophy, Medal, Award, Calendar, TrendingUp } from "lucide-react"

const competitions = [
  {
    id: 1,
    title: "TechFest 2024 Hackathon",
    category: "Programming",
    level: "National",
    date: "2024-11-15",
    organizer: "IIT Mumbai",
    position: "1st Place",
    teamSize: 4,
    description: "24-hour hackathon focused on AI/ML solutions for healthcare",
    skills: ["React", "Python", "Machine Learning", "API Development"],
    certificates: ["TechFest_Winner_Certificate.pdf", "Participation_Certificate.pdf"],
    status: "approved",
    approvedBy: "Dr. Smith",
    approvalDate: "2024-11-20",
    prize: "₹50,000 + Internship Opportunity",
  },
  {
    id: 2,
    title: "CodeChef Long Challenge",
    category: "Competitive Programming",
    level: "International",
    date: "2024-10-01",
    organizer: "CodeChef",
    position: "Top 100",
    teamSize: 1,
    description: "Monthly competitive programming contest with algorithmic challenges",
    skills: ["C++", "Data Structures", "Algorithms", "Problem Solving"],
    certificates: ["CodeChef_Certificate.pdf"],
    status: "pending",
    approvedBy: null,
    approvalDate: null,
    prize: "Certificate of Achievement",
  },
  {
    id: 3,
    title: "Smart India Hackathon",
    category: "Innovation",
    level: "National",
    date: "2024-09-20",
    organizer: "Government of India",
    position: "Finalist",
    teamSize: 6,
    description: "National level hackathon for solving real-world problems",
    skills: ["Full Stack Development", "IoT", "Mobile Development"],
    certificates: ["SIH_Finalist.pdf"],
    status: "approved",
    approvedBy: "Prof. Johnson",
    approvalDate: "2024-09-25",
    prize: "₹25,000 + Mentorship",
  },
  {
    id: 4,
    title: "Google Code Jam",
    category: "Competitive Programming",
    level: "International",
    date: "2024-08-15",
    organizer: "Google",
    position: "Round 2 Qualifier",
    teamSize: 1,
    description: "Google's annual competitive programming competition",
    skills: ["Python", "Algorithms", "Mathematics", "Logic"],
    certificates: ["Google_CodeJam.pdf"],
    status: "rejected",
    approvedBy: "Dr. Wilson",
    approvalDate: "2024-08-20",
    prize: "T-shirt + Certificate",
  },
]

export default function CompetitionsPage() {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [selectedCompetition, setSelectedCompetition] = useState<(typeof competitions)[0] | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterLevel, setFilterLevel] = useState("all")

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

  const getPositionColor = (position: string) => {
    if (position.includes("1st") || position.includes("Winner")) return "bg-yellow-100 text-yellow-800"
    if (position.includes("2nd") || position.includes("Runner")) return "bg-gray-100 text-gray-800"
    if (position.includes("3rd")) return "bg-orange-100 text-orange-800"
    if (position.includes("Finalist") || position.includes("Top")) return "bg-blue-100 text-blue-800"
    return "bg-green-100 text-green-800"
  }

  const filteredCompetitions = competitions.filter((comp) => {
    const statusMatch = filterStatus === "all" || comp.status === filterStatus
    const categoryMatch = filterCategory === "all" || comp.category.toLowerCase().includes(filterCategory)
    const levelMatch = filterLevel === "all" || comp.level.toLowerCase() === filterLevel
    return statusMatch && categoryMatch && levelMatch
  })

  const handleViewCompetition = (competition: (typeof competitions)[0]) => {
    setSelectedCompetition(competition)
    setIsViewOpen(true)
  }

  const categories = [...new Set(competitions.map((comp) => comp.category))]
  const levels = [...new Set(competitions.map((comp) => comp.level))]

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Competition Records & Achievements</h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Track your participation in programming contests, hackathons, and competitive events
                </p>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800 border border-blue-200 text-xs sm:text-sm w-fit">
              Competition Portfolio
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">Total Competitions</CardTitle>
              <Trophy className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold text-blue-600">{competitions.length}</div>
              <p className="text-xs text-gray-600">Participated events</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">Wins</CardTitle>
              <Medal className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold text-yellow-600">
                {competitions.filter((c) => c.position.includes("1st") || c.position.includes("Winner")).length}
              </div>
              <p className="text-xs text-gray-600">First place finishes</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold text-green-600">
                {competitions.filter((c) => c.status === "approved").length}
              </div>
              <p className="text-xs text-gray-600">Verified achievements</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">Certificates</CardTitle>
              <Award className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold text-purple-600">{competitions.reduce((acc, c) => acc + c.certificates.length, 0)}</div>
              <p className="text-xs text-gray-600">Total certificates</p>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Summary */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-4 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
              </div>
              <div>
                <CardTitle className="text-base sm:text-lg text-gray-800">Competition Performance Overview</CardTitle>
                <p className="text-xs sm:text-sm text-gray-600">Your competitive journey and key achievements</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Medal className="h-4 w-4 text-green-600" />
                  <Label className="text-sm font-medium text-green-800">Win Rate</Label>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-green-700">
                  {Math.round((competitions.filter(c => c.position.includes("1st") || c.position.includes("Winner")).length / competitions.length) * 100)}%
                </div>
                <p className="text-xs text-green-600">Success rate in competitions</p>
              </div>

              <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <Label className="text-xs sm:text-sm font-medium text-blue-800">Active Months</Label>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-blue-700">
                  {new Set(competitions.map(c => new Date(c.date).getMonth())).size}
                </div>
                <p className="text-xs text-blue-600">Months with competitions</p>
              </div>

              <div className="p-3 sm:p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-purple-600" />
                  <Label className="text-xs sm:text-sm font-medium text-purple-800">Skill Diversity</Label>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-purple-700">
                  {new Set(competitions.flatMap(c => c.skills)).size}
                </div>
                <p className="text-xs text-purple-600">Unique skills demonstrated</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3 block">Recent Competitions Timeline</Label>
                <div className="space-y-2 sm:space-y-3">
                  {competitions.slice(0, 3).map((comp) => (
                    <div key={comp.id} className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-sm font-medium text-gray-800 truncate">{comp.title}</div>
                        <div className="text-xs text-gray-600">{comp.date} • {comp.position}</div>
                      </div>
                      <Badge className={`${getPositionColor(comp.position)} text-xs flex-shrink-0`}>
                        {comp.position.includes("1st") ? "🥇" : comp.position.includes("2nd") ? "🥈" : comp.position.includes("3rd") ? "🥉" : "🏆"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3 block">Top Skills</Label>
                <div className="space-y-1 sm:space-y-2">
                  {Object.entries(
                    competitions.flatMap(c => c.skills).reduce((acc, skill) => {
                      acc[skill] = (acc[skill] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  )
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([skill, count]) => (
                      <div key={skill} className="flex items-center justify-between gap-2">
                        <Badge className="bg-blue-100 text-blue-800 border border-blue-300 text-xs flex-shrink-0">
                          {skill}
                        </Badge>
                        <span className="text-xs text-gray-600 flex-shrink-0">{count} competitions</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Add Button */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-28 sm:w-32 text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-32 sm:w-40 text-sm">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-24 sm:w-32 text-sm">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {levels.map((level) => (
                  <SelectItem key={level} value={level.toLowerCase()}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Competition
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader className="pb-6">
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Trophy className="h-5 w-5 text-blue-600" />
                  Add Competition Participation
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Record your participation in competitions and contests for academic verification.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 sm:gap-6 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700">Competition Title</Label>
                    <Input id="title" placeholder="Enter competition name" className="focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium text-gray-700">Category</Label>
                    <Select>
                      <SelectTrigger className="focus:ring-2 focus:ring-blue-500 text-sm">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="programming">Programming</SelectItem>
                        <SelectItem value="competitive-programming">Competitive Programming</SelectItem>
                        <SelectItem value="innovation">Innovation</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the competition and what it involved"
                    className="focus:ring-2 focus:ring-blue-500 text-sm"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-sm font-medium text-gray-700">Date</Label>
                    <Input id="date" type="date" className="focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level" className="text-sm font-medium text-gray-700">Level</Label>
                    <Select>
                      <SelectTrigger className="focus:ring-2 focus:ring-blue-500 text-sm">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local</SelectItem>
                        <SelectItem value="state">State</SelectItem>
                        <SelectItem value="national">National</SelectItem>
                        <SelectItem value="international">International</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team-size" className="text-sm font-medium text-gray-700">Team Size</Label>
                    <Input id="team-size" type="number" placeholder="1" className="focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organizer" className="text-sm font-medium text-gray-700">Organizer</Label>
                    <Input id="organizer" placeholder="Organization/Institution" className="focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-sm font-medium text-gray-700">Position/Result</Label>
                    <Input id="position" placeholder="e.g., 1st Place, Finalist" className="focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-sm font-medium text-gray-700">Skills Demonstrated</Label>
                  <Input
                    id="skills"
                    placeholder="e.g., Python, React, Problem Solving, Teamwork"
                    className="focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <p className="text-xs text-gray-600">Separate skills with commas</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prize" className="text-sm font-medium text-gray-700">Prize/Recognition</Label>
                  <Input
                    id="prize"
                    placeholder="e.g., ₹10,000, Certificate, Internship Opportunity"
                    className="focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificates" className="text-sm font-medium text-gray-700">Upload Certificates (Mandatory)</Label>
                  <div className="relative">
                    <input
                      type="file"
                      id="certificates"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      multiple
                      required
                    />
                    <div className="border-2 border-dashed border-blue-300 bg-blue-50 rounded-lg p-4 sm:p-6 text-center hover:border-blue-500 hover:bg-blue-100 transition-colors">
                      <Upload className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-blue-600" />
                      <p className="text-xs sm:text-sm text-gray-700">Upload certificates, awards, or participation proof</p>
                      <p className="text-xs text-blue-600 mt-1 font-medium">Certificates are mandatory for verification</p>
                      <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG, DOC up to 5MB each</p>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter className="pt-4 sm:pt-6 border-t border-gray-200 flex-col sm:flex-row gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setIsAddOpen(false)} className="w-full sm:w-auto text-sm">
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-sm" onClick={() => setIsAddOpen(false)}>
                  Submit for Approval
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Competitions Display - Responsive */}
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-0">
            {/* Desktop Table View */}
            <div className="hidden lg:block bg-gray-50 rounded-t-lg border-b border-gray-200 overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="bg-blue-50 border-b border-blue-200">
                    <TableHead className="text-blue-800 font-medium text-sm min-w-[200px]">Competition Details</TableHead>
                    <TableHead className="text-blue-800 font-medium text-sm min-w-[100px]">Category</TableHead>
                    <TableHead className="text-blue-800 font-medium text-sm min-w-[80px]">Level</TableHead>
                    <TableHead className="text-blue-800 font-medium text-sm min-w-[90px]">Position</TableHead>
                    <TableHead className="text-blue-800 font-medium text-sm min-w-[90px]">Date</TableHead>
                    <TableHead className="text-blue-800 font-medium text-sm min-w-[80px]">Status</TableHead>
                    <TableHead className="text-blue-800 font-medium text-sm min-w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompetitions.map((competition) => (
                    <TableRow key={competition.id} className="hover:bg-blue-100/50">
                      <TableCell className="min-w-[200px]">
                        <div>
                          <div className="font-medium text-gray-800 text-sm">{competition.title}</div>
                          <div className="text-xs text-gray-600">{competition.organizer}</div>
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {competition.skills.slice(0, 2).map((skill, index) => (
                              <Badge key={index} className="bg-blue-100 text-blue-800 border border-blue-300 text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {competition.skills.length > 2 && (
                              <Badge className="bg-gray-100 text-gray-700 border border-gray-300 text-xs">
                                +{competition.skills.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="min-w-[100px]">
                        <Badge className="bg-purple-100 text-purple-800 border border-purple-300 text-xs">
                          {competition.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="min-w-[80px]">
                        <Badge className="bg-gray-100 text-gray-800 border border-gray-300 text-xs">
                          {competition.level}
                        </Badge>
                      </TableCell>
                      <TableCell className="min-w-[90px]">
                        <Badge className={`${getPositionColor(competition.position)} text-xs`}>{competition.position}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm min-w-[90px]">{competition.date}</TableCell>
                      <TableCell className="min-w-[80px]">
                        <Badge className={`${getStatusColor(competition.status)} border text-xs`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(competition.status)}
                            <span>{competition.status}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell className="min-w-[80px]">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewCompetition(competition)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-2"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-3 p-3 sm:p-4">
              {filteredCompetitions.map((competition) => (
                <div key={competition.id} className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800 text-sm truncate">{competition.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">{competition.organizer}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                      <Badge className={`${getStatusColor(competition.status)} border text-xs`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(competition.status)}
                          <span className="hidden xs:inline">{competition.status}</span>
                        </div>
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewCompetition(competition)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-1.5"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Category</p>
                      <Badge className="bg-purple-100 text-purple-800 border border-purple-300 text-xs">
                        {competition.category}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Level</p>
                      <Badge className="bg-gray-100 text-gray-800 border border-gray-300 text-xs">
                        {competition.level}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Position</p>
                      <Badge className={`${getPositionColor(competition.position)} text-xs`}>
                        {competition.position}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Date</p>
                      <p className="text-xs text-gray-700">{competition.date}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {competition.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800 border border-blue-300 text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {competition.skills.length > 3 && (
                      <Badge className="bg-gray-100 text-gray-700 border border-gray-300 text-xs">
                        +{competition.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* View Competition Dialog */}
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedCompetition && (
              <>
                <DialogHeader className="pb-4 sm:pb-6">
                  <DialogTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                    <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                      <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    </div>
                    <span className="break-words">{selectedCompetition.title}</span>
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 text-sm">
                    Competition details and verification status
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <Label className="text-sm font-medium text-gray-700">Category</Label>
                      <p className="text-sm text-gray-600 mt-1">{selectedCompetition.category}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <Label className="text-sm font-medium text-gray-700">Level</Label>
                      <p className="text-sm text-gray-600 mt-1">{selectedCompetition.level}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Label className="text-sm font-medium text-gray-700">Description</Label>
                    <p className="text-sm text-gray-600 mt-1">{selectedCompetition.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <Label className="text-sm font-medium text-gray-700">Date</Label>
                      <p className="text-sm text-gray-600 mt-1">{selectedCompetition.date}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <Label className="text-sm font-medium text-gray-700">Team Size</Label>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedCompetition.teamSize} member{selectedCompetition.teamSize > 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <Label className="text-sm font-medium text-gray-700">Organizer</Label>
                      <p className="text-sm text-gray-600 mt-1">{selectedCompetition.organizer}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <Label className="text-sm font-medium text-gray-700">Position</Label>
                      <div className="mt-2">
                        <Badge className={`${getPositionColor(selectedCompetition.position)} border`}>
                          {selectedCompetition.position}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <Label className="text-sm font-medium text-gray-700">Prize/Recognition</Label>
                      <p className="text-sm text-gray-600 mt-1">{selectedCompetition.prize}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <Label className="text-sm font-medium text-gray-700">Skills Demonstrated</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedCompetition.skills.map((skill, index) => (
                        <Badge key={index} className="bg-purple-100 text-purple-800 border border-purple-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <Label className="text-sm font-medium text-gray-700">Certificates</Label>
                    <div className="space-y-2 mt-3">
                      {selectedCompetition.certificates.map((cert, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-300">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-gray-800">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Verification Status</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`${getStatusColor(selectedCompetition.status)} border`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(selectedCompetition.status)}
                            {selectedCompetition.status}
                          </div>
                        </Badge>
                      </div>
                    </div>
                    {selectedCompetition.approvedBy && (
                      <div className="text-right">
                        <Label className="text-sm font-medium text-gray-700">Approved By</Label>
                        <p className="text-sm text-gray-600">{selectedCompetition.approvedBy}</p>
                        <p className="text-xs text-gray-500">{selectedCompetition.approvalDate}</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
