import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import SiteLayoutWrapper from "@/components/layout/SiteLayoutWrapper";
import ChatbotWidget from "@/components/ui/ChatbotWidget";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "نفهم | منصة التعلم التفاعلي",
  description: "المنصة الأولى للتعليم التفاعلي في الوطن العربي.",
};

import { Providers } from "@/components/providers/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} h-full antialiased scroll-smooth overflow-x-hidden`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-cairo bg-gray-50/50 overflow-x-hidden" suppressHydrationWarning>
        <Providers>
          <SiteLayoutWrapper>
            {children}
            <ChatbotWidget />
            <Toaster position="bottom-left" richColors theme="light" dir="rtl" />
          </SiteLayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
