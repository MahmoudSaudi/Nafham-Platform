"use client";

import Image from "next/image";
import { ShieldAlert, ShieldCheck, Mail, Calendar, Edit, Lock, Ban, Trash2 } from "lucide-react";
import { AdminUser } from "../types";
import ActionDropdown from "@/components/ui/ActionDropdown";

interface Props {
  admins: AdminUser[];
  onEdit?: (admin: AdminUser) => void;
  onDelete?: (admin: AdminUser) => void;
}

export default function AdminsTable({ admins, onEdit, onDelete }: Props) {
  if (admins.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-extrabold text-slate-900 mb-2">لا يوجد مسؤولين</h3>
        <p className="text-sm font-medium text-slate-500">
          لم يتم العثور على أي مسؤول أو عضو في فريق العمل يطابق بحثك.
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
              <th className="px-6 py-4 rounded-tr-2xl">المسؤول</th>
              <th className="px-6 py-4">معلومات الاتصال</th>
              <th className="px-6 py-4">الدور</th>
              <th className="px-6 py-4">الحالة</th>
              <th className="px-6 py-4">تاريخ الانضمام</th>
              <th className="px-6 py-4 rounded-tl-2xl w-16">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-gray-50/50 transition-colors group">
                
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                      <Image src={admin.avatar} alt={admin.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{admin.name}</div>
                      <div className="text-xs text-slate-400 font-medium mt-0.5">آخر ظهور: {admin.lastActive}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-medium" dir="ltr">{admin.email}</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs border border-blue-100">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{admin.role}</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                    admin.status === "نشط" 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                      : "bg-red-50 text-red-700 border-red-100"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${admin.status === "نشط" ? "bg-emerald-500" : "bg-red-500"}`}></span>
                    {admin.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="font-medium">{new Date(admin.joinDate).toLocaleDateString("ar-EG")}</span>
                  </div>
                </td>

                <td className="px-6 py-4 relative">
                  <div className="opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                    <ActionDropdown 
                      actions={[
                        {
                          label: "تعديل الصلاحيات",
                          icon: <Edit className="w-4 h-4 text-blue-500" />,
                          onClick: () => onEdit?.(admin)
                        },
                        {
                          label: "إعادة تعيين كلمة المرور",
                          icon: <Lock className="w-4 h-4 text-amber-500" />
                        },
                        { divider: true, label: "" },
                        {
                          label: "تقييد الحساب",
                          icon: <Ban className="w-4 h-4" />,
                          variant: "warning"
                        },
                        {
                          label: "إزالة المسؤول",
                          icon: <Trash2 className="w-4 h-4" />,
                          variant: "danger",
                          onClick: () => onDelete?.(admin)
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
