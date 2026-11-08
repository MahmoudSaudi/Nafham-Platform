export type PaymentStatus = "مدفوع" | "معلق" | "ملغى" | "مسترد" | "فاشل" | string;

export type PaymentMethod = "Visa" | "MasterCard" | "PayPal" | "Vodafone Cash" | "Fawry" | string;
export type ProductType = "دورة" | "مسار" | "اشتراك" | "كورس" | string;

export interface Transaction {
  id: string;
  studentName: string;
  studentEmail: string;
  productName: string;
  productType: ProductType;
  amount: number;
  date: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  invoiceId: string;
}

export interface FinancialStats {
  totalRevenue: string;
  revenueChange: string;
  activeSubscriptions: number;
  subscriptionsChange: string;
  pendingAmount: string;
  pendingChange: string;
}
