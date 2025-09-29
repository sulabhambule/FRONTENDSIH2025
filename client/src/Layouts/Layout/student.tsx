import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./../../components/sidebar";
// import { Header } from "../../components/header"
import { StudentNavbar } from "@/pages/Headers/StudentHeader";

export default function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* <Header /> */}
      <StudentNavbar onToggleSidebar={toggleSidebar} />
      <div className="flex min-h-screen pt-16">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        {/* Main Content - Responsive margins */}
        <main className="flex-1 bg-white lg:ml-64 p-0 min-h-screen transition-all duration-200">
          <div className="w-full">
            {/* Outlet is where child routes will be rendered */}
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
