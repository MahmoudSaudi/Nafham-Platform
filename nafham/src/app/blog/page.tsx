import BlogLayout from "@/features/blog/components/BlogLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المدونة التعليمية | نفهم",
  description: "مقالات تقنية، نصائح تعليمية، وقصص نجاح من مجتمعنا لنلهمك في رحلتك التعليمية والمهنية.",
};

export default function BlogPage() {
  return <BlogLayout />;
}
