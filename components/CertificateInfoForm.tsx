"use client";
import React, { useState, useEffect } from "react";
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

export default function CertificateInfoForm({ onConfirm, mode = "certificate", certificationId, userId }: { onConfirm?: (info: CertificateInfo) => void, mode?: "certificate" | "retake", certificationId?: string, userId?: string }) {
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
          const cert = await issueCertificate({
            fullName: trimmed.fullName,
            certificationTitle: certificationId, // Peut être remplacé par le vrai titre si disponible
            certificationId: certificationId,
          });
          setIssuedCertificate(cert);
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
          : "This information will be used to generate your official Abir-IA certificate. Please review carefully before submitting."}
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
          {issuing && <div style={{marginTop:8}}>⏳ Génération du certificat en cours...</div>}
          {issueError && <div style={{color:'#c62828',marginTop:8}}>{issueError}</div>}
          {issuedCertificate && (
            <div style={{marginTop:16,padding:12,border:'1px solid #3b82f6',borderRadius:8,background:'#f0f7ff'}}>
              <div style={{fontWeight:600,color:'#2563eb'}}>🎓 Certificat officiel émis !</div>
              <div><strong>Nom :</strong> {issuedCertificate.fullName}</div>
              <div><strong>Certification :</strong> {issuedCertificate.certificationTitle}</div>
              <div><strong>Date d'émission :</strong> {issuedCertificate.issueDate}</div>
              <div><strong>Numéro de série :</strong> {issuedCertificate.certificateSerial}</div>
              <div><strong>URL de vérification :</strong> <a href={issuedCertificate.verificationUrl} target="_blank" rel="noopener noreferrer">{issuedCertificate.verificationUrl}</a></div>
              {/* QR code de vérification : généré UNE FOIS lors de l'émission, prêt à être intégré dans le PDF */}
              {issuedCertificate.qrCodeDataUrl && (
                <div style={{marginTop:8}}>
                  <img src={issuedCertificate.qrCodeDataUrl} alt="QR Code de vérification" style={{width:120,height:120}} />
                  <div style={{fontSize:'0.9em',color:'#555',marginTop:4}}>Scannez pour vérifier l'authenticité du certificat</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {submitted && mode === "retake" && (
        <div className={styles.lockedMsg}>
          {retakeCode ? (
            <>
              <strong>Your retake code:</strong>
              <div className={styles.retakeCode}>{retakeCode}</div>
              <div className={styles.infoMsg}>Use this code to unlock your free retake. It is valid for one use only.</div>
            </>
          ) : retakeError ? (
            <div className={styles.retakeErrorBox}>
              <strong>Erreur lors de la génération du code :</strong><br />
              {retakeError}
            </div>
          ) : (
            <span>Generating your retake code...</span>
          )}
        </div>
      )}
    </div>
  );
}
