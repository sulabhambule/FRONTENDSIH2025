import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Shield,
  Users,
  GraduationCap,
  Trophy,
  BarChart3,
  MessageSquare,
} from "lucide-react"
import { cn } from "../../lib/utils"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Student Management", href: "/admin/students", icon: Users },
  { name: "Faculty Management", href: "/admin/teachers", icon: GraduationCap },
  { name: "Roles & Permissions", href: "/admin/roles", icon: Shield },
  // { name: "Department Overview", href: "/admin/departments", icon: Building2 },
  { name: "Performance Analytics", href: "/admin/performance", icon: Trophy },
  { name: "Reports & Analytics", href: "/admin/reports", icon: BarChart3 },
  // { name: "Academic Reports", href: "/admin/academic-reports", icon: FileText },
  // { name: "User Accounts", href: "/admin/accounts", icon: UserCog },
  { name: "Communication Hub", href: "/admin/communication", icon: MessageSquare },
  // { name: "Leaderboard", href: "/admin/leaderboard", icon: MessageSquare },
  // { name: "Notifications", href: "/admin/notifications", icon: Bell }
]

export function AdminSidebar() {
  const location = useLocation()

  return (
    <div className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg border-r border-blue-100 z-40 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-800">Admin Dashboard</p>
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
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
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
