"use client"

import { useState, useEffect } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StudentSearchFilters } from "./StudentSearchFilters"
import { StudentCard } from "./StudentCard"
import { StudentProfileHeader } from "./StudentProfileHeader"
import { StudentProfileTabs } from "./StudentProfileTabs"
import studentData from "./studentProfiles.json"

export function StudentProfiles() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [filterClass, setFilterClass] = useState("all")
  const [filterSemester, setFilterSemester] = useState("all")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // TODO: Replace with actual API call
    // fetchStudents();
  }, [])

  /*
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await api.searchStudents('');
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentProfile = async (studentId: string) => {
    try {
      const profile = await api.getStudentProfile(studentId);
      setSelectedStudent(profile);
    } catch (error) {
      console.error('Failed to fetch student profile:', error);
    }
  };
  */

  const handleStudentSelect = (student: any) => {
    // TODO: Replace with actual API call
    // fetchStudentProfile(student.id);
    setSelectedStudent(studentData.selectedStudentProfile)
  }

  const filteredStudents = studentData.students.filter((student) => {
    const matchesSearch =
      searchQuery === "" ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesClass = filterClass === "all" || student.class === filterClass
    const matchesSemester = filterSemester === "all" || student.semester === filterSemester

    return matchesSearch && matchesClass && matchesSemester
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Profiles</h1>
          <p className="text-gray-600 mt-1">Search and view comprehensive student information for mentorship</p>
        </div>
        <Button className="education-gradient text-white">
          <Download className="mr-2 h-4 w-4" />
          Export Student Data
        </Button>
      </div>

      {!selectedStudent ? (
        <>
          {/* Search and Filters */}
          <StudentSearchFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterClass={filterClass}
            setFilterClass={setFilterClass}
            filterSemester={filterSemester}
            setFilterSemester={setFilterSemester}
          />

          {/* Student List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} onSelect={handleStudentSelect} />
            ))}
          </div>
        </>
      ) : (
        /* Student Profile Detail View */
        <div className="space-y-6">
          <StudentProfileHeader student={selectedStudent} onBack={() => setSelectedStudent(null)} />

          {/* Detailed Information Tabs */}
          <StudentProfileTabs student={selectedStudent} />
        </div>
      )}
    </div>
  )
}
