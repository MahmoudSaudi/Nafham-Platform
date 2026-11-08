"use client";

import Drawer from "@/components/ui/Drawer";
import Image from "next/image";
import { PlayCircle, Clock, Users, Star, CheckCircle2 } from "lucide-react";
import { AdminCourse } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  course?: AdminCourse;
}

export default function ViewCourseDrawer({ isOpen, onClose, course }: Props) {
  if (!course) return null;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="تفاصيل الدورة">
      <div className="space-y-6">
        
        {/* Cover Image */}
        <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
          <Image 
            src={course.image} 
            alt={course.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-slate-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            {course.category}
          </div>
        </div>

        {/* Header Info */}
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 leading-tight mb-2">{course.title}</h2>
          <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <PlayCircle className="w-4 h-4 text-emerald-600" />
              <span>{course.lessonsCount} درس</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>12 ساعة و 30 دقيقة</span>
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Instructor */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-3">المدرب</h3>
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-sm border-2 border-white">
              <Image 
                src={course.instructorAvatar} 
                alt={course.instructorName}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-bold text-slate-900">{course.instructorName}</div>
              <div className="text-xs text-slate-500 font-medium">خبير تطوير وتصميم معتمد</div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center">
            <Users className="w-6 h-6 text-emerald-600 mb-2" />
            <span className="text-2xl font-extrabold text-slate-900">1,240</span>
            <span className="text-xs text-slate-500 font-bold mt-1">طالب مسجل</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center">
            <Star className="w-6 h-6 text-amber-500 mb-2 fill-amber-500" />
            <span className="text-2xl font-extrabold text-slate-900">4.8</span>
            <span className="text-xs text-slate-500 font-bold mt-1">التقييم العام</span>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Chapters/Lessons Preview */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-3">محتوى الدورة (نظرة سريعة)</h3>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-800">الفصل {i}: مقدمة أساسية</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">3 دروس • 45 دقيقة</div>
                </div>
                <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors">
                  معاينة
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            إغلاق
          </button>
          <button className="flex-1 py-3 text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 rounded-xl transition-colors shadow-sm">
            تعديل الدورة
          </button>
        </div>

      </div>
    </Drawer>
  );
}
