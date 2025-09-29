"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"

interface Role {
  id: string
  name: string
  description: string
  color: string
  userCount: number
  permissions: string[]
}

interface RolesListProps {
  roles: Role[]
  onEditRole: (role: Role) => void
  onDeleteRole: (roleId: string) => void
}

export function RolesList({ roles, onEditRole, onDeleteRole }: RolesListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {roles.map((role) => (
        <Card key={role.id} className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: role.color }}
              >
                <span className="text-white font-semibold text-sm">
                  {role.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{role.name}</h3>
                <p className="text-sm text-gray-600">{role.description}</p>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditRole(role)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteRole(role.id)}
                className="text-gray-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Users</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {role.userCount}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Permissions</span>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {role.permissions.length}
              </Badge>
            </div>

            <div className="pt-2 border-t border-gray-200">
              <div className="flex flex-wrap gap-1">
                {role.permissions.slice(0, 3).map((permission) => (
                  <Badge
                    key={permission}
                    variant="outline"
                    className="text-xs border-gray-300 text-gray-600"
                  >
                    {permission.split(".")[1] || permission}
                  </Badge>
                ))}
                {role.permissions.length > 3 && (
                  <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                    +{role.permissions.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
