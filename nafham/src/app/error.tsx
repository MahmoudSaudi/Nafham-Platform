"use client";

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center" dir="rtl">
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-6">
        <AlertTriangle className="w-12 h-12" />
      </div>
      <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">عذراً، حدث خطأ غير متوقع!</h1>
      <p className="text-slate-500 mb-10 max-w-md mx-auto leading-relaxed">
        نأسف على هذا الخلل. لقد قمنا بتسجيل الخطأ وجاري العمل على حله من قبل فريق التطوير الخاص بنا. يرجى المحاولة مرة أخرى.
      </p>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto justify-center">
        <button
          onClick={() => reset()}
          className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold transition-colors"
        >
          حاول مرة أخرى
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="w-full md:w-auto bg-white hover:bg-slate-100 text-slate-700 px-8 py-3 rounded-xl font-bold transition-colors border border-slate-200"
        >
          العودة للرئيسية
        </button>
      </div>
    </div>
  );
}
