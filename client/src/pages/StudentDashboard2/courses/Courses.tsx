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
import {
  Upload,
  FileText,
  CheckCircle,
  Clock,
  X,
  Plus,
  Eye,
  Monitor,
  Award,
  Search,
  TrendingUp,
  Calendar,
  BookOpen
} from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Machine Learning Specialization",
    platform: "Coursera",
    provider: "Stanford University",
    duration: "3 months",
    completionDate: "2024-10-15",
    certificateUrl: "ML_Specialization_Certificate.pdf",
    skills: ["Python", "TensorFlow", "Neural Networks", "Deep Learning"],
    facultyAdvisor: "Dr. Smith",
    status: "approved",
    approvalDate: "2024-10-20",
    description:
      "Comprehensive course covering machine learning algorithms, neural networks, and practical applications.",
    grade: "95%",
  },
  {
    id: 2,
    title: "Full Stack Web Development",
    platform: "Udemy",
    provider: "The Complete Web Developer",
    duration: "2 months",
    completionDate: "2024-09-20",
    certificateUrl: "FullStack_Certificate.pdf",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    facultyAdvisor: "Prof. Johnson",
    status: "pending",
    approvalDate: null,
    description: "End-to-end web development course covering frontend and backend technologies.",
    grade: "88%",
  },
  {
    id: 3,
    title: "AWS Cloud Practitioner",
    platform: "AWS Training",
    provider: "Amazon Web Services",
    duration: "1 month",
    completionDate: "2024-08-10",
    certificateUrl: "AWS_CloudPractitioner.pdf",
    skills: ["AWS", "Cloud Computing", "EC2", "S3"],
    facultyAdvisor: "Dr. Wilson",
    status: "approved",
    approvalDate: "2024-08-15",
    description: "Foundational course on AWS cloud services and best practices.",
    grade: "92%",
  },
  {
    id: 4,
    title: "Data Structures and Algorithms",
    platform: "edX",
    provider: "MIT",
    duration: "4 months",
    completionDate: "2024-07-30",
    certificateUrl: "DSA_Certificate.pdf",
    skills: ["Algorithms", "Data Structures", "Problem Solving", "Python"],
    facultyAdvisor: "Dr. Brown",
    status: "rejected",
    approvalDate: "2024-08-05",
    description: "Advanced course on algorithmic thinking and data structure implementation.",
    grade: "85%",
  },
]

