"use client";

import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
  onApprove?: (tx: Transaction) => void;
  onReject?: (tx: Transaction) => void;
}

export default function PendingTransactionsTable({ transactions, onApprove, onReject }: Props) {
  const getPaymentMethodBadge = (method: string) => {
    const baseClasses = "inline-block w-28 text-center py-1.5 rounded-lg font-bold text-xs font-mono tracking-wide";
    switch (method) {
      case "InstaPay":
      case "إنستا باي":
        return <div className={`${baseClasses} bg-purple-50 text-purple-700 border border-purple-200`}>InstaPay</div>;
      case "Vodafone Cash":
      case "محفظة إلكترونية":
        return <div className={`${baseClasses} bg-[#E60000]/10 text-[#E60000] border border-[#E60000]/20`}>VF Cash</div>;
      case "Fawry":
      case "فوري":
        return <div className={`${baseClasses} bg-[#FDB913]/10 text-[#FDB913] border border-[#FDB913]/30`}>Fawry</div>;
      default:
        return <div className={`${baseClasses} bg-gray-100 text-gray-700 border border-gray-200`}>{method}</div>;
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
        <h3 className="text-lg font-extrabold text-slate-900 mb-2">لا توجد مدفوعات معلقة</h3>
        <p className="text-sm font-medium text-slate-500">
          لم يتم العثور على أي معاملات بانتظار المراجعة.
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
              <th className="px-6 py-4 rounded-tr-2xl">رقم الطلب</th>
              <th className="px-6 py-4">الطالب</th>
              <th className="px-6 py-4">الكورس / المنتج</th>
              <th className="px-6 py-4">المبلغ</th>
              <th className="px-6 py-4 text-center">وسيلة الدفع</th>
              <th className="px-6 py-4">معرف الدفع (الرقم/العنوان)</th>
              <th className="px-6 py-4 rounded-tl-2xl text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors group">
                
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-700 font-mono text-xs bg-gray-100 px-2 py-1 rounded inline-block" dir="ltr">
                    {tx.invoiceId}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(tx.date).toLocaleDateString("ar-EG")}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900">{tx.studentName}</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5" dir="ltr">{tx.studentEmail}</div>
                </td>

                <td className="px-6 py-4">
                  <div className="font-bold text-slate-700">{tx.productName}</div>
                </td>

                <td className="px-6 py-4">
                  <span className="font-extrabold text-slate-800 text-base" dir="ltr">
                    {tx.amount.toLocaleString("en-US")} ج.م
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    {getPaymentMethodBadge(tx.paymentMethod)}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="bg-slate-100 text-slate-700 text-xs font-mono font-bold px-3 py-1.5 rounded border border-slate-200 dir-ltr inline-block">
                    {/* Fallback to invoice id if metadata not available for display */}
                    {tx.invoiceId}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">المعرف المسجل</div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => onApprove?.(tx)}
                      className="flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      موافقة
                    </button>
                    <button 
                      onClick={() => onReject?.(tx)}
                      className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      رفض
                    </button>
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
