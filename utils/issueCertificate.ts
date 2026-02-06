// utils/issueCertificate.ts
// Ce module gère l'émission officielle d'un certificat Abir-IA après confirmation d'identité.
// Processus en deux étapes :
// 1. L'utilisateur réussit l'examen (mais aucun certificat officiel n'est généré à ce stade)
// 2. Après confirmation de l'identité, issueCertificate() est appelée pour générer et stocker le certificat officiel



export interface CertificateIssueInput {
  fullName: string;
  certificationTitle: string;
  certificationId: string;
  issueDate?: string;
}

export interface CertificateIssued {
  status: "Issued";
  fullName: string;
  certificationTitle: string;
  issueDate: string;
  certificateSerial: string;
  verificationUrl: string;
  qrCodeDataUrl?: string;
}

/**
 * Émet officiellement un certificat après confirmation d'identité.
 * Cette fonction doit être appelée UNE SEULE FOIS par réussite d'examen confirmée.
 */
export async function issueCertificate({ fullName, certificationTitle, certificationId, issueDate }: CertificateIssueInput): Promise<CertificateIssued> {
  const res = await fetch("/api/issue-certificate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, certificationTitle, certificationId, issueDate })
  });
  if (!res.ok) {
    throw new Error("Erreur lors de l'émission du certificat");
  }
  const data = await res.json();
  return data;
}

// ---
// Exemple d'utilisation :
// const cert = await issueCertificate({ fullName: "Alice", certificationTitle: "AI Fundamentals", certificationId: "GAI" });
// console.log(cert);
