"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { X, Megaphone, Calendar as CalendarIcon, Bell, Target, Clock, AlertCircle, Info } from "lucide-react"
import { format } from "date-fns"

interface Department {
  id: string
  name: string
  code: string
}

interface AnnouncementData {
  title: string
  content: string
  priority: "low" | "medium" | "high" | "urgent"
  targetAudience: {
    students: boolean
    teachers: boolean
    administrators: boolean
    parents: boolean
    departments: string[]
  }
  scheduledDate?: Date | null
  expiryDate?: Date | null
  isScheduled: boolean
  sendEmail: boolean
  sendSMS: boolean
  showOnDashboard: boolean
  category: string
  tags: string[]
}

interface NewAnnouncementModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (announcementData: AnnouncementData) => void
  departments: Department[]
}

const PRIORITY_OPTIONS = [
  {
    value: "low",
    label: "Low Priority",
    color: "bg-green-100 text-green-700 border-green-200",
    icon: Info
  },
  {
    value: "medium",
    label: "Medium Priority",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: Bell
  },
  {
    value: "high",
    label: "High Priority",
    color: "bg-orange-100 text-orange-700 border-orange-200",
    icon: AlertCircle
  },
  {
    value: "urgent",
    label: "Urgent",
    color: "bg-red-100 text-red-700 border-red-200",
    icon: AlertCircle
  }
]

const CATEGORY_OPTIONS = [
  "Academic",
  "Administrative",
  "Events",
  "Examination",
  "Holiday",
  "Emergency",
  "General",
  "Sports",
  "Cultural",
  "Technical"
]

