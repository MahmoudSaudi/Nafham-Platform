import { Star } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
      {/* Background decorations removed to fix visual skew illusion */}
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-8">
          <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
          <span>المنصة الأولى للتعليم التفاعلي في الوطن العربي</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight max-w-4xl mx-auto">
          انضم الآن لمئات الآلاف من <br className="hidden md:block" />
          <span className="text-emerald-600 relative inline-block mt-2">
            المبدعين العرب
            <svg className="absolute w-full h-4 -bottom-1 left-0 text-emerald-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          اكتشف أكثر من 400 دورة تدريبية متخصصة في البرمجة، التصميم، والذكاء الاصطناعي مقدمة من أفضل الخبراء في المجال لتطوير مستقبلك المهني.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/auth/register" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg transition shadow-lg shadow-emerald-600/30">
            ابدأ الآن مجاناً
          </Link>
          <Link href="/paths" className="w-full sm:w-auto bg-[#0f172a] hover:bg-gray-800 text-white px-8 py-4 rounded-full font-bold text-lg transition shadow-lg shadow-gray-900/20">
            تصفح الكورسات
          </Link>
        </div>
      </div>
    </section>
  );
}
