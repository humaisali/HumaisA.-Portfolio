import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FiMenu, FiExternalLink } from "react-icons/fi";
import Sidebar from "./Sidebar";

export default function AdminLayout({ unread }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#050709] overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} unread={unread} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#30363D]/60 bg-[#0D1117]/60 backdrop-blur-xl flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-[#8B949E] hover:text-white transition-colors bg-transparent border-none cursor-pointer"
          >
            <FiMenu size={20} />
          </button>
          <div className="hidden lg:block">
            <p className="text-[#8B949E] font-mono text-xs">
              <span className="text-[#0A84FF]">humais.softneer</span> / admin
            </p>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[#8B949E] hover:text-[#0A84FF] font-mono text-xs transition-colors"
          >
            <FiExternalLink size={13} />
            View Portfolio
          </a>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
