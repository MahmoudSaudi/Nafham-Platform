"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, Filter, FileText, Printer, FileSpreadsheet, ChevronDown, Download } from "lucide-react";

interface Props {
  dateRange: string;
  reportType: string;
  onExportPdf?: () => void;
  onExportExcel?: () => void;
}

export default function ReportsHeader({ dateRange, reportType, onExportPdf, onExportExcel }: Props) {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsExportOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
      
      {/* Right side: Filters */}
      <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto flex-1">
        
        {/* Date Filter */}
        <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
          <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            defaultValue={dateRange}
            readOnly
            className="w-full sm:w-64 bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl pr-10 pl-4 py-2.5 outline-none cursor-pointer hover:bg-gray-50 transition-colors"
          />
        </div>

        {/* Report Type Filter */}
        <div className="relative w-full sm:w-auto">
          <select 
            defaultValue={reportType}
            className="w-full sm:w-40 appearance-none bg-white border border-gray-200 text-sm font-medium text-slate-600 rounded-xl pr-4 pl-10 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 hover:bg-gray-50 cursor-pointer"
          >
            <option>كل التقارير</option>
            <option>المالية</option>
            <option>المستخدمين</option>
            <option>الدورات</option>
          </select>
          <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Compare Toggle */}
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-gray-200 text-slate-600 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
          مقارنة بالفترة السابقة
        </button>

        {/* Apply Button */}
        <button className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm">
          تطبيق الفلاتر
        </button>

      </div>

      {/* Left side: Export Dropdown */}
      <div className="relative w-full xl:w-auto shrink-0" ref={dropdownRef}>
        <button 
          onClick={() => setIsExportOpen(!isExportOpen)}
          className="w-full xl:w-auto flex items-center justify-between xl:justify-center gap-3 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>تصدير التقرير</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExportOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {isExportOpen && (
          <div className="absolute left-0 top-full mt-2 w-full xl:w-48 bg-white border border-gray-100 rounded-xl shadow-lg p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <button 
              onClick={() => {
                onExportPdf?.();
                setIsExportOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>تصدير بصيغة PDF</span>
            </button>
            <button 
              onClick={() => {
                onExportExcel?.();
                setIsExportOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-slate-400" />
              <span>تصدير كجدول Excel</span>
            </button>
            <div className="h-px bg-gray-100 my-1 mx-2"></div>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Printer className="w-4 h-4 text-slate-400" />
              <span>طباعة التقرير</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