export default function OnlineCoursesPage() {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<(typeof courses)[0] | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPlatform, setFilterPlatform] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

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

  const filteredCourses = courses.filter((course) => {
    const statusMatch = filterStatus === "all" || course.status === filterStatus
    const platformMatch = filterPlatform === "all" || course.platform.toLowerCase() === filterPlatform
    const searchMatch =
      searchTerm === "" ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    return statusMatch && platformMatch && searchMatch
  })

  const handleViewCourse = (course: (typeof courses)[0]) => {
    setSelectedCourse(course)
    setIsViewOpen(true)
  }

  const platforms = [...new Set(courses.map((course) => course.platform))]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Monitor className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Online Course Portfolio</h1>
                <p className="text-gray-600">
                  Track your online learning journey and get faculty approval for completed courses
                </p>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800 border border-blue-200">
              Learning Records
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">Total Courses</CardTitle>
              <Monitor className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{courses.length}</div>
              <p className="text-xs text-gray-600">Completed courses</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {courses.filter((c) => c.status === "approved").length}
              </div>
              <p className="text-xs text-gray-600">Faculty approved</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">Skills Gained</CardTitle>
              <Award className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{[...new Set(courses.flatMap((c) => c.skills))].length}</div>
              <p className="text-xs text-gray-600">Unique skills</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">Avg. Grade</CardTitle>
              <FileText className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(courses.reduce((acc, c) => acc + Number.parseInt(c.grade), 0) / courses.length)}%
              </div>
              <p className="text-xs text-gray-600">Course performance</p>
            </CardContent>
          </Card>
        </div>

        {/* Learning Analytics */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg border border-green-200">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-800">Learning Progress & Analytics</CardTitle>
                <p className="text-sm text-gray-600">Your learning journey insights and skill development</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <Label className="text-sm font-medium text-blue-800">Learning Velocity</Label>
                </div>
                <div className="text-2xl font-bold text-blue-700">
                  {Math.round(courses.length / 12)} courses/month
                </div>
                <p className="text-xs text-blue-600">Average completion rate</p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <Label className="text-sm font-medium text-orange-800">Learning Streak</Label>
                </div>
                <div className="text-2xl font-bold text-orange-700">
                  {new Set(courses.map(c => new Date(c.completionDate).getMonth())).size}
                </div>
                <p className="text-xs text-orange-600">Active learning months</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-purple-600" />
                  <Label className="text-sm font-medium text-purple-800">Skill Breadth</Label>
                </div>
                <div className="text-2xl font-bold text-purple-700">
                  {new Set(courses.flatMap(c => c.skills)).size}
                </div>
                <p className="text-xs text-purple-600">Unique skills learned</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Recent Course Timeline</Label>
                <div className="space-y-3">
                  {courses.slice(0, 3).map((course) => (
                    <div key={course.id} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800">{course.title}</div>
                        <div className="text-xs text-gray-600">{course.completionDate} • {course.platform}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">{course.grade}</div>
                        <Badge className={`${getStatusColor(course.status)} text-xs`}>
                          {course.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Top Learning Platforms</Label>
                <div className="space-y-2">
                  {Object.entries(
                    courses.reduce((acc, course) => {
                      acc[course.platform] = (acc[course.platform] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  )
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 4)
                    .map(([platform, count]) => (
                      <div key={platform} className="flex items-center justify-between">
                        <Badge className="bg-purple-100 text-purple-800 border border-purple-300 text-xs">
                          {platform}
                        </Badge>
                        <span className="text-xs text-gray-600">{count} courses</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Skill Development Map</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(
                  courses.flatMap(c => c.skills).reduce((acc, skill) => {
                    acc[skill] = (acc[skill] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                )
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 8)
                  .map(([skill, count]) => (
                    <div key={skill} className="text-center p-2 bg-white rounded-lg border border-yellow-300">
                      <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-400 text-xs mb-1 block">
                        {skill}
                      </Badge>
                      <span className="text-xs text-gray-600">{count}x</span>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-4 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search courses, providers, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPlatform} onValueChange={setFilterPlatform}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                {platforms.map((platform) => (
                  <SelectItem key={platform} value={platform.toLowerCase()}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader className="pb-6">
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Monitor className="h-5 w-5 text-blue-600" />
                  Add Online Course
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Submit your completed online course for faculty approval and academic record.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700">Course Title</Label>
                    <Input id="title" placeholder="Enter course title" className="focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platform" className="text-sm font-medium text-gray-700">Platform</Label>
                    <Select>
                      <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="coursera">Coursera</SelectItem>
                        <SelectItem value="udemy">Udemy</SelectItem>
                        <SelectItem value="edx">edX</SelectItem>
                        <SelectItem value="aws">AWS Training</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="provider" className="text-sm font-medium text-gray-700">Course Provider</Label>
                    <Input id="provider" placeholder="University/Organization" className="focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-sm font-medium text-gray-700">Duration</Label>
                    <Input id="duration" placeholder="e.g., 3 months" className="focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">Course Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the course content and what you learned"
                    className="focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="completion-date" className="text-sm font-medium text-gray-700">Completion Date</Label>
                    <Input id="completion-date" type="date" className="focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade" className="text-sm font-medium text-gray-700">Grade/Score</Label>
                    <Input id="grade" placeholder="e.g., 95%" className="focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-sm font-medium text-gray-700">Skills Gained</Label>
                  <Input
                    id="skills"
                    placeholder="e.g., Python, Machine Learning, TensorFlow, Data Analysis"
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-600">Separate skills with commas</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="advisor" className="text-sm font-medium text-gray-700">Faculty Advisor</Label>
                  <Select>
                    <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select faculty advisor for approval" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                      <SelectItem value="prof-johnson">Prof. Johnson</SelectItem>
                      <SelectItem value="dr-wilson">Dr. Wilson</SelectItem>
                      <SelectItem value="dr-brown">Dr. Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificate" className="text-sm font-medium text-gray-700">Upload Certificate</Label>
                  <div className="border-2 border-dashed border-blue-300 bg-blue-50 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm text-gray-700">Upload your course completion certificate</p>
                    <p className="text-xs text-blue-600 mt-1 font-medium">PDF format preferred</p>
                  </div>
                </div>
              </div>
              <DialogFooter className="pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAddOpen(false)}>
                  Submit for Approval
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Courses Table */}
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-0">
            <div className="bg-gray-50 rounded-t-lg border-b border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50 border-b border-blue-200">
                    <TableHead className="text-blue-800 font-medium">Course Details</TableHead>
                    <TableHead className="text-blue-800 font-medium">Platform</TableHead>
                    <TableHead className="text-blue-800 font-medium">Duration</TableHead>
                    <TableHead className="text-blue-800 font-medium">Grade</TableHead>
                    <TableHead className="text-blue-800 font-medium">Faculty Advisor</TableHead>
                    <TableHead className="text-blue-800 font-medium">Status</TableHead>
                    <TableHead className="text-blue-800 font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <TableRow key={course.id} className="hover:bg-blue-50">
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-800">{course.title}</div>
                          <div className="text-sm text-gray-600">{course.provider}</div>
                          <div className="flex gap-1 mt-1">
                            {course.skills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} className="bg-blue-100 text-blue-800 border border-blue-300 text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {course.skills.length > 3 && (
                              <Badge className="bg-gray-100 text-gray-700 border border-gray-300 text-xs">
                                +{course.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-purple-100 text-purple-800 border border-purple-300">
                          {course.platform}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">{course.duration}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={Number.parseInt(course.grade)} className="h-2 w-16 bg-gray-200" />
                          <span className="text-sm font-medium text-gray-700">{course.grade}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{course.facultyAdvisor}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(course.status)} border`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(course.status)}
                            {course.status}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewCourse(course)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* View Course Dialog */}
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedCourse && (
              <>
                <DialogHeader className="pb-6">
                  <DialogTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                      <Monitor className="h-5 w-5 text-blue-600" />
                    </div>
                    {selectedCourse.title}
                  </DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Course details and approval status
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <Label className="text-sm font-medium text-gray-700">Platform</Label>
                      <p className="text-sm text-gray-600 mt-1">{selectedCourse.platform}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <Label className="text-sm font-medium text-gray-700">Provider</Label>
                      <p className="text-sm text-gray-600 mt-1">{selectedCourse.provider}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Label className="text-sm font-medium text-gray-700">Description</Label>
                    <p className="text-sm text-gray-600 mt-1">{selectedCourse.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <Label className="text-sm font-medium text-gray-700">Duration</Label>
                      <p className="text-sm text-gray-600 mt-1">{selectedCourse.duration}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <Label className="text-sm font-medium text-gray-700">Completion Date</Label>
                      <p className="text-sm text-gray-600 mt-1">{selectedCourse.completionDate}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <Label className="text-sm font-medium text-gray-700">Grade</Label>
                      <p className="text-sm text-green-700 font-semibold mt-1">{selectedCourse.grade}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <Label className="text-sm font-medium text-gray-700">Skills Gained</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedCourse.skills.map((skill, index) => (
                        <Badge key={index} className="bg-purple-100 text-purple-800 border border-purple-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <Label className="text-sm font-medium text-gray-700">Certificate</Label>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-300 mt-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-800">{selectedCourse.certificateUrl}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Approval Status</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`${getStatusColor(selectedCourse.status)} border`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(selectedCourse.status)}
                            {selectedCourse.status}
                          </div>
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <Label className="text-sm font-medium text-gray-700">Faculty Advisor</Label>
                      <p className="text-sm text-gray-600">{selectedCourse.facultyAdvisor}</p>
                      {selectedCourse.approvalDate && (
                        <p className="text-xs text-gray-500">{selectedCourse.approvalDate}</p>
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
  );
}
