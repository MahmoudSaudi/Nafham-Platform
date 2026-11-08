"use client";

import Link from "next/link";
import { Menu, ExternalLink } from "lucide-react";
import NotificationBell from "@/features/notifications/components/NotificationBell";
import { usePathname } from "next/navigation";

interface Props {
  onMenuClick?: () => void;
}

export default function DashboardTopbar({ onMenuClick }: Props) {
  const pathname = usePathname();

  const getRouteInfo = () => {
    if (pathname.includes('/dashboard/users')) return { title: 'إدارة المستخدمين', subtitle: 'إدارة حسابات الطلاب والمدربين والصلاحيات' };
    if (pathname.includes('/dashboard/courses')) return { title: 'إدارة الدورات', subtitle: 'عرض، تعديل، وإدارة جميع الدورات التدريبية' };
    if (pathname.includes('/dashboard/instructors')) return { title: 'إدارة المدربين', subtitle: 'مراجعة طلبات الانضمام، إدارة العقود، ومتابعة الأداء' };
    if (pathname.includes('/dashboard/reports')) return { title: 'التقارير والتحليلات', subtitle: 'متابعة أداء المنصة والمؤشرات المالية بدقة' };
    if (pathname.includes('/dashboard/tracks')) return { title: 'المسارات التعليمية', subtitle: 'إدارة المسارات وتصنيف الدورات' };
    return { title: 'نظرة عامة', subtitle: 'مرحباً بك في لوحة تحكم المنصة التعليمية' };
  };

  const { title, subtitle } = getRouteInfo();

  return (
    <header className="h-24 bg-[#FAFAFA] flex items-center justify-between px-8 sticky top-0 z-30">
      
      {/* Right Section: Title & Hamburger */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-500 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">{title}</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">{subtitle}</p>
        </div>
      </div>

      {/* Left Section: Actions */}
      <div className="flex items-center gap-4">
        <Link 
          href="/"
          className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          زيارة الموقع
        </Link>
        <NotificationBell />
      </div>

    </header>
  );
}
