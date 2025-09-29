"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
import { Upload, FileText, CheckCircle, Clock, X, Plus, Eye, BookOpen, Trophy, GraduationCap, Calendar, Download, Star, TrendingUp } from "lucide-react"

// Mock data
const studentInfo = {
  studentId: "CS2021001",
  name: "Alex Johnson",
  program: "Computer Science Engineering",
  batch: "2021-2025",
  currentSemester: 7,
  mentor: "Dr. Sarah Wilson",
  department: "Computer Science",
}

const semesters = [
  {
    id: 1,
    name: "Semester 7 (Fall 2024)",
    gpa: 8.9,
    credits: 22,
    totalCredits: 24,
    rank: 5,
    totalStudents: 120,
    subjects: [
      { name: "Data Structures & Algorithms", code: "CS401", grade: "A+", credits: 4, attendance: 92, internalMarks: 48, externalMarks: 87, total: 135, professor: "Dr. Smith" },
      { name: "Database Management Systems", code: "CS402", grade: "A", credits: 3, attendance: 88, internalMarks: 45, externalMarks: 82, total: 127, professor: "Dr. Johnson" },
      { name: "Web Technologies", code: "CS403", grade: "A+", credits: 4, attendance: 95, internalMarks: 50, externalMarks: 89, total: 139, professor: "Prof. Brown" },
      { name: "Software Engineering", code: "CS404", grade: "A", credits: 3, attendance: 85, internalMarks: 44, externalMarks: 80, total: 124, professor: "Dr. Davis" },
      { name: "Computer Networks", code: "CS405", grade: "B+", credits: 4, attendance: 82, internalMarks: 42, externalMarks: 75, total: 117, professor: "Dr. Miller" },
      { name: "Technical Communication", code: "HS401", grade: "A", credits: 2, attendance: 90, internalMarks: 47, externalMarks: 83, total: 130, professor: "Prof. Wilson" },
      { name: "Professional Ethics", code: "HS402", grade: "A+", credits: 2, attendance: 98, internalMarks: 49, externalMarks: 88, total: 137, professor: "Dr. Taylor" },
    ],
  },
  {
    id: 2,
    name: "Semester 6 (Spring 2024)",
    gpa: 8.5,
    credits: 20,
    totalCredits: 22,
    rank: 8,
    totalStudents: 118,
    subjects: [
      { name: "Design & Analysis of Algorithms", code: "CS301", grade: "A", credits: 4, attendance: 90, internalMarks: 46, externalMarks: 84, total: 130, professor: "Dr. Smith" },
      { name: "Operating Systems", code: "CS302", grade: "B+", credits: 4, attendance: 85, internalMarks: 43, externalMarks: 78, total: 121, professor: "Prof. Anderson" },
      { name: "Machine Learning", code: "CS303", grade: "A+", credits: 3, attendance: 95, internalMarks: 49, externalMarks: 86, total: 135, professor: "Dr. Lee" },
      { name: "Mobile Application Development", code: "CS304", grade: "A", credits: 3, attendance: 88, internalMarks: 45, externalMarks: 81, total: 126, professor: "Prof. Kim" },
      { name: "Probability & Statistics", code: "MA301", grade: "B+", credits: 3, attendance: 80, internalMarks: 41, externalMarks: 76, total: 117, professor: "Dr. Chen" },
      { name: "Project Management", code: "MG301", grade: "A", credits: 3, attendance: 92, internalMarks: 47, externalMarks: 83, total: 130, professor: "Prof. Garcia" },
    ],
  },
]

const assignments = [
  {
    id: 1,
    title: "Database Design Project",
    subject: "Database Systems",
    dueDate: "2024-12-15",
    status: "approved",
    uploadDate: "2024-12-10",
  },
  {
    id: 2,
    title: "React Portfolio Website",
    subject: "Web Development",
    dueDate: "2024-12-20",
    status: "pending",
    uploadDate: "2024-12-18",
  },
  {
    id: 3,
    title: "Network Security Analysis",
    subject: "Computer Networks",
    dueDate: "2024-12-25",
    status: "pending",
    uploadDate: null,
  },
  {
    id: 4,
    title: "Algorithm Complexity Report",
    subject: "Data Structures",
    dueDate: "2024-12-12",
    status: "approved",
    uploadDate: "2024-12-08",
  },
]

