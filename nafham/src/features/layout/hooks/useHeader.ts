import { useState } from "react";

export const useHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return {
    isSidebarOpen,
    setIsSidebarOpen,
    isMobileSearchOpen,
    setIsMobileSearchOpen,
  };
};
