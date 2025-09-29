"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Users, Award } from "lucide-react"

// Sample course data
const courses = [
  {
    id: "CS301",
    title: "Data Structures & Algorithms",
    instructor: "Dr. Sarah Johnson",
    credits: 4,
    schedule: "MWF 10:00-11:00 AM",
    progress: 75,
    grade: "A-",
    status: "ongoing",
    nextClass: "Monday, 10:00 AM",
    assignments: 3,
  },
  {
    id: "CS302",
    title: "Database Management Systems",
    instructor: "Prof. Michael Chen",
    credits: 3,
    schedule: "TTh 2:00-3:30 PM",
    progress: 60,
    grade: "B+",
    status: "ongoing",
    nextClass: "Tuesday, 2:00 PM",
    assignments: 2,
  },
  {
    id: "CS303",
    title: "Software Engineering",
    instructor: "Dr. Emily Rodriguez",
    credits: 4,
    schedule: "MWF 1:00-2:00 PM",
    progress: 80,
    grade: "A",
    status: "ongoing",
    nextClass: "Wednesday, 1:00 PM",
    assignments: 1,
  },
  {
    id: "MATH201",
    title: "Discrete Mathematics",
    instructor: "Dr. James Wilson",
    credits: 3,
    schedule: "TTh 11:00-12:30 PM",
    progress: 45,
    grade: "B",
    status: "ongoing",
    nextClass: "Thursday, 11:00 AM",
    assignments: 4,
  },
  {
    id: "CS250",
    title: "Computer Networks",
    instructor: "Prof. Lisa Anderson",
    credits: 3,
    schedule: "MWF 3:00-4:00 PM",
    progress: 90,
    grade: "A",
    status: "completed",
    nextClass: "Course Completed",
    assignments: 0,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "ongoing":
      return "bg-blue-100 text-blue-800"
    case "completed":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function CoursesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">My Courses</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">Spring 2025</Badge>
          <Badge>5 Courses</Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17</div>
            <p className="text-xs text-muted-foreground">Credits this semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A-</div>
            <p className="text-xs text-muted-foreground">Current semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Ongoing courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Courses List */}
      <div className="grid gap-4">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <Badge className={getStatusColor(course.status)}>
                      {course.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    {course.id} • {course.instructor} • {course.credits} Credits
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{course.grade}</div>
                  <div className="text-sm text-muted-foreground">Current Grade</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium mb-1">Schedule</div>
                    <div className="text-sm text-muted-foreground">{course.schedule}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Next Class</div>
                    <div className="text-sm text-muted-foreground">{course.nextClass}</div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Course Progress</span>
                    <span className="text-sm text-muted-foreground">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {course.assignments > 0 ? `${course.assignments} pending assignments` : "No pending assignments"}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Materials
                    </Button>
                    <Button size="sm">
                      Enter Class
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}