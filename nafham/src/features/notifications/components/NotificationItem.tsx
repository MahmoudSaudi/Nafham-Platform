import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

export default function NotificationItem({ notification, onClick }: { notification: any, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${!notification.isRead ? 'bg-blue-50/30' : ''}`}
    >
      <div className="flex gap-3">
        <div className={`shrink-0 w-2 h-2 mt-2 rounded-full ${!notification.isRead ? 'bg-emerald-500' : 'bg-transparent'}`} />
        <div className="flex-1">
          <h4 className="text-sm font-bold text-slate-800 mb-1">{notification.title}</h4>
          <p className="text-sm text-slate-600 leading-relaxed mb-2 line-clamp-2">{notification.message}</p>
          <span className="text-xs text-slate-400 font-medium" dir="ltr">
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true, locale: ar })}
          </span>
        </div>
      </div>
    </div>
  );
}
