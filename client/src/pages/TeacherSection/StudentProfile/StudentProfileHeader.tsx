"use client"

import { MessageSquare, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface StudentProfileHeaderProps {
  student: any
  onBack: () => void
}

export function StudentProfileHeader({ student, onBack }: StudentProfileHeaderProps) {
  return (
    <>
      {/* Back Button */}
      <Button variant="outline" onClick={onBack}>
        ← Back to Student List
      </Button>

      {/* Student Header */}
      <Card className="animate-slide-up">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-medium text-blue-600">
                  {student.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
                <p className="text-gray-600">{student.rollNumber}</p>
                <p className="text-sm text-gray-500">
                  {student.class} • {student.semester}
                </p>
                <p className="text-sm text-gray-500">{student.email}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Button>
              <Button className="education-gradient text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Feedback
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{student.cgpa}</p>
              <p className="text-sm text-gray-600">Current CGPA</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{student.attendance}%</p>
              <p className="text-sm text-gray-600">Attendance</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{student.competitions.length}</p>
              <p className="text-sm text-gray-600">Competitions</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{student.certifications.length}</p>
              <p className="text-sm text-gray-600">Certifications</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
