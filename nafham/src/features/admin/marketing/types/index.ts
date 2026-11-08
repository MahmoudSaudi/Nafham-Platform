export type CouponStatus = "فعال" | "منتهي" | "معطل" | string;
export type DiscountType = "نسبة مئوية" | "مبلغ ثابت" | string;

export interface Coupon {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  linkedProduct: string | "الكل";
  productType: "دورة" | "مسار" | "الكل" | string;
  expiryDate: string;
  usageCount: number;
  usageLimit: number | null;
  status: CouponStatus;
}

export type CampaignStatus = "DRAFT" | "SCHEDULED" | "SENT" | string;
export type CampaignType = "EMAIL" | "SMS" | "IN_APP" | string;
export type CampaignAudience = "ALL" | "ACTIVE" | "INACTIVE" | string;

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  audience: CampaignAudience;
  content?: string;
  scheduledFor?: string;
  sentAt?: string;
}
