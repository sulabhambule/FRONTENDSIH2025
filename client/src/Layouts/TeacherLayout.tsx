import { useState } from "react"
import { Outlet } from "react-router-dom"
import { TeacherHeader } from "@/pages/Headers/TeacherHeader"
import { TeacherSidebar } from "@/pages/Sidebar/TeacherSidebar"

export default function TeacherLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Top Navbar - Fixed */}
      <TeacherHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Sidebar - Fixed on desktop, overlay on mobile */}
      <TeacherSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="lg:ml-64 pt-16">
        <div className="p-3 sm:p-4 lg:p-6 bg-gradient-to-b from-slate-50/50 to-blue-50/30 min-h-[calc(100vh-4rem)]">
          {/* Educational theme accent */}
          <div className="absolute top-16 lg:left-64 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-20"></div>

          {/* Content wrapper with subtle styling */}
          <div className="relative z-10">
            <Outlet />
          </div>
        </div>
      </main>


    </div>
  )
}
