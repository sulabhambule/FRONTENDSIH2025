"use client"

import { useState, useEffect } from "react"
import { Upload, Download, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"


// Import components
import { ClassSelector } from "./ClassSelector"
import { AttendanceUpload } from "./AttendanceUpload"
import { MarksUpload } from "./MarksUpload"
import { AssignmentsList } from "./AssignmentsList"

// Import data
import classData from "./classManagement.json"

export function ClassManagement() {
  const [selectedClass, setSelectedClass] = useState(classData.classes[0])
  // const [attendanceData, setAttendanceData] = useState<any>({})
  // const [marksData, setMarksData] = useState<any>({})
  // const [loading, setLoading] = useState(false)

  useEffect(() => {
    // TODO: Replace with actual API call
    // fetchClassData();
  }, [])

  /*
  const fetchClassData = async () => {
    setLoading(true);
    try {
      const data = await api.getAssignedClasses();
      setClassData(data);
    } catch (error) {
      console.error('Failed to fetch class data:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadAttendance = async (classId: string, attendanceData: any) => {
    try {
      await api.uploadAttendance(classId, attendanceData);
      // Refresh data
    } catch (error) {
      console.error('Failed to upload attendance:', error);
    }
  };
  */

  const handleAttendanceUpload = () => {
    // TODO: Implement attendance upload logic
    console.log("Uploading attendance for class:", selectedClass.id)
  }

  const handleMarksUpload = () => {
    // TODO: Implement marks upload logic
    console.log("Uploading marks for class:", selectedClass.id)
  }

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in px-3 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Class Management</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage attendance, marks, and assignments for your classes</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button variant="outline" className="text-xs sm:text-sm">
            <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Export Data
          </Button>
          <Button className="education-gradient text-white text-xs sm:text-sm">
            <Upload className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Bulk Upload
          </Button>
        </div>
      </div>

      <ClassSelector classes={classData.classes} selectedClass={selectedClass} onClassSelect={setSelectedClass} />

      {/* Class Management Tabs */}
      <Tabs defaultValue="overview" className="space-y-3 sm:space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
          <TabsTrigger value="overview" className="text-xs sm:text-sm py-2">Overview</TabsTrigger>
          <TabsTrigger value="attendance" className="text-xs sm:text-sm py-2">Attendance</TabsTrigger>
          <TabsTrigger value="marks" className="text-xs sm:text-sm py-2">Marks</TabsTrigger>
          <TabsTrigger value="assignments" className="text-xs sm:text-sm py-2">Assignments</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <Card className="animate-slide-up">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-base sm:text-lg">Class Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs sm:text-sm text-gray-600">Average Attendance</span>
                      <span className="text-xs sm:text-sm font-medium">{selectedClass.averageAttendance}%</span>
                    </div>
                    <Progress value={selectedClass.averageAttendance} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs sm:text-sm text-gray-600">Average Marks</span>
                      <span className="text-xs sm:text-sm font-medium">{selectedClass.averageMarks}%</span>
                    </div>
                    <Progress value={selectedClass.averageMarks} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-slide-up">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-base sm:text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Total Students</span>
                    <span className="text-xs sm:text-sm font-medium">{selectedClass.studentCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Schedule</span>
                    <span className="text-xs sm:text-sm font-medium">{selectedClass.schedule}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Semester</span>
                    <span className="text-xs sm:text-sm font-medium">{selectedClass.semester}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-slide-up sm:col-span-2 lg:col-span-1">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button size="sm" className="w-full justify-start text-xs sm:text-sm" onClick={handleAttendanceUpload}>
                  <Upload className="mr-1 sm:mr-2 h-3 w-3" />
                  Upload Attendance
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full justify-start bg-transparent text-xs sm:text-sm"
                  onClick={handleMarksUpload}
                >
                  <Upload className="mr-1 sm:mr-2 h-3 w-3" />
                  Upload Marks
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start bg-transparent text-xs sm:text-sm">
                  <TrendingUp className="mr-1 sm:mr-2 h-3 w-3" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Student List */}
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg lg:text-xl">Student List</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Overview of students in {selectedClass.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 sm:space-y-3">
                {classData.students.map((student) => (
                  <div key={student.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 bg-gray-50 rounded-lg gap-3 sm:gap-0">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="h-6 w-6 sm:h-8 sm:w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs sm:text-sm font-medium text-blue-600">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-medium text-gray-900">{student.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">{student.rollNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Attendance</p>
                        <p className="text-xs sm:text-sm font-medium text-green-600">{student.attendance}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Marks</p>
                        <p className="text-xs sm:text-sm font-medium text-blue-600">{student.marks}%</p>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs sm:text-sm px-2 sm:px-3">
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <AttendanceUpload />

          {/* Attendance History */}
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg lg:text-xl">Attendance History</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Recent attendance records for {selectedClass.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 sm:space-y-3">
                {[1, 2, 3, 4, 5].map((day) => (
                  <div key={day} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 bg-gray-50 rounded-lg gap-3 sm:gap-0">
                    <div>
                      <p className="text-sm sm:text-base font-medium text-gray-900">
                        {new Date(Date.now() - day * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">Morning Session</p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
                      <div className="text-center">
                        <p className="text-xs sm:text-sm font-medium text-green-600">
                          {Math.floor(Math.random() * 10) + 35} Present
                        </p>
                        <p className="text-xs text-gray-500">
                          {selectedClass.studentCount - (Math.floor(Math.random() * 10) + 35)} Absent
                        </p>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs sm:text-sm px-2 sm:px-3">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marks" className="space-y-4">
          <MarksUpload gradeDistribution={classData.gradeDistribution} />
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <AssignmentsList assignments={classData.assignments} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
