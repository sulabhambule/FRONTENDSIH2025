import { Outlet } from "react-router-dom";
import Sidebar from "./../../components/sidebar";
// import { Header } from "../../components/header"
import { StudentNavbar } from "@/pages/Headers/StudentHeader";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-blue-50">
      {/* <Header /> */}
      <StudentNavbar />
      <div className="flex min-h-screen pt-16">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <main className="flex-1 bg-white ml-64 p-0 min-h-screen">
          <div className="w-full">
            {/* Outlet is where child routes will be rendered */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
