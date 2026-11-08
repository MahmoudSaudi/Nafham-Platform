"use client";

import { useMemo, useState } from "react";
import { useFinancials } from "../hooks/useFinancials";
import StatCards from "./StatCards";
import FinancialsHeader from "./FinancialsHeader";
import FinancialsTable from "./FinancialsTable";
import PendingTransactionsTable from "./PendingTransactionsTable";
import RefundModal from "./modals/RefundModal";
import InvoiceModal from "./modals/InvoiceModal";
import Pagination from "@/components/ui/Pagination";
import { Transaction } from "../types";

export default function FinancialsView() {
  const {
    stats,
    transactions,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    isLoading,
    handleRefund,
    handleApprove,
    handleReject,
    isRefunding
  } = useFinancials();

  const [activeTab, setActiveTab] = useState<"ALL" | "PENDING">("ALL");
  const [viewingInvoice, setViewingInvoice] = useState<Transaction | undefined>();
  const [refundingTx, setRefundingTx] = useState<Transaction | undefined>();

  // Basic Filtering
  const filteredTransactions = useMemo(() => {
    let filtered = transactions.filter(tx => {
      const matchesSearch = tx.studentName.includes(searchQuery) || tx.studentEmail.includes(searchQuery);
      const matchesStatus = statusFilter === "تصفية حسب الحالة" || tx.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    if (activeTab === "PENDING") {
      filtered = filtered.filter(tx => tx.status === "معلق" || tx.status === "PENDING");
    }

    return filtered;
  }, [transactions, searchQuery, statusFilter, activeTab]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const onConfirmRefund = () => {
    if (refundingTx) {
      handleRefund(refundingTx.id);
      setRefundingTx(undefined);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <StatCards stats={stats} />

      <FinancialsHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className="flex gap-4 border-b border-gray-200 mb-6 pb-2">
        <button 
          onClick={() => setActiveTab("ALL")}
          className={`font-bold pb-2 transition-colors border-b-2 ${activeTab === "ALL" ? "text-slate-900 border-slate-900" : "text-slate-400 border-transparent hover:text-slate-600"}`}
        >
          كافة المعاملات المالية
        </button>
        <button 
          onClick={() => setActiveTab("PENDING")}
          className={`font-bold pb-2 transition-colors border-b-2 flex items-center gap-2 ${activeTab === "PENDING" ? "text-slate-900 border-slate-900" : "text-slate-400 border-transparent hover:text-slate-600"}`}
        >
          طلبات الدفع المعلقة
          <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full">
            {transactions.filter(tx => tx.status === "معلق" || tx.status === "PENDING").length}
          </span>
        </button>
      </div>

      {activeTab === "ALL" ? (
        <FinancialsTable 
          transactions={filteredTransactions} 
          onViewInvoice={(tx) => setViewingInvoice(tx)}
          onRefund={(tx) => setRefundingTx(tx)}
        />
      ) : (
        <PendingTransactionsTable 
          transactions={filteredTransactions} 
          onApprove={(tx) => handleApprove(tx.id)}
          onReject={(tx) => handleReject(tx.id)}
        />
      )}

      {filteredTransactions.length > 0 && (
        <Pagination 
          currentPage={1}
          totalPages={Math.ceil(filteredTransactions.length / 10) || 1}
          totalItems={filteredTransactions.length}
          itemsPerPage={10}
          itemName="معاملة"
        />
      )}

      {/* Modals */}
      <InvoiceModal 
        isOpen={!!viewingInvoice} 
        onClose={() => setViewingInvoice(undefined)} 
        transaction={viewingInvoice}
      />
      
      <RefundModal 
        isOpen={!!refundingTx} 
        onClose={() => setRefundingTx(undefined)} 
        transaction={refundingTx}
        onConfirm={onConfirmRefund}
        isRefunding={isRefunding}
      />

    </div>
  );
}
