import { Outlet } from "react-router-dom"
import { StudentNavbar } from "@/pages/Headers/StudentHeader"
import { StudentSidebar } from "@/pages/Sidebar/StudentSidebar"

export default function StudentLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Top Navbar */}
      <StudentNavbar />

      <div className="flex">
        {/* Sidebar (fixed left) */}
        <StudentSidebar />

        {/* Main Content */}
        <main className="flex-1 ml-64 pt-16">
          <div className="p-6 bg-gradient-to-b from-slate-50/50 to-blue-50/30 min-h-[calc(100vh-4rem)]">
            {/* Educational theme accent */}
            <div className="absolute top-16 left-64 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-20"></div>

            {/* Content wrapper with subtle styling */}
            <div className="relative z-10">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
