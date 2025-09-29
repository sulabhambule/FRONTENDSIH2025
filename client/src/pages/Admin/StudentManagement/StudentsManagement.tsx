"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { StudentsOverview } from "./StudentsOverview"
import { StudentsList } from "./StudentsList"
import { StudentProfile } from "./StudentProfile"
import { EnrollStudentModal } from "./EnrollStudentModal"
import { Plus, ArrowLeft } from "lucide-react"
import type { StudentData } from "@/types/admin"
import studentsData from "./students.json"

export function StudentsManagement() {
  const [view, setView] = useState<"overview" | "profile">("overview")
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null)
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false)

  // TODO: Replace with actual API calls
  /*
  const fetchStudentsData = async () => {
    try {
      const response = await fetch('/api/admin/students')
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching students data:', error)
      return studentsData
    }
  }

  const fetchStudentProfile = async (studentId: string) => {
    try {
      const response = await fetch(`/api/admin/students/${studentId}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching student profile:', error)
      return null
    }
  }
  */

  const handleViewStudent = (studentId: string) => {
    setSelectedStudentId(studentId)
    setView("profile")
  }

  const handleEditStudent = (studentId: string) => {
    // TODO: Open edit student modal
    console.log("Edit student:", studentId)
  }

  const handleBackToOverview = () => {
    setView("overview")
    setSelectedStudentId(null)
  }

  const handleEnrollStudent = (studentData: StudentData) => {
    // TODO: Add student to database/storage
    console.log("New student enrolled:", studentData)

    // Show success message (you can implement a toast notification here)
    alert(`Student ${studentData.name} has been successfully enrolled!`)

    // In a real app, you would:
    // 1. Make an API call to save the student
    // 2. Update the local state/reload the students list
    // 3. Show a success notification
    // 4. Possibly redirect to the student's profile

    // Example API call:
    /*
    try {
      await fetch('/api/admin/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      })
      // Refresh students data
      // Show success notification
    } catch (error) {
      // Handle error
      console.error('Error enrolling student:', error)
    }
    */
  }

  const handleOpenEnrollModal = () => {
    setIsEnrollModalOpen(true)
  }

  const handleCloseEnrollModal = () => {
    setIsEnrollModalOpen(false)
  }

  const selectedStudent = selectedStudentId ? (studentsData.students as StudentData[]).find((s) => s.id === selectedStudentId) : null

  if (view === "profile" && selectedStudent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={handleBackToOverview}
              className="bg-white border border-gray-300 text-gray-700 px-6 py-2 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Student Directory
            </Button>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <StudentProfile student={selectedStudent} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Student Directory
            </h1>
            <p className="text-gray-600 mt-1 text-base">
              Manage and track all enrolled students across departments
            </p>
            <div className="flex items-center space-x-3 mt-3">
              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-medium">
                Academic Year 2024-25
              </div>
              <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm font-medium">
                {studentsData.stats.totalStudents} Students Enrolled
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <Button
              onClick={handleOpenEnrollModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Enroll New Student
            </Button>
            <div className="text-xs text-gray-500 text-center">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Student Analytics Overview
              </h2>
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm font-medium">
                Live Data
              </div>
            </div>
            <StudentsOverview stats={studentsData.stats} />
          </div>
        </div>

        {/* Students Directory */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Student Records Database
                </h2>
                <p className="text-gray-600">Browse, search, and manage student information</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-medium">
                Academic Records
              </div>
              <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm font-medium">
                Performance Tracking
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <StudentsList
                students={studentsData.students as StudentData[]}
                departments={studentsData.departments}
                onViewStudent={handleViewStudent}
                onEditStudent={handleEditStudent}
              />
            </div>
          </div>
        </div>

        {/* Enroll Student Modal */}
        <EnrollStudentModal
          isOpen={isEnrollModalOpen}
          onClose={handleCloseEnrollModal}
          onSubmit={handleEnrollStudent}
          departments={studentsData.departments}
        />
      </div>
    </div>
  )
}
