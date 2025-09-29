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
import { Upload, FileText, CheckCircle, Clock, X, Plus, Eye, Heart, Users, MapPin } from "lucide-react"

const volunteerWork = [
  {
    id: 1,
    title: "Teaching Underprivileged Children",
    organization: "Teach for India",
    type: "Education",
    duration: "6 months",
    startDate: "2024-06-01",
    endDate: "2024-11-30",
    hoursPerWeek: 8,
    totalHours: 192,
    location: "Mumbai, Maharashtra",
    description: "Teaching basic mathematics and computer skills to children from low-income families",
    impact: "Helped 25 children improve their academic performance by 40%",
    skills: ["Teaching", "Communication", "Patience", "Leadership"],
    proof: ["Teaching_Certificate.pdf", "Volunteer_Letter.pdf", "Impact_Photos.jpg"],
    status: "approved",
    approvedBy: "Dr. Smith",
    approvalDate: "2024-12-01",
  },
  {
    id: 2,
    title: "Environmental Cleanup Drive",
    organization: "Green Earth Foundation",
    type: "Environment",
    duration: "1 day",
    startDate: "2024-10-15",
    endDate: "2024-10-15",
    hoursPerWeek: 8,
    totalHours: 8,
    location: "Juhu Beach, Mumbai",
    description: "Beach cleanup drive to remove plastic waste and raise environmental awareness",
    impact: "Collected 150kg of plastic waste, engaged 200+ beachgoers in awareness activities",
    skills: ["Environmental Awareness", "Community Engagement", "Teamwork"],
    proof: ["Cleanup_Certificate.pdf", "Before_After_Photos.jpg"],
    status: "pending",
    approvedBy: null,
    approvalDate: null,
  },
  {
    id: 3,
    title: "Food Distribution for Homeless",
    organization: "Akshaya Patra Foundation",
    type: "Social Service",
    duration: "3 months",
    startDate: "2024-07-01",
    endDate: "2024-09-30",
    hoursPerWeek: 4,
    totalHours: 48,
    location: "Various locations, Mumbai",
    description: "Weekly food distribution drives for homeless individuals and families",
    impact: "Served meals to 500+ individuals, organized 12 distribution drives",
    skills: ["Empathy", "Organization", "Community Service", "Logistics"],
    proof: ["Service_Certificate.pdf", "Distribution_Photos.jpg"],
    status: "approved",
    approvedBy: "Prof. Johnson",
    approvalDate: "2024-10-05",
  },
  {
    id: 4,
    title: "Digital Literacy for Seniors",
    organization: "Senior Citizens Welfare Association",
    type: "Technology",
    duration: "4 months",
    startDate: "2024-05-01",
    endDate: "2024-08-31",
    hoursPerWeek: 6,
    totalHours: 96,
    location: "Community Center, Bandra",
    description: "Teaching smartphone and internet usage to senior citizens",
    impact: "Trained 40 seniors in basic digital skills, improved their connectivity with family",
    skills: ["Teaching", "Technology", "Patience", "Communication"],
    proof: ["Training_Certificate.pdf"],
    status: "rejected",
    approvedBy: "Dr. Wilson",
    approvalDate: "2024-09-10",
  },
]

