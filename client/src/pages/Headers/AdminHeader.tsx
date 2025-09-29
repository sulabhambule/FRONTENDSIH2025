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
import { Bell, Settings, LogOut, User, Search, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"

interface AdminHeaderProps {
  onToggleSidebar: () => void
}

export function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const navigate = useNavigate()

  // TODO: Replace with actual admin data from API
  const adminData = {
    name: "Dr. Sarah Wilson",
    department: "Administration",
    title: "System Administrator",
    avatar: "/admin-avatar.png",
  }

  const handleLogout = () => {
    // TODO: Clear authentication data when implemented
    navigate("/login")
  }

  const handleProfileClick = () => {
    navigate("/admin/profile")
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b border-blue-200 bg-gradient-to-r from-white via-blue-50 to-indigo-50 backdrop-blur-sm shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-blue-100 hover:text-blue-700"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xs sm:text-sm">SH</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Smart Student Hub
              </h1>
              <p className="text-xs text-blue-600/70">Admin Portal</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search users, reports..." className="pl-10 w-48 xl:w-64 border-blue-200 focus:border-blue-400" />
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden hover:bg-blue-100 hover:text-blue-700">
            <Search className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="relative hover:bg-blue-100 hover:text-blue-700">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs flex items-center justify-center text-white shadow-sm">
              3
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-blue-100">
                <Avatar className="h-10 w-10 ring-2 ring-blue-200 hover:ring-blue-300 transition-all">
                  <AvatarImage src={adminData.avatar} alt="Admin" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                    {adminData.name
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
                  <p className="text-sm font-medium leading-none">{adminData.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {adminData.title} • {adminData.department}
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
