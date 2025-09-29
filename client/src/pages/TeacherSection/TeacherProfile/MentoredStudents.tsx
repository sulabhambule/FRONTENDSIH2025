"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Users, Search, Calendar, MessageCircle, Clock, MapPin } from "lucide-react"

interface MentoredStudentsProps {
  students: any[]
}

export const MentoredStudents: React.FC<MentoredStudentsProps> = ({ students }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [meetingData, setMeetingData] = useState({
    date: "",
    time: "",
    duration: "30",
    location: "",
    agenda: "",
    notes: ""
  })

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddMentorshipNote = (studentId: string) => {
    // TODO: API call to add mentorship note
    // await addMentorshipNote(studentId, note);
    console.log("Add mentorship note for student:", studentId)
  }

  const handleScheduleMeeting = (student: any) => {
    setSelectedStudent(student)
    setIsScheduleModalOpen(true)
  }

  const handleSubmitMeeting = async () => {
    try {
      // TODO: API call to schedule meeting
      // await scheduleMentorshipMeeting(selectedStudent.id, meetingData);
      console.log("Schedule meeting with student:", selectedStudent?.name, meetingData)

      // Close modal and reset form
      setIsScheduleModalOpen(false)
      setMeetingData({
        date: "",
        time: "",
        duration: "30",
        location: "",
        agenda: "",
        notes: ""
      })

      // Success feedback (you can replace with toast notification)
      alert(`Meeting scheduled successfully with ${selectedStudent?.name}!`)
    } catch (error) {
      console.error("Error scheduling meeting:", error)
      alert("Failed to schedule meeting. Please try again.")
    }
  }

  const getPerformanceColor = (performance: string) => {
    switch (performance.toLowerCase()) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "average":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="bg-gradient-to-br from-white to-blue-50/20 border-blue-200 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold">
              Mentored Students
            </span>
            <span className="ml-2 text-sm font-normal text-gray-600 bg-blue-50 px-2 py-1 rounded-full">
              {students.length} students
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1 bg-blue-100 rounded-lg">
              <Search className="text-blue-600 w-4 h-4" />
            </div>
            <Input
              placeholder="Search students by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 border-blue-200 focus:border-blue-400 focus:ring-blue-400 bg-gradient-to-r from-white to-blue-50/30 placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {filteredStudents.map((student) => (
            <div key={student.id} className="group relative bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 rounded-xl p-4 lg:p-5 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1 min-w-0 overflow-hidden">
              {/* Performance Badge - Top Right */}
              <div className="absolute top-3 right-3 lg:top-4 lg:right-4">
                <Badge className={`${getPerformanceColor(student.performance)} font-medium px-2 py-1 text-xs`}>
                  {student.performance}
                </Badge>
              </div>

              {/* Student Info */}
              <div className="mb-4 pr-16 sm:pr-20">
                <h4 className="font-bold text-lg text-gray-900 mb-1 truncate">{student.name}</h4>
                <p className="text-sm font-medium text-gray-600 mb-1">{student.rollNumber}</p>
                <p className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-md inline-block truncate max-w-full">
                  {student.year} • {student.branch}
                </p>
              </div>

              {/* Meeting Details */}
              <div className="space-y-3 mb-5">
                <div className="flex items-center text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                  <div className="p-1.5 bg-blue-100 rounded-lg mr-3">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Started:</span>
                    <span className="ml-2">{new Date(student.mentorshipStart).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                  <div className="p-1.5 bg-green-100 rounded-lg mr-3">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Last Meeting:</span>
                    <span className="ml-2">{new Date(student.lastMeeting).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAddMentorshipNote(student.id)}
                  className="flex-1 border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Add Note
                </Button>
                <Dialog open={isScheduleModalOpen && selectedStudent?.id === student.id} onOpenChange={setIsScheduleModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      onClick={() => handleScheduleMeeting(student)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm hover:shadow-md transition-all duration-200 font-medium"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Meeting
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white border border-blue-200 shadow-2xl z-50 relative">
                    <DialogHeader className="pb-4 border-b border-gray-100">
                      <DialogTitle className="flex items-center gap-2 text-lg lg:text-xl text-gray-900">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                        </div>
                        Schedule Meeting with {student.name}
                      </DialogTitle>
                      <DialogDescription className="text-sm text-gray-600 mt-2">
                        Plan a mentorship meeting with {student.name} ({student.rollNumber})
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-6 px-1 pb-4">
                      {/* Date and Time */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date" className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Date
                          </Label>
                          <Input
                            id="date"
                            type="date"
                            value={meetingData.date}
                            onChange={(e) => setMeetingData(prev => ({ ...prev, date: e.target.value }))}
                            className="border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 bg-white w-full min-w-0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time" className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Time
                          </Label>
                          <Input
                            id="time"
                            type="time"
                            value={meetingData.time}
                            onChange={(e) => setMeetingData(prev => ({ ...prev, time: e.target.value }))}
                            className="border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 bg-white w-full min-w-0"
                          />
                        </div>
                      </div>

                      {/* Duration and Location */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="duration">Duration (minutes)</Label>
                          <Input
                            id="duration"
                            type="number"
                            value={meetingData.duration}
                            onChange={(e) => setMeetingData(prev => ({ ...prev, duration: e.target.value }))}
                            className="border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 bg-white w-full min-w-0"
                            placeholder="30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location" className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Location
                          </Label>
                          <Input
                            id="location"
                            value={meetingData.location}
                            onChange={(e) => setMeetingData(prev => ({ ...prev, location: e.target.value }))}
                            className="border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 bg-white w-full min-w-0"
                            placeholder="Office Room / Online"
                          />
                        </div>
                      </div>

                      {/* Agenda */}
                      <div className="space-y-2">
                        <Label htmlFor="agenda">Meeting Agenda</Label>
                        <Textarea
                          id="agenda"
                          value={meetingData.agenda}
                          onChange={(e) => setMeetingData(prev => ({ ...prev, agenda: e.target.value }))}
                          className="border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 bg-white min-h-[80px]"
                          placeholder="Discussion points, goals, topics to cover..."
                        />
                      </div>

                      {/* Notes */}
                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          value={meetingData.notes}
                          onChange={(e) => setMeetingData(prev => ({ ...prev, notes: e.target.value }))}
                          className="border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 bg-white min-h-[60px]"
                          placeholder="Any additional information or preparation notes..."
                        />
                      </div>
                    </div>

                    <DialogFooter className="pt-6 border-t border-gray-100 bg-white relative z-10 flex flex-col sm:flex-row gap-3 sm:gap-2 mt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsScheduleModalOpen(false)}
                        className="border-gray-300 hover:border-gray-400 hover:bg-gray-50 w-full sm:w-auto"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSubmitMeeting}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg w-full sm:w-auto"
                        disabled={!meetingData.date || !meetingData.time}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Meeting
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12 px-6">
            <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'No students match your search criteria.' : 'No mentored students assigned yet.'}
            </p>
          </div>
        )}

        {/* TODO: API calls for mentorship management */}
        {/*
        const fetchMentoredStudents = async () => {
          const students = await getMentoredStudents(teacherId);
          setStudents(students);
        };
        
        const addMentorshipNote = async (studentId, note) => {
          await createMentorshipNote(teacherId, studentId, note);
          // Refresh data
        };
        */}
      </CardContent>
    </Card>
  )
}
