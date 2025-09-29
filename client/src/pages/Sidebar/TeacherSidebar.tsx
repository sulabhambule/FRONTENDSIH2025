import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  Trophy,
  CheckSquare,
  UserSearch,
  GraduationCap,
  UserCircle,
  Bell,
  TrendingUp
} from "lucide-react"
import { cn } from "../../lib/utils"

const navigation = [
  { name: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
  { name: "Class Management", href: "/teacher/classes", icon: Users },
  { name: "Club Advisor", href: "/teacher/clubs", icon: Trophy },
  { name: "Activity Approvals", href: "/teacher/approvals", icon: CheckSquare },
  { name: "Student Profiles", href: "/teacher/students", icon: UserSearch },
  { name: "Teacher Profile", href: "/teacher/profile", icon: UserCircle },
  { name: "Notifications", href: "/teacher/notifications", icon: Bell },
  { name: "Leaderboard", href: "/teacher/leaderboard", icon: TrendingUp },
]

interface TeacherSidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function TeacherSidebar({ sidebarOpen, setSidebarOpen }: TeacherSidebarProps) {
  const location = useLocation();

  return (
    <div className={cn(
      "fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg border-r border-blue-100 z-30 overflow-y-auto transition-transform duration-300 ease-in-out",
      // Desktop: Always visible
      "lg:translate-x-0",
      // Mobile: Slide in/out based on sidebarOpen state
      sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      {/* Sidebar Header */}
      <div className="p-4 sm:p-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg">
            <GraduationCap className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-800 font-medium">Teacher Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-3 sm:px-4 pb-4">
        <ul className="space-y-1 sm:space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={() => setSidebarOpen(false)} // Close sidebar on mobile when clicking a link
                  className={cn(
                    "flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  )}
                >
                  <item.icon className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
