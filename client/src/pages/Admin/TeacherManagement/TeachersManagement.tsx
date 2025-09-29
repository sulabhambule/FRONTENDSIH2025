"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeachersOverview } from "./TeachersOverview"
import { TeachersList } from "./TeachersList"
import { TeacherProfile } from "./TeacherProfile"
import { ApprovalsSummary } from "./ApprovalsSummary"
import { AddFacultyModal } from "./AddFacultyModal"
import { NewAnnouncementModal } from "./NewAnnouncementModal"
import { Plus, ArrowLeft, Megaphone } from "lucide-react"
import type { TeacherData, TeacherApproval } from "@/types/admin"
import teachersData from "./teachers.json"

export function TeachersManagement() {
  const [view, setView] = useState<"overview" | "profile">("overview")
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isNewAnnouncementModalOpen, setIsNewAnnouncementModalOpen] = useState(false)

  // TODO: Replace with actual API calls
  /*
  const fetchTeachersData = async () => {
    try {
      const response = await fetch('/api/admin/teachers')
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching teachers data:', error)
      return teachersData
    }
  }

  const fetchTeacherProfile = async (teacherId: string) => {
    try {
      const response = await fetch(`/api/admin/teachers/${teacherId}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching teacher profile:', error)
      return null
    }
  }

  const handleApproval = async (approvalId: string, action: 'approve' | 'reject') => {
    try {
      const response = await fetch(`/api/admin/approvals/${approvalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      })
      if (response.ok) {
        // Refresh data
        fetchTeachersData()
      }
    } catch (error) {
      console.error('Error handling approval:', error)
    }
  }
  */

  const handleViewTeacher = (teacherId: string) => {
    setSelectedTeacherId(teacherId)
    setView("profile")
  }

  const handleEditTeacher = (teacherId: string) => {
    // TODO: Open edit teacher modal
    console.log("Edit teacher:", teacherId)
  }

  const handleBackToOverview = () => {
    setView("overview")
    setSelectedTeacherId(null)
  }

  const handleApprove = (approvalId: string) => {
    // TODO: Implement approval logic
    console.log("Approve:", approvalId)
  }

  const handleReject = (approvalId: string) => {
    // TODO: Implement rejection logic
    console.log("Reject:", approvalId)
  }

  const handleAddFaculty = () => {
    setIsAddModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
  }

  const handleSubmitFaculty = (facultyData: TeacherData) => {
    // TODO: Implement API call to add faculty
    console.log("Adding new faculty:", facultyData)
    // You can add the faculty to your local state or make an API call here
    setIsAddModalOpen(false)
  }


  // Announcement Handlers
  const handleNewAnnouncement = () => {
    setIsNewAnnouncementModalOpen(true)
  }

  const handleCloseNewAnnouncementModal = () => {
    setIsNewAnnouncementModalOpen(false)
  }

  const handleSubmitAnnouncement = (announcementData: any) => {
    // TODO: Implement API call to create announcement
    console.log("Creating new announcement:", announcementData)
    setIsNewAnnouncementModalOpen(false)
  }

  const selectedTeacher = selectedTeacherId ? (teachersData.teachers as TeacherData[]).find((t) => t.id === selectedTeacherId) : null

  if (view === "profile" && selectedTeacher) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex items-center space-x-4 admin-fade-in">
            <Button
              variant="ghost"
              onClick={handleBackToOverview}
              className="text-admin-muted-foreground hover:text-admin-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Faculty
            </Button>
          </div>
          <TeacherProfile teacher={selectedTeacher} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Page Header - Responsive layout */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Faculty Management
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Manage faculty records and approvals
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <Button
                onClick={handleNewAnnouncement}
                variant="outline"
                className="border-pink-200 text-pink-700 hover:bg-pink-50 px-4 py-2 rounded-md w-full sm:w-auto"
              >
                <Megaphone className="w-4 h-4 mr-2" />
                New Announcement
              </Button>
              <Button
                onClick={handleAddFaculty}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Faculty
              </Button>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <TeachersOverview stats={teachersData.stats} />

        {/* Main Content Tabs - Responsive tabs */}
        <Tabs defaultValue="faculty">
          <TabsList className="bg-white border border-gray-200 rounded-md w-full grid grid-cols-2">
            <TabsTrigger
              value="faculty"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-2 sm:px-4 py-2 rounded-sm text-sm sm:text-base"
            >
              Faculty Directory
            </TabsTrigger>
            <TabsTrigger
              value="approvals"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-2 sm:px-4 py-2 rounded-sm text-sm sm:text-base"
            >
              Approval Queue
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faculty" className="mt-4">
            <TeachersList
              teachers={teachersData.teachers as TeacherData[]}
              departments={teachersData.departments}
              designations={teachersData.designations}
              onViewTeacher={handleViewTeacher}
              onEditTeacher={handleEditTeacher}
            />
          </TabsContent>

          <TabsContent value="approvals" className="mt-4">
            <ApprovalsSummary
              approvals={teachersData.approvalSummary as TeacherApproval[]}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </TabsContent>
        </Tabs>

        {/* Add Faculty Modal */}
        <AddFacultyModal
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitFaculty}
          departments={teachersData.departments}
          designations={teachersData.designations}
        />

        {/* New Announcement Modal */}
        <NewAnnouncementModal
          isOpen={isNewAnnouncementModalOpen}
          onClose={handleCloseNewAnnouncementModal}
          onSubmit={handleSubmitAnnouncement}
          departments={teachersData.departments.map((dept: string, index: number) => ({
            id: `dept_${index}`,
            name: dept,
            code: dept.toLowerCase().replace(/\s+/g, '_')
          }))}
        />
      </div>
    </div>
  )
}
