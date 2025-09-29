"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { User, GraduationCap, Phone, Mail, MapPin, Calendar, Hash, BookOpen, Briefcase } from "lucide-react"
import type { TeacherData } from "@/types/admin"

interface AddFacultyModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (facultyData: TeacherData) => void
  departments: string[]
  designations: string[]
}

interface NewFacultyFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  department: string
  designation: string
  employeeId: string
  joiningDate: string
  qualification: string
  experience: string
  specialization: string
  address: string
}

interface FormErrors {
  [key: string]: string
}

export function AddFacultyModal({ isOpen, onClose, onSubmit, departments, designations }: AddFacultyModalProps) {
  const [formData, setFormData] = useState<NewFacultyFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    employeeId: "",
    joiningDate: new Date().toISOString().split('T')[0],
    qualification: "",
    experience: "",
    specialization: "",
    address: ""
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validation rules
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters long"
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters long"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation
    const phoneRegex = /^[+]?[\d\s-()]+$/
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    // Department validation
    if (!formData.department) {
      newErrors.department = "Department is required"
    }

    // Designation validation
    if (!formData.designation) {
      newErrors.designation = "Designation is required"
    }

    // Employee ID validation
    if (!formData.employeeId.trim()) {
      newErrors.employeeId = "Employee ID is required"
    } else if (formData.employeeId.length < 3) {
      newErrors.employeeId = "Employee ID must be at least 3 characters"
    }

    // Qualification validation
    if (!formData.qualification.trim()) {
      newErrors.qualification = "Qualification is required"
    }

    // Experience validation
    if (!formData.experience.trim()) {
      newErrors.experience = "Experience is required"
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }

    // Joining date validation
    if (!formData.joiningDate) {
      newErrors.joiningDate = "Joining date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof NewFacultyFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Clear error when user starts typing
    if (errors[field as string]) {
      setErrors(prev => ({
        ...prev,
        [field as string]: ""
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Create complete TeacherData object
      const newFaculty: TeacherData = {
        id: `TCH${String(Date.now()).slice(-6)}`, // Generate a simple ID
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        employeeId: formData.employeeId,
        department: formData.department,
        designation: formData.designation,
        experience: parseInt(formData.experience) || 0,
        qualification: formData.qualification,
        specialization: formData.specialization ? formData.specialization.split(',').map(s => s.trim()) : [],
        subjects: [], // Will be assigned later
        clubsAdvised: [],
        studentsGuided: 0,
        approvalsPending: 0,
        approvalsCompleted: 0,
        rating: 0,
        status: "active",
        profileImage: "/teacher-avatar-default.png",
        phone: formData.phone,
        address: formData.address,
        joinDate: formData.joiningDate,
        publications: [],
        achievements: [],
        contributionMetrics: {
          teachingHours: 0,
          researchProjects: 0,
          studentsPlaced: 0,
          clubActivities: 0,
          workshopsConducted: 0,
          papersPublished: 0
        }
      }

      onSubmit(newFaculty)

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        employeeId: "",
        joiningDate: new Date().toISOString().split('T')[0],
        qualification: "",
        experience: "",
        specialization: "",
        address: ""
      })
      setErrors({})
      onClose()
    } catch (error) {
      console.error("Error adding faculty:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (isSubmitting) return

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      employeeId: "",
      joiningDate: new Date().toISOString().split('T')[0],
      qualification: "",
      experience: "",
      specialization: "",
      address: ""
    })
    setErrors({})
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-lg border border-blue-200/60 shadow-2xl">
        <DialogHeader className="pb-3 sm:pb-4 lg:pb-6 border-b border-gray-200/60">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1 sm:p-1.5 lg:p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg lg:rounded-xl">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-sm sm:text-base lg:text-lg xl:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Add New Faculty
                </DialogTitle>
                <p className="text-gray-600 mt-1 text-xs sm:text-sm lg:text-base">Add a new faculty member to the college management system</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700 border border-green-200 self-start sm:self-center text-xs sm:text-xs lg:text-sm">
              Academic Year 2024-25
            </Badge>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 lg:space-y-8 py-3 sm:py-4 lg:py-6">
          {/* Personal Information */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            <div className="flex items-center space-x-2 pb-2 lg:pb-3 border-b border-gray-200/60">
              <User className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-600" />
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800">Personal Information</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-xs sm:text-sm font-medium text-gray-700 flex items-center space-x-1">
                  <User className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>First Name *</span>
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={`${errors.firstName ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"} bg-white/70 text-xs sm:text-sm`}
                  disabled={isSubmitting}
                />
                {errors.firstName && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Last Name *</span>
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={`${errors.lastName ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"} bg-white/70`}
                  disabled={isSubmitting}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>Email Address *</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="faculty@college.edu"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`${errors.email ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"} bg-white/70`}
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number *</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`${errors.phone ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"} bg-white/70`}
                  disabled={isSubmitting}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>Address *</span>
                </Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Enter complete address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={`${errors.address ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"} bg-white/70`}
                  disabled={isSubmitting}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4 lg:space-y-6">
            <div className="flex items-center space-x-2 pb-2 lg:pb-3 border-b border-gray-200/60">
              <Briefcase className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-600" />
              <h3 className="text-base lg:text-lg font-semibold text-gray-800">Professional Information</h3>
            </div>

            <div className="space-y-4 lg:space-y-6">
              {/* First row - Employee ID and Joining Date */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="employeeId" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                    <Hash className="w-4 h-4" />
                    <span>Employee ID *</span>
                  </Label>
                  <Input
                    id="employeeId"
                    type="text"
                    placeholder="FAC001"
                    value={formData.employeeId}
                    onChange={(e) => handleInputChange("employeeId", e.target.value)}
                    className={`${errors.employeeId ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"} bg-white/70`}
                    disabled={isSubmitting}
                  />
                  {errors.employeeId && <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="joiningDate" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joining Date *</span>
                  </Label>
                  <Input
                    id="joiningDate"
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) => handleInputChange("joiningDate", e.target.value)}
                    className={`${errors.joiningDate ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"} bg-white/70`}
                    disabled={isSubmitting}
                  />
                  {errors.joiningDate && <p className="text-red-500 text-sm mt-1">{errors.joiningDate}</p>}
                </div>
              </div>

              {/* Second row - Department and Designation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>Department *</span>
                  </Label>
                  <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)} disabled={isSubmitting}>
                    <SelectTrigger className={`${errors.department ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"} bg-white/70`}>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="designation" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                    <Briefcase className="w-4 h-4" />
                    <span>Designation *</span>
                  </Label>
                  <Select value={formData.designation} onValueChange={(value) => handleInputChange("designation", value)} disabled={isSubmitting}>
                    <SelectTrigger className={`${errors.designation ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"} bg-white/70`}>
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      {designations.map((designation) => (
                        <SelectItem key={designation} value={designation}>{designation}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
                </div>
              </div>

              {/* Third row - Qualification and Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="qualification" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>Qualification *</span>
                  </Label>
                  <Input
                    id="qualification"
                    type="text"
                    placeholder="Ph.D in Computer Science"
                    value={formData.qualification}
                    onChange={(e) => handleInputChange("qualification", e.target.value)}
                    className={`${errors.qualification ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"} bg-white/70`}
                    disabled={isSubmitting}
                  />
                  {errors.qualification && <p className="text-red-500 text-sm mt-1">{errors.qualification}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Experience (years) *</span>
                  </Label>
                  <Input
                    id="experience"
                    type="number"
                    placeholder="5"
                    value={formData.experience}
                    onChange={(e) => handleInputChange("experience", e.target.value)}
                    className={`${errors.experience ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"} bg-white/70`}
                    disabled={isSubmitting}
                  />
                  {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                </div>
              </div>

              {/* Fourth row - Specialization */}
              <div className="grid grid-cols-1">
                <div className="space-y-2">
                  <Label htmlFor="specialization" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>Specialization</span>
                  </Label>
                  <Input
                    id="specialization"
                    type="text"
                    placeholder="Machine Learning, Data Science"
                    value={formData.specialization}
                    onChange={(e) => handleInputChange("specialization", e.target.value)}
                    className="border-gray-200 focus:border-blue-500 bg-white/70"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        <DialogFooter className="pt-3 sm:pt-4 lg:pt-6 border-t border-gray-200/60 flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200 w-full sm:w-auto text-xs sm:text-sm order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg w-full sm:w-auto text-xs sm:text-sm order-1 sm:order-2"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adding Faculty...</span>
              </div>
            ) : (
              <>
                <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Add Faculty
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}