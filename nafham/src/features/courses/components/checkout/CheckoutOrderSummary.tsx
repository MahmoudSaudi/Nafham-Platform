import Image from 'next/image';
import { Tag, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
export type PaymentMethodType = 'card' | 'wallet' | 'fawry' | 'instapay';

interface CheckoutOrderSummaryProps {
  course: any;
  paymentMethod: PaymentMethodType;
  isProcessing: boolean;
  handlePayment: () => void;
  basePrice: number;
  appliedDiscount: number;
  discountAmount: number;
  finalPrice: number;
  promoInput: string;
  setPromoInput: (val: string) => void;
  handleApplyPromo: () => void;
  promoMessage: { text: string; type: 'success' | 'error' } | null;
}

export default function CheckoutOrderSummary({
  course,
  paymentMethod,
  isProcessing,
  handlePayment,
  basePrice,
  appliedDiscount,
  discountAmount,
  finalPrice,
  promoInput,
  setPromoInput,
  handleApplyPromo,
  promoMessage
}: CheckoutOrderSummaryProps) {
  return (
    <div className="w-full lg:w-[35%] flex flex-col gap-6 sticky top-28">
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">ملخص الطلب</h3>
        
        {/* Course Mini Card */}
        <div className="flex gap-4 items-center pb-6 border-b border-slate-100">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200">
            <Image 
              src={course.posterUrl || course.image || "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800"} 
              alt={course.title} 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="flex flex-col flex-1">
            <h4 className="font-bold text-slate-800 line-clamp-2 text-sm leading-snug">{course.title}</h4>
            <span className="text-slate-500 text-xs mt-1.5">{course.instructor?.name || course.instructor || "نخبة من المدربين"}</span>
          </div>
        </div>

        {/* Promo Code Box */}
        <div className="py-6 border-b border-slate-100">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input 
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="كوبون الخصم (اختياري)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors"
              />
              <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="button"
              onClick={handleApplyPromo}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-3 rounded-xl text-sm transition-colors shrink-0 border border-slate-200"
            >
              تطبيق
            </button>
          </div>
          {promoMessage && (
            <p className={`text-xs font-bold mt-2 ${promoMessage.type === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
              {promoMessage.text}
            </p>
          )}
        </div>

        {/* Price Breakdown */}
        <div className="pt-6 space-y-3 text-sm text-slate-600">
          <div className="flex justify-between">
            <span>سعر الاشتراك الأصلي:</span>
            <span className="font-medium dir-ltr text-slate-900">{basePrice.toLocaleString("en-US")} ج.م</span>
          </div>
          {appliedDiscount > 0 && (
            <div className="flex justify-between text-emerald-600 font-bold">
              <span>الخصم التطبيقي ({appliedDiscount}%):</span>
              <span className="dir-ltr">- {discountAmount.toLocaleString("en-US")} ج.م</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>الضرائب الإدارية:</span>
            <span className="text-emerald-600 font-bold">مشمولة (مجاناً)</span>
          </div>
          
          <div className="border-t border-slate-200 pt-5 mt-5 flex justify-between items-center text-lg font-black text-slate-900">
            <span>الإجمالي النهائي:</span>
            <span className="text-xl dir-ltr">{finalPrice.toLocaleString("en-US")} ج.م</span>
          </div>
        </div>

        {/* Submit Button */}
        {paymentMethod === 'card' && (
          <div className="mt-8">
            <button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-md flex justify-center items-center gap-2 disabled:opacity-70 active:scale-[0.99]"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div>
                  <span>جاري إتمام المعاملة...</span>
                </div>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>إتمام الطلب بأمان</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-slate-500 text-center mt-4">
              بالضغط على "إتمام الطلب" أنت توافق على شروط الاستخدام وسياسة الخصوصية الخاصة بمنصة نفهم.
            </p>
          </div>
        )}
      </section>

      {/* Trust Badges */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-slate-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-slate-800 text-sm">ضمان استرداد الأموال</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">استرداد كامل خلال 14 يوماً إذا لم تجد الدورة مفيدة لك.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-slate-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-slate-800 text-sm">وصول مدى الحياة</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">يمكنك الوصول لمحتوى الدورة ومشاهدتها في أي وقت تشاء.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
