import { useState } from 'react';
import { FileText, Paperclip, MessageSquare } from 'lucide-react';
import CourseQnA from './CourseQnA';

interface LearnTabsProps {
  activeItem: any;
}

export default function LearnTabs({ activeItem }: LearnTabsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'attachments' | 'qna'>('overview');

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: FileText },
    { id: 'attachments', label: 'المرفقات', icon: Paperclip },
    { id: 'qna', label: 'الأسئلة والمناقشات', icon: MessageSquare },
  ] as const;

  return (
    <div className="mt-8 flex flex-col gap-6 w-full max-w-4xl mx-auto mb-12">
      {/* Tabs Header */}
      <div className="flex items-center border-b border-slate-200 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 md:px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                isActive 
                  ? 'border-[#118B50] text-[#118B50]' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tabs Content */}
      <div className="py-2">
        {activeTab === 'overview' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-slate-700 leading-relaxed text-sm">
            <h3 className="font-bold text-lg mb-3 text-slate-800">{activeItem.title}</h3>
            <p>
              في هذا الدرس سنتعرف على المفاهيم الأساسية المرتبطة بهذا الموضوع وكيفية تطبيقها بشكل عملي في المشاريع الحقيقية. 
              تأكد من متابعة الخطوات المذكورة في الفيديو وتطبيقها مباشرة لضمان الفهم الكامل.
            </p>
          </div>
        )}

        {activeTab === 'attachments' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800 text-sm group-hover:text-[#118B50] transition-colors">ملخص الدرس.pdf</span>
                  <span className="text-xs text-slate-500">2.4 MB</span>
                </div>
              </div>
              <button className="text-sm font-bold text-[#118B50]">تحميل</button>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Paperclip className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800 text-sm group-hover:text-[#118B50] transition-colors">الأكواد المصدرية.zip</span>
                  <span className="text-xs text-slate-500">15 MB</span>
                </div>
              </div>
              <button className="text-sm font-bold text-[#118B50]">تحميل</button>
            </div>
          </div>
        )}

        {activeTab === 'qna' && (
          <CourseQnA lessonId={activeItem.id} />
        )}
      </div>
    </div>
  );
}
