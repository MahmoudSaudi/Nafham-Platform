"use client";

import { useState } from "react";
import { useReports } from "../hooks/useReports";
import ReportsHeader from "./ReportsHeader";
import ReportsStats from "./ReportsStats";
import ReportsCharts from "./ReportsCharts";
import ReportsTable from "./ReportsTable";
import Pagination from "@/components/ui/Pagination";
import { FolderOpen } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ReportsView() {
  const {
    dateRange,
    reportType,
    coursePerformance,
    registrationSources,
    growthData,
    isLoading,
    error
  } = useReports();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Calculate Pagination for coursePerformance
  const totalItems = coursePerformance?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedCourses = coursePerformance?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) || [];

  const handleExportExcel = () => {
    if (!coursePerformance || coursePerformance.length === 0) return;
    
    const wsData = coursePerformance.map((course: any) => ({
      "الدورة": course.title,
      "الطلاب المسجلين": course.students,
      "الإيرادات": course.revenue,
      "التقييم": course.rating
    }));

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "أداء الدورات");
    XLSX.writeFile(wb, "التقارير_المالية.xlsx");
  };

  const handleExportPdf = () => {
    if (!coursePerformance || coursePerformance.length === 0) return;

    const doc = new jsPDF();
    
    // Fallback font since default jsPDF doesn't support Arabic fully out of the box,
    // but we can try to render it. Real Arabic needs a custom font embedded.
    // For now, we will add the data to the PDF table.
    doc.text("Course Performance Report", 14, 15);

    const tableColumn = ["Course", "Students", "Revenue", "Rating"];
    const tableRows: any[] = [];

    coursePerformance.forEach((course: any) => {
      const rowData = [
        course.title,
        course.students,
        `$${course.revenue}`,
        `${course.rating}/5`
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("reports.pdf");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <ReportsHeader 
        dateRange={dateRange} 
        reportType={reportType} 
        onExportExcel={handleExportExcel}
        onExportPdf={handleExportPdf}
      />
      
      {error && (!coursePerformance || coursePerformance.length === 0) ? (
        // If error happens but no data is available
        <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
            <FolderOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">حدث خطأ أثناء جلب التقارير</h3>
          <p className="text-slate-500 max-w-sm">يرجى المحاولة مرة أخرى لاحقاً.</p>
        </div>
      ) : !coursePerformance || coursePerformance.length === 0 ? (
        // Empty State
        <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4">
            <FolderOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">لا توجد تقارير متاحة</h3>
          <p className="text-slate-500 max-w-sm">لم يتم العثور على أي بيانات للفترة المحددة.</p>
        </div>
      ) : (
        <>
          <ReportsStats />
          
          <ReportsCharts 
            registrationSources={registrationSources} 
            growthData={growthData} 
          />
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col min-w-0">
            <ReportsTable coursePerformance={paginatedCourses} />
            
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              itemName="دورة"
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}

    </div>
  );
}
