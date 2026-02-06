import { NextRequest, NextResponse } from 'next/server';
import { generateCertificateSerial } from '@/utils/toolLinks';
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
    // Génération de l'URL de vérification
    const verificationUrl = buildVerificationUrl(certificateSerial);
    // --- Génération du QR code ---
    // Le QR code encode l'URL de vérification du certificat.
    // Il est généré UNE SEULE FOIS lors de l'émission du certificat officiel,
    // puis stocké dans le champ qrCodeDataUrl du modèle Certificate.
    // Ce QR code pourra être intégré dans le PDF du certificat ou affiché à l'écran.
    let qrCodeDataUrl: string | undefined = undefined;
    try {
      qrCodeDataUrl = await QRCode.toDataURL(verificationUrl);
    } catch (qrErr) {
      // En cas d'échec, le certificat reste valide mais sans QR code
      qrCodeDataUrl = undefined;
    }
    // Date d'émission (aujourd'hui si non fournie)
    const date = issueDate || new Date().toISOString().slice(0, 10);
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
