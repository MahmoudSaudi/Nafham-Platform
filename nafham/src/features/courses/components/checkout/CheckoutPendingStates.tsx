import { CheckCircle2, Check, ArrowLeft, Store, Smartphone, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export type CheckoutStep = 'form' | 'success' | 'fawry-pending' | 'wallet-pending' | 'instapay-pending';

interface PendingStatesProps {
  step: CheckoutStep;
  course: any;
  finalPrice: number;
}

export default function CheckoutPendingStates({ step, course, finalPrice }: PendingStatesProps) {
  const router = useRouter();

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-20 px-4 flex items-center justify-center" dir="rtl">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
          <div className="p-10 flex flex-col items-center text-center gap-6">
            <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2 shadow-inner border border-emerald-100">
              <CheckCircle2 className="w-14 h-14 stroke-[2]" />
            </div>
            <div className="space-y-3 max-w-md">
              <h3 className="text-3xl font-extrabold text-slate-900">تم تأكيد الاشتراك! 🎉</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                مرحباً بك في أسرة دورة <span className="font-bold text-slate-900">({course.title})</span>. تم تفعيل صلاحية المشاهدة الفورية لكافة الدروس والملحقات.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 w-full max-w-sm text-sm text-slate-700 space-y-2 text-right">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">رقم العملية:</span>
                <span className="font-mono font-bold text-slate-900 dir-ltr">#NFH-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">المبلغ المدفوع:</span>
                <span className="font-bold text-emerald-700 dir-ltr">{finalPrice.toLocaleString("en-US")} ج.م</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-slate-500">حالة الحساب:</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1"><Check className="w-4 h-4"/> نشط (Active)</span>
              </div>
            </div>
            <button 
              onClick={() => router.push(`/courses/${course.id}/learn`)}
              className="mt-4 w-full max-w-sm bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group"
            >
              <span>اذهب إلى مكتبة الكورسات لبدء التعلم</span>
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'fawry-pending') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-20 px-4 flex items-center justify-center" dir="rtl">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
          <div className="p-10 flex flex-col items-center text-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 mb-2 shadow-sm border border-amber-200">
              <Store className="w-10 h-10" />
            </div>
            <div className="space-y-3 max-w-md">
              <h3 className="text-2xl font-extrabold text-slate-900">في انتظار الدفع (فوري) ⏳</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                لقد تم تسجيل طلبك بنجاح. يرجى التوجه إلى أقرب منفذ فوري أو استخدام تطبيق MyFawry والدفع باستخدام الكود المرجعي أدناه.
              </p>
            </div>
            
            <div className="w-full max-w-sm my-2">
              <span className="text-sm font-bold text-slate-500 mb-2 block">كود فوري المرجعي (Fawry Pay Code):</span>
              <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-2xl py-6 px-8 font-mono text-4xl font-black text-amber-900 tracking-[0.2em] dir-ltr shadow-sm">
                {Math.floor(100000000 + Math.random() * 900000000)}
              </div>
              <p className="text-xs font-medium text-amber-700 bg-amber-50/50 p-3 rounded-lg mt-4 border border-amber-100">
                ⚠️ الكود صالح لمدة 48 ساعة فقط. سيتم تفعيل الكورس <span className="font-bold">تلقائياً</span> بمجرد الدفع.
              </p>
            </div>

            <div className="flex flex-col w-full max-w-sm gap-3 mt-4">
              <button 
                onClick={() => router.push(`/dashboard`)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all"
              >
                العودة إلى لوحة التحكم
              </button>
              <p className="text-xs text-slate-400">ستصلك رسالة عبر البريد الإلكتروني بكود فوري أيضاً.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'wallet-pending') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-20 px-4 flex items-center justify-center" dir="rtl">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
          <div className="p-10 flex flex-col items-center text-center gap-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-emerald-500/5 animate-pulse rounded-3xl pointer-events-none"></div>
            <div className="w-20 h-20 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2 shadow-sm border border-emerald-200 relative">
              <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-2xl animate-spin opacity-20"></div>
              <Smartphone className="w-10 h-10 animate-bounce" />
            </div>
            <div className="space-y-3 max-w-md z-10">
              <h3 className="text-2xl font-extrabold text-slate-900">يرجى مراجعة هاتفك الآن 📲</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                لقد قمنا بإرسال طلب تأكيد الدفع إلى محفظتك الإلكترونية. يرجى فتح هاتفك وإدخال <span className="font-bold text-slate-900">الرقم السري للمحفظة (PIN)</span> للموافقة على المعاملة.
              </p>
            </div>

            <div className="w-full max-w-sm mt-4 bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm text-slate-700 text-right z-10">
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-200">
                <span className="text-slate-500">مبلغ المعاملة:</span>
                <span className="font-bold text-emerald-700 dir-ltr">{finalPrice.toLocaleString("en-US")} ج.م</span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse block shrink-0"></span>
                في انتظار تأكيدك عبر الهاتف لإتمام عملية الاشتراك...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'instapay-pending') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-20 px-4 flex items-center justify-center" dir="rtl">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
          <div className="p-10 flex flex-col items-center text-center gap-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-purple-500/5 animate-pulse rounded-3xl pointer-events-none"></div>
            <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 mb-2 shadow-sm border border-purple-200 relative">
              <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-2xl animate-spin opacity-20"></div>
              <Zap className="w-10 h-10 animate-bounce" />
            </div>
            <div className="space-y-3 max-w-md z-10">
              <h3 className="text-2xl font-extrabold text-slate-900">في انتظار موافقتك عبر إنستا باي ⚡</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                تم إرسال طلب الدفع بنجاح. يرجى فتح <span className="font-bold text-purple-700">تطبيق إنستا باي (InstaPay)</span> الخاص بك والموافقة على طلب الدفع المرسل إليك لإتمام الاشتراك.
              </p>
            </div>

            <div className="w-full max-w-sm mt-4 bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm text-slate-700 text-right z-10">
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-200">
                <span className="text-slate-500">المبلغ المطلوب تأكيده:</span>
                <span className="font-bold text-purple-700 dir-ltr">{finalPrice.toLocaleString("en-US")} ج.م</span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse block shrink-0"></span>
                جاري انتظار تأكيد المعاملة من تطبيق إنستا باي...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
