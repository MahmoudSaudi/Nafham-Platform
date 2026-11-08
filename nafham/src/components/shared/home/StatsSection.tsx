"use client";

import { Users, BookOpen, Clock, PlayCircle } from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

import { STATS_DATA } from "@/constants/homeData";

export default function StatsSection() {

  return (
    <section className="py-16 bg-white relative z-10 -mt-10 mx-4 lg:mx-auto max-w-7xl px-4 lg:px-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-x-reverse divide-gray-100">
        {STATS_DATA.map((stat) => (
          <div key={stat.id} className="flex flex-col items-center justify-center text-center px-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-4 transition-transform duration-500 hover:scale-110">
              <stat.icon className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] mb-2 font-sans" dir="ltr">
              <AnimatedCounter
                end={stat.value}
                isLive={stat.isLive}
                liveIncrement={stat.liveIncrement}
                liveIntervalMs={stat.liveIntervalMs}
                prefix={stat.prefix}
              />
            </h3>
            <p className="text-gray-500 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