const seminars = [
  {
    id: 1,
    title: "AI in Healthcare",
    date: "2024-11-15",
    organizer: "CS Department",
    status: "approved",
    proof: "certificate.pdf",
  },
  {
    id: 2,
    title: "Blockchain Technology",
    date: "2024-10-20",
    organizer: "Tech Club",
    status: "pending",
    proof: "attendance.jpg",
  },
  {
    id: 3,
    title: "Cybersecurity Fundamentals",
    date: "2024-09-25",
    organizer: "Industry Expert",
    status: "approved",
    proof: "certificate.pdf",
  },
]

export default function Academics() {
  const [selectedSemester, setSelectedSemester] = useState(semesters[0])
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isSeminarOpen, setIsSeminarOpen] = useState(false)

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

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Academic Records</h1>
                <p className="text-sm sm:text-base text-gray-600">Comprehensive view of your academic performance and records</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Download Transcript</span>
              <span className="sm:hidden">Download</span>
            </Button>
          </div>

          {/* Student Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-sm font-medium text-blue-800">Student ID</span>
              </div>
              <p className="text-lg font-semibold text-blue-900">{studentInfo.studentId}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-sm font-medium text-green-800">Current Semester</span>
              </div>
              <p className="text-lg font-semibold text-green-900">Semester {studentInfo.currentSemester}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-sm font-medium text-purple-800">Program</span>
              </div>
              <p className="text-lg font-semibold text-purple-900">{studentInfo.program}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                <span className="text-sm font-medium text-orange-800">Academic Mentor</span>
              </div>
              <p className="text-lg font-semibold text-orange-900">{studentInfo.mentor}</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="performance" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 bg-white border border-gray-200 rounded-lg p-1 gap-1">
            <TabsTrigger
              value="performance"
              className="flex items-center gap-1 sm:gap-2 border data-[state=active]:border-blue-300 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 border-transparent text-xs sm:text-sm px-2 sm:px-3"
            >
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Performance</span>
              <span className="sm:hidden">Perf</span>
            </TabsTrigger>
            <TabsTrigger
              value="subjects"
              className="flex items-center gap-1 sm:gap-2 border data-[state=active]:border-blue-300 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 border-transparent text-xs sm:text-sm px-2 sm:px-3"
            >
              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
              Subjects
            </TabsTrigger>
            <TabsTrigger
              value="assignments"
              className="flex items-center gap-1 sm:gap-2 border data-[state=active]:border-blue-300 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 border-transparent text-xs sm:text-sm px-2 sm:px-3 lg:col-span-1"
            >
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Assignments</span>
              <span className="sm:hidden">Tasks</span>
            </TabsTrigger>
            <TabsTrigger
              value="seminars"
              className="flex items-center gap-1 sm:gap-2 border data-[state=active]:border-blue-300 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 border-transparent text-xs sm:text-sm px-2 sm:px-3 lg:col-span-1"
            >
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              Seminars
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="flex items-center gap-1 sm:gap-2 border data-[state=active]:border-blue-300 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 border-transparent text-xs sm:text-sm px-2 sm:px-3 lg:col-span-1"
            >
              <Trophy className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Achievements</span>
              <span className="sm:hidden">Awards</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
              {/* Semester Overview */}
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    Semester Overview
                  </CardTitle>
                  <CardDescription>Select a semester to view detailed performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {semesters.map((semester) => (
                      <div
                        key={semester.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${selectedSemester.id === semester.id
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                          }`}
                        onClick={() => setSelectedSemester(semester)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-800">{semester.name}</h3>
                            <p className="text-sm text-gray-600">{semester.credits}/{semester.totalCredits} Credits</p>
                            <p className="text-xs text-gray-500">Rank: {semester.rank}/{semester.totalStudents}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">{semester.gpa}</div>
                            <p className="text-xs text-gray-500">SGPA</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Overall Statistics */}
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Academic Performance
                  </CardTitle>
                  <CardDescription>Your cumulative academic statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700">Cumulative GPA</span>
                      <span className="font-semibold text-green-600">8.7</span>
                    </div>
                    <Progress value={87} className="h-3 bg-gray-100" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700">Credits Completed</span>
                      <span className="font-semibold text-blue-600">142/160</span>
                    </div>
                    <Progress value={89} className="h-3 bg-gray-100" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700">Overall Attendance</span>
                      <span className="font-semibold text-purple-600">89%</span>
                    </div>
                    <Progress value={89} className="h-3 bg-gray-100" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">24</div>
                      <p className="text-xs text-blue-700">A+ Grades</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">18</div>
                      <p className="text-xs text-green-700">A Grades</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Academic Progress Chart */}
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    Semester Progress
                  </CardTitle>
                  <CardDescription>Your SGPA trend over semesters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Current Semester</span>
                      <span className="text-lg font-bold text-blue-600">8.9 SGPA</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Previous Semester</span>
                      <span className="text-lg font-bold text-green-600">8.5 SGPA</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Improvement</span>
                      <span className="text-lg font-bold text-emerald-600">+0.4</span>
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-700">Class Rank</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-600">5th out of 120</div>
                      <p className="text-sm text-gray-600">Top 4% of your batch</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  {selectedSemester.name} - Detailed Subject Records
                </CardTitle>
                <CardDescription>
                  Complete breakdown of subjects with marks, grades, and attendance details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-4 sm:-mx-6">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <Table className="min-w-full">
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="font-semibold">Subject Code</TableHead>
                            <TableHead className="font-semibold">Subject Name</TableHead>
                            <TableHead className="font-semibold">Professor</TableHead>
                            <TableHead className="font-semibold">Credits</TableHead>
                            <TableHead className="font-semibold">Internal</TableHead>
                            <TableHead className="font-semibold">External</TableHead>
                            <TableHead className="font-semibold">Total</TableHead>
                            <TableHead className="font-semibold">Grade</TableHead>
                            <TableHead className="font-semibold">Attendance</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedSemester.subjects.map((subject, index) => (
                            <TableRow key={index} className="hover:bg-gray-50">
                              <TableCell className="font-medium text-blue-600">{subject.code}</TableCell>
                              <TableCell className="font-medium">{subject.name}</TableCell>
                              <TableCell className="text-gray-600">{subject.professor}</TableCell>
                              <TableCell className="text-center">{subject.credits}</TableCell>
                              <TableCell className="text-center">{subject.internalMarks}/50</TableCell>
                              <TableCell className="text-center">{subject.externalMarks}/100</TableCell>
                              <TableCell className="text-center font-semibold">{subject.total}/150</TableCell>
                              <TableCell>
                                <Badge
                                  variant={subject.grade.startsWith("A") ? "default" : "secondary"}
                                  className={subject.grade.startsWith("A") ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                                >
                                  {subject.grade}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Progress value={subject.attendance} className="h-2 w-20" />
                                  <span className="text-sm font-medium">{subject.attendance}%</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={subject.attendance >= 85 ? "default" : "destructive"}
                                  className={subject.attendance >= 85 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                                >
                                  {subject.attendance >= 85 ? "Good" : "Low"}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-sm font-medium text-blue-800 mb-1">Semester GPA</div>
                    <div className="text-2xl font-bold text-blue-600">{selectedSemester.gpa}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-sm font-medium text-green-800 mb-1">Credits Earned</div>
                    <div className="text-2xl font-bold text-green-600">{selectedSemester.credits}</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="text-sm font-medium text-purple-800 mb-1">Class Rank</div>
                    <div className="text-2xl font-bold text-purple-600">{selectedSemester.rank}</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="text-sm font-medium text-orange-800 mb-1">Avg Attendance</div>
                    <div className="text-2xl font-bold text-orange-600">
                      {Math.round(selectedSemester.subjects.reduce((acc, sub) => acc + sub.attendance, 0) / selectedSemester.subjects.length)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">Assignments</h2>
                <p className="text-sm sm:text-base text-muted-foreground">Upload and track your assignment submissions</p>
              </div>
              <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Upload Assignment</span>
                    <span className="sm:hidden">Upload</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] sm:max-w-lg mx-2 sm:mx-auto">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">Upload Assignment</DialogTitle>
                    <DialogDescription className="text-sm">Submit your assignment for faculty review and approval.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 sm:space-y-4 px-1">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm">Assignment Title</Label>
                      <Input id="title" placeholder="Enter assignment title" className="text-sm" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm">Subject</Label>
                      <Input id="subject" placeholder="Select subject" className="text-sm" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm">Description</Label>
                      <Textarea id="description" placeholder="Brief description of the assignment" className="text-sm min-h-[80px]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="file">Upload File</Label>
                      <div className="relative">
                        <input
                          type="file"
                          id="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept=".pdf,.doc,.docx,.txt,.zip,.rar"
                        />
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors">
                          <Upload className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-xs sm:text-sm text-gray-600">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, TXT, ZIP up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => setIsUploadOpen(false)} className="w-full sm:w-auto">
                      Cancel
                    </Button>
                    <Button onClick={() => setIsUploadOpen(false)} className="w-full sm:w-auto">Submit Assignment</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">{assignment.title}</TableCell>
                        <TableCell>{assignment.subject}</TableCell>
                        <TableCell>{assignment.dueDate}</TableCell>
                        <TableCell>{assignment.uploadDate || "Not uploaded"}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(assignment.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(assignment.status)}
                              {assignment.status}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seminars" className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">College Seminars & Workshops</h2>
                <p className="text-sm sm:text-base text-muted-foreground">Track your participation in academic events</p>
              </div>
              <Dialog open={isSeminarOpen} onOpenChange={setIsSeminarOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Add Seminar</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] sm:max-w-lg mx-2 sm:mx-auto">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">Add Seminar Participation</DialogTitle>
                    <DialogDescription className="text-sm">Record your attendance at college seminars and workshops.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 sm:space-y-4 px-1">
                    <div className="space-y-2">
                      <Label htmlFor="seminar-title" className="text-sm">Seminar Title</Label>
                      <Input id="seminar-title" placeholder="Enter seminar title" className="text-sm" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organizer" className="text-sm">Organizer</Label>
                      <Input id="organizer" placeholder="Department or organization" className="text-sm" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-sm">Date</Label>
                      <Input id="date" type="date" className="text-sm" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="proof">Upload Proof</Label>
                      <div className="relative">
                        <input
                          type="file"
                          id="proof"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        />
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors">
                          <FileText className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-xs sm:text-sm text-gray-600">Upload certificate or attendance proof</p>
                          <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG, DOC up to 5MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => setIsSeminarOpen(false)} className="w-full sm:w-auto">
                      Cancel
                    </Button>
                    <Button onClick={() => setIsSeminarOpen(false)} className="w-full sm:w-auto">Submit for Approval</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Seminar Title</TableHead>
                      <TableHead>Organizer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Proof</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {seminars.map((seminar) => (
                      <TableRow key={seminar.id}>
                        <TableCell className="font-medium">{seminar.title}</TableCell>
                        <TableCell>{seminar.organizer}</TableCell>
                        <TableCell>{seminar.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{seminar.proof}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(seminar.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(seminar.status)}
                              {seminar.status}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  Academic Achievements & Recognition
                </CardTitle>
                <CardDescription>
                  Your academic milestones, awards, and special recognitions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 lg:grid-cols-2">
                  {/* Achievements List */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      Academic Awards
                    </h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Trophy className="h-5 w-5 text-yellow-600" />
                          <div>
                            <h4 className="font-semibold text-yellow-900">Dean's List - Fall 2024</h4>
                            <p className="text-sm text-yellow-700">Top 10% academic performance</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Trophy className="h-5 w-5 text-blue-600" />
                          <div>
                            <h4 className="font-semibold text-blue-900">Best Project Award - Spring 2024</h4>
                            <p className="text-sm text-blue-700">Machine Learning Project Excellence</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Trophy className="h-5 w-5 text-green-600" />
                          <div>
                            <h4 className="font-semibold text-green-900">Academic Excellence Scholarship</h4>
                            <p className="text-sm text-green-700">Merit-based scholarship recipient</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Achievement Statistics</h3>
                    <div className="grid gap-4">
                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600">3</div>
                          <p className="text-sm text-purple-700">Academic Awards</p>
                        </div>
                      </div>
                      <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-indigo-600">7</div>
                          <p className="text-sm text-indigo-700">Semesters on Dean's List</p>
                        </div>
                      </div>
                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-emerald-600">95%</div>
                          <p className="text-sm text-emerald-700">Scholarship Eligibility</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
