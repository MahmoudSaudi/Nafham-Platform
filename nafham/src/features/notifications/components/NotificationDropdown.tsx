import { Loader2, CheckCheck } from "lucide-react";
import Link from "next/link";
import NotificationItem from "./NotificationItem";

export default function NotificationDropdown({
  isOpen, 
  isLoading, 
  notifications, 
  unreadCount, 
  isPending, 
  onMarkAllAsRead, 
  onNotificationClick, 
  onClose
}: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-[72px] left-4 right-4 sm:absolute sm:top-auto sm:left-0 sm:right-auto sm:mt-3 sm:w-96 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <h3 className="font-bold text-slate-800 text-lg">الإشعارات</h3>
        {unreadCount > 0 && (
          <button 
            onClick={onMarkAllAsRead}
            disabled={isPending}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCheck className="w-4 h-4" />}
            تحديد الكل كمقروء
          </button>
        )}
      </div>
      
      <div className="max-h-[60vh] overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-400 font-medium">لا توجد إشعارات جديدة</div>
        ) : (
          notifications.map((notification: any) => (
            <NotificationItem 
              key={notification.id} 
              notification={notification} 
              onClick={() => onNotificationClick(notification)} 
            />
          ))
        )}
      </div>

      <div className="p-3 border-t border-gray-100 text-center bg-gray-50/50">
        <Link 
          href="/dashboard/notifications" 
          onClick={onClose}
          className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          عرض كل الإشعارات
        </Link>
      </div>
    </div>
  );
}
