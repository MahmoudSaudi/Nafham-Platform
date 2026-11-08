import { useState } from "react";
import { LearningTrack } from "../types";

export function useTracks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("تصفية حسب الفئة");
  const [statusFilter, setStatusFilter] = useState("تصفية حسب الحالة");

  const tracks: LearningTrack[] = [
    {
      id: "1",
      title: "أساسيات التصميم الجرافيكي والهوية البصرية",
      description: "مسار شامل يبدأ من المبادئ الأساسية وصولاً إلى بناء هوية تجارية كاملة واحترافية.",
      category: "تصميم",
      status: "مسودة",
      coursesCount: 8,
      studentsCount: 0,
      revenue: "$0",
      colorHex: "from-purple-500 to-indigo-600",
    },
    {
      id: "2",
      title: "مسار تطوير تطبيقات الويب المتكامل (MERN)",
      description: "تعلم بناء تطبيقات ويب احترافية باستخدام React و Node.js وقواعد بيانات MongoDB.",
      category: "برمجة",
      status: "منشور",
      coursesCount: 12,
      studentsCount: 2450,
      revenue: "$152,000",
      colorHex: "from-emerald-400 to-teal-600",
    },
    {
      id: "3",
      title: "إدارة المشاريع والقيادة الاستراتيجية",
      description: "منهجيات PMP و Agile لإدارة المشاريع بفعالية وقيادة الفرق الناجحة.",
      category: "أعمال",
      status: "منشور",
      coursesCount: 10,
      studentsCount: 940,
      revenue: "$48,500",
      colorHex: "from-blue-500 to-cyan-600",
    },
    {
      id: "4",
      title: "احتراف التسويق الرقمي والمبيعات",
      description: "فهم قنوات التسويق الحديثة وكيفية تحويل العملاء المحتملين إلى مبيعات مؤكدة.",
      category: "تسويق",
      status: "منشور",
      coursesCount: 15,
      studentsCount: 1890,
      revenue: "$86,400",
      colorHex: "from-orange-400 to-rose-500",
    },
  ];

  return {
    tracks,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
  };
}
