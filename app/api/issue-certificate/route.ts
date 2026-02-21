import { NextRequest, NextResponse } from 'next/server';
import { generateCertificateSerial } from '@/utils/generateCertificateSerial.server';
import { buildVerificationUrl } from '@/data/certificateVerificationData';
import QRCode from 'qrcode';
import { sendMail } from '@/utils/email';

export async function POST(req: NextRequest) {
  try {
    const { fullName, certificationTitle, certificationId, issueDate, email } = await req.json();
    if (!fullName || !certificationTitle || !certificationId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    // Génération du numéro de série unique
    const certificateSerial = generateCertificateSerial(certificationId.toUpperCase());
    // Génération de l'URL de vérification (URL complète)
    const verificationUrl = buildVerificationUrl(certificateSerial);
    // --- Génération du QR code ---
    let qrCodeDataUrl: string | undefined = undefined;
    try {
      qrCodeDataUrl = await QRCode.toDataURL(verificationUrl);
    } catch (qrErr) {
      qrCodeDataUrl = undefined;
    }
    const date = issueDate || new Date().toISOString().slice(0, 10);
    // Ajout du certificat dans Supabase
    try {
      const { createClient } = require('@supabase/supabase-js');
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
      await supabase.from('certificates').insert([
        {
          status: 'Valid',
          fullName,
          certificationTitle,
          issueDate: date,
          certificateSerial,
          verificationUrl,
          qrCodeDataUrl,
        }
      ]);
    } catch (err) {}

    // Génération du PDF (appel API interne)
    let pdfBuffer: Buffer | null = null;
    try {
      // Détection automatique de l'URL de base (Vercel ou local)
      let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      if (!baseUrl) {
        if (process.env.VERCEL_URL) {
          baseUrl = `https://${process.env.VERCEL_URL}`;
        } else {
          baseUrl = 'http://localhost:3000';
        }
      }
      const res = await fetch(`${baseUrl}/api/certificate-serial/generate-pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          certificationTitle,
          certificateSerial,
          issuedAt: date,
          qrCodeDataUrl,
        })
      });
      if (res.ok) {
        const arrayBuffer = await res.arrayBuffer();
        pdfBuffer = Buffer.from(arrayBuffer);
      }
    } catch (err) {}

    // Envoi de l'email automatique si email fourni
    if (email) {
      try {
        await sendMail({
          to: email,
          subject: `Your Abir-AI Certificate: ${certificationTitle}`,
          html: `<p>Congratulations, <b>${fullName}</b>!<br>Your certificate is attached.<br>You can verify your achievement here: <a href="${verificationUrl}">${verificationUrl}</a>.<br><br>Keep learning and growing with our <a href="https://abir-ai.com/learn">learning paths</a>!</p>`,
          attachments: pdfBuffer ? [{ filename: `certificate-${certificateSerial}.pdf`, content: pdfBuffer }] : [],
        });
      } catch (err) {}
    }

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
