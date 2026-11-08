"use client";

import { useState, useRef, useEffect } from "react";
import { User, Settings, BookOpen, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { data: session } = useSession();
  
  const user = session?.user ? {
    id: session.user.id || "1",
    name: session.user.name || "مستخدم",
    email: session.user.email || "",
    role: (session.user as any).role || "STUDENT",
    avatar: session.user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.name || 'User')}&background=047857&color=fff`,
  } : null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all focus:outline-none"
      >
        <div className="flex flex-col items-end hidden sm:flex">
          <span className="text-sm font-bold text-slate-800 leading-none mb-1">{user.name}</span>
          <span className="text-xs text-slate-500 font-medium leading-none">
            {user.role === "STUDENT" ? "طالب" : user.role === "TEACHER" ? "مدرب" : "مسؤول"}
          </span>
        </div>
        
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
          <Image 
            src={user.avatar} 
            alt={user.name} 
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 hidden sm:block ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="fixed top-[72px] left-4 right-4 sm:absolute sm:top-auto sm:left-0 sm:right-auto sm:mt-3 sm:w-64 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
          {/* Mobile Header (Shows only on mobile) */}
          <div className="p-4 border-b border-gray-100 sm:hidden bg-gray-50/50">
            <p className="font-bold text-slate-800">{user.name}</p>
            <p className="text-xs text-slate-500 mt-1">{user.email}</p>
          </div>

          <div className="p-2">
            {/* Common Item */}
            <Link 
              href="/profile" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
            >
              <User className="w-5 h-5" />
              <span>الملف الشخصي</span>
            </Link>

            {/* Role Specific Items */}
            {user.role === "STUDENT" ? (
              <>
                <Link 
                  href="/my-courses" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>دوراتي</span>
                </Link>
                <Link 
                  href="/settings" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  <span>الإعدادات</span>
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href={user.role === "ADMIN" ? "/dashboard" : "/instructor/dashboard"} 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>لوحة التحكم</span>
                </Link>
              </>
            )}
            
            <div className="h-px bg-gray-100 my-2 mx-2" />
            
            <button 
              onClick={async () => {
                setIsOpen(false);
                await signOut({ callbackUrl: '/' });
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
