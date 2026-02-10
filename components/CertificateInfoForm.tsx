"use client";
import React, { useState, useEffect } from "react";
import { certifications } from "@/data/certifications";
import { issueCertificate, CertificateIssued } from "@/utils/issueCertificate";
import styles from "./CertificateInfoForm.module.css";

export interface CertificateInfo {
  fullName: string;
  country?: string;
  organization?: string;
  linkedin?: string;
  confirmed: boolean;
}

const STORAGE_KEY = "abir-ia-certificate-info";

function CertificateInfoForm({ onConfirm, mode = "certificate", certificationId, userId }: { onConfirm?: (info: CertificateInfo) => void, mode?: "certificate" | "retake", certificationId?: string, userId?: string }) {
  const [form, setForm] = useState<CertificateInfo>({
    fullName: "",
    country: "",
    organization: "",
    linkedin: "",
    confirmed: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [retakeCode, setRetakeCode] = useState<string | null>(null);
  const [retakeError, setRetakeError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  // État pour le certificat émis
  const [issuedCertificate, setIssuedCertificate] = useState<CertificateIssued | null>(null);
  const [issueError, setIssueError] = useState<string | null>(null);
  const [issuing, setIssuing] = useState(false);

  useEffect(() => {
    // Plus de pré-remplissage depuis localStorage
  }, []);

  const validate = () => {
    const errs: { [k: string]: string } = {};
    if (!form.fullName.trim()) {
      errs.fullName = "Full name is required.";
    }
    if (form.linkedin && form.linkedin.trim() && !/^https?:\/\/(www\.)?linkedin\.com\//.test(form.linkedin.trim())) {
      errs.linkedin = "Please enter a valid LinkedIn profile URL.";
    }
    if (!form.confirmed) {
      errs.confirmed = "You must confirm the information.";
    }
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ---
  // Processus en deux étapes :
  // 1. L'utilisateur réussit l'examen (aucun certificat officiel n'est généré à ce stade)
  // 2. Après confirmation de l'identité (ce formulaire), issueCertificate() est appelée pour générer le certificat officiel
  // ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = {
      ...form,
      fullName: form.fullName.trim(),
      country: form.country?.trim(),
      organization: form.organization?.trim(),
      linkedin: form.linkedin?.trim(),
    };
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setForm(trimmed);
      setSubmitted(true);
      if (onConfirm) onConfirm(trimmed);

      if (mode === "retake") {
        setRetakeError(null);
        setRetakeCode(null);
        // ...logique retake inchangée...
        try {
          const res = await fetch("/api/retakes/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName: trimmed.fullName })
          });
          const data = await res.json();
          if (data.tokenId) {
            setRetakeCode(data.tokenId);
            if (certificationId) {
              try {
                const validateRes = await fetch("/api/retakes/validate", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    tokenId: data.tokenId,
                    examId: certificationId,
                    fullName: trimmed.fullName
                  })
                });
                const validateData = await validateRes.json();
                if (!validateData.success) {
                  setRetakeError(validateData.message || "Erreur lors de la validation du code retake.");
                }
              } catch (err) {
                setRetakeError("Erreur réseau lors de la validation du code retake.");
              }
            }
          }
          if (!data.success) {
            if (data.message && data.message.includes("already exists")) {
              setRetakeError(
                data.message +
                  " Si vous avez déjà reçu un code de retake, veuillez le retrouver dans vos emails ou contacter le support si besoin."
              );
            } else {
              setRetakeError(data.message || "Unable to generate retake code.");
            }
          }
        } catch (err) {
          setRetakeError("Network error. Please try again.");
        }
      } else if (mode === "certificate" && certificationId) {
        // --- Émission du certificat officiel après confirmation d'identité ---
        // La génération du QR code est déclenchée côté serveur lors de l'appel à issueCertificate.
        // Le QR code encode l'URL de vérification et sera utilisé pour l'intégration PDF ou l'affichage.
        setIssuing(true);
        setIssueError(null);
        try {
          // Trouver le vrai titre et le slug à partir de l'ID
          const certObj = certifications.find(c => c.id === certificationId);
          const certificationTitle = certObj ? certObj.title : certificationId;
          const certificationSlug = certObj ? certObj.slug : certificationId;
          const cert = await issueCertificate({
            fullName: trimmed.fullName,
            certificationTitle,
            certificationId: certificationId,
          });
          // On stocke aussi le slug pour l'affichage du badge
          setIssuedCertificate({ ...(cert as any) });
          // Ajout du slug pour l'affichage (hors typage strict)
          (cert as any).certificationSlug = certificationSlug;
        } catch (err: any) {
          setIssueError("Erreur lors de l'émission du certificat. Veuillez réessayer ou contacter le support.");
        } finally {
          setIssuing(false);
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {mode === "retake" ? "Retake Code Request" : "Certificate Information Confirmation"}
      </h2>
      <p className={styles.explanation}>
        {mode === "retake"
          ? "This information will be used to issue your retake code. Please review carefully before submitting."
          : "This information will be used to generate your official Abir-AI certificate. Please review carefully before submitting."}
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Full name as it should appear on the certificate <span className={styles.required}>*</span>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            disabled={mode !== "retake" && submitted}
            className={styles.input + (errors.fullName ? " " + styles.inputError : "")}
            autoComplete="name"
            required
          />
          {errors.fullName && <span className={styles.error}>{errors.fullName}</span>}
        </label>
        <label className={styles.label}>
          Country
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            disabled={mode !== "retake" && submitted}
            className={styles.input}
            autoComplete="country"
          />
        </label>
        <label className={styles.label}>
          Organization / University
          <input
            type="text"
            name="organization"
            value={form.organization}
            onChange={handleChange}
            disabled={mode !== "retake" && submitted}
            className={styles.input}
            autoComplete="organization"
          />
        </label>
        <label className={styles.label}>
          LinkedIn profile URL
          <input
            type="url"
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
            disabled={mode !== "retake" && submitted}
            className={styles.input + (errors.linkedin ? " " + styles.inputError : "")}
            autoComplete="url"
            placeholder="https://linkedin.com/in/your-profile"
          />
          {errors.linkedin && <span className={styles.error}>{errors.linkedin}</span>}
        </label>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="confirmed"
            checked={form.confirmed}
            onChange={handleChange}
            disabled={mode !== "retake" && submitted}
            required
          />
          {mode === "retake"
            ? "I confirm that these informations provided are correct"
            : "I confirm that the information provided is correct and will appear on my certificate."}
        </label>
        {errors.confirmed && <span className={styles.error}>{errors.confirmed}</span>}
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={(mode !== "retake" && submitted) || !form.confirmed}
        >
          {submitted ? "Information Confirmed" : "Confirm and Continue"}
        </button>
      </form>
      {submitted && mode !== "retake" && (
        <div className={styles.lockedMsg}>
          <strong>Information locked.</strong> Your certificate will be generated with the details above.<br />
          {issuing && <div style={{marginTop:8}}>⏳ Certificate generation in progress...</div>}
          {issueError && <div style={{color:'#c62828',marginTop:8}}>{issueError}</div>}
          {issuedCertificate && (
            <div style={{
              marginTop: '6em',
              padding: 12,
              border: '1px solid #3b82f6',
              borderRadius: 8,
              background: '#f0f7ff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px',
            }}>
              <div style={{fontWeight:600,color:'#2563eb', marginBottom: '2em'}}>🎓 Official certificate issued!</div>
              <div style={{fontWeight:700, fontSize:'2em', marginBottom:'1.5em', textAlign:'center'}}>{issuedCertificate.fullName}</div>
              <div style={{fontWeight:600, fontSize:'1.3em', marginBottom:'1.2em', textAlign:'center'}}>{issuedCertificate.certificationTitle}</div>
              {(() => {
                const badgeMap: Record<string, string> = {
                  "generative-ai-practitioner": "/images/generative-ai-practitioner.png",
                  "ai-productivity-github-copilot": "/images/ai-productivity-github-copilot.png",
                  "generative-ai-business-operations": "/images/generative-ai-for-business-operations.png",
                  "ai-governance-responsible-ai-foundations": "/images/ai-governance-responsible-ai-foundations.png",
                };
                // slug prioritaire, fallback sur titre si jamais
                const badgeUrl = badgeMap[(issuedCertificate as any).certificationSlug] || badgeMap[issuedCertificate.certificationTitle];
                return badgeUrl ? (
                  <div style={{display:'flex',justifyContent:'center',marginBottom:'2.5em'}}>
                    <img src={badgeUrl} alt={issuedCertificate.certificationTitle+" badge"} style={{maxWidth:140,maxHeight:140,objectFit:'contain',borderRadius:12,boxShadow:'0 2px 8px #0001'}} />
                  </div>
                ) : null;
              })()}
              <div style={{marginBottom:'0.5em'}}><strong>Issue Date:</strong> {issuedCertificate.issueDate}</div>
              <div style={{marginBottom:'0.5em'}}><strong>Serial Number:</strong> {issuedCertificate.certificateSerial}</div>
              <div style={{marginBottom:'0.5em'}}><strong>Verification URL:</strong> <a href={issuedCertificate.verificationUrl} target="_blank" rel="noopener noreferrer">{issuedCertificate.verificationUrl}</a></div>
              {/* Verification QR code: generated ONCE at issuance, ready to be integrated in the PDF */}
              {issuedCertificate.qrCodeDataUrl && (
                <div style={{marginTop:8, display:'flex', flexDirection:'column', alignItems:'center'}}>
                  <img src={issuedCertificate.qrCodeDataUrl} alt="Verification QR Code" style={{width:120,height:120}} />
                  <div style={{fontSize:'0.9em',color:'#555',marginTop:4}}>Scan to verify the authenticity of the certificate</div>
                </div>
              )}
            </div>
          )}
          {/* Afficher le bouton seulement si issuedCertificate n'est pas null (typage strict) */}
          {issuedCertificate && <DownloadCertificateButton issuedCertificate={issuedCertificate} />}
        </div>
      )}
      </div>
    );
  }

  export default CertificateInfoForm;

  function DownloadCertificateButton({ issuedCertificate }: { issuedCertificate: CertificateIssued }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Mapping badge selon le slug de la certification
    const badgeMap: Record<string, string> = {
      "generative-ai-practitioner": "/images/generative-ai-practitioner.png",
      "ai-productivity-github-copilot": "/images/ai-productivity-github-copilot.png",
      "generative-ai-business-operations": "/images/generative-ai-for-business-operations.png",
      "ai-governance-responsible-ai-foundations": "/images/ai-governance-responsible-ai-foundations.png",
    };

    const handleDownload = async () => {
      setLoading(true);
      setError(null);
      try {
        const badgeUrl = badgeMap[(issuedCertificate as any).certificationSlug] || badgeMap[issuedCertificate.certificationTitle] || badgeMap[Object.keys(badgeMap)[0]];
        const response = await fetch("/api/certificate-serial/generate-pdf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: issuedCertificate.fullName,
            certificationTitle: issuedCertificate.certificationTitle,
            certificateSerial: issuedCertificate.certificateSerial,
            issuedAt: issuedCertificate.issueDate,
            qrCodeDataUrl: issuedCertificate.qrCodeDataUrl,
            examBadgeLogoUrl: badgeUrl,
          }),
        });
        if (!response.ok) throw new Error("Error generating PDF");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `certificate-${issuedCertificate.certificateSerial}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div style={{marginTop:16}}>
        <button onClick={handleDownload} disabled={loading} className={styles.primaryBtn}>
          {loading ? "Generating PDF..." : "Download my certificate PDF"}
        </button>
        {error && <div style={{color:'#c62828',marginTop:8}}>{error}</div>}
      </div>
    );
  }

