"use client";

import { useMemo } from "react";
import { useSupport } from "../hooks/useSupport";
import SupportHeader from "./SupportHeader";
import SupportTable from "./SupportTable";
import ReplyTicketModal from "./modals/ReplyTicketModal";
import Pagination from "@/components/ui/Pagination";
import { useState } from "react";
import { Ticket } from "../types";
import LiveChatView from "./LiveChatView";
import { MessageSquare, Ticket as TicketIcon } from "lucide-react";

export default function SupportView() {
  const {
    tickets,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    isLoading,
    handleReply,
    isReplying
  } = useSupport();

  const [activeTab, setActiveTab] = useState<"tickets" | "chat">("chat");
  const [replyingTicket, setReplyingTicket] = useState<Ticket | undefined>();

  // Basic Filtering
  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch = ticket.studentName.includes(searchQuery) || ticket.id.includes(searchQuery) || ticket.subject.includes(searchQuery);
      const matchesStatus = statusFilter === "تصفية حسب الحالة" || ticket.status === statusFilter;
      const matchesPriority = priorityFilter === "تصفية حسب الأولوية" || ticket.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, searchQuery, statusFilter, priorityFilter]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const onConfirmReply = (content: string) => {
    if (replyingTicket) {
      handleReply(replyingTicket.id, content, "admin-1"); // Example admin id
      setReplyingTicket(undefined);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2 overflow-x-auto">
        <button 
          onClick={() => setActiveTab("chat")}
          className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-bold transition-colors ${activeTab === "chat" ? "bg-emerald-50 text-emerald-700 border-b-2 border-emerald-600" : "text-slate-500 hover:bg-slate-50"}`}
        >
          <MessageSquare className="w-5 h-5" />
          المحادثات المباشرة
        </button>
        <button 
          onClick={() => setActiveTab("tickets")}
          className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-bold transition-colors ${activeTab === "tickets" ? "bg-emerald-50 text-emerald-700 border-b-2 border-emerald-600" : "text-slate-500 hover:bg-slate-50"}`}
        >
          <TicketIcon className="w-5 h-5" />
          نظام التذاكر
        </button>
      </div>

      {activeTab === "tickets" ? (
        <>
          <SupportHeader 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
          />

          <SupportTable 
            tickets={filteredTickets} 
            onReply={(ticket) => setReplyingTicket(ticket)}
          />

          {filteredTickets.length > 0 && (
            <Pagination 
              currentPage={1}
              totalPages={Math.ceil(filteredTickets.length / 10) || 1}
              totalItems={filteredTickets.length}
              itemsPerPage={10}
              itemName="تذكرة"
            />
          )}

          {/* Modals */}
          <ReplyTicketModal 
            isOpen={!!replyingTicket} 
            onClose={() => setReplyingTicket(undefined)} 
            ticket={replyingTicket}
            onConfirm={onConfirmReply}
            isReplying={isReplying}
          />
        </>
      ) : (
        <LiveChatView />
      )}

    </div>
  );
}
