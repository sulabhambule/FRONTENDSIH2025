"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RolesList } from "./RolesList"
import { PermissionsMatrix } from "./PermissionsMatrix"
import { UserRoleAssignments } from "./UserRoleAssignments"
import { CreateRoleModal } from "../TeacherManagement/CreateRoleModal"
import { Plus } from "lucide-react"
import rolesData from "./rolesPermissions.json"

export function RolesPermissions() {
  const [roles, setRoles] = useState(rolesData.roles)
  const [permissions] = useState(rolesData.permissions)
  const [userAssignments, setUserAssignments] = useState(rolesData.userRoleAssignments)
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false)

  // TODO: Replace with actual API calls
  /*
  const fetchRolesData = async () => {
    try {
      const response = await fetch('/api/admin/roles')
      const data = await response.json()
      setRoles(data.roles)
      setUserAssignments(data.userAssignments)
    } catch (error) {
      console.error('Error fetching roles data:', error)
    }
  }

  const updateUserRole = async (userId: string, newRoleId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roleId: newRoleId })
      })
      if (response.ok) {
        fetchRolesData()
      }
    } catch (error) {
      console.error('Error updating user role:', error)
    }
  }

  const togglePermission = async (roleId: string, permissionId: string) => {
    try {
      const response = await fetch(`/api/admin/roles/${roleId}/permissions`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permissionId, action: 'toggle' })
      })
      if (response.ok) {
        fetchRolesData()
      }
    } catch (error) {
      console.error('Error toggling permission:', error)
    }
  }
  */

  const handleEditRole = (role: any) => {
    // TODO: Open edit role modal
    console.log("Edit role:", role)
  }

  const handleDeleteRole = (roleId: string) => {
    // TODO: Implement role deletion with confirmation
    console.log("Delete role:", roleId)
  }

  const handlePermissionToggle = (roleId: string, permissionId: string) => {
    // TODO: Implement permission toggle
    console.log("Toggle permission:", roleId, permissionId)
    setRoles((prevRoles) =>
      prevRoles.map((role) => {
        if (role.id === roleId) {
          const hasPermission = role.permissions.includes(permissionId)
          return {
            ...role,
            permissions: hasPermission
              ? role.permissions.filter((p) => p !== permissionId)
              : [...role.permissions, permissionId],
          }
        }
        return role
      }),
    )
  }

  const handleRoleChange = (userId: string, newRoleId: string) => {
    // TODO: Implement role change
    console.log("Change user role:", userId, newRoleId)
    setUserAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment.userId === userId ? { ...assignment, currentRole: newRoleId } : assignment,
      ),
    )
  }

  const handleCreateRole = () => {
    setIsCreateRoleModalOpen(true)
  }

  const handleCloseCreateRoleModal = () => {
    setIsCreateRoleModalOpen(false)
  }

  const handleSubmitRole = (roleData: any) => {
    // Generate a unique ID for the new role
    const newRole = {
      ...roleData,
      id: `role_${Date.now()}`,
      userCount: 0
    }

    // Add to roles list
    setRoles(prevRoles => [...prevRoles, newRole])

    // TODO: Replace with actual API call
    console.log("Creating new role:", newRole)

    setIsCreateRoleModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Page Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Roles & Permissions</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage user roles and system permissions</p>
            </div>
            <Button
              onClick={handleCreateRole}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Role
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="roles">
          <TabsList className="bg-white border border-gray-200 rounded-md grid grid-cols-3 gap-1 p-1">
            <TabsTrigger
              value="roles"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-2 sm:px-4 py-2 rounded-sm text-xs sm:text-sm"
            >
              Roles
            </TabsTrigger>
            <TabsTrigger
              value="permissions"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-2 sm:px-4 py-2 rounded-sm text-xs sm:text-sm"
            >
              <span className="hidden sm:inline">Permissions Matrix</span>
              <span className="sm:hidden">Permissions</span>
            </TabsTrigger>
            <TabsTrigger
              value="assignments"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-2 sm:px-4 py-2 rounded-sm text-xs sm:text-sm"
            >
              <span className="hidden sm:inline">User Assignments</span>
              <span className="sm:hidden">Users</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roles" className="mt-4">
            <RolesList roles={roles} onEditRole={handleEditRole} onDeleteRole={handleDeleteRole} />
          </TabsContent>

          <TabsContent value="permissions" className="mt-4">
            <PermissionsMatrix roles={roles} permissions={permissions} onPermissionToggle={handlePermissionToggle} />
          </TabsContent>

          <TabsContent value="assignments" className="mt-4">
            <UserRoleAssignments assignments={userAssignments} roles={roles} onRoleChange={handleRoleChange} />
          </TabsContent>
        </Tabs>

        {/* Create Role Modal */}
        <CreateRoleModal
          isOpen={isCreateRoleModalOpen}
          onClose={handleCloseCreateRoleModal}
          onSubmit={handleSubmitRole}
          permissions={permissions}
          existingRoles={roles}
        />
      </div>
    </div>
  )
}
