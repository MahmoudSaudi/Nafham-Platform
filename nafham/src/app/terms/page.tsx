import TermsContent from "@/features/static-pages/components/TermsContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "شروط الاستخدام | نفهم",
  description: "شروط الاستخدام لمنصة نفهم.",
};

export default function TermsPage() {
  return <TermsContent />;
}
