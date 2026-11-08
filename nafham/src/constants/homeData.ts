import { Users, BookOpen, Clock, PlayCircle } from "lucide-react";

export const STATS_DATA = [
  {
    id: 1,
    icon: Users,
    value: 572068,
    label: "متعلم نشط",
    isLive: true,
    liveIncrement: 1,
    liveIntervalMs: 4000,
  },
  {
    id: 2,
    icon: BookOpen,
    value: 400,
    prefix: "+",
    label: "دورة تدريبية",
    isLive: false,
  },
  {
    id: 3,
    icon: Clock,
    value: 15000,
    label: "ساعة تدريبية",
    isLive: true,
    liveIncrement: 2,
    liveIntervalMs: 6000,
  },
  {
    id: 4,
    icon: PlayCircle,
    value: 900000,
    label: "دقيقة مشاهدة",
    isLive: true,
    liveIncrement: 15,
    liveIntervalMs: 3000,
  },
];

export const PARTNERS_DATA = [
  { name: "Google", color: "text-[#4285F4]" },
  { name: "Microsoft", color: "text-[#00A4EF]" },
  { name: "Amazon", color: "text-[#FF9900]" },
  { name: "IBM", color: "text-[#0530AD]" },
  { name: "Meta", color: "text-[#0668E1]" },
  { name: "Apple", color: "text-[#555555]" },
  { name: "Cisco", color: "text-[#1BA0D7]" },
  { name: "Oracle", color: "text-[#F80000]" },
  { name: "Intel", color: "text-[#0071C5]" },
  { name: "Nvidia", color: "text-[#76B900]" },
  { name: "Samsung", color: "text-[#1428A0]" },
  { name: "Adobe", color: "text-[#FF0000]" },
];
