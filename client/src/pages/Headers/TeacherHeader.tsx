import { useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Settings, LogOut, User, Search, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"

interface TeacherHeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function TeacherHeader({ sidebarOpen, setSidebarOpen }: TeacherHeaderProps) {
  const navigate = useNavigate()

  // TODO: Replace with actual teacher data from API
  const teacherData = {
    name: "Dr. Sarah Johnson",
    department: "Computer Science",
    title: "Associate Professor",
    avatar: "/teacher-avatar.png",
  }

  const handleLogout = () => {
    // TODO: Clear authentication data when implemented
    navigate("/login")
  }

  const handleProfileClick = () => {
    navigate("/teacher/profile")
  }

  const handleLogoClick = () => {
    navigate("/login")
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b border-blue-200 bg-gradient-to-r from-white via-blue-50 to-indigo-50 backdrop-blur-sm shadow-sm">
      <div className="flex h-16 items-center justify-between px-3 sm:px-4 lg:px-6">
        {/* Mobile menu button */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-blue-100"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="h-5 w-5 text-blue-700" />
            ) : (
              <Menu className="h-5 w-5 text-blue-700" />
            )}
          </Button>

          <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer" onClick={handleLogoClick}>
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-xs sm:text-sm">SH</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent hover:from-blue-500 hover:to-indigo-600 transition-colors">
                Smart Student Hub
              </h1>
              <p className="text-xs text-blue-600/70">Teacher Portal</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search button for mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-blue-100 hover:text-blue-700"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-blue-100">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 ring-2 ring-blue-200 hover:ring-blue-300 transition-all">
                  <AvatarImage src={teacherData.avatar} alt="Teacher" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold text-xs sm:text-sm">
                    {teacherData.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{teacherData.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {teacherData.title} • {teacherData.department}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfileClick}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
