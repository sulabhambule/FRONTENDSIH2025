"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Trophy,
  Medal,
  Award,
  GraduationCap,
  Users,
  TrendingUp,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  BarChart3,
  Calendar,
  BookOpen
} from "lucide-react"

// Types
interface Student {
  id: number
  name: string
  studentId: string
  department: string
  year: string
  branch: string
  score: number
  achievements: number
  rank: number
  gpa: number
  attendanceRate: number
  projects: number
  certifications: number
}

// Mock student data - replace with actual API data
const mockStudents: Student[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    studentId: "STU001234",
    department: "Computer Science",
    year: "2024",
    branch: "Software Engineering",
    score: 95.8,
    achievements: 12,
    rank: 1,
    gpa: 3.9,
    attendanceRate: 96,
    projects: 8,
    certifications: 4
  },
  {
    id: 2,
    name: "Michael Chen",
    studentId: "STU001235",
    department: "Computer Science",
    year: "2024",
    branch: "Data Science",
    score: 94.2,
    achievements: 11,
    rank: 2,
    gpa: 3.8,
    attendanceRate: 94,
    projects: 7,
    certifications: 3
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    studentId: "STU001236",
    department: "Engineering",
    year: "2023",
    branch: "Electrical Engineering",
    score: 93.7,
    achievements: 10,
    rank: 3,
    gpa: 3.7,
    attendanceRate: 92,
    projects: 6,
    certifications: 2
  },
  {
    id: 4,
    name: "David Kim",
    studentId: "STU001237",
    department: "Computer Science",
    year: "2024",
    branch: "Cybersecurity",
    score: 92.9,
    achievements: 9,
    rank: 4,
    gpa: 3.6,
    attendanceRate: 93,
    projects: 5,
    certifications: 3
  },
  {
    id: 5,
    name: "Jessica Wang",
    studentId: "STU001238",
    department: "Engineering",
    year: "2023",
    branch: "Mechanical Engineering",
    score: 92.1,
    achievements: 8,
    rank: 5,
    gpa: 3.5,
    attendanceRate: 91,
    projects: 4,
    certifications: 2
  },
  {
    id: 6,
    name: "Alex Thompson",
    studentId: "STU001239",
    department: "Business Administration",
    year: "2024",
    branch: "Finance",
    score: 91.8,
    achievements: 7,
    rank: 6,
    gpa: 3.4,
    attendanceRate: 89,
    projects: 3,
    certifications: 1
  },
  {
    id: 7,
    name: "Maria Garcia",
    studentId: "STU001240",
    department: "Engineering",
    year: "2022",
    branch: "Civil Engineering",
    score: 91.3,
    achievements: 8,
    rank: 7,
    gpa: 3.5,
    attendanceRate: 88,
    projects: 4,
    certifications: 2
  },
  {
    id: 8,
    name: "James Wilson",
    studentId: "STU001241",
    department: "Business Administration",
    year: "2023",
    branch: "Marketing",
    score: 90.9,
    achievements: 6,
    rank: 8,
    gpa: 3.3,
    attendanceRate: 87,
    projects: 2,
    certifications: 1
  }
]

// Filter options
const departments = ["All Departments", "Computer Science", "Engineering", "Business Administration"]
const years = ["All Years", "2024", "2023", "2022"]
const branches = [
  "All Branches",
  "Software Engineering",
  "Data Science",
  "Electrical Engineering",
  "Cybersecurity",
  "Mechanical Engineering",
  "Finance",
  "Civil Engineering",
  "Marketing"
]

const sortOptions = [
  { value: "rank", label: "Rank" },
  { value: "name", label: "Name" },
  { value: "score", label: "Overall Score" },
  { value: "achievements", label: "Achievements" },
  { value: "gpa", label: "GPA" },
  { value: "attendance", label: "Attendance" },
  { value: "projects", label: "Projects" },
  { value: "department", label: "Department" },
  { value: "year", label: "Academic Year" }
]

