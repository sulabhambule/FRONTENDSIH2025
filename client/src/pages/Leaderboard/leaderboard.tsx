"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Trophy, Medal, Award, GraduationCap, Users, TrendingUp, Search, Filter } from "lucide-react"

// Mock student data - replace with actual data source
const mockStudents = [
  {
    id: 1,
    name: "Sarah Johnson",
    department: "Computer Science",
    year: "2024",
    branch: "Software Engineering",
    score: 95.8,
    achievements: 12,
    rank: 1,
  },
  {
    id: 2,
    name: "Michael Chen",
    department: "Computer Science",
    year: "2024",
    branch: "Data Science",
    score: 94.2,
    achievements: 11,
    rank: 2,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    department: "Engineering",
    year: "2023",
    branch: "Electrical",
    score: 93.7,
    achievements: 10,
    rank: 3,
  },
  {
    id: 4,
    name: "David Kim",
    department: "Computer Science",
    year: "2024",
    branch: "Cybersecurity",
    score: 92.9,
    achievements: 9,
    rank: 4,
  },
  {
    id: 5,
    name: "Jessica Wang",
    department: "Engineering",
    year: "2023",
    branch: "Mechanical",
    score: 92.1,
    achievements: 8,
    rank: 5,
  },
  {
    id: 6,
    name: "Alex Thompson",
    department: "Business",
    year: "2024",
    branch: "Finance",
    score: 91.8,
    achievements: 7,
    rank: 6,
  },
  {
    id: 7,
    name: "Maria Garcia",
    department: "Engineering",
    year: "2022",
    branch: "Civil",
    score: 91.3,
    achievements: 8,
    rank: 7,
  },
  {
    id: 8,
    name: "James Wilson",
    department: "Business",
    year: "2023",
    branch: "Marketing",
    score: 90.9,
    achievements: 6,
    rank: 8,
  },
  {
    id: 9,
    name: "Lisa Brown",
    department: "Computer Science",
    year: "2022",
    branch: "AI/ML",
    score: 90.5,
    achievements: 9,
    rank: 9,
  },
  {
    id: 10,
    name: "Robert Davis",
    department: "Engineering",
    year: "2024",
    branch: "Chemical",
    score: 90.1,
    achievements: 5,
    rank: 10,
  },
]

const departments = ["All Departments", "Computer Science", "Engineering", "Business"]
const years = ["All Years", "2024", "2023", "2022"]
const branches = [
  "All Branches",
  "Software Engineering",
  "Data Science",
  "Electrical",
  "Cybersecurity",
  "Mechanical",
  "Finance",
  "Civil",
  "Marketing",
  "AI/ML",
  "Chemical",
]

export function TeacherLeaderboard() {
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedYear, setSelectedYear] = useState("All Years")
  const [selectedBranch, setSelectedBranch] = useState("All Branches")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredStudents = useMemo(() => {
    return mockStudents.filter((student) => {
      const matchesDepartment = selectedDepartment === "All Departments" || student.department === selectedDepartment
      const matchesYear = selectedYear === "All Years" || student.year === selectedYear
      const matchesBranch = selectedBranch === "All Branches" || student.branch === selectedBranch
      const matchesSearch = searchQuery === "" || student.name.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesDepartment && matchesYear && matchesBranch && matchesSearch
    })
  }, [selectedDepartment, selectedYear, selectedBranch, searchQuery])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
      case 3:
        return <Award className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
      default:
        return <span className="text-xs sm:text-sm font-medium text-muted-foreground">#{rank}</span>
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 95) return "text-success"
    if (score >= 90) return "text-primary"
    if (score >= 85) return "text-warning"
    return "text-muted-foreground"
  }

  return (
    <div className="container mx-auto p-3 sm:p-4 lg:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-balance">Student Achievement Leaderboard</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Track and monitor student performance across departments</p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto">
          <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <Badge variant="secondary" className="text-xs sm:text-sm">
            Teacher Admin Panel
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground">Total Students</p>
                <p className="text-lg sm:text-2xl font-bold">{filteredStudents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-success" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground">Avg Score</p>
                <p className="text-lg sm:text-2xl font-bold">
                  {filteredStudents.length > 0
                    ? (filteredStudents.reduce((sum, s) => sum + s.score, 0) / filteredStudents.length).toFixed(1)
                    : "0.0"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Award className="h-6 w-6 sm:h-8 sm:w-8 text-warning" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground">Top Performer</p>
                <p className="text-sm sm:text-lg font-semibold text-pretty truncate">
                  {filteredStudents.length > 0 ? filteredStudents[0]?.name : "No data"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground">Departments</p>
                <p className="text-lg sm:text-2xl font-bold">{departments.length - 1}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Filter className="h-5 w-5" />
            Filter & Search
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium">Search Students</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 text-sm md:text-base"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium">Department</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="text-sm md:text-base">
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
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium">Academic Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="text-sm md:text-base">
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
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium">Branch/Specialization</label>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="text-sm md:text-base">
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
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedDepartment("All Departments")
                setSelectedYear("All Years")
                setSelectedBranch("All Branches")
                setSearchQuery("")
              }}
              className="text-sm md:text-base"
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">Student Rankings</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-3">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-6 sm:py-8 text-muted-foreground">
                <GraduationCap className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm sm:text-base">No students found matching the current filters.</p>
              </div>
            ) : (
              filteredStudents.map((student, index) => (
                <div
                  key={student.id}
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg border transition-colors hover:bg-accent/50 gap-3 sm:gap-4 ${index < 3 ? "bg-accent/20 border-primary/20" : "bg-card"
                    }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 shrink-0">{getRankIcon(student.rank)}</div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <h3 className="font-semibold text-sm sm:text-base text-pretty truncate">{student.name}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs self-start">
                          {student.department}
                        </Badge>
                        <span className="hidden sm:inline">•</span>
                        <span className="truncate">{student.branch}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Class of {student.year}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 shrink-0">
                    <div className="text-center sm:text-right">
                      <p className="text-xs sm:text-sm text-muted-foreground">Achievements</p>
                      <p className="font-semibold text-sm sm:text-base">{student.achievements}</p>
                    </div>
                    <div className="text-center sm:text-right">
                      <p className="text-xs sm:text-sm text-muted-foreground">Score</p>
                      <p className={`text-lg sm:text-xl font-bold ${getScoreColor(student.score)}`}>{student.score}%</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
