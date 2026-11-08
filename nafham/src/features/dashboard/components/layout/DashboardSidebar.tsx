"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  PieChart, 
  Users, 
  BookOpen, 
  Route, 
  GraduationCap, 
  BarChart3, 
  Settings,
  ShieldAlert,
  Wallet,
  Medal,
  HeadphonesIcon,
  MessageSquare,
  Tag,
  X,
  Activity
} from "lucide-react";

interface Props {
  onClose?: () => void;
}

export default function DashboardSidebar({ onClose }: Props) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = (session?.user as any)?.role || "ADMIN"; // Default to ADMIN for safety during dev, or handle appropriately

  const allNavItems = [
    { name: "نظرة عامة", href: "/dashboard", icon: PieChart, roles: ["ADMIN", "TEACHER"] },
    { name: "المستخدمين", href: "/dashboard/users", icon: Users, roles: ["ADMIN", "TEACHER"] },
    { name: "المسؤولين", href: "/dashboard/admins", icon: ShieldAlert, roles: ["ADMIN"] },
    { name: "الشؤون المالية", href: "/dashboard/financials", icon: Wallet, roles: ["ADMIN"] },
    { name: "الشهادات", href: "/dashboard/certificates", icon: Medal, roles: ["ADMIN", "TEACHER"] },
    { name: "الدعم الفني", href: "/dashboard/support", icon: HeadphonesIcon, roles: ["ADMIN", "TEACHER"] },
    { name: "النقاشات", href: "/dashboard/discussions", icon: MessageSquare, roles: ["ADMIN", "TEACHER"] },
    { name: "التسويق", href: "/dashboard/marketing", icon: Tag, roles: ["ADMIN"] },
    { name: "الدورات", href: "/dashboard/courses", icon: BookOpen, roles: ["ADMIN", "TEACHER"] },
    { name: "المسارات", href: "/dashboard/paths", icon: Route, roles: ["ADMIN"] },
    { name: "المدربين", href: "/dashboard/instructors", icon: GraduationCap, roles: ["ADMIN"] },
    { name: "سجل النظام", href: "/dashboard/audit", icon: Activity, roles: ["ADMIN"] },
    { name: "التقارير", href: "/dashboard/reports", icon: BarChart3, roles: ["ADMIN"] },
  ];

  const navItems = allNavItems.filter(item => item.roles.includes(role));

  return (
    <aside className="h-full w-60 bg-white border-l border-gray-100 flex flex-col z-40">
      {/* Logo */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-gray-50">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/images/logo.svg" alt="Nafham Logo" width={32} height={32} />
          <span className="text-emerald-700 font-extrabold text-2xl tracking-tight">نفهم</span>
        </Link>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-slate-400 hover:text-slate-700 hover:bg-gray-100 rounded-xl transition-colors lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overscroll-contain scrollbar-hide py-6 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 py-3.5 pl-4 pr-8 font-bold text-sm transition-all ${
                isActive 
                  ? "text-emerald-800 bg-[#ebf7f1] border-r-4 border-emerald-700 rounded-l-full ml-4" 
                  : "text-slate-500 hover:text-slate-800 hover:bg-gray-50 border-r-4 border-transparent rounded-l-full ml-4"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-emerald-800" : "text-slate-400"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Settings */}
      <div className="p-4 border-t border-gray-50">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-500 hover:text-slate-800 hover:bg-gray-50 transition-all"
        >
          <Settings className="w-5 h-5 text-slate-400" />
          <span>الإعدادات</span>
        </Link>
      </div>
    </aside>
  );
}
