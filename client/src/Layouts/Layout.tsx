// src/Layouts/Layout.jsx
// import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom'; // Import useLocation for current path checking
import FontSizeHandler from '@/components/Ribbon/FontSizeHandler';
import LoadingPage from "@/pages/LoadingPage.tsx"

function Layout() {
  const navigation = useNavigation();

  return (
    <div className="flex flex-col min-h-screen ">
      <FontSizeHandler />
      {/* This flex-1 ensures the main content stretches to fill the available space */}
      <main className="flex-1">
        {/* {location.pathname === '/' ? <Home /> : <Outlet />} Render Home only at '/' */}
        {navigation.state == "loading" ? <LoadingPage /> : <Outlet />}

      </main>

    </div>
  );
}

export default Layout;