export function NewAnnouncementModal({
  isOpen,
  onClose,
  onSubmit,
  departments
}: NewAnnouncementModalProps) {
  const [formData, setFormData] = useState<AnnouncementData>({
    title: "",
    content: "",
    priority: "medium",
    targetAudience: {
      students: true,
      teachers: true,
      administrators: false,
      parents: false,
      departments: []
    },
    scheduledDate: null,
    expiryDate: null,
    isScheduled: false,
    sendEmail: true,
    sendSMS: false,
    showOnDashboard: true,
    category: "General",
    tags: []
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showScheduleCalendar, setShowScheduleCalendar] = useState(false)
  const [showExpiryCalendar, setShowExpiryCalendar] = useState(false)
  const [tagInput, setTagInput] = useState("")

  const handleClose = () => {
    setFormData({
      title: "",
      content: "",
      priority: "medium",
      targetAudience: {
        students: true,
        teachers: true,
        administrators: false,
        parents: false,
        departments: []
      },
      scheduledDate: null,
      expiryDate: null,
      isScheduled: false,
      sendEmail: true,
      sendSMS: false,
      showOnDashboard: true,
      category: "General",
      tags: []
    })
    setErrors({})
    setIsSubmitting(false)
    setTagInput("")
    onClose()
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Announcement title is required"
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters long"
    }

    if (!formData.content.trim()) {
      newErrors.content = "Announcement content is required"
    } else if (formData.content.trim().length < 10) {
      newErrors.content = "Content must be at least 10 characters long"
    }

    const hasAudience = formData.targetAudience.students ||
      formData.targetAudience.teachers ||
      formData.targetAudience.administrators ||
      formData.targetAudience.parents ||
      formData.targetAudience.departments.length > 0

    if (!hasAudience) {
      newErrors.audience = "At least one target audience must be selected"
    }

    if (formData.isScheduled && !formData.scheduledDate) {
      newErrors.scheduledDate = "Scheduled date is required when scheduling is enabled"
    }

    if (formData.expiryDate && formData.scheduledDate && formData.expiryDate <= formData.scheduledDate) {
      newErrors.expiryDate = "Expiry date must be after the scheduled date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      await onSubmit(formData)
      handleClose()
    } catch (error) {
      console.error("Error creating announcement:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAudienceChange = (type: keyof Omit<AnnouncementData['targetAudience'], 'departments'>, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      targetAudience: {
        ...prev.targetAudience,
        [type]: checked
      }
    }))
  }

  const handleDepartmentChange = (deptId: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        targetAudience: {
          ...prev.targetAudience,
          departments: [...prev.targetAudience.departments, deptId]
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        targetAudience: {
          ...prev.targetAudience,
          departments: prev.targetAudience.departments.filter(d => d !== deptId)
        }
      }))
    }
  }

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase()
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag]
      }))
    }
    setTagInput("")
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      addTag(tagInput)
    }
  }

  // const selectedPriority = PRIORITY_OPTIONS.find(p => p.value === formData.priority)
  // const PriorityIcon = selectedPriority?.icon || Bell

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
        <DialogHeader className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 -m-6 mb-6">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <DialogTitle className="text-xl font-semibold flex items-center space-x-2">
            <Megaphone className="w-5 h-5" />
            <span>Create New Announcement</span>
          </DialogTitle>
          <p className="text-purple-100 text-sm mt-2">
            Send important information to students, faculty, and staff
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                <Megaphone className="w-5 h-5 text-purple-600" />
                <span>Basic Information</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="announcementTitle" className="text-sm font-medium text-gray-700">
                    Title *
                  </Label>
                  <Input
                    id="announcementTitle"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter announcement title"
                    className={`mt-1 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Priority</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as any }))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {PRIORITY_OPTIONS.map((priority) => {
                          const IconComponent = priority.icon
                          return (
                            <SelectItem key={priority.value} value={priority.value}>
                              <div className="flex items-center space-x-2">
                                <IconComponent className="w-4 h-4" />
                                <span>{priority.label}</span>
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORY_OPTIONS.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="announcementContent" className="text-sm font-medium text-gray-700">
                    Content *
                  </Label>
                  <Textarea
                    id="announcementContent"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Enter the announcement content..."
                    className={`mt-1 min-h-[120px] ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.content && (
                    <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Target Audience */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-600" />
                <span>Target Audience</span>
              </h3>

              {errors.audience && (
                <p className="text-red-500 text-sm mb-4">{errors.audience}</p>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="students"
                      checked={formData.targetAudience.students}
                      onCheckedChange={(checked) => handleAudienceChange('students', checked as boolean)}
                    />
                    <Label htmlFor="students" className="text-sm cursor-pointer">Students</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="teachers"
                      checked={formData.targetAudience.teachers}
                      onCheckedChange={(checked) => handleAudienceChange('teachers', checked as boolean)}
                    />
                    <Label htmlFor="teachers" className="text-sm cursor-pointer">Teachers</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="administrators"
                      checked={formData.targetAudience.administrators}
                      onCheckedChange={(checked) => handleAudienceChange('administrators', checked as boolean)}
                    />
                    <Label htmlFor="administrators" className="text-sm cursor-pointer">Administrators</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="parents"
                      checked={formData.targetAudience.parents}
                      onCheckedChange={(checked) => handleAudienceChange('parents', checked as boolean)}
                    />
                    <Label htmlFor="parents" className="text-sm cursor-pointer">Parents</Label>
                  </div>
                </div>

                {departments.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Specific Departments ({formData.targetAudience.departments.length} selected)
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {departments.map((dept) => (
                        <div key={dept.id} className="flex items-center space-x-2 p-2 rounded border border-gray-200">
                          <Checkbox
                            id={`dept-${dept.id}`}
                            checked={formData.targetAudience.departments.includes(dept.id)}
                            onCheckedChange={(checked) => handleDepartmentChange(dept.id, checked as boolean)}
                          />
                          <Label htmlFor={`dept-${dept.id}`} className="text-sm cursor-pointer flex-1">
                            <div className="font-medium">{dept.name}</div>
                            <div className="text-xs text-gray-600">{dept.code}</div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Scheduling */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span>Scheduling</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Schedule for later</Label>
                    <p className="text-xs text-gray-600">Publish this announcement at a specific date and time</p>
                  </div>
                  <Switch
                    checked={formData.isScheduled}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isScheduled: checked }))}
                  />
                </div>

                {formData.isScheduled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Scheduled Date *</Label>
                      <Popover open={showScheduleCalendar} onOpenChange={setShowScheduleCalendar}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full mt-1 justify-start text-left font-normal ${errors.scheduledDate ? 'border-red-500' : ''}`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.scheduledDate ? format(formData.scheduledDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.scheduledDate || undefined}
                            onSelect={(date) => {
                              setFormData(prev => ({ ...prev, scheduledDate: date || null }))
                              setShowScheduleCalendar(false)
                            }}
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.scheduledDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.scheduledDate}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Expiry Date (Optional)</Label>
                      <Popover open={showExpiryCalendar} onOpenChange={setShowExpiryCalendar}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full mt-1 justify-start text-left font-normal ${errors.expiryDate ? 'border-red-500' : ''}`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.expiryDate ? format(formData.expiryDate, "PPP") : "Select expiry date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.expiryDate || undefined}
                            onSelect={(date) => {
                              setFormData(prev => ({ ...prev, expiryDate: date || null }))
                              setShowExpiryCalendar(false)
                            }}
                            disabled={(date) => formData.scheduledDate ? date <= formData.scheduledDate : date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.expiryDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Options */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                <Bell className="w-5 h-5 text-purple-600" />
                <span>Delivery Options</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 rounded border border-gray-200">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Email Notification</Label>
                    <p className="text-xs text-gray-600">Send via email</p>
                  </div>
                  <Switch
                    checked={formData.sendEmail}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, sendEmail: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded border border-gray-200">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">SMS Notification</Label>
                    <p className="text-xs text-gray-600">Send via SMS</p>
                  </div>
                  <Switch
                    checked={formData.sendSMS}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, sendSMS: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded border border-gray-200">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Dashboard Display</Label>
                    <p className="text-xs text-gray-600">Show on dashboard</p>
                  </div>
                  <Switch
                    checked={formData.showOnDashboard}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showOnDashboard: checked }))}
                  />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tags</h3>

              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagInputKeyPress}
                    placeholder="Add tags (press Enter)"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addTag(tagInput)}
                    disabled={!tagInput.trim()}
                  >
                    Add
                  </Button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-purple-100 text-purple-700 hover:bg-purple-200"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-purple-500 hover:text-purple-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
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
            className="px-6 bg-purple-600 hover:bg-purple-700 text-white flex items-center space-x-2"
          >
            <Megaphone className="w-4 h-4" />
            <span>{isSubmitting ? "Publishing..." : formData.isScheduled ? "Schedule" : "Publish"}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}