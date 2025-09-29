import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  GraduationCap,
  Calendar,
  Trophy,
  User,
  BarChart3,
  BookOpen,
  Clock,
  X,
} from "lucide-react"

interface StudentSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const sidebarItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/student",
  },
  {
    title: "Academic Performance",
    icon: GraduationCap,
    href: "/student/academics",
  },
  {
    title: "Attendance",
    icon: Calendar,
    href: "/student/attendance",
  },
  {
    title: "Achievements",
    icon: Trophy,
    href: "/student/achievements",
  },
  {
    title: "Profile",
    icon: User,
    href: "/student/profile",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/student/analytics",
  },
  {
    title: "Courses",
    icon: BookOpen,
    href: "/student/courses",
  },
  {
    title: "Schedule",
    icon: Clock,
    href: "/student/schedule",
  },
]

export function StudentSidebar({ isOpen = false, onClose }: StudentSidebarProps = {}) {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeItem, setActiveItem] = useState("/student-dashboard")

  useEffect(() => {
    setActiveItem(location.pathname)
  }, [location.pathname])

  const handleNavigation = (href: string) => {
    setActiveItem(href)
    navigate(href)
    // Close sidebar on mobile after navigation
    if (onClose) onClose()
  }

  return (
    <div className={cn(
      "fixed left-0 top-16 z-50 w-64 h-[calc(100vh-4rem)] border-r border-blue-200 bg-gradient-to-b from-white via-blue-50/50 to-indigo-50 shadow-lg transition-transform duration-200",
      "lg:translate-x-0", // Always visible on large screens
      isOpen ? "translate-x-0" : "-translate-x-full" // Mobile toggle behavior
    )}>
      {/* Educational theme header */}
      <div className="p-4 border-b border-blue-200 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <div className="text-white">
              {/* <div className="font-semibold text-sm">Student Portal</div> */}
              <div className="text-xs opacity-90">Academic Dashboard</div>
            </div>
          </div>
          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-white/10 h-8 w-8"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-2 p-2">
                {sidebarItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={activeItem === item.href ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start text-left hover:bg-blue-100 hover:text-blue-700 transition-all duration-200",
                      activeItem === item.href
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:from-blue-600 hover:to-indigo-700 hover:text-white"
                        : "text-gray-700 hover:bg-blue-50"
                    )}
                    onClick={() => handleNavigation(item.href)}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    <span className="font-medium">{item.title}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}
