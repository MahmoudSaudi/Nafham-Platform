"use client";

import { useMemo } from "react";
import { useCertificates } from "../hooks/useCertificates";
import CertificatesHeader from "./CertificatesHeader";
import CertificatesTable from "./CertificatesTable";
import IssueCertificateModal from "./modals/IssueCertificateModal";
import RevokeCertificateModal from "./modals/RevokeCertificateModal";
import Pagination from "@/components/ui/Pagination";
import { useState } from "react";
import { Certificate } from "../types";

export default function CertificatesView() {
  const {
    certificates,
    searchQuery,
    setSearchQuery,
    courseFilter,
    setCourseFilter,
    isLoading,
    handleRevoke,
    isRevoking
  } = useCertificates();

  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [revokingCert, setRevokingCert] = useState<Certificate | undefined>();

  // Basic Filtering
  const filteredCertificates = useMemo(() => {
    return certificates.filter(cert => {
      const matchesSearch = cert.studentName.includes(searchQuery) || cert.id.includes(searchQuery) || cert.studentEmail.includes(searchQuery);
      const matchesCourse = courseFilter === "تصفية حسب الكورس" || cert.productName === courseFilter;
      return matchesSearch && matchesCourse;
    });
  }, [certificates, searchQuery, courseFilter]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const onConfirmRevoke = () => {
    if (revokingCert) {
      handleRevoke(revokingCert.id);
      setRevokingCert(undefined);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <CertificatesHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        courseFilter={courseFilter}
        setCourseFilter={setCourseFilter}
        onIssueCertificate={() => setIsIssueModalOpen(true)}
      />

      <CertificatesTable 
        certificates={filteredCertificates} 
        onRevoke={(cert) => setRevokingCert(cert)}
      />

      {filteredCertificates.length > 0 && (
        <Pagination 
          currentPage={1}
          totalPages={Math.ceil(filteredCertificates.length / 10) || 1}
          totalItems={filteredCertificates.length}
          itemsPerPage={10}
          itemName="شهادة"
        />
      )}

      {/* Modals */}
      <IssueCertificateModal 
        isOpen={isIssueModalOpen} 
        onClose={() => setIsIssueModalOpen(false)} 
      />
      
      <RevokeCertificateModal 
        isOpen={!!revokingCert} 
        onClose={() => setRevokingCert(undefined)} 
        certificate={revokingCert}
        onConfirm={onConfirmRevoke}
        isRevoking={isRevoking}
      />

    </div>
  );
}
