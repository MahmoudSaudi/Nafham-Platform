import Link from 'next/link';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center" dir="rtl">
      <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6">
        <Compass className="w-12 h-12" />
      </div>
      <h1 className="text-6xl font-black text-slate-800 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-600 mb-6">يبدو أنك ضللت الطريق!</h2>
      <p className="text-slate-500 mb-10 max-w-md mx-auto">
        الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى رابط آخر. لا تقلق، يمكنك العودة للصفحة الرئيسية واستكمال التعلم.
      </p>
      <div className="flex items-center justify-center gap-4 w-full">
        <Link href="/" className="bg-[#118B50] hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold transition-colors">
          العودة للرئيسية
        </Link>
        <Link href="/paths" className="bg-white hover:bg-slate-100 text-slate-700 px-8 py-3 rounded-xl font-bold transition-colors border border-slate-200">
          تصفح المسارات
        </Link>
      </div>
    </div>
  );
}