export function TeacherLeaderboard() {
  // State management
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedYear, setSelectedYear] = useState("All Years")
  const [selectedBranch, setSelectedBranch] = useState("All Branches")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("rank")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [showDetails, setShowDetails] = useState<number | null>(null)

  const studentsPerPage = 10

  // Filtered and sorted students
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = mockStudents.filter((student) => {
      const matchesDepartment = selectedDepartment === "All Departments" || student.department === selectedDepartment
      const matchesYear = selectedYear === "All Years" || student.year === selectedYear
      const matchesBranch = selectedBranch === "All Branches" || student.branch === selectedBranch
      const matchesSearch = searchQuery === "" ||
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesDepartment && matchesYear && matchesBranch && matchesSearch
    })

    // Sort students
    filtered = filtered.sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "score":
          comparison = a.score - b.score
          break
        case "achievements":
          comparison = a.achievements - b.achievements
          break
        case "gpa":
          comparison = a.gpa - b.gpa
          break
        case "attendance":
          comparison = a.attendanceRate - b.attendanceRate
          break
        case "projects":
          comparison = a.projects - b.projects
          break
        case "department":
          comparison = a.department.localeCompare(b.department)
          break
        case "year":
          comparison = a.year.localeCompare(b.year)
          break
        default:
          comparison = a.rank - b.rank
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

    return filtered
  }, [selectedDepartment, selectedYear, selectedBranch, searchQuery, sortBy, sortOrder])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedStudents.length / studentsPerPage)
  const paginatedStudents = filteredAndSortedStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  )

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [selectedDepartment, selectedYear, selectedBranch, searchQuery, sortBy, sortOrder])

  // Helper functions
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 95) return "text-green-600"
    if (score >= 90) return "text-blue-600"
    if (score >= 85) return "text-orange-600"
    return "text-gray-600"
  }

  const getPerformanceLabel = (score: number) => {
    if (score >= 95) return "Excellent"
    if (score >= 90) return "Very Good"
    if (score >= 85) return "Good"
    if (score >= 80) return "Satisfactory"
    return "Needs Improvement"
  }

  const clearAllFilters = () => {
    setSelectedDepartment("All Departments")
    setSelectedYear("All Years")
    setSelectedBranch("All Branches")
    setSearchQuery("")
    setSortBy("rank")
    setSortOrder("asc")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Student Performance Dashboard</h1>
                <p className="text-gray-600">Monitor and track student academic records</p>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800 border border-blue-200 text-sm px-3 py-1">
              Academic Records Management
            </Badge>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-800">{filteredAndSortedStudents.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {filteredAndSortedStudents.length > 0
                      ? (filteredAndSortedStudents.reduce((sum, s) => sum + s.score, 0) / filteredAndSortedStudents.length).toFixed(1)
                      : "0.0"}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                  <Trophy className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Top Performer</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {filteredAndSortedStudents.length > 0 ? filteredAndSortedStudents[0]?.name : "No data"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Excellence Rate</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {filteredAndSortedStudents.length > 0
                      ? Math.round((filteredAndSortedStudents.filter(s => s.score >= 90).length / filteredAndSortedStudents.length) * 100)
                      : 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
              <Filter className="h-5 w-5 text-blue-600" />
              Filter & Search Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">

              {/* Search Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Search Students</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Department Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Department</label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Year Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Academic Year</label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Branch Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Branch/Specialization</label>
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Options */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Sort By</label>
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="border-gray-300 focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    className="px-3 border-gray-300"
                  >
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                >
                  Clear All Filters
                </Button>
              </div>
              <div className="text-sm text-gray-600">
                Showing {paginatedStudents.length} of {filteredAndSortedStudents.length} students
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard Table */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                <Trophy className="h-5 w-5 text-blue-600" />
                Student Performance Rankings
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                Page {currentPage} of {totalPages || 1}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {paginatedStudents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 inline-block">
                    <GraduationCap className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 font-medium text-lg">No students found</p>
                    <p className="text-gray-500">Try adjusting your search filters</p>
                  </div>
                </div>
              ) : (
                paginatedStudents.map((student) => {
                  const isTopThree = student.rank <= 3
                  const isExpanded = showDetails === student.id
                  return (
                    <div
                      key={student.id}
                      className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${isTopThree
                        ? "bg-blue-50 border-blue-200 shadow-sm"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-12 h-12">
                            {getRankIcon(student.rank)}
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-semibold text-gray-800 text-lg">{student.name}</h3>
                            <p className="text-sm text-gray-600 font-medium">{student.studentId}</p>
                            <div className="flex items-center gap-2 text-sm">
                              <Badge className="bg-blue-100 text-blue-800 border border-blue-200">
                                {student.department}
                              </Badge>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-600">{student.branch}</span>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-600">Class of {student.year}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">Overall Score</p>
                            <p className={`text-2xl font-bold ${getPerformanceColor(student.score)}`}>
                              {student.score}%
                            </p>
                            <p className="text-xs text-gray-500">{getPerformanceLabel(student.score)}</p>
                          </div>

                          <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">Achievements</p>
                            <div className="flex items-center gap-1 justify-center">
                              <Award className="h-4 w-4 text-purple-600" />
                              <span className="font-semibold text-gray-800">{student.achievements}</span>
                            </div>
                          </div>

                          <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">GPA</p>
                            <p className="text-lg font-bold text-gray-800">{student.gpa}</p>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowDetails(isExpanded ? null : student.id)}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                          >
                            {isExpanded ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                            <div className="p-3 bg-gray-50 rounded-lg border">
                              <div className="flex items-center gap-2 mb-2">
                                <BookOpen className="h-4 w-4 text-blue-600" />
                                <p className="font-medium text-gray-700">Academic Details</p>
                              </div>
                              <p className="text-gray-600">Attendance: {student.attendanceRate}%</p>
                              <p className="text-gray-600">Projects: {student.projects}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg border">
                              <div className="flex items-center gap-2 mb-2">
                                <Trophy className="h-4 w-4 text-blue-600" />
                                <p className="font-medium text-gray-700">Achievements</p>
                              </div>
                              <p className="text-gray-600">Total: {student.achievements}</p>
                              <p className="text-gray-600">Certifications: {student.certifications}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg border">
                              <div className="flex items-center gap-2 mb-2">
                                <BarChart3 className="h-4 w-4 text-blue-600" />
                                <p className="font-medium text-gray-700">Performance</p>
                              </div>
                              <p className="text-gray-600">Rank: #{student.rank} of {mockStudents.length}</p>
                              <p className="text-gray-600">Level: {getPerformanceLabel(student.score)}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg border">
                              <div className="flex items-center gap-2 mb-2">
                                <Users className="h-4 w-4 text-blue-600" />
                                <p className="font-medium text-gray-700">Program Info</p>
                              </div>
                              <p className="text-gray-600">{student.department}</p>
                              <p className="text-gray-600">{student.branch}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * studentsPerPage + 1} to{" "}
                  {Math.min(currentPage * studentsPerPage, filteredAndSortedStudents.length)} of{" "}
                  {filteredAndSortedStudents.length} students
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="border-gray-300"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNumber = i + 1
                      return (
                        <Button
                          key={pageNumber}
                          variant={currentPage === pageNumber ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNumber)}
                          className={currentPage === pageNumber ? "bg-blue-600 hover:bg-blue-700" : "border-gray-300"}
                        >
                          {pageNumber}
                        </Button>
                      )
                    })}
                    {totalPages > 5 && (
                      <>
                        <span className="text-gray-400">...</span>
                        <Button
                          variant={currentPage === totalPages ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(totalPages)}
                          className={currentPage === totalPages ? "bg-blue-600 hover:bg-blue-700" : "border-gray-300"}
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="border-gray-300"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}