"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Search, X, BookOpen } from "lucide-react";
import { useHeader } from "@/features/layout/hooks/useHeader";
import { useSession } from "next-auth/react";
import UserDropdown from "@/features/user/components/UserDropdown";
import NotificationBell from "@/features/notifications/components/NotificationBell";

export default function Header() {
  const {
    isSidebarOpen, setIsSidebarOpen,
    isMobileSearchOpen, setIsMobileSearchOpen
  } = useHeader();
  
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-12">
        <div className="flex items-center justify-between h-24 flex-nowrap">
          
          {isMobileSearchOpen ? (
            /* Mobile Expanded Search Bar */
            <div className="flex-1 flex items-center gap-3 w-full lg:hidden">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  autoFocus
                  placeholder="ماذا تريد أن تتعلم اليوم؟" 
                  className="w-full bg-gray-50 border border-gray-300 rounded-full py-3.5 pr-12 pl-4 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-inner"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 w-6 h-6" />
              </div>
              <button 
                onClick={() => setIsMobileSearchOpen(false)}
                className="text-gray-500 hover:text-red-500 p-2 bg-gray-50 rounded-full transition-colors shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <>
              {/* Right: Logo */}
              <div className="flex items-center justify-start shrink-0 lg:w-[200px]">
                <Link href="/" className="flex items-center gap-3">
                  <Image src="/images/logo.svg" alt="Nafham Logo" width={64} height={64} className="w-16 h-16" />
                  <span className="text-emerald-700 font-bold text-4xl tracking-tight hidden lg:block whitespace-nowrap">نفهم</span>
                </Link>
              </div>

              {/* Middle: Search Bar (Desktop) */}
              <div className="hidden lg:flex flex-1 max-w-4xl mr-4 ml-12 relative justify-center">
                <div className="relative w-full">
                  <input 
                    type="text" 
                    placeholder="ماذا تريد أن تتعلم اليوم؟" 
                    className="w-full bg-gray-50 border border-gray-300 rounded-full py-3.5 pr-14 pl-6 text-base font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all whitespace-nowrap truncate"
                  />
                  <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                </div>
              </div>

              {/* Left: Actions (Desktop) */}
              <div className="hidden lg:flex items-center justify-end gap-6 shrink-0 lg:w-[450px]">
                <Link href="/paths" className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 font-bold text-lg transition whitespace-nowrap">
                  <BookOpen className="w-6 h-6 text-emerald-600" />
                  <span>مسارات التعلم</span>
                </Link>
                
                <div className="flex items-center gap-4 shrink-0">
                  {isLoggedIn ? (
                    <>
                      <NotificationBell />
                      <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
                      <UserDropdown />
                    </>
                  ) : (
                    <>
                      <Link href="/auth/login" className="text-gray-700 hover:text-emerald-600 font-bold text-lg px-2 py-2 transition whitespace-nowrap shrink-0">
                        تسجيل دخول
                      </Link>
                      <Link href="/auth/register" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full text-lg font-bold transition shadow-sm shadow-emerald-600/20 whitespace-nowrap shrink-0">
                        إنشاء حساب
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile Menu Buttons */}
              <div className="lg:hidden flex items-center gap-1 sm:gap-2">
                {isLoggedIn && (
                  <>
                    <NotificationBell />
                    <UserDropdown />
                    <div className="w-px h-6 bg-gray-200 mx-1"></div>
                  </>
                )}
                
                <button 
                  onClick={() => setIsMobileSearchOpen(true)}
                  className="text-gray-600 hover:text-emerald-600 p-2 rounded-full hover:bg-gray-50 transition"
                >
                  <Search className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="text-gray-700 p-2 rounded-full hover:bg-gray-50 transition"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </>
          )}

        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl flex flex-col ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsSidebarOpen(false)}>
            <Image src="/images/logo.svg" alt="Nafham Logo" width={32} height={32} />
            <span className="text-emerald-700 font-bold text-xl">نفهم</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-red-500 p-2 rounded-full hover:bg-gray-50 transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-6">
          <div className="relative w-full md:hidden">
            <input 
              type="text" 
              placeholder="ابحث عن كورس..." 
              className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <nav className="flex flex-col gap-2">
            <Link href="/paths" className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 p-3 rounded-lg font-medium transition" onClick={() => setIsSidebarOpen(false)}>
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>مسارات التعلم</span>
            </Link>
            
            <div className="h-px bg-gray-100 my-2" />
            
            {isLoggedIn ? (
              <div className="p-3 text-sm font-medium text-emerald-600 text-center">
                أنت مسجل الدخول كـ {session?.user?.name}
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="flex items-center justify-center text-gray-700 hover:text-emerald-600 p-3 rounded-lg font-medium border border-gray-200 mt-2 transition" onClick={() => setIsSidebarOpen(false)}>
                  تسجيل دخول
                </Link>
                <Link href="/auth/register" className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-lg font-medium transition shadow-sm" onClick={() => setIsSidebarOpen(false)}>
                  إنشاء حساب
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
