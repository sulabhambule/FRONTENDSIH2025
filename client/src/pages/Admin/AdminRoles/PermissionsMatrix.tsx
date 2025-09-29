import React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, Lock, Users, FileText, Settings, GraduationCap } from "lucide-react"

interface Permission {
  id: string
  name: string
  description: string
  category: string
}

interface Role {
  id: string
  name: string
  permissions: string[]
}

interface PermissionsMatrixProps {
  roles: Role[]
  permissions: Permission[]
  onPermissionToggle: (roleId: string, permissionId: string) => void
}

export function PermissionsMatrix({ roles, permissions, onPermissionToggle }: PermissionsMatrixProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "System":
        return <Settings className="w-4 h-4" />
      case "User Management":
        return <Users className="w-4 h-4" />
      case "Role Management":
        return <Shield className="w-4 h-4" />
      case "Reports":
        return <FileText className="w-4 h-4" />
      case "Academics":
        return <GraduationCap className="w-4 h-4" />
      default:
        return <Lock className="w-4 h-4" />
    }
  }

  const groupedPermissions = permissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = []
      }
      acc[permission.category].push(permission)
      return acc
    },
    {} as Record<string, Permission[]>,
  )

  return (
    <Card className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6">
      <div className="mb-4">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-1">Permissions Matrix</h3>
        <p className="text-xs lg:text-sm text-gray-600">Manage role permissions across the system</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] sm:min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 lg:py-3 px-1 sm:px-2 lg:px-4 font-medium text-gray-900 min-w-[150px] sm:min-w-[200px]">Permission</th>
              {roles.map((role) => (
                <th key={role.id} className="text-center py-2 lg:py-3 px-1 sm:px-2 lg:px-4 font-medium text-gray-900 min-w-[80px] sm:min-w-[100px] lg:min-w-[120px]">
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-xs lg:text-sm truncate max-w-[60px] sm:max-w-[80px] lg:max-w-none" title={role.name}>{role.name}</span>
                    <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                      {role.permissions.length}
                    </Badge>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
              <React.Fragment key={category}>
                <tr>
                  <td colSpan={roles.length + 1} className="py-2 lg:py-3">
                    <div className="flex items-center space-x-2">
                      <div className="text-blue-600">{getCategoryIcon(category)}</div>
                      <h4 className="font-medium text-gray-900 text-sm lg:text-base">{category}</h4>
                    </div>
                  </td>
                </tr>
                {categoryPermissions.map((permission) => (
                  <tr key={permission.id} className="border-b border-gray-100 hover:bg-gray-100/50">
                    <td className="py-2 lg:py-3 px-1 sm:px-2 lg:px-4">
                      <div>
                        <p className="font-medium text-gray-900 text-xs lg:text-sm">{permission.name}</p>
                        <p className="text-xs text-gray-600 hidden md:block">{permission.description}</p>
                      </div>
                    </td>
                    {roles.map((role) => (
                      <td key={`${role.id}-${permission.id}`} className="text-center py-2 lg:py-3 px-1 sm:px-2 lg:px-4">
                        <Checkbox
                          checked={role.permissions.includes(permission.id)}
                          onCheckedChange={() => onPermissionToggle(role.id, permission.id)}
                          className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
