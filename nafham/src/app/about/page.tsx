import AboutContent from "@/features/static-pages/components/AboutContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "عن نفهم | من نحن",
  description: "تعرف على رسالتنا ورؤيتنا في تبسيط التعليم التكنولوجي في الوطن العربي.",
};

export default function AboutPage() {
  return <AboutContent />;
}
