import { NextRequest, NextResponse } from 'next/server';
import { generateCertificateSerial } from '@/utils/generateCertificateSerial.server';
import { buildVerificationUrl } from '@/data/certificateVerificationData';
import QRCode from 'qrcode'; // Utilisé pour générer le QR code (dépendance installée)

export async function POST(req: NextRequest) {
  try {
    const { fullName, certificationTitle, certificationId, issueDate } = await req.json();
    if (!fullName || !certificationTitle || !certificationId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    // Génération du numéro de série unique
    const certificateSerial = generateCertificateSerial(certificationId.toUpperCase());
    // Génération de l'URL de vérification (URL complète)
    const verificationUrl = buildVerificationUrl(certificateSerial);
    // --- Génération du QR code ---
    // Le QR code encode l'URL de vérification du certificat (URL complète)
    let qrCodeDataUrl: string | undefined = undefined;
    try {
      qrCodeDataUrl = await QRCode.toDataURL(verificationUrl);
    } catch (qrErr) {
      // En cas d'échec, le certificat reste valide mais sans QR code
      qrCodeDataUrl = undefined;
    }
    // Date d'émission (aujourd'hui si non fournie)
    const date = issueDate || new Date().toISOString().slice(0, 10);
    // Ajout du certificat dans certificateVerificationData.ts
    try {
      const fs = require('fs');
      const path = require('path');
      const CERT_DATA_FILE = path.resolve(process.cwd(), 'data/certificateVerificationData.ts');
      // Lecture du fichier
      let content = fs.readFileSync(CERT_DATA_FILE, 'utf-8');
      // Ajout du certificat dans le tableau certificates
      const newCert = `{
        status: "Valid",
        fullName: "${fullName.replace(/"/g, '\"')}",
        certificationTitle: "${certificationTitle.replace(/"/g, '\"')}",
        issueDate: "${date}",
        certificateSerial: "${certificateSerial}",
        verificationUrl: "${verificationUrl}",
        qrCodeDataUrl: ${qrCodeDataUrl ? `"${qrCodeDataUrl}"` : 'undefined'},
      }`;
      // Trouver la fin du tableau certificates
      content = content.replace(/(export const certificates: Certificate\[] = \[)([^]*?)(\];)/, (match: string, p1: string, p2: string, p3: string) => {
        // Ajoute la virgule si nécessaire
        const trimmed = p2.trim();
        const needsComma = trimmed && !trimmed.endsWith(',') ? ',' : '';
        return `${p1}${p2}${needsComma}\n  ${newCert}\n${p3}`;
      });
      fs.writeFileSync(CERT_DATA_FILE, content);
    } catch (err) {
      // Ignore en cas d'échec, log possible
    }
    // Retourne le certificat officiel
    return NextResponse.json({
      status: 'Issued',
      fullName,
      certificationTitle,
      issueDate: date,
      certificateSerial,
      verificationUrl,
      qrCodeDataUrl,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
