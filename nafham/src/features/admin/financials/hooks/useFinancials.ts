import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFinancialStats, getTransactions, refundTransaction, approveTransaction, rejectTransaction } from "@/services/financials/financialsApi";
import { Transaction, FinancialStats } from "../types";
import toast from "react-hot-toast";

export function useFinancials() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("تصفية حسب الحالة");

  const { data: statsData, isLoading: isLoadingStats } = useQuery({
    queryKey: ["financialStats"],
    queryFn: getFinancialStats
  });

  const { data: transactionsData = [], isLoading: isLoadingTx } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions
  });

  const refundMutation = useMutation({
    mutationFn: refundTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["financialStats"] });
      toast.success("تم استرداد الأموال بنجاح");
    },
    onError: (error: any) => {
      toast.error(error.message || "حدث خطأ أثناء الاسترداد");
    }
  });

  const approveMutation = useMutation({
    mutationFn: approveTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("تمت الموافقة على الدفع وتفعيل الكورس بنجاح");
    },
    onError: (error: any) => {
      toast.error(error.message || "حدث خطأ أثناء الموافقة");
    }
  });

  const rejectMutation = useMutation({
    mutationFn: rejectTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("تم رفض الدفع");
    },
    onError: (error: any) => {
      toast.error(error.message || "حدث خطأ أثناء الرفض");
    }
  });

  const handleRefund = (id: string) => {
    refundMutation.mutate(id);
  };

  const handleApprove = (id: string) => {
    approveMutation.mutate(id);
  };

  const handleReject = (id: string) => {
    rejectMutation.mutate(id);
  };

  const stats: FinancialStats = {
    totalRevenue: `$${statsData?.totalRevenue || 0}`,
    revenueChange: "+12.5%", // Dynamic tracking over time could be added here
    activeSubscriptions: statsData?.activeSubscriptions || 0,
    subscriptionsChange: "+5.2%",
    pendingAmount: `$${statsData?.totalRefunds || 0}`, // Using refunds as pending amount temporarily
    pendingChange: "-2.1%",
  };

  const mapStatus = (status: string) => {
    switch(status) {
      case 'SUCCESS': return 'مدفوع';
      case 'PENDING': return 'معلق';
      case 'REFUNDED': return 'مسترد';
      case 'FAILED': return 'فاشل';
      default: return 'ملغى';
    }
  };

  const transactions: Transaction[] = transactionsData.map((tx: any) => ({
    id: tx.id,
    studentName: tx.user?.name || "طالب محذوف",
    studentEmail: tx.user?.email || "",
    productName: tx.course?.title || "كورس غير معروف",
    productType: "كورس", // Can be dynamic
    amount: tx.amount,
    date: tx.createdAt,
    status: mapStatus(tx.status),
    paymentMethod: tx.paymentMethod || "بطاقة ائتمانية",
    invoiceId: `INV-${tx.id.substring(0, 8)}`,
  }));

  return {
    stats,
    transactions,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    isLoading: isLoadingStats || isLoadingTx,
    handleRefund,
    handleApprove,
    handleReject,
    isRefunding: refundMutation.isPending
  };
}
