"use client";

import Link from "next/link";
import { useTopBanner } from "@/features/layout/hooks/useTopBanner";

export default function TopBanner() {
  const ads = [
    {
      text: "خصم 50% على جميع المسارات التعليمية لفترة محدودة جداً!",
      buttonText: "سجل الآن",
      link: "/auth/register",
      bgClass: "bg-[#1f2937]", // Dark slate
    },
    {
      text: "مسار الذكاء الاصطناعي التفاعلي متاح الآن! اكتشف المستقبل.",
      buttonText: "اكتشف المسار",
      link: "/paths",
      bgClass: "bg-emerald-900", // Dark emerald
    },
    {
      text: "انضم إلى أكثر من 500 ألف متعلم على مستوى الوطن العربي!",
      buttonText: "ابدأ مجاناً",
      link: "/auth/register",
      bgClass: "bg-indigo-900", // Dark indigo
    }
  ];

  const { currentIndex } = useTopBanner(ads.length, 4000);

  return (
    <div className="relative overflow-hidden w-full h-[48px] bg-[#1f2937]">
      {ads.map((ad, index) => (
        <div 
          key={index}
          className={`absolute inset-0 w-full h-full flex justify-between items-center px-4 transition-all duration-700 ease-in-out ${ad.bgClass} ${
            index === currentIndex 
              ? "opacity-100 translate-y-0 z-10" 
              : "opacity-0 -translate-y-4 z-0 pointer-events-none"
          }`}
        >
          <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-12 flex justify-center items-center text-white text-base relative h-full">
            
            {/* Center Text */}
            <div className="text-center font-bold truncate px-4 max-w-[70%]">
              {ad.text}
            </div>
            
            {/* Left Button (Absolutely positioned so it never pushes the text) */}
            <div className="absolute left-4 lg:left-12 top-1/2 -translate-y-1/2">
              <Link href={ad.link} className="bg-red-600 hover:bg-red-700 text-white px-6 py-1.5 rounded-full text-sm font-bold transition whitespace-nowrap shadow-sm">
                {ad.buttonText}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
