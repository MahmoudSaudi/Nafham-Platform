"use client";

import { CheckCircle, XCircle, MoreVertical, MessageSquare } from 'lucide-react';

import { useDiscussions } from "../hooks/useDiscussions";

export default function DiscussionsView() {
  const { discussions, isLoading, handleDelete, handleReply, isReplying } = useDiscussions();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة المناقشات والتعليقات</h1>
          <p className="text-slate-500 mt-1">راجع ووافق على تعليقات ومناقشات الطلاب في المنصة.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-2 shadow-sm">
          <span className="text-slate-500 text-sm font-medium">إجمالي النقاشات</span>
          <span className="text-3xl font-black text-amber-500">{discussions.length}</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h2 className="font-bold text-slate-800">التعليقات المعلقة ({discussions.length})</h2>
        </div>
        
        <div className="divide-y divide-slate-100">
          {discussions.map((item) => (
            <div key={item.id} className="p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 text-sm">{item.studentName}</span>
                    <span className="text-slate-400 text-xs">• {new Date(item.date).toLocaleDateString("ar-EG")}</span>
                  </div>
                  <div className="text-xs font-medium text-[#118B50] mb-1">دورة: {item.courseName}</div>
                  <p className="text-slate-600 text-sm line-clamp-2">{item.content}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-auto">
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-red-200 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition-colors" title="حذف">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {discussions.length === 0 && (
            <div className="p-8 text-center text-gray-500">لا توجد نقاشات حالياً.</div>
          )}
        </div>
      </div>
    </div>
  );
}
