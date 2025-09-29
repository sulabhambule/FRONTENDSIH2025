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
  { name: "Roles & Permissions", href: "/admin/roles", icon: Shield },
  { name: "Student Management", href: "/admin/students", icon: Users },
  { name: "Faculty Management", href: "/admin/teachers", icon: GraduationCap },
  // { name: "Department Overview", href: "/admin/departments", icon: Building2 },
  { name: "Performance Analytics", href: "/admin/performance", icon: Trophy },
  { name: "Reports & Analytics", href: "/admin/reports", icon: BarChart3 },
  // { name: "Academic Reports", href: "/admin/academic-reports", icon: FileText },
  // { name: "User Accounts", href: "/admin/accounts", icon: UserCog },
  { name: "Communication Hub", href: "/admin/communication", icon: MessageSquare },
  // { name: "Leaderboard", href: "/admin/leaderboard", icon: MessageSquare },
  // { name: "Notifications", href: "/admin/notifications", icon: Bell }
]

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const location = useLocation()

  return (
    <div className={cn(
      "fixed left-0 top-16 w-64 bottom-0 bg-white shadow-lg border-r border-blue-100 z-30 overflow-y-auto transition-transform duration-300 ease-in-out",
      isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      <div className="p-4 lg:p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <GraduationCap className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-800">Admin Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="px-3 lg:px-4 pb-4">
        <ul className="space-y-1 lg:space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center px-3 lg:px-4 py-2 lg:py-3 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  )}
                >
                  <item.icon className="mr-2 lg:mr-3 h-4 w-4 lg:h-5 lg:w-5" />
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
