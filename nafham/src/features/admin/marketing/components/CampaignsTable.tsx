"use client";

import { Edit, Ban, Send, Users, Clock, Mail, MessageSquare, Bell } from "lucide-react";
import { Campaign } from "../types";
import ActionDropdown from "@/components/ui/ActionDropdown";

interface Props {
  campaigns: Campaign[];
  onEdit?: (campaign: Campaign) => void;
  onDelete?: (campaign: Campaign) => void;
}

export default function CampaignsTable({ campaigns, onEdit, onDelete }: Props) {

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SENT": return "text-emerald-700 bg-emerald-50 border-emerald-100";
      case "SCHEDULED": return "text-amber-700 bg-amber-50 border-amber-100";
      case "DRAFT": return "text-gray-700 bg-gray-50 border-gray-100";
      default: return "text-gray-700 bg-gray-50 border-gray-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "SENT": return "أُرسلت";
      case "SCHEDULED": return "مجدولة";
      case "DRAFT": return "مسودة";
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "EMAIL": return <Mail className="w-5 h-5 text-blue-500" />;
      case "SMS": return <MessageSquare className="w-5 h-5 text-green-500" />;
      case "IN_APP": return <Bell className="w-5 h-5 text-purple-500" />;
      default: return <Send className="w-5 h-5 text-gray-500" />;
    }
  };

  if (campaigns.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-extrabold text-slate-900 mb-2">لا يوجد حملات ترويجية</h3>
        <p className="text-sm font-medium text-slate-500">
          لم يتم العثور على أي حملات.
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
              <th className="px-6 py-4 rounded-tr-2xl">اسم الحملة</th>
              <th className="px-6 py-4">النوع</th>
              <th className="px-6 py-4">الجمهور</th>
              <th className="px-6 py-4">التاريخ</th>
              <th className="px-6 py-4">الحالة</th>
              <th className="px-6 py-4 rounded-tl-2xl w-16">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50/50 transition-colors group">
                
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800 text-base">
                    {campaign.name}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                      {getTypeIcon(campaign.type)}
                    </div>
                    <span className="font-bold text-slate-700">
                      {campaign.type === "EMAIL" ? "بريد إلكتروني" : 
                       campaign.type === "SMS" ? "رسالة نصية" : "إشعار بالتطبيق"}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="font-bold">
                      {campaign.audience === "ALL" ? "الجميع" : 
                       campaign.audience === "ACTIVE" ? "النشطون" : "غير النشطين"}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="font-medium">
                      {campaign.scheduledFor 
                        ? new Date(campaign.scheduledFor).toLocaleDateString("ar-EG") 
                        : (campaign.sentAt ? new Date(campaign.sentAt).toLocaleDateString("ar-EG") : "غير محدد")}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold ${getStatusColor(campaign.status)}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75"></span>
                    {getStatusText(campaign.status)}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <ActionDropdown
                    actions={[
                      {
                        label: "تعديل",
                        icon: <Edit className="w-4 h-4" />,
                        onClick: () => onEdit?.(campaign),
                      },
                      {
                        label: "حذف",
                        icon: <Ban className="w-4 h-4" />,
                        variant: "danger",
                        onClick: () => onDelete?.(campaign),
                      }
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
