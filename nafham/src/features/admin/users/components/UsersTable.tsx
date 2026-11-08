import { Edit, Trash2 } from "lucide-react";
import { AdminUser } from "../types";

interface Props {
  users: AdminUser[];
  onEdit?: (user: AdminUser) => void;
  onDelete?: (user: AdminUser) => void;
  onViewProfile?: (user: AdminUser) => void;
}

export default function UsersTable({ users, onEdit, onDelete, onViewProfile }: Props) {
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "مدير":
        return <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-xs font-bold">مدير</span>;
      case "مدرب":
        return <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-xs font-bold">مدرب</span>;
      case "طالب":
      default:
        return <span className="px-3 py-1 bg-gray-100 text-slate-600 border border-gray-200 rounded-full text-xs font-bold">طالب</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    const isActice = status === "نشط";
    return (
      <div className="flex items-center gap-2">
        <span className="font-bold text-slate-700 text-sm">{status}</span>
        <span className={`w-2 h-2 rounded-full ${isActice ? "bg-emerald-500" : "bg-red-500"}`}></span>
      </div>
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm text-right">
        <thead className="bg-gray-50 text-slate-400 font-bold border-b border-gray-100">
          <tr>
            <th scope="col" className="px-6 py-4 w-12 text-center">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer" />
            </th>
            <th scope="col" className="px-6 py-4">المستخدم</th>
            <th scope="col" className="px-6 py-4">الدور</th>
            <th scope="col" className="px-6 py-4">الحالة</th>
            <th scope="col" className="px-6 py-4">تاريخ الانضمام</th>
            <th scope="col" className="px-6 py-4">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors group">
              <td className="px-6 py-4 text-center">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer" />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${user.avatarColor}`}>
                    {user.initials}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{user.name}</div>
                    <div className="text-xs text-slate-400 font-medium">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                {getRoleBadge(user.role)}
              </td>
              <td className="px-6 py-4">
                {getStatusBadge(user.status)}
              </td>
              <td className="px-6 py-4 text-slate-500 font-medium whitespace-nowrap">
                {user.joinDate}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => onViewProfile?.(user)}
                    className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="عرض الملف الموحد"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  <button 
                    onClick={() => onEdit?.(user)}
                    className="p-1.5 text-blue-500 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onDelete?.(user)}
                    className="p-1.5 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
