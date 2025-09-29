"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Class {
  id: string
  name: string
  subject: string
  semester: string
  studentCount: number
  schedule: string
  averageAttendance: number
  averageMarks: number
}

interface ClassSelectorProps {
  classes: Class[]
  selectedClass: Class
  onClassSelect: (classItem: Class) => void
}

export function ClassSelector({ classes, selectedClass, onClassSelect }: ClassSelectorProps) {
  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Select Class</CardTitle>
        <CardDescription>Choose a class to manage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedClass.id === classItem.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
                }`}
              onClick={() => onClassSelect(classItem)}
            >
              <h3 className="font-semibold text-gray-900">{classItem.name}</h3>
              <p className="text-sm text-gray-600">{classItem.subject}</p>
              <div className="flex justify-between items-center mt-2">
                <Badge variant="secondary">{classItem.studentCount} students</Badge>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Attendance</p>
                  <p className="text-sm font-medium text-green-600">{classItem.averageAttendance}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
