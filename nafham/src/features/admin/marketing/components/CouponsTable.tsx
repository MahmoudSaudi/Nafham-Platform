"use client";

import { Edit, Ban, Tag, Users, Clock } from "lucide-react";
import { Coupon } from "../types";
import ActionDropdown from "@/components/ui/ActionDropdown";

interface Props {
  coupons: Coupon[];
  onEdit?: (coupon: Coupon) => void;
  onDelete?: (coupon: Coupon) => void;
}

export default function CouponsTable({ coupons, onEdit, onDelete }: Props) {

  const getStatusColor = (status: string) => {
    switch (status) {
      case "فعال": return "text-emerald-700 bg-emerald-50 border-emerald-100";
      case "منتهي": return "text-amber-700 bg-amber-50 border-amber-100";
      case "معطل": return "text-red-700 bg-red-50 border-red-100";
      default: return "text-gray-700 bg-gray-50 border-gray-100";
    }
  };

  if (coupons.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Tag className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-extrabold text-slate-900 mb-2">لا يوجد كوبونات</h3>
        <p className="text-sm font-medium text-slate-500">
          لم يتم العثور على أي كود خصم يطابق بحثك.
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
              <th className="px-6 py-4 rounded-tr-2xl">رمز الكوبون</th>
              <th className="px-6 py-4">الخصم</th>
              <th className="px-6 py-4">المنتج المرتبط</th>
              <th className="px-6 py-4">الاستخدام</th>
              <th className="px-6 py-4">تاريخ الانتهاء</th>
              <th className="px-6 py-4">الحالة</th>
              <th className="px-6 py-4 rounded-tl-2xl w-16">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="hover:bg-gray-50/50 transition-colors group">
                
                <td className="px-6 py-4">
                  <div className="font-bold text-pink-600 bg-pink-50 border border-pink-100 px-3 py-1.5 rounded-lg inline-block tracking-wider" dir="ltr">
                    {coupon.code}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="font-extrabold text-slate-900 text-base" dir="ltr">
                    {coupon.discountValue}{coupon.discountType === "نسبة مئوية" ? "%" : "$"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="font-bold text-slate-700">{coupon.linkedProduct}</div>
                  <div className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    coupon.productType === "دورة" ? "bg-blue-50 text-blue-600" :
                    coupon.productType === "مسار" ? "bg-purple-50 text-purple-600" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {coupon.productType}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="font-bold" dir="ltr">
                      {coupon.usageCount} {coupon.usageLimit ? `/ ${coupon.usageLimit}` : ""}
                    </span>
                  </div>
                  {coupon.usageLimit && (
                    <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${Math.min(100, (coupon.usageCount / coupon.usageLimit) * 100)}%` }}
                      ></div>
                    </div>
                  )}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="font-medium">{new Date(coupon.expiryDate).toLocaleDateString("ar-EG")}</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(coupon.status)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${coupon.status === "فعال" ? "bg-emerald-500" : coupon.status === "منتهي" ? "bg-amber-500" : "bg-red-500"}`}></span>
                    {coupon.status}
                  </span>
                </td>

                <td className="px-6 py-4 relative">
                  <div className="opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                    <ActionDropdown 
                      actions={[
                        {
                          label: "تعديل الكوبون",
                          icon: <Edit className="w-4 h-4 text-blue-500" />,
                          onClick: () => onEdit?.(coupon)
                        },
                        { divider: true, label: "" },
                        {
                          label: "حذف الكوبون",
                          icon: <Ban className="w-4 h-4" />,
                          variant: "danger",
                          onClick: () => onDelete?.(coupon)
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
