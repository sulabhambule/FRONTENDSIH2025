import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import Login from "./pages/Login/Login";
import StudentLayout from "./Layouts/StudentLayout";
import LandingPage from "./pages/LandingPage/LandingPage";
import CoursesPage from "./pages/Studentpages/Courses/courses";
import SchedulePage from "./pages/Studentpages/Schedule/schedule";
import Profile from "./pages/Studentpages/Profile/student-profile";
import AcademicsPage from "./pages/Studentpages/Academics/academics";
import DashboardPage from "./pages/Studentpages/Dashboard/dashboard";
import AttendancePage from "./pages/Studentpages/Attendance/attendace";
import AnalyticsPage from "./pages/Studentpages/Analytics/analytics";
import AchievementsPage from "./pages/Studentpages/Achievements/achievement";
import RootLayout from "./Layouts/Layout/student";
import Academics from "./pages/StudentDashboard2/Acad/Acadmeics";
import AnalysisPage from "./pages/StudentDashboard2/analysis/Analysis";
import ClubsPage from "./pages/StudentDashboard2/clubs/Club";
import CompetitionsPage from "./pages/StudentDashboard2/competitions/Competition";
import OnlineCoursesPage from "./pages/StudentDashboard2/courses/Courses";
import InternshipsPage from "./pages/StudentDashboard2/internships/Internships";
import ProjectsPage from "./pages/StudentDashboard2/projects/Projects";
import ResumePage from "./pages/StudentDashboard2/resume/Resume";
import SeminarsPage from "./pages/StudentDashboard2/seminars/Seminars";
import VolunteerPage from "./pages/StudentDashboard2/volunteer/Volunteer";
import TeacherLayout from "./Layouts/TeacherLayout";
import { Dashboard } from "./pages/TeacherSection/TDashboard/Dashboard";
import { ClassManagement } from "./pages/TeacherSection/ClassManagement/ClassManagement";
import { ClubAdvisor } from "./pages/TeacherSection/ClubAdvisor/ClubAdvisor";
import { ActivityApprovals } from "./pages/TeacherSection/Activity/ActivityApprovals";
import { StudentProfiles } from "./pages/TeacherSection/StudentProfile/StudentProfiles";
import TeacherProfile from "./pages/TeacherSection/TeacherProfile/TeacherProfile";
import NotificationsCommunication from "./pages/TeacherSection/TacherNotification/NotificationsCommunication";
import { AdminDashboard } from "./pages/Admin/AdminDashboard/AdminDashboard";
import { RolesPermissions } from "./pages/Admin/AdminRoles/RolesPermissions";
import { StudentsManagement } from "./pages/Admin/StudentManagement/StudentsManagement";
import { TeachersManagement } from "./pages/Admin/TeacherManagement/TeachersManagement";
import { PerformanceLeaderboard } from "./pages/Admin/PerformanceLeaderboard";
import { ReportsAnalytics } from "./pages/Admin/ReportsAnalytics";
import { Communication } from "./pages/Admin/Communication";
import AdminLayout from "./Layouts/AdminLayout";
import StudentProfile2 from "./pages/StudentDashboard2/Profile/student-profile";
import { TeacherLeaderboard } from "./pages/Leaderboard/TeacherLeaderboard";
// import { Leaderboard } from "./pages/Leaderboard/leaderboard";

export const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Landing page route - standalone */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication routes - standalone */}
        <Route path="/login" element={<Login />} />

        {/* Student dashboard routes with StudentLayout 
        
        this code is going to be remove from the code base in future.
        */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="academics" element={<AcademicsPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="schedule" element={<SchedulePage />} />
        </Route>

        {/* Second dashboard for user */}

        <Route path="/student2" element={<RootLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="academics" element={<Academics />} />
          <Route path="analysis" element={<AnalysisPage />} />
          <Route path="clubs" element={<ClubsPage />} />
          <Route path="competitions" element={<CompetitionsPage />} />
          <Route path="courses" element={<OnlineCoursesPage />} />
          <Route path="internships" element={<InternshipsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="seminars" element={<SeminarsPage />} />
          <Route path="volunteer" element={<VolunteerPage />} />
        </Route>


        <Route path="student2/profile" element={<StudentProfile2 />} />


        {/** This are the routes of the teacher */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="classes" element={<ClassManagement />} />
          <Route path="clubs" element={<ClubAdvisor />} />
          <Route path="approvals" element={<ActivityApprovals />} />
          <Route path="students" element={<StudentProfiles />} />

          <Route path="profile" element={<TeacherProfile />} />
          <Route path="notifications" element={<NotificationsCommunication />} />
          <Route path="leaderboard" element={<TeacherLeaderboard />} />
        </Route>

        {/** Admin routes guzzz */}
        <Route path="/admin" element={<AdminLayout />} >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/roles" element={<RolesPermissions />} />
          <Route path="/admin/students" element={<StudentsManagement />} />
          <Route path="/admin/teachers" element={<TeachersManagement />} />
          <Route path="/admin/performance" element={<PerformanceLeaderboard />} />
          <Route path="/admin/reports" element={<ReportsAnalytics />} />
          <Route path="/admin/communication" element={<Communication />} />
        </Route >
      </>
    )
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <RouterProvider router={router} />
    </div>
  );
};