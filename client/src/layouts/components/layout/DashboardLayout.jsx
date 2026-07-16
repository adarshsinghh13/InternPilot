import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
 
const ROUTE_TITLES = {
  "/dashboard": "Dashboard",
  "/applications": "Applications",
  "/resumes": "Resumes",
  "/analytics": "Analytics",
  "/settings": "Settings",
};
 

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
 
  // Close the mobile drawer whenever the route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);
 
  const pageTitle = useMemo(() => {
    const match = Object.keys(ROUTE_TITLES).find((path) =>
      location.pathname.startsWith(path)
    );
    return ROUTE_TITLES[match] ?? "Dashboard";
  }, [location.pathname]);
 
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0A0A0A] font-['Inter',_sans-serif] text-gray-200">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onToggle={() => setIsSidebarOpen((prev) => !prev)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar
          title={pageTitle}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}