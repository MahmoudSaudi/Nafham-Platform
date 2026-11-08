import InstructorProfile from "@/features/instructor/components/InstructorProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الملف الشخصي للمدرب | نفهم",
  description: "اطلع على تفاصيل المدرب والكورسات التي يقدمها على منصة نفهم.",
};

export default function InstructorProfilePage({ params }: { params: { id: string } }) {
  // Currently using static mock data, so we ignore params.id for now.
  return <InstructorProfile />;
}
