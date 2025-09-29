import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Users,
  Trophy,
  Bookmark,
  Briefcase,
  FolderOpen,
  FileText,
  Calendar,
  Heart
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/student2", icon: LayoutDashboard },
    { name: "Academics", href: "/student2/academics", icon: BookOpen },
    { name: "Seminars/Workshop", href: "/student2/seminars", icon: Calendar },
    { name: "Online Courses", href: "/student2/courses", icon: Bookmark },
    { name: "Clubs", href: "/student2/clubs", icon: Users },
    { name: "Competitions", href: "/student2/competitions", icon: Trophy },
    { name: "Internships & Opportunity", href: "/student2/internships", icon: Briefcase },
    { name: "Volunteer", href: "/student2/volunteer", icon: Heart },
    { name: "Projects", href: "/student2/projects", icon: FolderOpen },
    { name: "Resume", href: "/student2/resume", icon: FileText },
    { name: "Self Analysis", href: "/student2/analysis", icon: BarChart3 },
  ];

  return (
    <div className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg border-r border-blue-100 z-40 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-800">Student Dashboard</p>
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
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
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
