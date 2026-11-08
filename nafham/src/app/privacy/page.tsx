import PrivacyContent from "@/features/static-pages/components/PrivacyContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | نفهم",
  description: "سياسة الخصوصية لمنصة نفهم.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
