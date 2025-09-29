"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { User, GraduationCap, Phone, Mail, MapPin, Calendar, Hash, BookOpen } from "lucide-react"
import type { StudentData } from "@/types/admin"

interface EnrollStudentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (studentData: StudentData) => void
  departments: string[]
}

interface NewStudentFormData {
  name: string
  email: string
  phone: string
  department: string
  year: number
  semester: number
  rollNumber: string
  address: string
  parentContact: string
  admissionDate: string
}

interface FormErrors {
  [key: string]: string
}

export function EnrollStudentModal({ isOpen, onClose, onSubmit, departments }: EnrollStudentModalProps) {
  const [formData, setFormData] = useState<NewStudentFormData>({
    name: "",
    email: "",
    phone: "",
    department: "",
    year: 1,
    semester: 1,
    rollNumber: "",
    address: "",
    parentContact: "",
    admissionDate: new Date().toISOString().split('T')[0]
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validation rules
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Student name is required"
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters long"
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

    // Roll number validation
    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = "Roll number is required"
    } else if (formData.rollNumber.length < 3) {
      newErrors.rollNumber = "Roll number must be at least 3 characters"
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }

    // Parent contact validation
    if (!formData.parentContact.trim()) {
      newErrors.parentContact = "Parent contact is required"
    } else if (!phoneRegex.test(formData.parentContact)) {
      newErrors.parentContact = "Please enter a valid parent contact number"
    }

    // Admission date validation
    if (!formData.admissionDate) {
      newErrors.admissionDate = "Admission date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof NewStudentFormData, value: string | number) => {
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

      // Create complete StudentData object
      const newStudent: StudentData = {
        id: `STU${String(Date.now()).slice(-6)}`, // Generate a simple ID
        name: formData.name,
        email: formData.email,
        rollNumber: formData.rollNumber,
        department: formData.department,
        year: formData.year,
        semester: formData.semester,
        cgpa: 0.0, // Initial CGPA
        totalPoints: 0, // Initial points
        status: "active",
        phone: formData.phone,
        address: formData.address,
        parentContact: formData.parentContact,
        admissionDate: formData.admissionDate,
        activities: [],
        projects: [],
        internships: [],
        aiInsights: {
          strengths: ["New Student"],
          weaknesses: ["No data available yet"],
          recommendations: ["Complete academic records", "Participate in activities"],
          careerFit: ["To be determined"],
          placementReadiness: 0
        }
      }

      onSubmit(newStudent)

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        year: 1,
        semester: 1,
        rollNumber: "",
        address: "",
        parentContact: "",
        admissionDate: new Date().toISOString().split('T')[0]
      })
      setErrors({})
      onClose()
    } catch (error) {
      console.error("Error enrolling student:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (isSubmitting) return

    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      year: 1,
      semester: 1,
      rollNumber: "",
      address: "",
      parentContact: "",
      admissionDate: new Date().toISOString().split('T')[0]
    })
    setErrors({})
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-lg border border-blue-200/60 shadow-2xl">
        <DialogHeader className="pb-6 border-b border-gray-200/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Enroll New Student
                </DialogTitle>
                <p className="text-gray-600 mt-1">Add a new student to the college management system</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700 border border-green-200">
              Academic Year 2024-25
            </Badge>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 py-6">
          {/* Personal Information */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-3 border-b border-gray-200/60">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Full Name *</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter student's full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`${errors.name ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"} bg-white/70`}
                  disabled={isSubmitting}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>Email Address *</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@college.edu"
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

              <div className="space-y-2">
                <Label htmlFor="parentContact" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span>Parent Contact *</span>
                </Label>
                <Input
                  id="parentContact"
                  type="tel"
                  placeholder="+91 9876543211"
                  value={formData.parentContact}
                  onChange={(e) => handleInputChange("parentContact", e.target.value)}
                  className={`${errors.parentContact ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"} bg-white/70`}
                  disabled={isSubmitting}
                />
                {errors.parentContact && <p className="text-red-500 text-sm mt-1">{errors.parentContact}</p>}
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

          {/* Academic Information */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-3 border-b border-gray-200/60">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-800">Academic Information</h3>
            </div>

            <div className="space-y-6">
              {/* First row - Department (full width) */}
              <div className="grid grid-cols-1">
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
              </div>

              {/* Second row - Year and Semester */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="year" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Academic Year *</span>
                  </Label>
                  <Select value={formData.year.toString()} onValueChange={(value) => handleInputChange("year", parseInt(value))} disabled={isSubmitting}>
                    <SelectTrigger className="bg-white/70 border-gray-200 focus:border-blue-500">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4].map((year) => (
                        <SelectItem key={year} value={year.toString()}>Year {year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="semester" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>Semester *</span>
                  </Label>
                  <Select value={formData.semester.toString()} onValueChange={(value) => handleInputChange("semester", parseInt(value))} disabled={isSubmitting}>
                    <SelectTrigger className="bg-white/70 border-gray-200 focus:border-blue-500">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Third row - Roll Number and Admission Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="rollNumber" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                    <Hash className="w-4 h-4" />
                    <span>Roll Number *</span>
                  </Label>
                  <Input
                    id="rollNumber"
                    type="text"
                    placeholder="CS21001"
                    value={formData.rollNumber}
                    onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                    className={`${errors.rollNumber ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"} bg-white/70`}
                    disabled={isSubmitting}
                  />
                  {errors.rollNumber && <p className="text-red-500 text-sm mt-1">{errors.rollNumber}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admissionDate" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Admission Date *</span>
                  </Label>
                  <Input
                    id="admissionDate"
                    type="date"
                    value={formData.admissionDate}
                    onChange={(e) => handleInputChange("admissionDate", e.target.value)}
                    className={`${errors.admissionDate ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"} bg-white/70`}
                    disabled={isSubmitting}
                  />
                  {errors.admissionDate && <p className="text-red-500 text-sm mt-1">{errors.admissionDate}</p>}
                </div>
              </div>
            </div>
          </div>
        </form>

        <DialogFooter className="pt-6 border-t border-gray-200/60 space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Enrolling...</span>
              </div>
            ) : (
              <>
                <GraduationCap className="w-4 h-4 mr-2" />
                Enroll Student
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}