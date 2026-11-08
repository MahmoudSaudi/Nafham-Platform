"use client";

import { useState } from 'react';
import { CreditCard, Smartphone, Zap, Store, ArrowRight, Lock, CheckCircle2, Check } from 'lucide-react';
import Link from 'next/link';

import { PaymentMethodType } from './CheckoutOrderSummary';
import { CheckoutStep } from './CheckoutPendingStates';
import CheckoutOrderSummary from './CheckoutOrderSummary';
import CheckoutPaymentForms from './CheckoutPaymentForms';
import CheckoutPendingStates from './CheckoutPendingStates';

interface CheckoutContainerProps {
  initialCourse: any;
}

export default function CheckoutContainer({ initialCourse: course }: CheckoutContainerProps) {
  const [step, setStep] = useState<CheckoutStep>('form');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  // Wallet Form State
  const [phoneNumber, setPhoneNumber] = useState('');

  // Instapay Form State
  const [instapayAddress, setInstapayAddress] = useState('');

  // Promo Code State
  const [promoInput, setPromoInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  if (!course) return null;

  // Pricing calculation
  const basePrice = course.price !== undefined && course.price !== null ? Number(course.price) : 1500;
  const discountAmount = Math.round((basePrice * appliedDiscount) / 100);
  const finalPrice = Math.max(0, basePrice - discountAmount);

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === 'NAFHAM20' || code === 'DISCOUNT20') {
      setAppliedDiscount(20);
      setPromoMessage({ text: 'تم تطبيق خصم 20% بنجاح!', type: 'success' });
    } else if (code === 'NAFHAM50') {
      setAppliedDiscount(50);
      setPromoMessage({ text: 'تم تطبيق خصم 50% بنجاح!', type: 'success' });
    } else {
      setPromoMessage({ text: 'كود الخصم غير صحيح أو منتهي الصلاحية', type: 'error' });
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (paymentMethod === 'fawry') {
        setStep('fawry-pending');
      } else if (paymentMethod === 'wallet') {
        setStep('wallet-pending');
      } else if (paymentMethod === 'instapay') {
        setStep('instapay-pending');
      } else {
        setStep('success');
      }
    }, 2000);
  };

  const paymentMethodsList = [
    { id: 'card' as PaymentMethodType, label: 'بطاقة ائتمانية', desc: 'فيزا، ماستركارد، مدى', icon: CreditCard },
    { id: 'wallet' as PaymentMethodType, label: 'محفظة إلكترونية', desc: 'فودافون كاش، أورنج', icon: Smartphone },
    { id: 'instapay' as PaymentMethodType, label: 'إنستا باي', desc: 'تحويل لحظي فوري', icon: Zap },
    { id: 'fawry' as PaymentMethodType, label: 'فوري Pay', desc: 'الدفع عبر ماكينات فوري', icon: Store },
  ];

  if (step !== 'form') {
    return <CheckoutPendingStates step={step} course={course} finalPrice={finalPrice} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24" dir="rtl">
      {/* Checkout Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href={`/courses/${course.id}`} className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 font-medium">
            <ArrowRight className="w-5 h-5" />
            <span>العودة لتفاصيل الكورس</span>
          </Link>
          <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            <Lock className="w-4 h-4" />
            <span className="text-xs font-bold">دفع مشفر وآمن 100%</span>
          </div>
        </div>
      </header>

      {/* Main Checkout Content */}
      <div className="max-w-7xl mx-auto px-4 mt-8 lg:mt-12">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">إتمام الشراء</h1>
          <p className="text-slate-500 mt-2">اختر وسيلة الدفع المناسبة لك لإتمام الاشتراك والبدء بالتعلم فوراً.</p>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-10 items-start">
          {/* Right Column: Billing & Payment Form (65%) */}
          <div className="w-full lg:w-[65%] space-y-8">
            
            {/* Account Info */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm">1</span>
                بيانات الحساب
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">الاسم الكامل</label>
                  <input type="text" disabled defaultValue="أحمد محمد" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">البريد الإلكتروني</label>
                  <input type="email" disabled defaultValue="ahmed@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed dir-ltr text-right" />
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                سيتم تفعيل الاشتراك على هذا الحساب مباشرة بعد الدفع.
              </p>
            </section>

            {/* Payment Methods */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm">2</span>
                وسيلة الدفع
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {paymentMethodsList.map((method) => {
                  const Icon = method.icon;
                  const isSelected = paymentMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all text-center gap-3 relative ${
                        isSelected 
                          ? 'border-emerald-600 bg-emerald-50/50 text-emerald-800' 
                          : 'border-slate-100 hover:border-slate-300 bg-white text-slate-600'
                      }`}
                    >
                      <Icon className={`w-7 h-7 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <div>
                        <span className="font-bold text-sm block mb-1">{method.label}</span>
                        <span className="text-[11px] text-slate-400 block leading-tight">{method.desc}</span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Payment Forms */}
              <CheckoutPaymentForms 
                paymentMethod={paymentMethod}
                isProcessing={isProcessing}
                handlePayment={handlePayment}
                cardNumber={cardNumber} setCardNumber={setCardNumber}
                cardExpiry={cardExpiry} setCardExpiry={setCardExpiry}
                cardCvv={cardCvv} setCardCvv={setCardCvv}
                cardHolder={cardHolder} setCardHolder={setCardHolder}
                phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                instapayAddress={instapayAddress} setInstapayAddress={setInstapayAddress}
              />
            </section>
          </div>

          {/* Left Column: Order Summary */}
          <CheckoutOrderSummary 
            course={course}
            paymentMethod={paymentMethod}
            isProcessing={isProcessing}
            handlePayment={handlePayment}
            basePrice={basePrice}
            appliedDiscount={appliedDiscount}
            discountAmount={discountAmount}
            finalPrice={finalPrice}
            promoInput={promoInput}
            setPromoInput={setPromoInput}
            handleApplyPromo={handleApplyPromo}
            promoMessage={promoMessage}
          />
        </div>
      </div>
    </div>
  );
}
