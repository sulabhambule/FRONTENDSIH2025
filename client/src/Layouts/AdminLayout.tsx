import { Outlet } from "react-router-dom"
import { AdminSidebar } from "@/pages/Sidebar/AdminSidebar"
import { AdminHeader } from "@/pages/Headers/AdminHeader"
import { useState } from "react"

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Top Navbar */}
      <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-blue-900/20 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 pt-16">
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
    </div>
  )
}
