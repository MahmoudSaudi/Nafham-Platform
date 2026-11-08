import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { instructorsApi } from "../api/instructorsApi";
import { Instructor } from "../types";

export function useInstructors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [trackFilter, setTrackFilter] = useState("تصفية حسب المسار");
  const [contractFilter, setContractFilter] = useState("حالة العقد");

  const { data: instructors = [], isLoading, error } = useQuery({
    queryKey: ['instructors-details'],
    queryFn: instructorsApi.getInstructorsDetails
  });

  return {
    instructors,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    trackFilter,
    setTrackFilter,
    contractFilter,
    setContractFilter,
  };
}
