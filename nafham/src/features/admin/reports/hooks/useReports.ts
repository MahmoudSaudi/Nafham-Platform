import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { reportsApi } from "../api/reportsApi";
import { ReportCoursePerformance, RegistrationSource, GrowthData } from "../types";

export function useReports() {
  const [dateRange, setDateRange] = useState("من 01 يناير 2024 - إلى 30 يونيو 2024");
  const [reportType, setReportType] = useState("كل التقارير");

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-reports'],
    queryFn: reportsApi.getReports
  });

  return {
    dateRange,
    setDateRange,
    reportType,
    setReportType,
    coursePerformance: data?.coursePerformance || [],
    registrationSources: data?.registrationSources || [],
    growthData: data?.growthData || [],
    isLoading,
    error
  };
}
