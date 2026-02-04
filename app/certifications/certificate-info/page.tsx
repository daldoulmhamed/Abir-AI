"use client";
import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CertificateInfoForm, { CertificateInfo } from "@/components/CertificateInfoForm";
import styles from "@/components/CertificateInfoForm.module.css";
import { getMockRetakeCode } from "@/utils/mockRetakeCode";

// Simule le résultat d'examen (à remplacer par la vraie logique)
const mockExamResult = {
  passed: true, // Passez à false pour tester la redirection
};


function CertificateInfoPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") === "retake" ? "retake" : "certificate";
  const certificationId = searchParams.get("certificationId") || undefined;
  const userId = searchParams.get("userId") || undefined;

  useEffect(() => {
    if (!mockExamResult.passed && mode !== "retake") {
      router.replace("/certifications/exam-result");
    }
  }, [mode]);

  // Nouvelle logique : la gestion du code de retake se fait via l'API, plus de localStorage ou mock
  const handleConfirm = (info: CertificateInfo) => {
    // Ne rien faire ici, la logique est gérée dans CertificateInfoForm
  };

  if (!certificationId || !userId) {
    return (
      <div className={styles.container}>
        <div style={{background:'#fff0f0',color:'#c62828',border:'1px solid #c62828',borderRadius:8,padding:18,marginTop:24,fontSize:'1.1rem',textAlign:'center'}}>
          <strong>Erreur :</strong> Les paramètres <code>certificationId</code> et <code>userId</code> sont requis dans l’URL.<br />
          Exemple d’URL valide :<br />
          <code>/certifications/certificate-info?mode=retake&certificationId=TEST123&userId=USER456</code>
          <br /><br />
          <button
            style={{marginTop:16,padding:'10px 22px',background:'#6366f1',color:'#fff',border:'none',borderRadius:6,fontSize:'1rem',cursor:'pointer'}}
            onClick={() => {
              window.location.href = '/certifications/certificate-info?mode=retake&certificationId=TEST123&userId=USER456';
            }}
          >
            Accéder à un exemple de génération de code
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <CertificateInfoForm
        onConfirm={handleConfirm}
        mode={mode}
        certificationId={certificationId}
        userId={userId}
      />
    </div>
  );
}

export default function CertificateInfoPage() {
  return (
    <Suspense>
      <CertificateInfoPageInner />
    </Suspense>
  );
}
