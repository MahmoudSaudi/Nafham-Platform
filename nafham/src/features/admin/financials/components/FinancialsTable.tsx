"use client";

import { FileText, ArrowLeftRight, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Transaction } from "../types";
import ActionDropdown from "@/components/ui/ActionDropdown";

interface Props {
  transactions: Transaction[];
  onViewInvoice?: (tx: Transaction) => void;
  onRefund?: (tx: Transaction) => void;
}

export default function FinancialsTable({ transactions, onViewInvoice, onRefund }: Props) {

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "مدفوع": return <CheckCircle2 className="w-3.5 h-3.5" />;
      case "معلق": return <Clock className="w-3.5 h-3.5" />;
      case "ملغى": return <XCircle className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مدفوع": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "معلق": return "bg-amber-50 text-amber-700 border-amber-100";
      case "ملغى": return "bg-red-50 text-red-700 border-red-100";
      default: return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  const getPaymentMethodBadge = (method: string) => {
    // Base classes for consistent layout: center aligned, fixed min-width for uniformity
    const baseClasses = "inline-block w-28 text-center py-1.5 rounded-lg font-bold text-xs font-mono tracking-wide";
    
    switch (method) {
      case "Visa":
        return <div className={`${baseClasses} bg-[#1434CB]/10 text-[#1434CB] border border-[#1434CB]/20`}>Visa</div>;
      case "MasterCard":
        return <div className={`${baseClasses} bg-[#EB001B]/10 text-[#EB001B] border border-[#EB001B]/20`}>MasterCard</div>;
      case "PayPal":
        return <div className={`${baseClasses} bg-[#00457C]/10 text-[#00457C] border border-[#00457C]/20`}>PayPal</div>;
      case "Vodafone Cash":
        return <div className={`${baseClasses} bg-[#E60000]/10 text-[#E60000] border border-[#E60000]/20`}>VF Cash</div>;
      case "Fawry":
        return <div className={`${baseClasses} bg-[#FDB913]/10 text-[#FDB913] border border-[#FDB913]/30`}>Fawry</div>;
      default:
        return <div className={`${baseClasses} bg-gray-100 text-gray-700 border border-gray-200`}>{method}</div>;
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
        <h3 className="text-lg font-extrabold text-slate-900 mb-2">لا توجد معاملات</h3>
        <p className="text-sm font-medium text-slate-500">
          لم يتم العثور على أي بيانات مالية تطابق بحثك.
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
              <th className="px-6 py-4 rounded-tr-2xl">رقم الفاتورة</th>
              <th className="px-6 py-4">الطالب</th>
              <th className="px-6 py-4">المنتج (دورة/مسار)</th>
              <th className="px-6 py-4">المبلغ</th>
              <th className="px-6 py-4 text-center">وسيلة الدفع</th>
              <th className="px-6 py-4">التاريخ</th>
              <th className="px-6 py-4">الحالة</th>
              <th className="px-6 py-4 rounded-tl-2xl w-16">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors group">
                
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-700 font-mono text-xs bg-gray-100 px-2 py-1 rounded inline-block" dir="ltr">
                    {tx.invoiceId}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900">{tx.studentName}</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5" dir="ltr">{tx.studentEmail}</div>
                </td>

                <td className="px-6 py-4">
                  <div className="font-bold text-slate-700">{tx.productName}</div>
                  <div className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    tx.productType === "دورة" ? "bg-blue-50 text-blue-600" :
                    tx.productType === "مسار" ? "bg-purple-50 text-purple-600" :
                    "bg-amber-50 text-amber-600"
                  }`}>
                    {tx.productType}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="font-extrabold text-emerald-600 text-base" dir="ltr">
                    ${tx.amount.toLocaleString("en-US")}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    {getPaymentMethodBadge(tx.paymentMethod)}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="text-slate-600 font-medium">
                    {new Date(tx.date).toLocaleDateString("ar-EG")}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {new Date(tx.date).toLocaleTimeString("ar-EG", { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${getStatusColor(tx.status)}`}>
                    {getStatusIcon(tx.status)}
                    {tx.status}
                  </span>
                </td>

                <td className="px-6 py-4 relative">
                  <div className="opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                    <ActionDropdown 
                      actions={[
                        {
                          label: "عرض الفاتورة",
                          icon: <FileText className="w-4 h-4 text-blue-500" />,
                          onClick: () => onViewInvoice?.(tx)
                        },
                        {
                          label: "استرداد المبلغ (Refund)",
                          icon: <ArrowLeftRight className="w-4 h-4 text-amber-500" />,
                          onClick: () => onRefund?.(tx)
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
