"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import PhoneInput from "@/components/ui/PhoneInput";
import { signIn } from "next-auth/react";
import { useRegister } from "../hooks/useRegister";

export default function RegisterForm() {
  const {
    form,
    showPassword, setShowPassword,
    showConfirmPassword, setShowConfirmPassword,
    isLoading, onSubmit
  } = useRegister();
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = form;

  return (
    <div className="bg-[#FAFAFA] min-h-[calc(100vh-80px)] py-16 flex items-center justify-center px-4">
      <div className="w-full max-w-[720px] bg-white rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100/50 p-8 sm:p-12">
        
        <div className="text-center mb-10">
          <h1 className="text-[26px] font-extrabold text-[#0f172a] mb-2">تسجيل حساب جديد</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-2">الاسم الأول</label>
              <input 
                {...register("firstName")}
                type="text" 
                placeholder="أدخل اسمك الأول"
                className={`w-full bg-[#F8FAFC] border-none rounded-xl py-4 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all ${errors.firstName ? 'ring-2 ring-red-500/50' : ''}`}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-2">الاسم الأخير</label>
              <input 
                {...register("lastName")}
                type="text" 
                placeholder="أدخل اسم العائلة"
                className={`w-full bg-[#F8FAFC] border-none rounded-xl py-4 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all ${errors.lastName ? 'ring-2 ring-red-500/50' : ''}`}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.lastName.message}</p>}
            </div>
          </div>

          {/* Email & Phone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-2">البريد الإلكتروني</label>
              <input 
                {...register("email")}
                type="email" 
                placeholder="example@mail.com"
                className={`w-full bg-[#F8FAFC] border-none rounded-xl py-4 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all ${errors.email ? 'ring-2 ring-red-500/50' : ''}`}
                dir="ltr"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1.5 text-right font-medium">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-2">رقم الهاتف</label>
              <PhoneInput 
                value={watch("phone")} 
                onChange={(val) => setValue("phone", val, { shouldValidate: true })} 
                error={errors.phone?.message}
              />
            </div>
          </div>

          {/* Password Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-2">كلمة المرور</label>
              <div className="relative" dir="ltr">
                <input 
                  {...register("password")}
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className={`w-full bg-[#F8FAFC] border-none rounded-xl py-4 pr-12 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-left ${errors.password ? 'ring-2 ring-red-500/50' : ''}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1.5 text-right font-medium">{errors.password.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-2">تأكيد كلمة المرور</label>
              <div className="relative" dir="ltr">
                <input 
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className={`w-full bg-[#F8FAFC] border-none rounded-xl py-4 pr-12 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-left ${errors.confirmPassword ? 'ring-2 ring-red-500/50' : ''}`}
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600">
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5 text-right font-medium">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center gap-3 pt-2">
            <input 
              {...register("acceptTerms")}
              type="checkbox" 
              id="terms"
              className="w-4 h-4 text-[#22C55E] bg-[#F8FAFC] border-gray-200 rounded focus:ring-emerald-500 cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm font-medium text-gray-500 cursor-pointer">
              أوافق على <Link href="#" className="text-[#22C55E] hover:underline">شروط الاستخدام</Link> و <Link href="#" className="text-[#22C55E] hover:underline">سياسة الخصوصية</Link>
            </label>
          </div>
          {errors.acceptTerms && <p className="text-red-500 text-xs font-medium">{errors.acceptTerms.message}</p>}

          {/* Submit */}
          <button disabled={isLoading} type="submit" className="w-full bg-[#22C55E] hover:bg-emerald-600 disabled:opacity-70 text-white font-bold py-4 rounded-xl transition text-base mt-4">
            {isLoading ? "جاري التسجيل..." : "تسجيل حساب"}
          </button>

          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-gray-100"></div>
            <span className="text-xs text-gray-400 font-bold">أو</span>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button" 
              onClick={() => {
                if (process.env.NODE_ENV === 'development') {
                  signIn("credentials", { email: "student1@nafham.com", password: "password123", callbackUrl: "/dashboard" });
                } else {
                  signIn("google", { callbackUrl: "/dashboard" });
                }
              }}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-70 text-gray-700 font-bold py-3.5 rounded-xl transition text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/><path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.896l-4.04 3.123C3.232 21.308 7.322 24 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/><path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/><path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/></svg>
              <span>جوجل</span>
            </button>
            <button 
              type="button" 
              onClick={() => {
                if (process.env.NODE_ENV === 'development') {
                  signIn("credentials", { email: "student1@nafham.com", password: "password123", callbackUrl: "/dashboard" });
                } else {
                  signIn("facebook", { callbackUrl: "/dashboard" });
                }
              }}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-70 text-gray-700 font-bold py-3.5 rounded-xl transition text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z"/></svg>
              <span>فيسبوك</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <p className="text-gray-500 font-bold text-sm">
              لديك حساب؟ <Link href="/auth/login" className="text-[#22C55E] hover:text-emerald-700 hover:underline">قم بالضغط هنا لتسجيل الدخول</Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