export default function VolunteerPage() {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [selectedWork, setSelectedWork] = useState<(typeof volunteerWork)[0] | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")

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

  const filteredWork = volunteerWork.filter((work) => {
    const statusMatch = filterStatus === "all" || work.status === filterStatus
    const typeMatch = filterType === "all" || work.type.toLowerCase() === filterType
    return statusMatch && typeMatch
  })

  const handleViewWork = (work: (typeof volunteerWork)[0]) => {
    setSelectedWork(work)
    setIsViewOpen(true)
  }

  const types = [...new Set(volunteerWork.map((work) => work.type))]
  const totalHours = volunteerWork.reduce((acc, work) => acc + work.totalHours, 0)
  const approvedHours = volunteerWork
    .filter((w) => w.status === "approved")
    .reduce((acc, work) => acc + work.totalHours, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 py-8 max-w-none">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Volunteer Work</h1>
            <p className="text-gray-600">
              Track your community service and volunteer activities with NGOs and organizations.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-900">Total Activities</CardTitle>
              <div className="p-2 bg-red-100 rounded-lg">
                <Heart className="h-5 w-5 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{volunteerWork.length}</div>
              <p className="text-sm text-gray-600 mt-1">Volunteer activities</p>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-400 to-red-600 w-full rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-900">Total Hours</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{totalHours}</div>
              <p className="text-sm text-gray-600 mt-1">{approvedHours} approved hours</p>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 w-4/5 rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-900">Organizations</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{[...new Set(volunteerWork.map((w) => w.organization))].length}</div>
              <p className="text-sm text-gray-600 mt-1">Partner organizations</p>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-600 w-3/4 rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-900">Approved</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {volunteerWork.filter((w) => w.status === "approved").length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Verified activities</p>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-600 w-4/5 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          {/* Filters and Add Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex gap-4 flex-wrap">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32 border-gray-200 focus:border-blue-400">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Volunteer Work
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-white border border-gray-200 mx-2 sm:mx-auto">
                <DialogHeader className="bg-gray-50 -m-4 sm:-m-6 p-4 sm:p-6 mb-4 border-b border-gray-200">
                  <DialogTitle className="text-gray-900 text-lg sm:text-xl font-bold">Add Volunteer Work</DialogTitle>
                  <DialogDescription className="text-gray-600 text-sm">
                    Record your volunteer activities and community service contributions for academic credit.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4 px-2">
                  {/* Basic Information Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Basic Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label htmlFor="title" className="text-gray-900 font-medium">Activity Title *</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Teaching underprivileged children"
                          className="border-gray-200 focus:border-blue-400"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="organization" className="text-gray-900 font-medium">Organization/NGO *</Label>
                        <Input
                          id="organization"
                          placeholder="e.g., Teach for India"
                          className="border-gray-200 focus:border-blue-400"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-3">
                        <Label htmlFor="type" className="text-gray-900 font-medium">Category *</Label>
                        <Select>
                          <SelectTrigger className="border-gray-200 focus:border-blue-400">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="environment">Environment</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="community">Community Development</SelectItem>
                            <SelectItem value="animal">Animal Welfare</SelectItem>
                            <SelectItem value="disaster">Disaster Relief</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="location" className="text-gray-900 font-medium">Location</Label>
                        <Input
                          id="location"
                          placeholder="City, State"
                          className="border-gray-200 focus:border-blue-400"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="duration" className="text-gray-900 font-medium">Duration</Label>
                        <Select>
                          <SelectTrigger className="border-gray-200 focus:border-blue-400">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-day">1 Day</SelectItem>
                            <SelectItem value="1-week">1 Week</SelectItem>
                            <SelectItem value="1-month">1 Month</SelectItem>
                            <SelectItem value="3-months">3 Months</SelectItem>
                            <SelectItem value="6-months">6 Months</SelectItem>
                            <SelectItem value="1-year">1 Year</SelectItem>
                            <SelectItem value="ongoing">Ongoing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Timeline & Hours Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Timeline & Hours</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div className="space-y-3">
                        <Label htmlFor="startDate" className="text-gray-900 font-medium">Start Date *</Label>
                        <Input
                          id="startDate"
                          type="date"
                          className="border-gray-200 focus:border-blue-400"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="endDate" className="text-gray-900 font-medium">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          className="border-gray-200 focus:border-blue-400"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="hoursPerWeek" className="text-gray-900 font-medium">Hours/Week</Label>
                        <Input
                          id="hoursPerWeek"
                          type="number"
                          placeholder="e.g., 8"
                          className="border-gray-200 focus:border-blue-400"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="totalHours" className="text-gray-900 font-medium">Total Hours</Label>
                        <Input
                          id="totalHours"
                          type="number"
                          placeholder="Auto-calculated"
                          className="border-gray-200 focus:border-blue-400 bg-gray-50"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description & Impact Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Description & Impact</h3>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <Label htmlFor="description" className="text-gray-900 font-medium">Activity Description *</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe what you did, your responsibilities, and the work involved..."
                          className="border-gray-200 focus:border-blue-400 min-h-[100px]"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="impact" className="text-gray-900 font-medium">Impact & Achievements</Label>
                        <Textarea
                          id="impact"
                          placeholder="Describe the impact of your work, measurable outcomes, people helped..."
                          className="border-gray-200 focus:border-blue-400 min-h-[80px]"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="skills" className="text-gray-900 font-medium">Skills Gained</Label>
                        <Input
                          id="skills"
                          placeholder="e.g., Leadership, Communication, Teaching, Project Management"
                          className="border-gray-200 focus:border-blue-400"
                        />
                        <p className="text-xs text-gray-500">Separate multiple skills with commas</p>
                      </div>
                    </div>
                  </div>

                  {/* Documentation & Proof Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Documentation & Proof</h3>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <Label className="text-gray-900 font-medium">Upload Supporting Documents</Label>
                        <div className="border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg p-8 text-center transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                          <div className="space-y-2">
                            <p className="text-lg font-medium text-gray-700">Upload your documents</p>
                            <p className="text-sm text-gray-600">
                              Certificates, volunteer letters, photos, or any proof of your work
                            </p>
                            <p className="text-xs text-gray-500">
                              Supported formats: PDF, JPG, PNG, DOC (Max 10MB each)
                            </p>
                          </div>
                          <Button variant="outline" className="mt-4" type="button">
                            Choose Files
                          </Button>
                        </div>
                      </div>

                      {/* Document Guidelines */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 mb-2">📋 Documentation Guidelines</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Volunteer certificate or completion letter from organization</li>
                          <li>• Photos of you volunteering (if appropriate)</li>
                          <li>• Thank you letters or appreciation notes</li>
                          <li>• Project reports or impact documentation</li>
                          <li>• Contact details of supervisor/coordinator for verification</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter className="bg-gray-50 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 mt-6 p-4 sm:p-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddOpen(false)}
                      className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setIsAddOpen(false)}
                      className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
                    >
                      Submit for Approval
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Volunteer Work Table */}
          <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="overflow-hidden">
              <Table className="w-full table-fixed">
                <TableHeader className="bg-gray-50">
                  <TableRow className="border-gray-200">
                    <TableHead className="text-gray-900 font-semibold w-[30%] px-3 py-3">Activity Details</TableHead>
                    <TableHead className="text-gray-900 font-semibold w-[18%] px-3 py-3">Organization</TableHead>
                    <TableHead className="text-gray-900 font-semibold w-[12%] px-3 py-3">Type</TableHead>
                    <TableHead className="text-gray-900 font-semibold w-[12%] px-3 py-3">Duration</TableHead>
                    <TableHead className="text-gray-900 font-semibold w-[12%] px-3 py-3">Hours</TableHead>
                    <TableHead className="text-gray-900 font-semibold w-[11%] px-3 py-3">Status</TableHead>
                    <TableHead className="text-gray-900 font-semibold w-[5%] px-3 py-3">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWork.map((work) => (
                    <TableRow key={work.id}>
                      <TableCell className="px-3 py-4">
                        <div className="space-y-1">
                          <div className="font-medium text-sm truncate">{work.title}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                            <MapPin className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{work.location}</span>
                          </div>
                          <div className="flex gap-1 mt-1 overflow-hidden">
                            {work.skills.slice(0, 2).map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {work.skills.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{work.skills.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-4 text-sm truncate">{work.organization}</TableCell>
                      <TableCell className="px-3 py-4">
                        <Badge variant="secondary" className="text-xs">{work.type}</Badge>
                      </TableCell>
                      <TableCell className="px-3 py-4 text-sm truncate">{work.duration}</TableCell>
                      <TableCell className="px-3 py-4">
                        <div className="text-xs">
                          <div className="font-medium">{work.totalHours}h</div>
                          <div className="text-muted-foreground">{work.hoursPerWeek}h/week</div>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-4">
                        <Badge className={`${getStatusColor(work.status)} text-xs`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(work.status)}
                            <span className="truncate">{work.status}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell className="px-3 py-4">
                        <Button variant="ghost" size="sm" onClick={() => handleViewWork(work)} className="h-8 w-8 p-0">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* View Volunteer Work Dialog */}
          <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200">
              {selectedWork && (
                <>
                  <DialogHeader className="bg-gray-50 -m-6 p-6 mb-4 border-b border-gray-200">
                    <DialogTitle className="flex items-center gap-2 text-gray-900">
                      <Heart className="h-5 w-5 text-red-600" />
                      {selectedWork.title}
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">Volunteer work details and verification status</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4 px-2">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Basic Information</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Organization</Label>
                          <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">{selectedWork.organization}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Category</Label>
                          <Badge variant="outline" className="w-fit">{selectedWork.type}</Badge>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Location</Label>
                          <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">{selectedWork.location}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Duration</Label>
                          <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">{selectedWork.duration}</p>
                        </div>
                      </div>
                    </div>

                    {/* Timeline & Hours */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Timeline & Hours</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Start Date</Label>
                          <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">{selectedWork.startDate}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">End Date</Label>
                          <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border">{selectedWork.endDate}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Total Hours</Label>
                          <p className="text-lg font-bold text-blue-600 bg-blue-50 p-2 rounded border border-blue-200">{selectedWork.totalHours} hours</p>
                        </div>
                      </div>
                    </div>

                    {/* Description & Impact */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Description & Impact</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Description</Label>
                          <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded border leading-relaxed">{selectedWork.description}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Impact & Achievements</Label>
                          <p className="text-sm text-gray-900 bg-green-50 p-3 rounded border border-green-200 leading-relaxed">{selectedWork.impact}</p>
                        </div>
                      </div>
                    </div>

                    {/* Skills & Documentation */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Skills & Documentation</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Skills Gained</Label>
                          <div className="flex flex-wrap gap-2">
                            {selectedWork.skills.map((skill: string, index: number) => (
                              <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Supporting Documents</Label>
                          <div className="space-y-2">
                            {selectedWork.proof.map((file: string, index: number) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
                                <FileText className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-900">{file}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Approval Status */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Approval Status</h3>
                      <div className="bg-gray-50 p-4 rounded-lg border">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(selectedWork?.status || '')}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(selectedWork?.status || '')}
                                {selectedWork?.status?.toUpperCase()}
                              </div>
                            </Badge>
                          </div>
                        </div>
                        {selectedWork?.status === "approved" && selectedWork?.approvedBy && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Approved by:</span> {selectedWork.approvedBy}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Date:</span> {selectedWork.approvalDate}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
