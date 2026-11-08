import AuditView from "@/features/admin/audit/components/AuditView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سجل نشاطات النظام | لوحة التحكم",
};

export default function AuditPage() {
  return <AuditView />;
}
