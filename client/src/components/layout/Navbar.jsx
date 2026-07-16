import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search, User, ChevronDown, Bell, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
 
/**
 * Navbar
 *
 * Top bar for the dashboard layout.
 * - Page title (left)
 * - Search bar placeholder (center)
 * - Notification + profile area (right)
 *
 * Props:
 *  - title: string — current page title
 *  - onMenuClick: () => void — opens the mobile sidebar drawer
 */
export default function Navbar({ title = "Dashboard", onMenuClick = () => {} }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b border-[#222222] bg-[#0A0A0A]/80 px-4 backdrop-blur-md sm:px-6">
      {/* Mobile menu trigger */}
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>
 
      {/* Page title */}
      <h1 className="font-['Sora',_sans-serif] text-[17px] font-semibold tracking-tight text-white">
        {title}
      </h1>
 
      {/* Search bar */}
      <div className="ml-2 hidden flex-1 max-w-md md:block">
        <div className="relative">
          <Search
            size={16}
            strokeWidth={2}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search"
            readOnly
            className="w-full cursor-default rounded-2xl border border-[#222222] bg-[#111111] py-2 pl-10 pr-4 font-['Inter',_sans-serif] text-sm text-gray-300 placeholder:text-gray-500 outline-none transition-colors focus:border-[#3B82F6]/50"
          />
        </div>
      </div>
 
      <div className="flex-1 md:hidden" />
 
      {/* Right cluster */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>
 
        <div className="mx-1 h-6 w-px bg-[#222222]" aria-hidden="true" />
 
        <div className="flex items-center gap-2 rounded-2xl border border-transparent px-1.5 py-1.5 transition-colors hover:border-[#222222] hover:bg-[#111111]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111111] ring-1 ring-[#222222]">
            <User size={16} className="text-gray-400" />
          </span>
          <div className="hidden text-left sm:block">
            <p className="text-sm text-white">{user?.name || "User"}</p>
            <p className="text-xs text-gray-500">{user?.email || "Signed in"}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="ml-2 rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}