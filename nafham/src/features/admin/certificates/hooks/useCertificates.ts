import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCertificates, revokeCertificate } from "@/services/certificates/certificatesApi";
import { Certificate } from "../types";
import toast from "react-hot-toast";

export function useCertificates() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("تصفية حسب الكورس");

  const { data = [], isLoading } = useQuery({
    queryKey: ["certificates"],
    queryFn: getCertificates,
  });

  const revokeMutation = useMutation({
    mutationFn: revokeCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
      toast.success("تم إلغاء الشهادة بنجاح");
    },
    onError: (error: any) => {
      toast.error(error.message || "حدث خطأ أثناء إلغاء الشهادة");
    }
  });

  const handleRevoke = (id: string) => {
    revokeMutation.mutate(id);
  };

  const certificates: Certificate[] = data.map((cert: any) => ({
    id: cert.id,
    studentName: cert.user?.name || "طالب محذوف",
    studentEmail: cert.user?.email || "",
    productName: cert.course?.title || "كورس غير معروف",
    productType: "دورة",
    issueDate: cert.issueDate,
    grade: "مكتمل", // Can be dynamic if we track grades
    status: cert.status === 'ISSUED' ? "نشطة" : "ملغاة",
    certificateUrl: cert.certificateUrl || "#",
  }));

  return {
    certificates,
    searchQuery,
    setSearchQuery,
    courseFilter,
    setCourseFilter,
    isLoading,
    handleRevoke,
    isRevoking: revokeMutation.isPending
  };
}
