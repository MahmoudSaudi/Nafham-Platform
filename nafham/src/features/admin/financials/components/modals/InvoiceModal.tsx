"use client";

import Modal from "@/components/ui/Modal";
import { Download, Printer } from "lucide-react";
import { Transaction } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction;
}

export default function InvoiceModal({ isOpen, onClose, transaction }: Props) {
  if (!transaction) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`عرض الفاتورة #${transaction.invoiceId}`}>
      
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-2">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 pb-6 border-b border-gray-200">
          <div>
            <div className="text-2xl font-extrabold text-emerald-600 mb-1">NAFHAM</div>
            <div className="text-xs font-bold text-slate-500">منصة نفهم التعليمية</div>
          </div>
          <div className="text-left">
            <div className="text-xl font-extrabold text-slate-900 mb-1">فاتورة الدفع</div>
            <div className="text-sm font-medium text-slate-500" dir="ltr">{transaction.invoiceId}</div>
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <div className="text-xs font-bold text-slate-400 mb-1">بيانات العميل</div>
            <div className="font-bold text-slate-900">{transaction.studentName}</div>
            <div className="text-sm text-slate-600" dir="ltr">{transaction.studentEmail}</div>
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-slate-400 mb-1">تاريخ الفاتورة</div>
            <div className="font-bold text-slate-900">{new Date(transaction.date).toLocaleDateString("ar-EG")}</div>
            <div className="text-sm text-slate-600">وسيلة الدفع: <span dir="ltr">{transaction.paymentMethod}</span></div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
          <table className="w-full text-sm text-right">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 font-bold text-slate-600">المنتج ({transaction.productType})</th>
                <th className="px-4 py-3 font-bold text-slate-600 w-24 text-left">المبلغ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <tr>
                <td className="px-4 py-4 font-bold text-slate-900">{transaction.productName}</td>
                <td className="px-4 py-4 font-extrabold text-slate-900 text-left" dir="ltr">${transaction.amount.toLocaleString("en-US")}</td>
              </tr>
            </tbody>
            <tfoot className="bg-gray-50 border-t border-gray-100">
              <tr>
                <td className="px-4 py-3 font-bold text-slate-700">الإجمالي الدفوع</td>
                <td className="px-4 py-3 font-extrabold text-emerald-600 text-left text-lg" dir="ltr">${transaction.amount.toLocaleString("en-US")}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Footer */}
        <div className="text-center text-xs font-medium text-slate-400">
          شكراً لثقتكم في منصة نفهم التعليمية
        </div>
      </div>

      <div className="pt-4 flex gap-3">
        <button type="button" className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors">
          <Download className="w-4 h-4" />
          <span>تحميل PDF</span>
        </button>
        <button type="button" className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
          <Printer className="w-4 h-4" />
          <span>طباعة الفاتورة</span>
        </button>
      </div>

    </Modal>
  );
}
