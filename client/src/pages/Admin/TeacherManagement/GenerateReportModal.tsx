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
import { X, FileText, Calendar as CalendarIcon, Download, Filter, BarChart3, Users, GraduationCap, BookOpen } from "lucide-react"
import { format } from "date-fns"

interface Department {
  id: string
  name: string
  code: string
}

interface ReportData {
  type: string
  title: string
  description?: string
  dateRange: {
    from: Date | null
    to: Date | null
  }
  departments: string[]
  includeStudents: boolean
  includeTeachers: boolean
  includePerformance: boolean
  includeAttendance: boolean
  exportFormat: string
  scheduledGeneration: boolean
  frequency?: string
}

interface GenerateReportModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (reportData: ReportData) => void
  departments: Department[]
}

const REPORT_TYPES = [
  {
    id: "academic_performance",
    name: "Academic Performance Report",
    description: "Detailed analysis of student and teacher performance metrics",
    icon: BarChart3
  },
  {
    id: "attendance_summary",
    name: "Attendance Summary",
    description: "Comprehensive attendance reports for students and faculty",
    icon: Users
  },
  {
    id: "department_overview",
    name: "Department Overview",
    description: "Overall departmental statistics and achievements",
    icon: GraduationCap
  },
  {
    id: "faculty_analysis",
    name: "Faculty Analysis",
    description: "Teacher performance and contribution analysis",
    icon: BookOpen
  },
  {
    id: "student_progress",
    name: "Student Progress Report",
    description: "Individual and class-wise student progress tracking",
    icon: Users
  },
  {
    id: "custom_report",
    name: "Custom Report",
    description: "Create a custom report with specific parameters",
    icon: FileText
  }
]

const EXPORT_FORMATS = [
  { value: "pdf", label: "PDF Document", description: "Formatted report document" },
  { value: "excel", label: "Excel Spreadsheet", description: "Data in Excel format" },
  { value: "csv", label: "CSV File", description: "Comma-separated values" },
  { value: "json", label: "JSON Data", description: "Structured data format" }
]

const FREQUENCY_OPTIONS = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" }
]

