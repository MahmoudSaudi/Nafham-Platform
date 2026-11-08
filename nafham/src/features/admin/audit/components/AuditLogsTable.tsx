"use client";

import { Clock, User as UserIcon } from "lucide-react";

interface Props {
  logs: any[];
}

export default function AuditLogsTable({ logs }: Props) {
  const getActionBadge = (action: string) => {
    const baseClasses = "inline-block px-3 py-1 rounded border text-xs font-bold font-mono tracking-wide";
    if (action.includes("APPROVE")) return <span className={`${baseClasses} bg-emerald-50 text-emerald-700 border-emerald-200`}>{action}</span>;
    if (action.includes("REJECT") || action.includes("DELETE")) return <span className={`${baseClasses} bg-red-50 text-red-700 border-red-200`}>{action}</span>;
    if (action.includes("UPDATE") || action.includes("EDIT")) return <span className={`${baseClasses} bg-blue-50 text-blue-700 border-blue-200`}>{action}</span>;
    return <span className={`${baseClasses} bg-gray-50 text-gray-700 border-gray-200`}>{action}</span>;
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm text-right">
        <thead className="bg-gray-50/50 text-slate-400 font-bold border-b border-gray-100">
          <tr>
            <th scope="col" className="px-6 py-4 rounded-tr-2xl">المعرف</th>
            <th scope="col" className="px-6 py-4">المستخدم (المسؤول)</th>
            <th scope="col" className="px-6 py-4">الإجراء</th>
            <th scope="col" className="px-6 py-4">الكيان المرتبط</th>
            <th scope="col" className="px-6 py-4">التفاصيل</th>
            <th scope="col" className="px-6 py-4 rounded-tl-2xl">التاريخ والوقت</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-bold text-slate-700 font-mono text-xs bg-gray-100 px-2 py-1 rounded inline-block" dir="ltr">
                  {log.id.split('-')[0]}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <UserIcon className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{log.user?.name || "مستخدم مجهول"}</div>
                    <div className="text-xs text-slate-400 font-medium mt-0.5" dir="ltr">{log.user?.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                {getActionBadge(log.action)}
              </td>
              <td className="px-6 py-4">
                <div className="font-bold text-slate-700">{log.entity}</div>
                {log.entityId && (
                  <div className="text-[10px] text-slate-400 font-mono mt-1" dir="ltr">ID: {log.entityId.split('-')[0]}</div>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="text-slate-600 max-w-xs truncate" title={log.details || ""}>
                  {log.details || "—"}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span dir="ltr">{new Date(log.createdAt).toLocaleString("en-GB", { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
