"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Mail, Phone, Calendar, BookOpen } from "lucide-react"

interface ProfileHeaderProps {
  teacherInfo: any
  academicProfile: any
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ teacherInfo, academicProfile }) => {
  const handleEditProfile = () => {
    // TODO: API call to edit profile
    // await updateTeacherProfile(teacherInfo.id, updatedData);
    console.log("Edit profile clicked")
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage src={teacherInfo.profileImage || "/placeholder.svg"} alt={teacherInfo.name} />
              <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                {teacherInfo.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <Button onClick={handleEditProfile} variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{teacherInfo.name}</h1>
                <p className="text-xl text-blue-600 mb-2">{teacherInfo.designation}</p>
                <p className="text-gray-600 mb-4">{teacherInfo.department} Department</p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Employee ID: {teacherInfo.employeeId}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {teacherInfo.email}
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {teacherInfo.phone}
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                Joined: {new Date(teacherInfo.joinDate).toLocaleDateString()}
              </div>
              <div className="flex items-center text-gray-600">
                <BookOpen className="w-4 h-4 mr-2" />
                {teacherInfo.experience} Experience
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Specialization</h3>
              <div className="flex flex-wrap gap-2">
                {teacherInfo.specialization.map((spec: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{academicProfile.totalStudentsGuided}</div>
                <div className="text-sm text-gray-600">Students Guided</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{academicProfile.currentMentees}</div>
                <div className="text-sm text-gray-600">Current Mentees</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{academicProfile.researchPapers}</div>
                <div className="text-sm text-gray-600">Research Papers</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{academicProfile.conferences}</div>
                <div className="text-sm text-gray-600">Conferences</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
