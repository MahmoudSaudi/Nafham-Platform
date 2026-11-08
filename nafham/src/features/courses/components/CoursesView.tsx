"use client";

import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import { getCourses } from "@/services/courses/coursesApi";
import { Search } from "lucide-react";

const categories = ["الكل", "برمجة", "تصميم", "لغات", "إدارة أعمال", "تسويق"];

export default function CoursesView() {
  const [activeTab, setActiveTab] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = activeTab === "الكل" || course.category === activeTab;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 py-16" dir="rtl">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        {/* Header & Search */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h1 className="text-4xl font-extrabold text-[#0f172a] mb-3">استكشف الكورسات</h1>
              <p className="text-slate-500 text-lg">اختر من بين أفضل الكورسات لتبدأ رحلة التعلم الخاصة بك.</p>
            </div>
            
            <div className="relative w-full md:w-96">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="ابحث عن كورس..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
              />
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeTab === cat 
                    ? "bg-[#118B50] text-white shadow-md shadow-[#118B50]/20" 
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
          {loading ? (
            <div className="col-span-full flex justify-center py-20 text-emerald-600">
              <div className="w-12 h-12 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <p className="text-xl font-bold mb-2">لم يتم العثور على أي كورسات</p>
              <p>حاول البحث بكلمات مختلفة أو اختر قسماً آخر.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
