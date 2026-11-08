"use client";

import React from "react";
import { useLiveCounter } from "@/hooks/useLiveCounter";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  isLive?: boolean;
  liveIncrement?: number;
  liveIntervalMs?: number;
  prefix?: string;
  suffix?: string;
}

export default function AnimatedCounter({
  end,
  duration = 2000,
  isLive = false,
  liveIncrement = 1,
  liveIntervalMs = 3000,
  prefix = "",
  suffix = "",
}: AnimatedCounterProps) {
  const { count, ref } = useLiveCounter({
    end,
    duration,
    isLive,
    liveIncrement,
    liveIntervalMs,
  });

  return (
    <span ref={ref} className="inline-block whitespace-nowrap">
      {prefix}{count.toLocaleString("en-US")}{suffix}
    </span>
  );
}
