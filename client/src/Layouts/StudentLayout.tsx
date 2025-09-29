import { useState } from "react"
import { Outlet } from "react-router-dom"
import { StudentNavbar } from "@/pages/Headers/StudentHeader"
import { StudentSidebar } from "@/pages/Sidebar/StudentSidebar"

export default function StudentLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Top Navbar */}
      <StudentNavbar onToggleSidebar={toggleSidebar} />

      <div className="flex">
        {/* Sidebar (responsive) */}
        <StudentSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content - Responsive margins */}
        <main className="flex-1 lg:ml-64 pt-16 transition-all duration-200">
          <div className="p-4 sm:p-6 bg-gradient-to-b from-slate-50/50 to-blue-50/30 min-h-[calc(100vh-4rem)]">
            {/* Educational theme accent - Responsive positioning */}
            <div className="absolute top-16 lg:left-64 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-20"></div>

            {/* Content wrapper with subtle styling */}
            <div className="relative z-10">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}
