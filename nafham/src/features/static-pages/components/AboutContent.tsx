import { Target, Heart, Award } from 'lucide-react';

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Hero */}
      <div className="bg-[#118B50] text-white py-24 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6">رسالتنا هي تبسيط التعليم</h1>
          <p className="text-xl text-emerald-100 leading-relaxed max-w-2xl mx-auto">
            منصة نفهم ليست مجرد موقع للكورسات، بل هي مجتمع متكامل يهدف إلى الارتقاء بمستوى التعليم التكنولوجي في الوطن العربي عبر محتوى عالي الجودة وتطبيقات عملية تواكب سوق العمل العالمي.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
            <Target className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">رؤيتنا</h3>
          <p className="text-slate-600 leading-relaxed">
            أن نكون المنصة الأولى التي يثق بها الطالب العربي لتطوير مهاراته التقنية والمهنية للحصول على فرص عمل عالمية.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">شغفنا</h3>
          <p className="text-slate-600 leading-relaxed">
            تقديم محتوى يُصنع بحب وعناية، خالي من الحشو، ويركز بشكل مباشر على التطبيق العملي وبناء مشاريع حقيقية.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">جودتنا</h3>
          <p className="text-slate-600 leading-relaxed">
            لا نقبل إلا بأعلى معايير جودة الصوت والصورة والتسلسل المنطقي للمعلومات في كافة كورساتنا.
          </p>
        </div>
      </div>
    </div>
  );
}
