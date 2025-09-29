"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"

interface UserRoleAssignment {
  userId: string
  userName: string
  email: string
  currentRole: string
  department: string
  assignedBy: string
  assignedAt: string
}

interface Role {
  id: string
  name: string
  color: string
}

interface UserRoleAssignmentsProps {
  assignments: UserRoleAssignment[]
  roles: Role[]
  onRoleChange: (userId: string, newRoleId: string) => void
}

export function UserRoleAssignments({ assignments, roles, onRoleChange }: UserRoleAssignmentsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState<string>("all")

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = filterRole === "all" || assignment.currentRole === filterRole

    return matchesSearch && matchesRole
  })

  const getRoleInfo = (roleId: string) => {
    return roles.find((role) => role.id === roleId)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <Card className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4">
        <div>
          <h3 className="text-base lg:text-lg font-semibold text-gray-900">User Role Assignments</h3>
          <p className="text-xs lg:text-sm text-gray-600">Manage user roles and permissions</p>
        </div>
        <Badge variant="outline" className="border-gray-300 text-gray-600 self-start sm:self-center">
          {filteredAssignments.length} users
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-gray-300 text-gray-900"
          />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-full sm:w-48 bg-white border-gray-300 text-gray-900">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            <SelectItem value="all">All Roles</SelectItem>
            {roles.map((role) => (
              <SelectItem key={role.id} value={role.id}>
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* User List */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => {
          const roleInfo = getRoleInfo(assignment.currentRole)
          return (
            <div
              key={assignment.userId}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-3 lg:p-4 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3 lg:space-x-4 min-w-0 flex-1">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-xs lg:text-sm">
                    {assignment.userName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-gray-900 text-sm lg:text-base truncate">{assignment.userName}</h4>
                  <p className="text-xs lg:text-sm text-gray-600 truncate">{assignment.email}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-1 gap-1 sm:gap-0">
                    <span className="text-xs text-gray-500">{assignment.department}</span>
                    <span className="text-xs text-gray-500">
                      Assigned {formatDate(assignment.assignedAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 lg:flex-shrink-0">
                <Badge className="text-white text-xs lg:text-sm self-start sm:self-center" style={{ backgroundColor: roleInfo?.color || "#6b7280" }}>
                  {roleInfo?.name || assignment.currentRole}
                </Badge>
                <Select
                  value={assignment.currentRole}
                  onValueChange={(newRole) => onRoleChange(assignment.userId, newRole)}
                >
                  <SelectTrigger className="w-full sm:w-40 bg-white border-gray-300 text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )
        })}
      </div>

      {filteredAssignments.length === 0 && (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="text-gray-500 font-semibold">0</span>
          </div>
          <p className="text-gray-600">No users found matching your criteria</p>
        </div>
      )}
    </Card>
  )
}
