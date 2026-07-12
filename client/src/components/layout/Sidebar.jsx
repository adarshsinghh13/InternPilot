import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  BarChart3,
  Settings,
  Rocket,
  X,
} from "lucide-react";
 
const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Applications", icon: Briefcase, to: "/applications" },
  { label: "Resumes", icon: FileText, to: "/resumes" },
  { label: "Analytics", icon: BarChart3, to: "/analytics" },
  { label: "Settings", icon: Settings, to: "/settings" },
];
export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-200 lg:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside className="w-64 bg-[#111111] h-screen text-white border-r border-[#222222] flex flex-col">
  <div className="p-4 text-xl font-bold">
    InternPilot
  </div>

  <nav className="flex flex-col gap-2 p-4">
    {NAV_ITEMS.map((item) => {
      const Icon = item.icon;

      return (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-blue-500/20 text-blue-400"
                : "text-gray-300 hover:bg-white/10"
            }`
          }
        >
          <Icon size={18} />
          <span>{item.label}</span>
        </NavLink>
      );
    })}
  </nav>

  {/* Footer */}
  <div className="mt-auto p-4 border-t border-[#222222]">
    <p className="text-xs text-gray-500">
      © 2026 InternPilot
    </p>
  </div>
</aside>
      
    </>
  );
}