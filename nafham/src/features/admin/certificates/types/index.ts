export type CertificateStatus = "نشطة" | "ملغاة" | string;

export interface Certificate {
  id: string;
  studentName: string;
  studentEmail: string;
  productName: string;
  productType: "دورة" | "مسار" | "كورس" | string;
  issueDate: string;
  grade: string;
  status: CertificateStatus;
  certificateUrl: string;
}
