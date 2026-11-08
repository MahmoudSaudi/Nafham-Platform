"use client";

import { useState, useMemo } from "react";
import { useMarketing } from "../hooks/useMarketing";
import CouponsHeader from "./CouponsHeader";
import CouponsTable from "./CouponsTable";
import CouponModal from "./modals/CouponModal";
import DeleteCouponModal from "./modals/DeleteCouponModal";
import CampaignsTable from "./CampaignsTable";
import CampaignModal from "./modals/CampaignModal";
import DeleteCampaignModal from "./modals/DeleteCampaignModal";
import Pagination from "@/components/ui/Pagination";
import { Coupon, Campaign } from "../types";
import { Ticket, Send } from "lucide-react";

export default function MarketingView() {
  const {
    coupons,
    campaigns,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    isLoading,
    handleCreateCoupon,
    handleCreateCampaign,
    handleDeleteCoupon,
    handleDeleteCampaign
  } = useMarketing();

  const [activeTab, setActiveTab] = useState<"coupons" | "campaigns">("coupons");

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [deletingCoupon, setDeletingCoupon] = useState<Coupon | undefined>();

  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [deletingCampaign, setDeletingCampaign] = useState<Campaign | undefined>();

  // Basic Filtering
  const filteredCoupons = useMemo(() => {
    return coupons.filter(coupon => {
      const matchesSearch = coupon.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "تصفية حسب الحالة" || coupon.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [coupons, searchQuery, statusFilter]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const onConfirmDeleteCoupon = () => {
    if (deletingCoupon) {
      handleDeleteCoupon(deletingCoupon.id);
      setDeletingCoupon(undefined);
    }
  };

  const onConfirmDeleteCampaign = () => {
    if (deletingCampaign) {
      handleDeleteCampaign(deletingCampaign.id);
      setDeletingCampaign(undefined);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      
      {/* Tabs Header */}
      <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab("coupons")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === "coupons" ? "bg-purple-50 text-purple-600" : "text-slate-500 hover:bg-gray-50"}`}
          >
            <Ticket className="w-5 h-5" />
            الكوبونات
          </button>
          <button 
            onClick={() => setActiveTab("campaigns")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === "campaigns" ? "bg-purple-50 text-purple-600" : "text-slate-500 hover:bg-gray-50"}`}
          >
            <Send className="w-5 h-5" />
            الحملات الترويجية
          </button>
        </div>
        <div>
          {activeTab === "coupons" ? (
             <button onClick={() => { setEditingCoupon(null); setIsCouponModalOpen(true); }} className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl transition-all shadow-sm flex items-center gap-2">
               <Ticket className="w-4 h-4" />
               إضافة كوبون
             </button>
          ) : (
             <button onClick={() => { setEditingCampaign(null); setIsCampaignModalOpen(true); }} className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl transition-all shadow-sm flex items-center gap-2">
               <Send className="w-4 h-4" />
               إطلاق حملة
             </button>
          )}
        </div>
      </div>

      {activeTab === "coupons" ? (
        <>
          <CouponsHeader 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            onCreateCoupon={() => {
              setEditingCoupon(null);
              setIsCouponModalOpen(true);
            }}
          />

          <CouponsTable 
            coupons={filteredCoupons} 
            onEdit={(coupon) => {
              setEditingCoupon(coupon);
              setIsCouponModalOpen(true);
            }}
            onDelete={(coupon) => setDeletingCoupon(coupon)}
          />

          {filteredCoupons.length > 0 && (
            <Pagination 
              currentPage={1}
              totalPages={Math.ceil(filteredCoupons.length / 10) || 1}
              totalItems={filteredCoupons.length}
              itemsPerPage={10}
              itemName="كوبون"
            />
          )}
        </>
      ) : (
        <>
          <CampaignsTable 
            campaigns={campaigns} 
            onEdit={(campaign) => {
              setEditingCampaign(campaign);
              setIsCampaignModalOpen(true);
            }}
            onDelete={(campaign) => setDeletingCampaign(campaign)}
          />

          {campaigns.length > 0 && (
            <Pagination 
              currentPage={1}
              totalPages={Math.ceil(campaigns.length / 10) || 1}
              totalItems={campaigns.length}
              itemsPerPage={10}
              itemName="حملة"
            />
          )}
        </>
      )}

      {/* Modals */}
      <CouponModal 
        isOpen={isCouponModalOpen} 
        onClose={() => setIsCouponModalOpen(false)} 
        coupon={editingCoupon}
        onCreate={handleCreateCoupon}
      />
      
      <DeleteCouponModal 
        isOpen={!!deletingCoupon} 
        onClose={() => setDeletingCoupon(undefined)} 
        coupon={deletingCoupon}
        onConfirm={onConfirmDeleteCoupon}
      />

      <CampaignModal 
        isOpen={isCampaignModalOpen} 
        onClose={() => setIsCampaignModalOpen(false)} 
        campaign={editingCampaign}
        onCreate={handleCreateCampaign}
      />
      
      <DeleteCampaignModal 
        isOpen={!!deletingCampaign} 
        onClose={() => setDeletingCampaign(undefined)} 
        campaign={deletingCampaign}
        onConfirm={onConfirmDeleteCampaign}
      />

    </div>
  );
}
