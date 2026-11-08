import { useState, useEffect, useRef } from "react";

interface UseLiveCounterProps {
  end: number;
  duration?: number;
  isLive?: boolean;
  liveIncrement?: number;
  liveIntervalMs?: number;
}

export const useLiveCounter = ({
  end,
  duration = 2000,
  isLive = false,
  liveIncrement = 1,
  liveIntervalMs = 3000,
}: UseLiveCounterProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Intersection Observer to start animation when component scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  // Initial Count-up Animation
  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function (easeOutExpo) for a professional slowing-down effect
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

      setCount(Math.floor(end * easeOut));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end); // Ensure we end exactly on the target number
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasAnimated, end, duration]);

  // Live Continuous Counter Logic
  useEffect(() => {
    if (!hasAnimated || !isLive) return;

    let interval: NodeJS.Timeout;

    // Start live updates only AFTER the initial animation has finished
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCount((prev) => Math.max(prev, end) + liveIncrement);
      }, liveIntervalMs);
    }, duration);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [hasAnimated, isLive, liveIncrement, liveIntervalMs, duration, end]);

  return { count, ref };
};
