"use client"

import { useState, useMemo } from "react"
import type { LeaderboardEntry, Student } from "../../types/admin"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Input } from "../../components/ui/input"
import { Trophy, Medal, Award, TrendingUp, Users, Target } from "lucide-react"
import studentsData from "./StudentManagement/students.json"

export function PerformanceLeaderboard() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"points" | "cgpa" | "activities">("points")

  // Transform students data into leaderboard entries
  const leaderboardData = useMemo(() => {
    let filteredStudents = studentsData.students as Student[]

    // Apply filters
    if (selectedDepartment !== "all") {
      filteredStudents = filteredStudents.filter((student) => student.department === selectedDepartment)
    }
    if (selectedYear !== "all") {
      filteredStudents = filteredStudents.filter((student) => student.year === Number.parseInt(selectedYear))
    }
    if (searchQuery) {
      filteredStudents = filteredStudents.filter(
        (student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Sort based on view mode
    const sortedStudents = [...filteredStudents].sort((a, b) => {
      switch (viewMode) {
        case "points":
          return b.totalPoints - a.totalPoints
        case "cgpa":
          return b.cgpa - a.cgpa
        case "activities":
          return b.activities.length - a.activities.length
        default:
          return b.totalPoints - a.totalPoints
      }
    })

    // Convert to leaderboard entries with ranks
    return sortedStudents.map(
      (student, index): LeaderboardEntry => ({
        rank: index + 1,
        studentId: student.id,
        name: student.name,
        department: student.department,
        year: student.year,
        totalPoints: student.totalPoints,
        activities: student.activities.length,
        profileImage: student.profileImage,
      }),
    )
  }, [selectedDepartment, selectedYear, searchQuery, viewMode])

  const departments = [...new Set(studentsData.students.map((s) => s.department))]
  const years = [...new Set(studentsData.students.map((s) => s.year))].sort()



  const getMetricValue = (entry: LeaderboardEntry) => {
    const student = studentsData.students.find((s) => s.id === entry.studentId) as Student
    switch (viewMode) {
      case "points":
        return `${entry.totalPoints} pts`
      case "cgpa":
        return `${student.cgpa} CGPA`
      case "activities":
        return `${entry.activities} activities`
      default:
        return `${entry.totalPoints} pts`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Page Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Performance Leaderboard
              </h1>
              <p className="text-gray-600 mt-1">
                Track and compare student academic performance
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {leaderboardData.length} Students
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white border border-gray-200 rounded-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{studentsData.students.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Points</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {Math.round(
                      studentsData.students.reduce((sum, s) => sum + s.totalPoints, 0) / studentsData.students.length,
                    )}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Students</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {studentsData.students.filter((s) => s.activities.length > 0).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <Card className="bg-white border border-gray-200 rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Filters</CardTitle>
            <CardDescription className="text-gray-600">
              Filter and search student performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-[200px]">
                <Input
                  placeholder="Search by name or roll number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white border-gray-300"
                />
              </div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-[180px] bg-white border-gray-300">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[120px] bg-white border-gray-300">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      Year {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "points" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("points")}
                  className={viewMode === "points" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  Points
                </Button>
                <Button
                  variant={viewMode === "cgpa" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("cgpa")}
                  className={viewMode === "cgpa" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  CGPA
                </Button>
                <Button
                  variant={viewMode === "activities" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("activities")}
                  className={viewMode === "activities" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  Activities
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card className="bg-white border border-gray-200 rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Leaderboard
            </CardTitle>
            <CardDescription className="text-gray-600">
              Showing {leaderboardData.length} students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboardData.map((entry) => (
                <div
                  key={entry.studentId}
                  className={`flex items-center justify-between p-4 rounded-lg border hover:bg-gray-100/50 ${entry.rank <= 3 ? "bg-blue-50/50 border-blue-200" : "border-gray-200"
                    }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10">
                      {entry.rank === 1 ? (
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Trophy className="h-5 w-5 text-white" />
                        </div>
                      ) : entry.rank === 2 ? (
                        <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                          <Medal className="h-5 w-5 text-white" />
                        </div>
                      ) : entry.rank === 3 ? (
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                          <Award className="h-5 w-5 text-white" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">#{entry.rank}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      {entry.profileImage ? (
                        <img
                          src={entry.profileImage || "/placeholder.svg"}
                          alt={entry.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">{entry.name.charAt(0)}</span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">{entry.name}</h3>
                        <p className="text-sm text-gray-600">
                          {entry.department} • Year {entry.year}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{getMetricValue(entry)}</p>
                      <p className="text-sm text-gray-600">{entry.activities} activities</p>
                    </div>
                    {entry.rank <= 3 && (
                      <Badge
                        className={
                          entry.rank === 1 ? "bg-yellow-100 text-yellow-800" :
                            entry.rank === 2 ? "bg-gray-100 text-gray-800" :
                              "bg-orange-100 text-orange-800"
                        }
                      >
                        Top {entry.rank}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
              {leaderboardData.length === 0 && (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Students Found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
