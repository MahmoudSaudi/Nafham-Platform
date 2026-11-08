import { apiClient } from "@/services/apiClient";
import { ReportCoursePerformance, RegistrationSource, GrowthData } from "../types";

export interface ReportsData {
  coursePerformance: ReportCoursePerformance[];
  growthData: GrowthData[];
  registrationSources: RegistrationSource[];
}

export const reportsApi = {
  getReports: async (): Promise<ReportsData> => {
    const { data } = await apiClient.get("/admins/reports");
    return data.data;
  },
};
