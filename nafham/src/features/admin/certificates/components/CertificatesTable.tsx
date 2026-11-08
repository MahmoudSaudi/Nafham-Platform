"use client";

import { Eye, Download, ShieldAlert, CheckCircle2, Ban } from "lucide-react";
import { Certificate } from "../types";
import ActionDropdown from "@/components/ui/ActionDropdown";

interface Props {
  certificates: Certificate[];
  onRevoke?: (cert: Certificate) => void;
}

export default function CertificatesTable({ certificates, onRevoke }: Props) {

  if (certificates.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-extrabold text-slate-900 mb-2">لا توجد شهادات</h3>
        <p className="text-sm font-medium text-slate-500">
          لم يتم العثور على أي شهادة تطابق معايير البحث.
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
              <th className="px-6 py-4 rounded-tr-2xl">رقم الشهادة</th>
              <th className="px-6 py-4">الطالب</th>
              <th className="px-6 py-4">المنتج المرتبط</th>
              <th className="px-6 py-4">التقدير</th>
              <th className="px-6 py-4">تاريخ الإصدار</th>
              <th className="px-6 py-4">الحالة</th>
              <th className="px-6 py-4 rounded-tl-2xl w-16">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {certificates.map((cert) => (
              <tr key={cert.id} className="hover:bg-gray-50/50 transition-colors group">
                
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-700 font-mono text-xs bg-gray-100 px-2 py-1 rounded inline-block" dir="ltr">
                    {cert.id}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900">{cert.studentName}</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5" dir="ltr">{cert.studentEmail}</div>
                </td>

                <td className="px-6 py-4">
                  <div className="font-bold text-emerald-700">{cert.productName}</div>
                  <div className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    cert.productType === "دورة" ? "bg-blue-50 text-blue-600" :
                    "bg-purple-50 text-purple-600"
                  }`}>
                    {cert.productType}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="font-bold text-slate-700">{cert.grade}</span>
                </td>

                <td className="px-6 py-4">
                  <div className="text-slate-600 font-medium">
                    {new Date(cert.issueDate).toLocaleDateString("ar-EG")}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                    cert.status === "نشطة" 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                      : "bg-red-50 text-red-700 border-red-100"
                  }`}>
                    {cert.status === "نشطة" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />}
                    {cert.status}
                  </span>
                </td>

                <td className="px-6 py-4 relative">
                  <div className="opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                    <ActionDropdown 
                      actions={[
                        {
                          label: "معاينة الشهادة",
                          icon: <Eye className="w-4 h-4 text-emerald-500" />
                        },
                        {
                          label: "تحميل (PDF)",
                          icon: <Download className="w-4 h-4 text-blue-500" />
                        },
                        { divider: true, label: "" },
                        {
                          label: "إلغاء الشهادة",
                          icon: <Ban className="w-4 h-4" />,
                          variant: "danger",
                          onClick: () => onRevoke?.(cert)
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
