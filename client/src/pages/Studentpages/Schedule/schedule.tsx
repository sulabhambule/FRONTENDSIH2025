"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, BookOpen } from "lucide-react"

// Sample schedule data
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
]

const schedule = [
  {
    id: 1,
    title: "Data Structures & Algorithms",
    code: "CS301",
    instructor: "Dr. Sarah Johnson",
    room: "Room 204",
    time: "10:00 AM - 11:00 AM",
    days: ["Monday", "Wednesday", "Friday"],
    color: "bg-blue-100 border-blue-300 text-blue-800"
  },
  {
    id: 2,
    title: "Database Management Systems",
    code: "CS302",
    instructor: "Prof. Michael Chen",
    room: "Lab 301",
    time: "2:00 PM - 3:30 PM",
    days: ["Tuesday", "Thursday"],
    color: "bg-green-100 border-green-300 text-green-800"
  },
  {
    id: 3,
    title: "Software Engineering",
    code: "CS303",
    instructor: "Dr. Emily Rodriguez",
    room: "Room 105",
    time: "1:00 PM - 2:00 PM",
    days: ["Monday", "Wednesday", "Friday"],
    color: "bg-purple-100 border-purple-300 text-purple-800"
  },
  {
    id: 4,
    title: "Discrete Mathematics",
    code: "MATH201",
    instructor: "Dr. James Wilson",
    room: "Room 302",
    time: "11:00 AM - 12:30 PM",
    days: ["Tuesday", "Thursday"],
    color: "bg-orange-100 border-orange-300 text-orange-800"
  },
]

const upcomingClasses = [
  {
    title: "Data Structures & Algorithms",
    time: "Today, 10:00 AM",
    room: "Room 204",
    status: "upcoming"
  },
  {
    title: "Software Engineering",
    time: "Today, 1:00 PM",
    room: "Room 105",
    status: "upcoming"
  },
  {
    title: "Database Management Systems",
    time: "Tomorrow, 2:00 PM",
    room: "Lab 301",
    status: "scheduled"
  },
]

const getClassForTimeAndDay = (time: string, day: string) => {
  return schedule.find(item => {
    const classTime = item.time.split(' - ')[0]
    return item.days.includes(day) && classTime === time
  })
}

export default function SchedulePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Class Schedule</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">Week 8</Badge>
          <Badge>Spring 2025</Badge>
        </div>
      </div>

      {/* Upcoming Classes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Upcoming Classes
          </CardTitle>
          <CardDescription>Your next classes for today and tomorrow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {upcomingClasses.map((class_item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${class_item.status === 'upcoming' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                  <div>
                    <div className="font-medium">{class_item.title}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {class_item.room}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{class_item.time}</div>
                  <Badge variant={class_item.status === 'upcoming' ? 'default' : 'secondary'}>
                    {class_item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Schedule
          </CardTitle>
          <CardDescription>Your complete class schedule for this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-6 gap-2 min-w-[800px]">
              {/* Header */}
              <div className="font-medium text-center p-2 bg-muted rounded">Time</div>
              {weekDays.map(day => (
                <div key={day} className="font-medium text-center p-2 bg-muted rounded">
                  {day}
                </div>
              ))}

              {/* Time slots and classes */}
              {timeSlots.map(time => (
                <React.Fragment key={time}>
                  <div className="text-sm p-2 border-r font-medium text-muted-foreground">
                    {time}
                  </div>
                  {weekDays.map(day => {
                    const classItem = getClassForTimeAndDay(time, day)
                    return (
                      <div key={`${time}-${day}`} className="p-1 min-h-[60px]">
                        {classItem && (
                          <div className={`p-2 rounded border-l-4 ${classItem.color} h-full`}>
                            <div className="text-xs font-medium truncate">
                              {classItem.code}
                            </div>
                            <div className="text-xs truncate">
                              {classItem.room}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Course Details
          </CardTitle>
          <CardDescription>Complete information about your enrolled courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {schedule.map(course => (
              <div key={course.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{course.title}</div>
                    <div className="text-sm text-muted-foreground">{course.code}</div>
                  </div>
                  <div className={`w-4 h-4 rounded ${course.color.split(' ')[0]}`} />
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {course.room}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {course.time}
                  </div>
                  <div className="text-muted-foreground">
                    {course.days.join(', ')}
                  </div>
                  <div className="text-muted-foreground">
                    Instructor: {course.instructor}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}