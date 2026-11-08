"use client";

import { useState } from 'react';
import { FileText, PlusCircle, Edit, Trash2, Link as LinkIcon, Eye } from 'lucide-react';

const DUMMY_PAGES: any[] = [];

export default function CmsView() {
  return (
    <div className="flex flex-col gap-8 w-full" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة المحتوى والصفحات (CMS)</h1>
          <p className="text-slate-500 mt-1">تحكم في الصفحات الثابتة والمقالات المنشورة على المنصة.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#118B50] hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-sm">
          <PlusCircle className="w-5 h-5" />
          <span>صفحة جديدة</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium text-sm">
              <tr>
                <th className="py-4 px-6 rounded-tr-lg">العنوان</th>
                <th className="py-4 px-6">الرابط الدائم (Slug)</th>
                <th className="py-4 px-6 text-center">الحالة</th>
                <th className="py-4 px-6 text-center">آخر تحديث</th>
                <th className="py-4 px-6 rounded-tl-lg text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DUMMY_PAGES.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    لا توجد صفحات مسجلة حالياً
                  </td>
                </tr>
              ) : (
                DUMMY_PAGES.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#118B50] flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-slate-800">{page.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-slate-500 font-mono text-sm bg-slate-100 px-3 py-1 rounded-md w-max">
                        <LinkIcon className="w-3 h-3" />
                        {page.slug}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${page.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        {page.status === 'Published' ? 'منشور' : 'مسودة'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center text-slate-500 text-sm">{page.lastUpdated}</td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button className="text-slate-500 hover:text-slate-800 transition-colors p-2 hover:bg-slate-200 rounded-lg">
                          <Eye className="w-4 h-4" />
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
