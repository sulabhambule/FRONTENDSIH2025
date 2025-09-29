"use client"

import { Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Student {
  id: string
  name: string
  rollNumber: string
  email: string
  class: string
  semester: string
  avatar: string
  cgpa: number
  attendance: number
  status: string
}

interface StudentCardProps {
  student: Student
  onSelect: (student: Student) => void
}

export function StudentCard({ student, onSelect }: StudentCardProps) {
  return (
    <Card className="animate-slide-up card-hover cursor-pointer" onClick={() => onSelect(student)}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">
              {student.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{student.name}</h3>
            <p className="text-sm text-gray-600">{student.rollNumber}</p>
            <p className="text-xs text-gray-500">
              {student.class} • {student.semester}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-blue-600">{student.cgpa}</p>
            <p className="text-xs text-gray-500">CGPA</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-600">{student.attendance}%</p>
            <p className="text-xs text-gray-500">Attendance</p>
          </div>
        </div>

        <Button className="w-full mt-4 bg-transparent" variant="outline">
          <Eye className="mr-2 h-4 w-4" />
          View Profile
        </Button>
      </CardContent>
    </Card>
  )
}
