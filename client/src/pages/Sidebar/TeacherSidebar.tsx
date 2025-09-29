import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  Trophy,
  CheckSquare,
  UserSearch,
  GraduationCap,
  UserCircle,
  Bell
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
  { name: "Leaderboard", href: "/teacher/leaderboard", icon: Bell },
]

export function TeacherSidebar() {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg border-r border-blue-100 z-40 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-800">Teacher Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="px-4 pb-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