export function GenerateReportModal({
  isOpen,
  onClose,
  onSubmit,
  departments
}: GenerateReportModalProps) {
  const [formData, setFormData] = useState<ReportData>({
    type: "",
    title: "",
    description: "",
    dateRange: { from: null, to: null },
    departments: [],
    includeStudents: true,
    includeTeachers: true,
    includePerformance: true,
    includeAttendance: false,
    exportFormat: "pdf",
    scheduledGeneration: false,
    frequency: "monthly"
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showStartCalendar, setShowStartCalendar] = useState(false)
  const [showEndCalendar, setShowEndCalendar] = useState(false)

  const handleClose = () => {
    setFormData({
      type: "",
      title: "",
      description: "",
      dateRange: { from: null, to: null },
      departments: [],
      includeStudents: true,
      includeTeachers: true,
      includePerformance: true,
      includeAttendance: false,
      exportFormat: "pdf",
      scheduledGeneration: false,
      frequency: "monthly"
    })
    setErrors({})
    setIsSubmitting(false)
    onClose()
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.type) {
      newErrors.type = "Report type is required"
    }

    if (!formData.title.trim()) {
      newErrors.title = "Report title is required"
    }

    if (!formData.dateRange.from || !formData.dateRange.to) {
      newErrors.dateRange = "Both start and end dates are required"
    }

    if (formData.departments.length === 0) {
      newErrors.departments = "At least one department must be selected"
    }

    if (!formData.includeStudents && !formData.includeTeachers) {
      newErrors.includes = "At least one of Students or Teachers must be included"
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
      console.error("Error generating report:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReportTypeChange = (typeId: string) => {
    const reportType = REPORT_TYPES.find(t => t.id === typeId)
    setFormData(prev => ({
      ...prev,
      type: typeId,
      title: reportType?.name || "",
      description: reportType?.description || ""
    }))
  }

  const handleDepartmentChange = (deptId: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        departments: [...prev.departments, deptId]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        departments: prev.departments.filter(d => d !== deptId)
      }))
    }
  }

  // const selectedReportType = REPORT_TYPES.find(t => t.id === formData.type)

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-5xl max-h-[90vh] overflow-hidden flex flex-col bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
        <DialogHeader className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 lg:p-6 -m-4 lg:-m-6 mb-4 lg:mb-6">
          <button
            onClick={handleClose}
            className="absolute right-3 lg:right-4 top-3 lg:top-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
          <DialogTitle className="text-lg lg:text-xl font-semibold flex items-center space-x-2 pr-8">
            <FileText className="w-4 h-4 lg:w-5 lg:h-5" />
            <span>Generate Report</span>
          </DialogTitle>
          <p className="text-green-100 text-xs lg:text-sm mt-2 pr-8">
            Create comprehensive reports with customized parameters and data filters
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6">
            {/* Report Type Selection */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <span>Report Type</span>
              </h3>

              {errors.type && (
                <p className="text-red-500 text-sm mb-4">{errors.type}</p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
                {REPORT_TYPES.map((reportType) => {
                  const IconComponent = reportType.icon
                  return (
                    <div
                      key={reportType.id}
                      onClick={() => handleReportTypeChange(reportType.id)}
                      className={`p-3 lg:p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${formData.type === reportType.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <div className="flex items-start space-x-2 lg:space-x-3">
                        <IconComponent className={`w-4 h-4 lg:w-5 lg:h-5 mt-1 flex-shrink-0 ${formData.type === reportType.id ? 'text-green-600' : 'text-gray-600'
                          }`} />
                        <div className="min-w-0">
                          <h4 className="font-medium text-gray-900 text-xs lg:text-sm">{reportType.name}</h4>
                          <p className="text-xs text-gray-600 mt-1 hidden sm:block">{reportType.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Report Configuration */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 lg:p-4 border border-white/20">
              <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-3 lg:mb-4 flex items-center space-x-2">
                <Filter className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                <span>Report Configuration</span>
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                <div>
                  <Label htmlFor="reportTitle" className="text-sm font-medium text-gray-700">
                    Report Title *
                  </Label>
                  <Input
                    id="reportTitle"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter report title"
                    className={`mt-1 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Export Format
                  </Label>
                  <Select value={formData.exportFormat} onValueChange={(value) => setFormData(prev => ({ ...prev, exportFormat: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPORT_FORMATS.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          <div>
                            <div className="font-medium">{format.label}</div>
                            <div className="text-xs text-gray-600">{format.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="reportDescription" className="text-sm font-medium text-gray-700">
                  Description
                </Label>
                <Textarea
                  id="reportDescription"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Optional description for the report..."
                  className="mt-1 min-h-[60px]"
                />
              </div>
            </div>

            {/* Date Range Selection */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-green-600" />
                <span>Date Range</span>
              </h3>

              {errors.dateRange && (
                <p className="text-red-500 text-sm mb-4">{errors.dateRange}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Start Date *</Label>
                  <Popover open={showStartCalendar} onOpenChange={setShowStartCalendar}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full mt-1 justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dateRange.from ? format(formData.dateRange.from, "PPP") : "Select start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.dateRange.from || undefined}
                        onSelect={(date) => {
                          setFormData(prev => ({
                            ...prev,
                            dateRange: { ...prev.dateRange, from: date || null }
                          }))
                          setShowStartCalendar(false)
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">End Date *</Label>
                  <Popover open={showEndCalendar} onOpenChange={setShowEndCalendar}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full mt-1 justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dateRange.to ? format(formData.dateRange.to, "PPP") : "Select end date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.dateRange.to || undefined}
                        onSelect={(date) => {
                          setFormData(prev => ({
                            ...prev,
                            dateRange: { ...prev.dateRange, to: date || null }
                          }))
                          setShowEndCalendar(false)
                        }}
                        disabled={(date) => formData.dateRange.from ? date < formData.dateRange.from : false}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Department Selection */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5 text-green-600" />
                  <span>Departments</span>
                </h3>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {formData.departments.length} selected
                </Badge>
              </div>

              {errors.departments && (
                <p className="text-red-500 text-sm mb-4">{errors.departments}</p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
                {departments.map((dept) => (
                  <div key={dept.id} className="flex items-center space-x-2 p-2 rounded border border-gray-200">
                    <Checkbox
                      id={dept.id}
                      checked={formData.departments.includes(dept.id)}
                      onCheckedChange={(checked) => handleDepartmentChange(dept.id, checked as boolean)}
                    />
                    <Label htmlFor={dept.id} className="text-sm cursor-pointer flex-1">
                      <div className="font-medium">{dept.name}</div>
                      <div className="text-xs text-gray-600">{dept.code}</div>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Inclusion Options */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-600" />
                <span>Data Inclusion</span>
              </h3>

              {errors.includes && (
                <p className="text-red-500 text-sm mb-4">{errors.includes}</p>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="includeStudents"
                      checked={formData.includeStudents}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includeStudents: checked as boolean }))}
                    />
                    <Label htmlFor="includeStudents" className="text-sm cursor-pointer">
                      Include Student Data
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="includeTeachers"
                      checked={formData.includeTeachers}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includeTeachers: checked as boolean }))}
                    />
                    <Label htmlFor="includeTeachers" className="text-sm cursor-pointer">
                      Include Teacher Data
                    </Label>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="includePerformance"
                      checked={formData.includePerformance}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includePerformance: checked as boolean }))}
                    />
                    <Label htmlFor="includePerformance" className="text-sm cursor-pointer">
                      Include Performance Metrics
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="includeAttendance"
                      checked={formData.includeAttendance}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includeAttendance: checked as boolean }))}
                    />
                    <Label htmlFor="includeAttendance" className="text-sm cursor-pointer">
                      Include Attendance Data
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Scheduled Generation */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5 text-green-600" />
                  <span>Scheduled Generation</span>
                </h3>
                <Checkbox
                  id="scheduledGeneration"
                  checked={formData.scheduledGeneration}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, scheduledGeneration: checked as boolean }))}
                />
              </div>

              {formData.scheduledGeneration && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">Frequency</Label>
                  <Select value={formData.frequency} onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {FREQUENCY_OPTIONS.map((freq) => (
                        <SelectItem key={freq.value} value={freq.value}>
                          {freq.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
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
            className="px-6 bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>{isSubmitting ? "Generating..." : "Generate Report"}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}