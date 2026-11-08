import { useQuery } from "@tanstack/react-query";
import { getDashboardOverview } from "@/services/dashboard/dashboardApi";

export function useDashboardOverview() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardOverview"],
    queryFn: getDashboardOverview
  });

  return {
    stats: data?.stats || [],
    recentRegistrations: data?.recentRegistrations || [],
    activityData: data?.activityData || [0, 0, 0, 0, 0, 0, 0],
    pathsData: data?.pathsData || [],
    isLoading,
    error
  };
}
