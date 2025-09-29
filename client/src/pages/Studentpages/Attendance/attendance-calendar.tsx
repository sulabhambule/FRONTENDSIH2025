"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

// Mock attendance data for the calendar
const attendanceData = {
  "2024-12-01": { status: "present", course: "CS 315" },
  "2024-12-02": { status: "present", course: "MATH 152" },
  "2024-12-03": { status: "absent", course: "PHYS 201" },
  "2024-12-04": { status: "present", course: "ENG 104" },
  "2024-12-05": { status: "late", course: "CS 201" },
  "2024-12-08": { status: "present", course: "CS 315" },
  "2024-12-09": { status: "present", course: "MATH 152" },
  "2024-12-10": { status: "present", course: "PHYS 201" },
  "2024-12-11": { status: "present", course: "ENG 104" },
  "2024-12-12": { status: "present", course: "CS 201" },
}

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function AttendanceCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 1)) // December 2024

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const getAttendanceStatus = (day: number | null) => {
    if (!day) return null
    const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return attendanceData[dateKey as keyof typeof attendanceData]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800 border-green-200"
      case "absent":
        return "bg-red-100 text-red-800 border-red-200"
      case "late":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Attendance Calendar</CardTitle>
            <CardDescription>Visual overview of your class attendance</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[120px] text-center">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const attendance = getAttendanceStatus(day)
            return (
              <div
                key={index}
                className={`
                  aspect-square flex items-center justify-center text-sm rounded-lg border-2 transition-colors
                  ${day ? "hover:bg-muted cursor-pointer" : ""}
                  ${attendance ? getStatusColor(attendance.status) : "border-transparent"}
                `}
              >
                {day && (
                  <div className="text-center">
                    <div className="font-medium">{day}</div>
                    {attendance && <div className="text-xs mt-1 truncate">{attendance.course}</div>}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div className="flex items-center justify-center space-x-4 mt-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded bg-green-100 border border-green-200"></div>
            <span>Present</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded bg-yellow-100 border border-yellow-200"></div>
            <span>Late</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded bg-red-100 border border-red-200"></div>
            <span>Absent</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
