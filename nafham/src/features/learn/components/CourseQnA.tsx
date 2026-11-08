import { useState } from 'react';
import { User, MessageCircle, ThumbsUp, Reply } from 'lucide-react';

const DUMMY_QUESTIONS = [
  {
    id: 1,
    user: "أحمد محمود",
    avatar: "A",
    question: "كيف يمكنني تشغيل المشروع بعد تثبيت الحزم؟ يظهر لي خطأ في التيرمينال.",
    repliesCount: 2,
    likes: 5,
    time: "منذ ساعتين",
    isInstructorReply: true
  },
  {
    id: 2,
    user: "سارة مجدي",
    avatar: "S",
    question: "هل يمكن استخدام MongoDB بدلاً من PostgreSQL في هذا المشروع؟",
    repliesCount: 0,
    likes: 1,
    time: "منذ يوم"
  }
];

export default function CourseQnA({ lessonId }: { lessonId: string }) {
  const [newQuestion, setNewQuestion] = useState("");

  return (
    <div className="flex flex-col gap-6">
      {/* Add new question */}
      <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
        <h3 className="font-bold text-slate-800">إضافة سؤال جديد</h3>
        <textarea 
          placeholder="اكتب سؤالك هنا بوضوح وسيقوم المدرب أو الطلاب بالإجابة عليك..."
          className="w-full border border-slate-300 rounded-lg p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent resize-none text-sm"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        ></textarea>
        <div className="flex justify-end">
          <button className="bg-[#118B50] hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-bold text-sm transition-colors">
            نشر السؤال
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-slate-800 text-lg">أسئلة الطلاب ({DUMMY_QUESTIONS.length})</h3>
        {DUMMY_QUESTIONS.map((q) => (
          <div key={q.id} className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                {q.avatar}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-800 text-sm">{q.user}</span>
                <span className="text-xs text-slate-500">{q.time}</span>
              </div>
            </div>
            
            <p className="text-slate-700 text-sm leading-relaxed">
              {q.question}
            </p>

            <div className="flex items-center gap-6 mt-2 pt-4 border-t border-slate-100">
              <button className="flex items-center gap-2 text-slate-500 hover:text-[#118B50] text-sm transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span>{q.likes} إعجاب</span>
              </button>
              <button className="flex items-center gap-2 text-slate-500 hover:text-[#118B50] text-sm transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>{q.repliesCount} ردود</span>
              </button>
              <button className="flex items-center gap-2 text-slate-500 hover:text-[#118B50] text-sm transition-colors mr-auto font-medium">
                <Reply className="w-4 h-4" />
                <span>أضف رد</span>
              </button>
            </div>
            
            {q.isInstructorReply && (
              <div className="mt-2 bg-emerald-50 rounded-lg p-4 border border-emerald-100 flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#118B50] flex items-center justify-center font-bold text-white text-xs flex-shrink-0">
                  م
                </div>
                <div>
                  <div className="font-bold text-[#118B50] text-xs mb-1">المدرب</div>
                  <p className="text-slate-700 text-xs leading-relaxed">تأكد من حذف مجلد node_modules ثم قم بتشغيل npm install مرة أخرى.</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
