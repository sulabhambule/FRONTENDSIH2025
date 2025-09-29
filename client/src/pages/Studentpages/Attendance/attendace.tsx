import { AttendanceOverview } from "@/pages/Studentpages/Attendance/attendance-overview"
import { AttendanceCalendar } from "@/pages/Studentpages/Attendance/attendance-calendar"
import { CourseAttendance } from "@/pages/Studentpages/Attendance/course-attendance"
import { AttendanceStats } from "@/pages/Studentpages/Attendance/attendance-stats"
import { AbsenceRequests } from "@/pages/Studentpages/Attendance/absence-requests"

export default function AttendancePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Attendance Tracking</h1>
        <p className="text-muted-foreground">
          Monitor your class attendance, track patterns, and manage absence requests.
        </p>
      </div>

      <AttendanceOverview />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AttendanceCalendar />
        </div>
        <AttendanceStats />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CourseAttendance />
        <AbsenceRequests />
      </div>
    </div>
  )
}
