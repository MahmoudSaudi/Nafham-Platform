"use client";

import Image from "next/image";
import { MessageSquare, Reply as ReplyIcon, Trash2, Clock, BookOpen } from "lucide-react";
import { Discussion } from "../types";

interface Props {
  discussions: Discussion[];
  onReply?: (disc: Discussion) => void;
  onDelete?: (disc: Discussion) => void;
}

export default function DiscussionsList({ discussions, onReply, onDelete }: Props) {
  if (discussions.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-extrabold text-slate-900 mb-2">لا توجد نقاشات</h3>
        <p className="text-sm font-medium text-slate-500">
          لم يتم العثور على أي أسئلة أو نقاشات تطابق بحثك.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {discussions.map((discussion) => (
        <div key={discussion.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col transition-shadow hover:shadow-md">
          
          {/* Question Header */}
          <div className="p-5 border-b border-gray-50 bg-gray-50/30 flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0 border border-gray-200 shadow-sm">
                <Image src={discussion.studentAvatar} alt={discussion.studentName} fill className="object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-900">{discussion.studentName}</h3>
                  <span className="text-xs font-bold text-slate-500 bg-gray-100 px-2 py-0.5 rounded-full">طالب</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span className="text-sky-700 font-bold">{discussion.courseName}</span>
                    <span className="text-gray-300 mx-0.5">•</span>
                    <span>{discussion.lessonName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span dir="ltr">{new Date(discussion.date).toLocaleDateString("ar-EG")} {new Date(discussion.date).toLocaleTimeString("ar-EG", { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={() => onDelete?.(discussion)}
                className="text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">حذف</span>
              </button>
            </div>
          </div>

          {/* Question Content */}
          <div className="p-6">
            <p className="text-slate-700 leading-relaxed font-medium">
              {discussion.content}
            </p>
          </div>

          {/* Replies Section */}
          {discussion.replies.length > 0 && (
            <div className="bg-gray-50/50 p-6 border-t border-gray-50 space-y-4">
              {discussion.replies.map(reply => (
                <div key={reply.id} className="flex items-start gap-4 pr-4 border-r-2 border-emerald-200">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0 border border-gray-200 shadow-sm">
                    <Image src={reply.avatar} alt={reply.authorName} fill className="object-cover" />
                  </div>
                  <div className="flex-1 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900">{reply.authorName}</h4>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          reply.authorRole === "مدرب" ? "bg-emerald-100 text-emerald-700" :
                          reply.authorRole === "مسؤول" ? "bg-blue-100 text-blue-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {reply.authorRole}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 font-medium" dir="ltr">
                        {new Date(reply.date).toLocaleDateString("ar-EG")}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {reply.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reply Action */}
          <div className="p-4 border-t border-gray-50 bg-white">
            <button 
              onClick={() => onReply?.(discussion)}
              className="flex items-center justify-center gap-2 w-full sm:w-auto bg-sky-50 hover:bg-sky-100 text-sky-700 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors"
            >
              <ReplyIcon className="w-4 h-4" />
              <span>إضافة رد</span>
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}
