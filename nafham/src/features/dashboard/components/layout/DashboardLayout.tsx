"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-row">
      
      {/* Desktop Sidebar */}
      <div className="fixed top-0 right-0 h-screen z-40 hidden lg:block">
        <DashboardSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar (Slide-in) */}
      <div className={`fixed inset-y-0 right-0 z-50 transform transition-transform duration-300 lg:hidden flex ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        <DashboardSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen lg:mr-60 transition-all duration-300 min-w-0 w-full overflow-x-hidden">
        <DashboardTopbar 
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <div className="p-4 sm:p-8 flex-1 w-full min-w-0">
          {children}
        </div>
      </main>

    </div>
  );
}
