import { NextRequest, NextResponse } from 'next/server';
// import supprimé : génération du numéro de série côté Supabase
import { buildVerificationUrl } from '@/data/certificateVerificationData';
import QRCode from 'qrcode';
import { sendMail } from '@/utils/email';

export async function POST(req: NextRequest) {
  let lastStep = 'start';
  try {
    lastStep = 'input validation';
    const { fullName, certificationTitle, certificationId, issueDate, email } = await req.json();
    if (!fullName || !certificationTitle || !certificationId) {
      console.error('[CERTIFICATE] Validation error:', { fullName, certificationTitle, certificationId });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    lastStep = 'serial generation';
    // Nouvelle logique : insertion dans Supabase, génération automatique du serial_number
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const date = issueDate || new Date().toISOString().slice(0, 10);
    // Insérer la ligne dans certifications, laisser le trigger générer serial_number
    const { data: insertData, error: insertError } = await supabase
      .from('certifications')
      .insert([
        {
          full_name: fullName,
          certification_title: certificationTitle,
          issued_at: date,
        }
      ])
      .select()
      .single();
    if (insertError || !insertData) {
      console.error('[CERTIFICATE] Supabase insert error:', insertError);
      return NextResponse.json({ error: 'Erreur lors de la création du certificat' }, { status: 500 });
    }
    const certificateSerial = insertData.serial_number;
    lastStep = 'verification url';
    const verificationUrl = buildVerificationUrl(certificateSerial);
    lastStep = 'qr code generation';
    let qrCodeDataUrl = undefined;
    try {
      qrCodeDataUrl = await QRCode.toDataURL(verificationUrl);
    } catch (qrErr) {
      console.error('[CERTIFICATE] QR code error:', qrErr);
      qrCodeDataUrl = undefined;
    }
    // Facultatif : insérer dans une table certificates si besoin, ou ignorer si tout est dans certifications
    // Réponse API
    lastStep = 'pdf generation';
    let pdfBuffer: Buffer | null = null;
    try {
      let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      if (!baseUrl) {
        if (process.env.VERCEL_URL) {
          baseUrl = `https://${process.env.VERCEL_URL}`;
        } else {
          baseUrl = 'http://localhost:3000';
        }
      }
      baseUrl = baseUrl.replace(/\/$/, '');
      console.log('[PDF] Base URL utilisé:', baseUrl);
      const fetchUrl = `${baseUrl}/api/certificate-serial/generate-pdf`;
      console.log('[PDF] URL de fetch:', fetchUrl);
      const res = await fetch(fetchUrl, {
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
      console.log('[PDF] Réponse API:', res.status, res.statusText);
      if (res.ok) {
        const arrayBuffer = await res.arrayBuffer();
        pdfBuffer = Buffer.from(arrayBuffer);
        console.log('[PDF] PDF généré avec succès');
      } else {
        const pdfErrorText = await res.text();
        console.error('[PDF] Erreur lors de la génération du PDF:', pdfErrorText);
      }
    } catch (err) {
      console.error('[PDF] Exception lors de la génération du PDF:', err);
    }
    lastStep = 'email sending';
    if (email) {
      try {
        await sendMail({
          to: email,
          subject: `Your Abir-AI Certificate: ${certificationTitle}`,
          html: `<p>Congratulations, <b>${fullName}</b>!<br>Your certificate is attached.<br>You can verify your achievement here: <a href="${verificationUrl}">${verificationUrl}</a>.<br><br>Keep learning and growing with our <a href="https://abir-ai.com/learn">learning paths</a>!</p>`,
          attachments: pdfBuffer ? [{ filename: `certificate-${certificateSerial}.pdf`, content: pdfBuffer }] : [],
        });
      } catch (err) {
        console.error('[CERTIFICATE] Email error:', err);
      }
    }
    lastStep = 'response';
    return NextResponse.json({
      status: 'Issued',
      fullName,
      certificationTitle,
      issueDate: date,
      certificateSerial, // serial_number généré par Supabase
      verificationUrl,
      qrCodeDataUrl,
    });
  } catch (err) {
    console.error(`[CERTIFICATE] Exception at step '${lastStep}':`, err);
    return NextResponse.json({ error: `Server error at step '${lastStep}'` }, { status: 500 });
  }
}
