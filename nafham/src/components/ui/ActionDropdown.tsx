"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

interface ActionItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "danger" | "warning";
  divider?: boolean;
}

interface ActionDropdownProps {
  actions: ActionItem[];
}

export default function ActionDropdown({ actions }: ActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-right" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`p-2 rounded-lg transition-colors focus:outline-none ${
          isOpen ? "bg-emerald-50 text-emerald-600" : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
        }`}
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute left-full -translate-x-12 top-full mt-1 w-48 bg-white border border-gray-100 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {actions.map((action, index) => {
            if (action.divider) {
              return <div key={index} className="h-px bg-gray-100 my-1 mx-2" />;
            }

            const isDanger = action.variant === "danger";
            const isWarning = action.variant === "warning";

            return (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  action.onClick?.();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-bold rounded-lg transition-colors ${
                  isDanger
                    ? "text-red-600 hover:bg-red-50"
                    : isWarning
                    ? "text-amber-600 hover:bg-amber-50"
                    : "text-slate-700 hover:bg-gray-50"
                }`}
              >
                {action.icon}
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
