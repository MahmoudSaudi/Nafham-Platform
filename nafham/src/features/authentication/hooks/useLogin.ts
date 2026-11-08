import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const loginSchema = z.object({
  email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
  password: z.string().min(1, "يرجى إدخال كلمة المرور"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe ? "true" : "false",
        redirect: false,
      });

      if (result?.error) {
        toast.error("فشل تسجيل الدخول: البريد الإلكتروني أو كلمة المرور غير صحيحة");
        setIsLoading(false);
      } else {
        toast.success("تم تسجيل الدخول بنجاح! جاري التوجيه...");
        // Redirecting to dashboard, middleware will redirect to / if not admin
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.");
      setIsLoading(false);
    }
  };

  return {
    form,
    showPassword,
    setShowPassword,
    isLoading,
    onSubmit,
  };
};
