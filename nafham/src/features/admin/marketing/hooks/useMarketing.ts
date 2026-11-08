import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCoupons, createCoupon, deleteCoupon, getCampaigns, createCampaign, deleteCampaign } from "@/services/marketing/marketingApi";
import { Coupon } from "../types";
import toast from "react-hot-toast";

export function useMarketing() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("تصفية حسب الحالة");

  const { data: couponsData = [], isLoading: isLoadingCoupons } = useQuery({
    queryKey: ["coupons"],
    queryFn: getCoupons
  });

  const { data: campaignsData = [], isLoading: isLoadingCampaigns } = useQuery({
    queryKey: ["campaigns"],
    queryFn: getCampaigns
  });

  const createCouponMutation = useMutation({
    mutationFn: createCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      toast.success("تم إنشاء الكوبون بنجاح");
    },
    onError: (error: any) => {
      toast.error(error.message || "حدث خطأ أثناء الإنشاء");
    }
  });

  const deleteCouponMutation = useMutation({
    mutationFn: deleteCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      toast.success("تم حذف الكوبون بنجاح");
    },
    onError: (error: any) => {
      toast.error(error.message || "حدث خطأ أثناء الحذف");
    }
  });

  const createCampaignMutation = useMutation({
    mutationFn: createCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      toast.success("تم إنشاء الحملة بنجاح");
    },
    onError: (error: any) => {
      toast.error(error.message || "حدث خطأ أثناء الإنشاء");
    }
  });

  const deleteCampaignMutation = useMutation({
    mutationFn: deleteCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      toast.success("تم حذف الحملة بنجاح");
    },
    onError: (error: any) => {
      toast.error(error.message || "حدث خطأ أثناء الحذف");
    }
  });

  const handleDeleteCoupon = (id: string) => {
    deleteCouponMutation.mutate(id);
  };

  const handleDeleteCampaign = (id: string) => {
    deleteCampaignMutation.mutate(id);
  };

  const mapDiscountType = (type: string) => {
    if (type === 'PERCENTAGE') return 'نسبة مئوية';
    if (type === 'FIXED_AMOUNT') return 'مبلغ ثابت';
    return type;
  };

  const mapStatus = (status: string) => {
    if (status === 'ACTIVE') return 'فعال';
    if (status === 'INACTIVE') return 'معطل';
    if (status === 'EXPIRED') return 'منتهي';
    return status;
  };

  const coupons: Coupon[] = couponsData.map((c: any) => ({
    id: c.id,
    code: c.code,
    discountType: mapDiscountType(c.discountType),
    discountValue: c.discountValue,
    linkedProduct: c.courseId ? "كورس مخصص" : "الكل",
    productType: c.courseId ? "دورة" : "الكل",
    expiryDate: c.validUntil,
    usageCount: c.usedCount,
    usageLimit: c.usageLimit,
    status: mapStatus(c.status),
  }));

  return {
    coupons,
    campaigns: campaignsData,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    isLoading: isLoadingCoupons || isLoadingCampaigns,
    handleCreateCoupon: (data: any) => createCouponMutation.mutateAsync(data),
    handleCreateCampaign: (data: any) => createCampaignMutation.mutateAsync(data),
    handleDeleteCoupon,
    handleDeleteCampaign
  };
}
