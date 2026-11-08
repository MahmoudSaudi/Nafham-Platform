import { Award, Download } from 'lucide-react';
import Image from 'next/image';

export default function CertificatePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 flex flex-col items-center gap-8" dir="rtl">
      
      {/* Action Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 text-[#118B50] font-bold">
          <Award className="w-5 h-5" />
          <span>شهادة إتمام دورة</span>
        </div>
        <button className="flex items-center gap-2 bg-[#118B50] hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-bold transition-colors">
          <Download className="w-4 h-4" />
          <span>تحميل PDF</span>
        </button>
      </div>

      {/* Certificate Frame */}
      <div className="w-full max-w-4xl bg-white p-2 md:p-4 rounded-lg shadow-2xl relative aspect-[1.4/1]">
        {/* Certificate Inner Border */}
        <div className="w-full h-full border-[10px] md:border-[20px] border-[#118B50] p-2 md:p-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
          <div className="w-full h-full border-2 border-emerald-800 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
            
            {/* Watermark Logo */}
            <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
              <div className="w-96 h-96 rounded-full border-[20px] border-[#118B50]"></div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-[#118B50] mb-2 tracking-wider font-serif">شهادة إنجاز</h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-12 font-medium">Certificate of Completion</p>

            <p className="text-lg md:text-xl text-slate-700 mb-4">تشهد منصة نفهم التعليمية بأن</p>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 border-b-2 border-slate-300 pb-2 px-12">
              خالد محمد أحمد
            </h2>

            <p className="text-lg md:text-xl text-slate-700 mb-4">قد أتم بنجاح كافة متطلبات الدورة التدريبية</p>
            <h3 className="text-2xl md:text-3xl font-bold text-[#118B50] mb-12">
              تطوير الويب الشامل باستخدام React و Next.js
            </h3>

            <div className="w-full flex justify-between items-end mt-auto pt-8 px-12">
              <div className="flex flex-col items-center gap-2">
                <span className="text-slate-500 font-bold">التاريخ</span>
                <span className="font-medium text-slate-800 border-t border-slate-300 pt-1">14 يونيو 2026</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-600">
                  <Award className="w-8 h-8" />
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <span className="text-slate-500 font-bold">توقيع المدرب</span>
                <span className="font-medium text-slate-800 border-t border-slate-300 pt-1 signature-font italic">Mohamed El Mufty</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>

    </div>
  );
}
