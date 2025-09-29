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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
      {roles.map((role) => (
        <Card key={role.id} className="bg-white border border-gray-200 rounded-lg p-3 lg:p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2 lg:space-x-3 min-w-0 flex-1">
              <div
                className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: role.color }}
              >
                <span className="text-white font-semibold text-xs lg:text-sm">
                  {role.name.charAt(0)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 text-sm lg:text-base truncate">{role.name}</h3>
                <p className="text-xs lg:text-sm text-gray-600 line-clamp-2">{role.description}</p>
              </div>
            </div>
            <div className="flex space-x-1 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditRole(role)}
                className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 h-7 w-7 lg:h-8 lg:w-8 p-0"
              >
                <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteRole(role.id)}
                className="text-gray-500 hover:text-red-600 hover:bg-red-50 h-7 w-7 lg:h-8 lg:w-8 p-0"
              >
                <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs lg:text-sm text-gray-600">Users</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                {role.userCount}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs lg:text-sm text-gray-600">Permissions</span>
              <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                {role.permissions.length}
              </Badge>
            </div>

            <div className="pt-2 border-t border-gray-200">
              <div className="flex flex-wrap gap-1">
                {role.permissions.slice(0, 2).map((permission) => (
                  <Badge
                    key={permission}
                    variant="outline"
                    className="text-xs border-gray-300 text-gray-600 truncate max-w-full"
                  >
                    {(permission.split(".")[1] || permission).substring(0, 8)}
                  </Badge>
                ))}
                {role.permissions.length > 2 && (
                  <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                    +{role.permissions.length - 2}
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
