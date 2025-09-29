"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ProfileHeader } from "./ProfileHeader"
import { StudentFeedback } from "./StudentFeedback"
import { MentoredStudents } from "./MentoredStudents"
import { AppraisalIntegration } from "./AppraisalIntegration"
import teacherProfileData from "./teacherProfile.json"

export const TeacherProfile: React.FC = () => {
  const [profileData, setProfileData] = useState(teacherProfileData)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProfileData()
  }, [])

  const fetchProfileData = async () => {
    setLoading(true)
    try {
      // TODO: API call to fetch teacher profile data
      // const response = await fetch('/api/teacher/profile');
      // const data = await response.json();
      // setProfileData(data);

      // Using dummy data for now
      setProfileData(teacherProfileData)
    } catch (error) {
      console.error("Error fetching profile data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Teacher Profile
          </h1>
          <p className="text-gray-600 mt-1 text-lg">Manage your academic and professional profile</p>
        </div>

        {/* Profile Header */}
        <div className="mb-6">
          <ProfileHeader teacherInfo={profileData.teacherInfo} academicProfile={profileData.academicProfile} />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <div>
            <StudentFeedback feedbackData={profileData.studentFeedback} />
          </div>
          <div>
            <MentoredStudents students={profileData.mentoredStudents} />
          </div>
        </div>

        {/* Full Width Appraisal */}
        <div>
          <AppraisalIntegration appraisalData={profileData.appraisalData} />
        </div>
      </div>
    </div>
  )
}

export default TeacherProfile
