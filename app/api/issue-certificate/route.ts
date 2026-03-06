import { NextRequest, NextResponse } from 'next/server';
import { generateCertificateSerial } from '@/utils/generateCertificateSerial.server';
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
    // Générer le numéro de série à partir de la table certifications
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    // Récupérer le dernier serial_number pour ce certificat
    const year = new Date().getFullYear();
    const certCode = certificationId.toUpperCase();
    const { data: lastSerialRow, error: serialError } = await supabase
      .from('certifications')
      .select('serial_number')
      .eq('certification_id', certCode)
      .eq('year', year)
      .order('serial_number', { ascending: false })
      .limit(1);
    let lastSerial = 0;
    if (serialError) {
      console.error('[CERTIFICATE] Supabase serial fetch error:', serialError);
    } else if (lastSerialRow && lastSerialRow.length > 0) {
      lastSerial = lastSerialRow[0].serial_number || 0;
    }
    const newSerial = lastSerial + 1;
    // Générer le numéro de série formaté
    function padId(id: number): string { return id.toString().padStart(6, '0'); }
    const certificateSerial = `ABIR-${certCode}-${year}-${padId(newSerial)}`;
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
    const date = issueDate || new Date().toISOString().slice(0, 10);
    lastStep = 'supabase insert';
    try {
      // Insérer le nouveau certificat dans la table certificates
      const { error: supabaseError } = await supabase.from('certificates').insert([
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
      // Mettre à jour la table certifications avec le nouveau serial_number
      const { error: updateError } = await supabase
        .from('certifications')
        .update({ serial_number: newSerial })
        .eq('certification_id', certCode)
        .eq('year', year);
      if (supabaseError) {
        console.error('[CERTIFICATE] Supabase error:', supabaseError);
      }
      if (updateError) {
        console.error('[CERTIFICATE] Supabase update error:', updateError);
      }
    } catch (err) {
      console.error('[CERTIFICATE] Supabase exception:', err);
    }
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
      certificateSerial,
      verificationUrl,
      qrCodeDataUrl,
    });
  } catch (err) {
    console.error(`[CERTIFICATE] Exception at step '${lastStep}':`, err);
    return NextResponse.json({ error: `Server error at step '${lastStep}'` }, { status: 500 });
  }
}
