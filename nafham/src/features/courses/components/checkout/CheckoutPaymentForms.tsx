import { CreditCard, Lock, Smartphone, Zap, Store } from 'lucide-react';
import Link from 'next/link';
import { PaymentMethodType } from './CheckoutOrderSummary';

interface CheckoutPaymentFormsProps {
  paymentMethod: PaymentMethodType;
  isProcessing: boolean;
  handlePayment: () => void;
  // Card
  cardNumber: string;
  setCardNumber: (val: string) => void;
  cardExpiry: string;
  setCardExpiry: (val: string) => void;
  cardCvv: string;
  setCardCvv: (val: string) => void;
  cardHolder: string;
  setCardHolder: (val: string) => void;
  // Wallet
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  // Instapay
  instapayAddress: string;
  setInstapayAddress: (val: string) => void;
}

export default function CheckoutPaymentForms({
  paymentMethod,
  isProcessing,
  handlePayment,
  cardNumber, setCardNumber,
  cardExpiry, setCardExpiry,
  cardCvv, setCardCvv,
  cardHolder, setCardHolder,
  phoneNumber, setPhoneNumber,
  instapayAddress, setInstapayAddress,
}: CheckoutPaymentFormsProps) {

  const formatCardNumber = (val: string) => {
    const cleaned = val.replace(/\D/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.slice(0, 19);
  };

  const formatExpiry = (val: string) => {
    const cleaned = val.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <div className="pt-2">
      {paymentMethod === 'card' && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-base font-bold text-slate-800">تفاصيل البطاقة</span>
            <div className="flex gap-2">
              <span className="text-[10px] font-bold bg-slate-50 border border-slate-200 px-2 py-1 rounded text-[#1434CB]">VISA</span>
              <span className="text-[10px] font-bold bg-slate-50 border border-slate-200 px-2 py-1 rounded text-[#EB001B]">MasterCard</span>
              <span className="text-[10px] font-bold bg-slate-50 border border-slate-200 px-2 py-1 rounded text-[#227D60]">مدى</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">رقم البطاقة</label>
            <div className="relative">
              <input 
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="4532 0150 1234 5678"
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 text-base font-mono focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 dir-ltr text-left transition-shadow"
              />
              <CreditCard className="w-6 h-6 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">تاريخ الانتهاء</label>
              <input 
                type="text"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 text-base font-mono focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 dir-ltr text-left"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">رمز الأمان (CVV)</label>
              <input 
                type="password"
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="•••"
                maxLength={4}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 text-base font-mono focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 dir-ltr text-left"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">الاسم كما هو مدون على البطاقة</label>
            <input 
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="MOHAMED AHMED"
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 uppercase dir-ltr text-left"
            />
          </div>
        </div>
      )}

      {paymentMethod === 'wallet' && (
        <div className="py-2 animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Smartphone className="w-6 h-6 text-emerald-600" />
              <span className="font-bold text-slate-900 text-lg">المحافظ الإلكترونية</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[10px] font-bold bg-red-50 border border-red-200 px-2 py-1 rounded text-red-700">Vodafone</span>
              <span className="text-[10px] font-bold bg-orange-50 border border-orange-200 px-2 py-1 rounded text-orange-700">Orange</span>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">رقم الهاتف المرتبط بالمحفظة</label>
            <input 
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 11))}
              placeholder="010XXXXXXXX"
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-4 text-lg font-mono text-center focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 dir-ltr tracking-wider"
            />
          </div>

          <button 
            onClick={handlePayment}
            disabled={isProcessing || phoneNumber.length < 11}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-md flex justify-center items-center gap-2 disabled:opacity-70 active:scale-[0.99] mb-4"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-emerald-300 border-t-white rounded-full animate-spin"></div>
                <span>جاري المعالجة...</span>
              </div>
            ) : (
              <span>إرسال طلب الدفع</span>
            )}
          </button>
          
          <div className="flex items-center justify-center gap-1.5 text-slate-500 mb-6">
            <Lock className="w-4 h-4" />
            <span className="text-sm font-medium">عملية مؤمنة 100%</span>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100 text-right">
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              <span className="font-bold text-slate-900">كيفية الدفع:</span> بعد الضغط على إرسال، سيصلك إشعار على هاتفك يطلب منك إدخال الرقم السري للمحفظة لتأكيد عملية الخصم. يرجى إبقاء هاتفك قريباً.
            </p>
          </div>
        </div>
      )}

      {paymentMethod === 'instapay' && (
        <div className="py-2 animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-purple-600" />
              <span className="font-bold text-slate-900 text-lg">InstaPay</span>
            </div>
            <span className="text-[10px] font-bold bg-purple-50 border border-purple-200 px-2 py-1 rounded text-purple-700">INSTAPAY</span>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">عنوان الدفع اللحظي (IPA)</label>
            <input 
              type="text"
              value={instapayAddress}
              onChange={(e) => setInstapayAddress(e.target.value.toLowerCase())}
              placeholder="name@instapay"
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-4 text-base font-mono focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 dir-ltr text-left"
            />
            <p className="text-xs text-slate-400 mt-2">عنوان الدفع الخاص بك في تطبيق إنستا باي.</p>
          </div>

          <button 
            onClick={handlePayment}
            disabled={isProcessing || !instapayAddress.includes('@instapay')}
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 rounded-xl transition-all shadow-md flex justify-center items-center gap-2 disabled:opacity-70 active:scale-[0.99] mb-4"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-purple-400 border-t-white rounded-full animate-spin"></div>
                <span>جاري المعالجة...</span>
              </div>
            ) : (
              <span>إرسال طلب الدفع (Collect Request)</span>
            )}
          </button>
          
          <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100 text-right">
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              <span className="font-bold text-slate-900">كيفية الدفع:</span> سنرسل طلب دفع (Collect Request) إلى حسابك. قم بفتح تطبيق InstaPay، وراجع الطلبات المعلقة، ثم أدخل رقمك السري (IPN PIN) للموافقة.
            </p>
          </div>
        </div>
      )}

      {paymentMethod === 'fawry' && (
        <div className="py-2 animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Store className="w-6 h-6 text-amber-500" />
              <span className="font-bold text-slate-900 text-lg">Fawry Pay</span>
            </div>
            <span className="text-[10px] font-bold bg-amber-50 border border-amber-200 px-2 py-1 rounded text-amber-700">FAWRY</span>
          </div>
          
          <button 
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-[#673AB7] hover:bg-[#5E35B1] text-white font-bold py-4 rounded-xl transition-all shadow-md flex justify-center items-center gap-2 disabled:opacity-70 active:scale-[0.99] mb-4"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-[#B39DDB] border-t-white rounded-full animate-spin"></div>
                <span>جاري المعالجة...</span>
              </div>
            ) : (
              <span>إرسال الدفع</span>
            )}
          </button>
          
          <div className="flex items-center justify-center gap-1.5 text-slate-500 mb-6">
            <Lock className="w-4 h-4" />
            <span className="text-sm font-medium">مدفوعات مشفرة وآمنة</span>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100 text-right">
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              <span className="font-bold text-slate-900">هام:</span> قد تستغرق معالجة خيار الدفع هذا ما يصل إلى 48 ساعة. اختر الدفع بالبطاقة الائتمانية أو إنستا باي لإكمال الدفع بشكل فوري.
            </p>
          </div>

          <p className="text-xs text-slate-500 text-center leading-relaxed">
            من خلال التحقق، فإنك توافق على <Link href="#" className="underline font-medium hover:text-slate-800">شروط الخدمة</Link> وتؤكد أنك قد قرأت <Link href="#" className="underline font-medium hover:text-slate-800">سياسة الخصوصية</Link>. يمكنك إلغاء الدفع في أي وقت.
          </p>
        </div>
      )}
    </div>
  );
}
