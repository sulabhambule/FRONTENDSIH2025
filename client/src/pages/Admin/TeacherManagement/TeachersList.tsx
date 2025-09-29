"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, Edit, MoreHorizontal } from "lucide-react"
import type { TeacherData } from "@/types/admin"

interface TeachersListProps {
  teachers: TeacherData[]
  departments: string[]
  designations: string[]
  onViewTeacher: (teacherId: string) => void
  onEditTeacher: (teacherId: string) => void
}

export function TeachersList({ teachers, departments, designations, onViewTeacher, onEditTeacher }: TeachersListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState<string>("all")
  const [filterDesignation, setFilterDesignation] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = filterDepartment === "all" || teacher.department === filterDepartment
    const matchesDesignation = filterDesignation === "all" || teacher.designation === filterDesignation
    const matchesStatus = filterStatus === "all" || teacher.status === filterStatus

    return matchesSearch && matchesDepartment && matchesDesignation && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700">Active</Badge>
      case "on_leave":
        return <Badge className="bg-yellow-100 text-yellow-700">On Leave</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-700">Inactive</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }



  return (
    <Card className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Faculty Directory</h3>
          <p className="text-sm text-gray-600">Manage and view all faculty records</p>
        </div>
        <Badge variant="outline" className="border-gray-300 text-gray-600 w-fit">
          {filteredTeachers.length} faculty
        </Badge>
      </div>

      {/* Filters - Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search faculty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-gray-300 text-gray-900"
          />
        </div>

        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <SelectTrigger className="bg-white border-gray-300 text-gray-900">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterDesignation} onValueChange={setFilterDesignation}>
          <SelectTrigger className="bg-white border-gray-300 text-gray-900">
            <SelectValue placeholder="Designation" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            <SelectItem value="all">All Designations</SelectItem>
            {designations.map((designation) => (
              <SelectItem key={designation} value={designation}>
                {designation}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="bg-white border-gray-300 text-gray-900">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="on_leave">On Leave</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Teachers Grid - Responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">
                    {teacher.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-gray-900 truncate">{teacher.name}</h4>
                  <p className="text-sm text-gray-600 truncate">{teacher.employeeId}</p>
                </div>
              </div>
              <div className="flex space-x-1 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewTeacher(teacher.id)}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditTeacher(teacher.id)}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 p-2">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Department</span>
                <span className="text-sm font-medium text-gray-900">{teacher.department}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Designation</span>
                <span className="text-sm font-medium text-gray-900">{teacher.designation}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Experience</span>
                <span className="text-sm font-medium text-gray-900">{teacher.experience} years</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rating</span>
                <span className="text-sm font-medium text-gray-900">{teacher.rating}/5</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Students</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {teacher.studentsGuided}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="text-sm font-medium text-orange-600">{teacher.approvalsPending}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                {getStatusBadge(teacher.status)}
              </div>

              <div className="pt-2 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  <div className="truncate">{teacher.email}</div>
                  <div>{teacher.phone}</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="text-gray-500 font-semibold">0</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No faculty found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </Card>
  )
}
