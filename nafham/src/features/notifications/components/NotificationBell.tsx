"use client";

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/apiClient";
import { toast } from "sonner";
import NotificationDropdown from "./NotificationDropdown";

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res: any = await apiClient.get("/notifications");
      return res; // apiClient already unpacks response.data.data
    },
    refetchInterval: 60000,
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (notificationId?: string) => {
      const payload = notificationId ? { notificationId } : {};
      await apiClient.put("/notifications/mark-read", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      toast.error("حدث خطأ، يرجى المحاولة مرة أخرى");
    }
  });

  const unreadCount = data?.data?.unreadCount || 0;
  const notifications = data?.data?.notifications || [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllAsRead = () => {
    markAsReadMutation.mutate(undefined);
    setIsOpen(false);
    toast.success("تم تحديد الكل كمقروء");
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.isRead) {
      markAsReadMutation.mutate(notification.id);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors focus:outline-none"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">
            {unreadCount > 99 ? "+99" : unreadCount}
          </span>
        )}
      </button>

      <NotificationDropdown 
        isOpen={isOpen}
        isLoading={isLoading}
        notifications={notifications}
        unreadCount={unreadCount}
        isPending={markAsReadMutation.isPending}
        onMarkAllAsRead={handleMarkAllAsRead}
        onNotificationClick={handleNotificationClick}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
