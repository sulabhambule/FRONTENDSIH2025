"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Shield, Users, Settings, FileText, Database } from "lucide-react"

interface Permission {
  id: string
  name: string
  description: string
  category: string
}

interface Role {
  id: string
  name: string
  description: string
  color: string
  userCount: number
  permissions: string[]
}

interface CreateRoleModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (roleData: Omit<Role, 'id' | 'userCount'>) => void
  permissions: Permission[]
  existingRoles?: Role[]
}

const ROLE_COLORS = [
  "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16",
  "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9",
  "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef",
  "#ec4899", "#f43f5e"
]

const CATEGORY_ICONS: Record<string, any> = {
  "System": Settings,
  "User Management": Users,
  "Role Management": Shield,
  "Reports": FileText,
  "Data Management": Database,
  "Academics": FileText,
  "Teacher Management": Users,
  "Student Management": Users
}

export function CreateRoleModal({
  isOpen,
  onClose,
  onSubmit,
  permissions,
  existingRoles = []
}: CreateRoleModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: ROLE_COLORS[0],
    permissions: [] as string[]
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      color: ROLE_COLORS[0],
      permissions: []
    })
    setErrors({})
    setIsSubmitting(false)
    onClose()
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Role name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Role name must be at least 2 characters"
    } else if (existingRoles.some(role => role.name.toLowerCase() === formData.name.trim().toLowerCase())) {
      newErrors.name = "A role with this name already exists"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Role description is required"
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters"
    }

    if (formData.permissions.length === 0) {
      newErrors.permissions = "At least one permission must be selected"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const roleData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        color: formData.color,
        permissions: formData.permissions
      }

      await onSubmit(roleData)
      handleClose()
    } catch (error) {
      console.error("Error creating role:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        permissions: [...prev.permissions, permissionId]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(p => p !== permissionId)
      }))
    }
  }

  const handleColorSelect = (color: string) => {
    setFormData(prev => ({ ...prev, color }))
  }

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = []
    }
    acc[permission.category].push(permission)
    return acc
  }, {} as Record<string, Permission[]>)

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
        <DialogHeader className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 lg:p-6 -m-4 lg:-m-6 mb-4 lg:mb-6">
          <button
            onClick={handleClose}
            className="absolute right-3 lg:right-4 top-3 lg:top-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
          <DialogTitle className="text-lg lg:text-xl font-semibold flex items-center space-x-2 pr-8">
            <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
            <span>Create New Role</span>
          </DialogTitle>
          <p className="text-blue-100 text-xs lg:text-sm mt-2 pr-8">
            Define a new role with specific permissions for your organization
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 lg:p-4 border border-white/20">
              <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-3 lg:mb-4 flex items-center space-x-2">
                <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                <span>Basic Information</span>
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                <div>
                  <Label htmlFor="roleName" className="text-sm font-medium text-gray-700">
                    Role Name *
                  </Label>
                  <Input
                    id="roleName"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Department Head"
                    className={`mt-1 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label className="text-xs lg:text-sm font-medium text-gray-700">
                    Role Color *
                  </Label>
                  <div className="mt-1 flex flex-wrap gap-1 lg:gap-2">
                    {ROLE_COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => handleColorSelect(color)}
                        className={`w-6 h-6 lg:w-8 lg:h-8 rounded-md lg:rounded-lg border-2 transition-all ${formData.color === color
                          ? 'border-gray-800 scale-110'
                          : 'border-gray-300 hover:border-gray-400'
                          }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="roleDescription" className="text-sm font-medium text-gray-700">
                  Description *
                </Label>
                <Textarea
                  id="roleDescription"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the role and its responsibilities..."
                  className={`mt-1 min-h-[80px] ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>
            </div>

            {/* Permissions Selection */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 lg:p-4 border border-white/20">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3 lg:mb-4">
                <h3 className="text-base lg:text-lg font-medium text-gray-900 flex items-center space-x-2">
                  <Settings className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                  <span>Permissions</span>
                </h3>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs lg:text-sm self-start sm:self-center">
                  {formData.permissions.length} selected
                </Badge>
              </div>

              {errors.permissions && (
                <p className="text-red-500 text-sm mb-4">{errors.permissions}</p>
              )}

              <div className="space-y-4">
                {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => {
                  const IconComponent = CATEGORY_ICONS[category] || Settings
                  const selectedInCategory = categoryPermissions.filter(p =>
                    formData.permissions.includes(p.id)
                  ).length

                  return (
                    <div key={category} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <IconComponent className="w-4 h-4 text-gray-600" />
                          <h4 className="font-medium text-gray-900">{category}</h4>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-xs border-gray-300 text-gray-600"
                        >
                          {selectedInCategory}/{categoryPermissions.length}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
                        {categoryPermissions.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-start space-x-2 lg:space-x-3 p-2 rounded border border-gray-100 hover:bg-gray-50"
                          >
                            <Checkbox
                              id={permission.id}
                              checked={formData.permissions.includes(permission.id)}
                              onCheckedChange={(checked) =>
                                handlePermissionChange(permission.id, checked as boolean)
                              }
                              className="mt-1"
                            />
                            <div className="flex-1 min-w-0">
                              <Label
                                htmlFor={permission.id}
                                className="text-xs lg:text-sm font-medium text-gray-900 cursor-pointer block"
                              >
                                {permission.name}
                              </Label>
                              <p className="text-xs text-gray-600 mt-1 hidden sm:block">
                                {permission.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSubmitting ? "Creating..." : "Create Role"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}