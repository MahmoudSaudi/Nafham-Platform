"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import TopBanner from "./TopBanner";
import Footer from "./Footer";

export default function SiteLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If we are in the dashboard or learn page, don't render Header/Footer
  const isDashboard = pathname.startsWith("/dashboard");
  const isLearnPage = pathname.includes("/learn");

  if (isDashboard || isLearnPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen w-full relative">
      <TopBanner />
      <Header />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
