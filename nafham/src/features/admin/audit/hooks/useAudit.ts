import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAuditLogs, AuditFilters } from "@/services/audit/auditApi";
import { useDebounce } from "@/hooks/useDebounce";

export function useAudit() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [entityFilter, setEntityFilter] = useState("");
  const itemsPerPage = 20;

  const debouncedSearch = useDebounce(search, 400);

  const filters: AuditFilters = {
    page: currentPage,
    limit: itemsPerPage,
    search: debouncedSearch || undefined,
    action: actionFilter || undefined,
    entity: entityFilter || undefined,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["auditLogs", filters],
    queryFn: () => getAuditLogs(filters),
  });

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handleActionFilter = useCallback((value: string) => {
    setActionFilter(value);
    setCurrentPage(1);
  }, []);

  const handleEntityFilter = useCallback((value: string) => {
    setEntityFilter(value);
    setCurrentPage(1);
  }, []);

  return {
    logs: data?.data || [],
    pagination: data?.pagination || { total: 0, page: 1, limit: itemsPerPage, totalPages: 1 },
    currentPage,
    setCurrentPage,
    search,
    handleSearchChange,
    actionFilter,
    handleActionFilter,
    entityFilter,
    handleEntityFilter,
    isLoading,
    error,
  };
}
