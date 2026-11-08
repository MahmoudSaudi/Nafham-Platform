import { useState, useEffect } from "react";

export const useTopBanner = (adsLength: number, intervalMs: number = 4000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % adsLength);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [adsLength, intervalMs]);

  return { currentIndex };
};
