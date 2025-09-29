"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Search,
  Filter,
  Eye,
  Edit,
  MoreHorizontal,
  User,
  Mail,
  Phone
} from "lucide-react"
import type { StudentData } from "@/types/admin"

interface StudentsListProps {
  students: StudentData[]
  departments: string[]
  onViewStudent: (studentId: string) => void
  onEditStudent: (studentId: string) => void
}

export function StudentsList({ students, departments, onViewStudent, onEditStudent }: StudentsListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState<string>("all")
  const [filterYear, setFilterYear] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = filterDepartment === "all" || student.department === filterDepartment
    const matchesYear = filterYear === "all" || student.year.toString() === filterYear
    const matchesStatus = filterStatus === "all" || student.status === filterStatus

    return matchesSearch && matchesDepartment && matchesYear && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-admin-success text-white">Active</Badge>
      case "graduated":
        return <Badge className="bg-admin-primary text-white">Graduated</Badge>
      case "dropped":
        return <Badge className="bg-red-500 text-white">Dropped</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getCGPAColor = (cgpa: number) => {
    if (cgpa >= 9.0) return "text-admin-success"
    if (cgpa >= 8.0) return "text-admin-warning"
    if (cgpa >= 7.0) return "text-admin-info"
    return "text-red-500"
  }

  return (
    <Card className="admin-metric-card p-6 admin-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-admin-foreground">Students Directory</h3>
          <p className="text-sm text-admin-muted-foreground">Manage and view all student records</p>
        </div>
        <Badge variant="outline" className="border-admin-border text-admin-muted-foreground">
          {filteredStudents.length} students
        </Badge>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-admin-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-admin-background border-admin-border text-admin-foreground"
          />
        </div>

        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <SelectTrigger className="bg-admin-background border-admin-border text-admin-foreground">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent className="bg-admin-card border-admin-border">
            <SelectItem value="all" className="text-admin-foreground">
              All Departments
            </SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept} className="text-admin-foreground">
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterYear} onValueChange={setFilterYear}>
          <SelectTrigger className="bg-admin-background border-admin-border text-admin-foreground">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent className="bg-admin-card border-admin-border">
            <SelectItem value="all" className="text-admin-foreground">
              All Years
            </SelectItem>
            {[1, 2, 3, 4].map((year) => (
              <SelectItem key={year} value={year.toString()} className="text-admin-foreground">
                Year {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="bg-admin-background border-admin-border text-admin-foreground">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-admin-card border-admin-border">
            <SelectItem value="all" className="text-admin-foreground">
              All Status
            </SelectItem>
            <SelectItem value="active" className="text-admin-foreground">
              Active
            </SelectItem>
            <SelectItem value="graduated" className="text-admin-foreground">
              Graduated
            </SelectItem>
            <SelectItem value="dropped" className="text-admin-foreground">
              Dropped
            </SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          className="border-admin-border text-admin-foreground hover:bg-admin-secondary bg-transparent"
        >
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="admin-metric-card p-4 admin-card-hover">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-admin-primary rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-admin-foreground">{student.name}</h4>
                  <p className="text-sm text-admin-muted-foreground">{student.rollNumber}</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewStudent(student.id)}
                  className="text-admin-muted-foreground hover:text-admin-foreground"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditStudent(student.id)}
                  className="text-admin-muted-foreground hover:text-admin-foreground"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-admin-muted-foreground hover:text-admin-foreground">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-admin-muted-foreground">Department</span>
                <span className="text-sm font-medium text-admin-foreground">{student.department}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-admin-muted-foreground">Year/Semester</span>
                <span className="text-sm font-medium text-admin-foreground">
                  {student.year}/{student.semester}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-admin-muted-foreground">CGPA</span>
                <span className={`text-sm font-bold ${getCGPAColor(student.cgpa)}`}>{student.cgpa}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-admin-muted-foreground">Points</span>
                <Badge variant="secondary" className="bg-admin-success text-white">
                  {student.totalPoints}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-admin-muted-foreground">Status</span>
                {getStatusBadge(student.status)}
              </div>

              <div className="pt-3 border-t border-admin-border">
                <div className="flex items-center space-x-4 text-xs text-admin-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{student.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="w-3 h-3" />
                    <span>{student.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-admin-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-admin-foreground mb-2">No students found</h3>
          <p className="text-admin-muted-foreground">Try adjusting your search criteria</p>
        </div>
      )}
    </Card>
  )
}
