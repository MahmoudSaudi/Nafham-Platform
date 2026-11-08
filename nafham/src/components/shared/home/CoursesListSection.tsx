"use client";

import { useState } from "react";
import CourseCard from "@/features/courses/components/CourseCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const categories = ["الكل", "برمجة", "تصميم", "لغات", "إدارة أعمال"];

interface CoursesListSectionProps {
  initialCourses?: any[];
}

export default function CoursesListSection({ initialCourses = [] }: CoursesListSectionProps) {
  const [activeTab, setActiveTab] = useState("الكل");

  const filteredCourses = activeTab === "الكل" 
    ? initialCourses 
    : initialCourses.filter(course => course.category === activeTab);

  const MAX_DISPLAYED = 6;
  const displayedCourses = filteredCourses.slice(0, MAX_DISPLAYED);

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h2 className="text-3xl font-bold text-gray-900">الأقسام</h2>
          
          <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === cat 
                    ? "bg-[#0f172a] text-white shadow-md" 
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayedCourses.length > 0 ? (
            displayedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-12">لا توجد دورات في هذا القسم حالياً.</div>
          )}
        </div>

        {/* View All Button */}
        {filteredCourses.length > MAX_DISPLAYED && (
          <div className="text-center">
            <Link href="/courses" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-full font-bold transition shadow-lg shadow-emerald-600/30 group">
              <span>استكشف كافة الدورات</span>
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
