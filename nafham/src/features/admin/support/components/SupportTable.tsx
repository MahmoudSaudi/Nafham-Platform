"use client";

import { MessageSquare, CheckCircle, Ban, AlertCircle, HeadphonesIcon } from "lucide-react";
import { Ticket } from "../types";
import ActionDropdown from "@/components/ui/ActionDropdown";

interface Props {
  tickets: Ticket[];
  onReply?: (ticket: Ticket) => void;
}

export default function SupportTable({ tickets, onReply }: Props) {

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "عالية": return "text-red-600 bg-red-50";
      case "متوسطة": return "text-amber-600 bg-amber-50";
      case "منخفضة": return "text-emerald-600 bg-emerald-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مفتوحة": return "text-blue-700 bg-blue-50 border-blue-100";
      case "قيد المعالجة": return "text-amber-700 bg-amber-50 border-amber-100";
      case "مغلقة": return "text-gray-600 bg-gray-100 border-gray-200";
      default: return "text-gray-700 bg-gray-50 border-gray-100";
    }
  };

  if (tickets.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <HeadphonesIcon className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-extrabold text-slate-900 mb-2">لا توجد تذاكر</h3>
        <p className="text-sm font-medium text-slate-500">
          صندوق الوارد نظيف، لا يوجد أي تذاكر دعم فني تطابق بحثك.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-visible">
      <div className="overflow-x-auto overflow-y-visible">
        <table className="w-full text-sm text-right">
          <thead className="bg-gray-50/50 border-b border-gray-100 text-slate-500 font-bold">
            <tr>
              <th className="px-6 py-4 rounded-tr-2xl">رقم التذكرة</th>
              <th className="px-6 py-4">الموضوع / التصنيف</th>
              <th className="px-6 py-4">الطالب</th>
              <th className="px-6 py-4">الأولوية</th>
              <th className="px-6 py-4">الحالة</th>
              <th className="px-6 py-4">آخر تحديث</th>
              <th className="px-6 py-4 rounded-tl-2xl w-16">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50/50 transition-colors group">
                
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-700 font-mono text-xs bg-gray-100 px-2 py-1 rounded inline-block" dir="ltr">
                    {ticket.id}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900 max-w-xs truncate" title={ticket.subject}>
                    {ticket.subject}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    {ticket.category}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="font-bold text-slate-700">{ticket.studentName}</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5" dir="ltr">{ticket.studentEmail}</div>
                </td>

                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority === "عالية" && <AlertCircle className="w-3.5 h-3.5" />}
                    {ticket.priority}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(ticket.status)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${ticket.status === "مفتوحة" ? "bg-blue-500" : ticket.status === "قيد المعالجة" ? "bg-amber-500" : "bg-gray-400"}`}></span>
                    {ticket.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="text-slate-600 font-medium">
                    {new Date(ticket.lastUpdate).toLocaleDateString("ar-EG")}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {new Date(ticket.lastUpdate).toLocaleTimeString("ar-EG", { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </td>

                <td className="px-6 py-4 relative">
                  <div className="opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                    <ActionDropdown 
                      actions={[
                        {
                          label: "عرض والرد",
                          icon: <MessageSquare className="w-4 h-4 text-indigo-500" />,
                          onClick: () => onReply?.(ticket)
                        },
                        { divider: true, label: "" },
                        {
                          label: "تحديد كمكتمل (إغلاق)",
                          icon: <CheckCircle className="w-4 h-4 text-emerald-500" />
                        }
                      ]}
                    />
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
