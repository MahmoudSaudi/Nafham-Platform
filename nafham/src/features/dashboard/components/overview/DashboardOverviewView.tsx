"use client";

import { useDashboardOverview } from "../../hooks/useDashboardOverview";
import StatCards from "./StatCards";
import ActivityChart from "./ActivityChart";
import PathsChart from "./PathsChart";
import RegistrationsTable from "./RegistrationsTable";

import { Loader2 } from "lucide-react";

export default function DashboardOverviewView() {
  const { stats, recentRegistrations, activityData, pathsData, isLoading } = useDashboardOverview();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Stat Cards */}
      <StatCards stats={stats} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityChart data={activityData} />
        </div>
        <div className="lg:col-span-1">
          <PathsChart data={pathsData} />
        </div>
      </div>

      {/* Table */}
      <div>
        <RegistrationsTable registrations={recentRegistrations} />
      </div>

    </div>
  );
}
