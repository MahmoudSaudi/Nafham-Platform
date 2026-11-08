"use client";

import { useState } from 'react';
import { BookOpen, Search, PlusCircle, Edit, Trash2 } from 'lucide-react';

const DUMMY_EXAMS: any[] = [];

export default function ExamsView() {
  return (
    <div className="flex flex-col gap-8 w-full" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة الامتحانات والأسئلة</h1>
          <p className="text-slate-500 mt-1">أضف الامتحانات للكورسات وقم بتعيين بنوك الأسئلة.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#118B50] hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-sm">
          <PlusCircle className="w-5 h-5" />
          <span>إضافة امتحان جديد</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
        <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="ابحث عن امتحان أو كورس..." 
            className="bg-transparent border-none focus:outline-none text-slate-700 w-full"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium text-sm">
              <tr>
                <th className="py-4 px-6 rounded-tr-lg">اسم الامتحان</th>
                <th className="py-4 px-6">الكورس المرتبط</th>
                <th className="py-4 px-6 text-center">عدد الأسئلة</th>
                <th className="py-4 px-6 text-center">درجة النجاح</th>
                <th className="py-4 px-6 text-center">الوقت (دقيقة)</th>
                <th className="py-4 px-6 rounded-tl-lg text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DUMMY_EXAMS.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    لا توجد امتحانات مسجلة حالياً
                  </td>
                </tr>
              ) : (
                DUMMY_EXAMS.map((exam) => (
                  <tr key={exam.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-800">{exam.title}</td>
                    <td className="py-4 px-6 text-slate-600">{exam.course}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">{exam.questions} سؤال</span>
                    </td>
                    <td className="py-4 px-6 text-center text-emerald-600 font-bold">{exam.passingScore}%</td>
                    <td className="py-4 px-6 text-center text-slate-600">{exam.timeLimit}</td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button className="text-blue-500 hover:text-blue-700 transition-colors p-2 bg-blue-50 hover:bg-blue-100 rounded-lg">
                          <BookOpen className="w-4 h-4" />
                        </button>
                        <button className="text-amber-500 hover:text-amber-700 transition-colors p-2 bg-amber-50 hover:bg-amber-100 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-500 hover:text-red-700 transition-colors p-2 bg-red-50 hover:bg-red-100 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
