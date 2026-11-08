"use client";

import Image from "next/image";
import { useProfile } from "../hooks/useProfile";
import { BookOpen, Clock, Award, Star, Settings } from "lucide-react";
import Link from "next/link";

export default function ProfileView() {
  const { user, stats, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || !stats) return null;

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Profile Header & Info */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 w-full bg-gradient-to-r from-emerald-500 to-teal-700 relative">
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          </div>
          
          <div className="px-8 pb-8 relative">
            {/* Avatar */}
            <div className="absolute -top-16 right-8">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                <Image 
                  src={user.avatar || ""} 
                  alt={user.name} 
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-4">
              <Link 
                href="/settings"
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-50 hover:bg-gray-100 text-slate-700 font-bold rounded-xl transition-colors border border-gray-200"
              >
                <Settings className="w-4 h-4" />
                <span>تعديل الملف الشخصي</span>
              </Link>
            </div>

            {/* User Details */}
            <div className="mt-8">
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{user.name}</h1>
              <p className="text-lg text-slate-500 font-medium mb-6">{user.email}</p>
              
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed">
                  طالب طموح يسعى لتعلم مهارات جديدة في مجالات البرمجة والتصميم. أؤمن بأن التعلم المستمر هو مفتاح النجاح في العصر الرقمي، وأحرص دائماً على تطبيق ما أتعلمه من خلال مشاريع عملية.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <p className="text-slate-500 font-medium text-sm mb-1">الكورسات المكتملة</p>
              <p className="text-2xl font-extrabold text-slate-900">{stats.completedCourses}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <p className="text-slate-500 font-medium text-sm mb-1">ساعات التعلم</p>
              <p className="text-2xl font-extrabold text-slate-900">{stats.totalHours}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <p className="text-slate-500 font-medium text-sm mb-1">الشهادات</p>
              <p className="text-2xl font-extrabold text-slate-900">{stats.certificates}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Star className="w-7 h-7" />
            </div>
            <div>
              <p className="text-slate-500 font-medium text-sm mb-1">النقاط المكتسبة</p>
              <p className="text-2xl font-extrabold text-slate-900">{stats.points}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
