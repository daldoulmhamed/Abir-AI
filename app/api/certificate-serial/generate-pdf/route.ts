import { NextApiRequest, NextApiResponse } from 'next';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import { format } from 'date-fns';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
async function fetchImageBuffer(url: string | undefined): Promise<Uint8Array | undefined> {
  if (!url) return undefined;
  if (url.startsWith("data:image")) {
    const base64 = url.split(",")[1];
    return Uint8Array.from(Buffer.from(base64, "base64"));
  }
  if (url.startsWith("http://") || url.startsWith("https://")) {
    try {
      const res = await fetch(url);
      if (!res.ok) return undefined;
      const arrayBuffer = await res.arrayBuffer();
      return new Uint8Array(arrayBuffer);
    } catch {
      return undefined;
    }
  }
  if (url.startsWith("/")) {
    const localPath = path.join(PUBLIC_DIR, url);
    try {
      const fileBuffer = await fs.readFile(localPath);
      return Uint8Array.from(fileBuffer);
    } catch {
      return undefined;
    }
  }
  return undefined;
}

export async function POST(req: Request) {
  let lastStep = 'start';
  try {
    console.log('[DEBUG] Step: Input validation - start');
    const body = await req.json();
    let {
      fullName,
      certificationTitle,
      certificateSerial,
      issuedAt,
      qrCodeDataUrl,
      examBadgeLogoUrl,
      backgroundTemplateUrl
    } = body;
    lastStep = 'input validation';
    // Correction : si backgroundTemplateUrl est vide, on met le chemin par défaut
    if (!backgroundTemplateUrl) {
      backgroundTemplateUrl = '/images/certbg.png';
      console.log('[DEBUG] backgroundTemplateUrl manquant, valeur par défaut utilisée:', backgroundTemplateUrl);
    }
    console.log('[DEBUG] Step: Input validation - success');
    console.log('[DEBUG] Champs reçus:', {
      fullName,
      certificationTitle,
      certificateSerial,
      issuedAt,
      qrCodeDataUrl,
      examBadgeLogoUrl,
      backgroundTemplateUrl
    });
    // Vérification accessibilité HTTP
    if (backgroundTemplateUrl.startsWith('/')) {
      const testUrl = `http://localhost:3000${backgroundTemplateUrl}`;
      console.log('[DEBUG] Testez ce lien dans votre navigateur pour vérifier l\'accessibilité du fond :', testUrl);
    }

    console.log('[DEBUG] Step: PDF document creation - start');
    let pdfDoc;
    try {
      pdfDoc = await PDFDocument.create();
      lastStep = 'PDF document creation';
      console.log('[DEBUG] Step: PDF document creation - success');
    } catch (err) {
      lastStep = 'PDF document creation';
      const errMsg = (typeof err === 'object' && err !== null && 'message' in err) ? (err as any).message : String(err);
      const errStack = (typeof err === 'object' && err !== null && 'stack' in err) ? (err as any).stack : '';
      console.error('[PDF] Erreur lors de la création du PDF:', errMsg, errStack, 'Last step:', lastStep);
      return new Response(JSON.stringify({ error: 'PDF creation failed', details: errMsg, stack: errStack, lastStep }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    console.log('[DEBUG] Step: PDF page add - start');
    let page;
    try {
      page = pdfDoc.addPage([1123, 794]);
      lastStep = 'PDF page add';
      console.log('[DEBUG] Step: PDF page add - success');
    } catch (err) {
      lastStep = 'PDF page add';
      const errMsg = (typeof err === 'object' && err !== null && 'message' in err) ? (err as any).message : String(err);
      const errStack = (typeof err === 'object' && err !== null && 'stack' in err) ? (err as any).stack : '';
      console.error('[PDF] Erreur lors de l\'ajout de la page:', errMsg, errStack, 'Last step:', lastStep);
      return new Response(JSON.stringify({ error: 'PDF page add failed', details: errMsg, stack: errStack, lastStep }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    console.log('[DEBUG] Step: Font embedding - start');
    let font, fontBold;
    try {
      font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      lastStep = 'Font embedding';
      console.log('[DEBUG] Step: Font embedding - success');
    } catch (err) {
      lastStep = 'Font embedding';
      const errMsg = (typeof err === 'object' && err !== null && 'message' in err) ? (err as any).message : String(err);
      const errStack = (typeof err === 'object' && err !== null && 'stack' in err) ? (err as any).stack : '';
      console.error('[PDF] Erreur lors de l\'intégration des polices:', errMsg, errStack, 'Last step:', lastStep);
      return new Response(JSON.stringify({ error: 'Font embedding failed', details: errMsg, stack: errStack, lastStep }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    // Background template loading
    if (backgroundTemplateUrl) {
      console.log('[DEBUG] Step: Background template loading - start');
      let bgBytes;
      try {
        bgBytes = await fetchImageBuffer(backgroundTemplateUrl);
        lastStep = 'Background template loading';
        console.log('[DEBUG] Step: Background template loading - bytes loaded');
      } catch (err) {
        lastStep = 'Background template loading';
        const errMsg = (typeof err === 'object' && err !== null && 'message' in err) ? (err as any).message : String(err);
        const errStack = (typeof err === 'object' && err !== null && 'stack' in err) ? (err as any).stack : '';
        console.error('[Image] Erreur lors du chargement du fond:', errMsg, errStack, 'Last step:', lastStep);
        bgBytes = undefined;
      }
      let bgImage;
      if (bgBytes !== undefined) {
        try {
          bgImage = await pdfDoc.embedPng(bgBytes);
          lastStep = 'Background template embedding';
          console.log('[DEBUG] Step: Background template embedding - success');
        } catch (err) {
          lastStep = 'Background template embedding';
          const errMsg = (typeof err === 'object' && err !== null && 'message' in err) ? (err as any).message : String(err);
          const errStack = (typeof err === 'object' && err !== null && 'stack' in err) ? (err as any).stack : '';
          console.error('[Image] Erreur lors de l\'intégration du fond:', errMsg, errStack, 'Last step:', lastStep);
          bgImage = undefined;
        }
      }
      if (bgImage) {
        try {
          page.drawImage(bgImage, {
            x: 0,
            y: 0,
            width: 1123,
            height: 794,
          });
          lastStep = 'Background template placement';
          console.log('[DEBUG] Step: Background template placement - success');
        } catch (err) {
          lastStep = 'Background template placement';
          const errMsg = (typeof err === 'object' && err !== null && 'message' in err) ? (err as any).message : String(err);
          const errStack = (typeof err === 'object' && err !== null && 'stack' in err) ? (err as any).stack : '';
          console.error('[PDF] Erreur lors du placement du fond:', errMsg, errStack, 'Last step:', lastStep);
        }
      }
    }

    // Badge image loading
    console.log('[DEBUG] Step: Badge image loading - start');
    let badgeImage = undefined;
    let badgeBytes;
    try {
      badgeBytes = await fetchImageBuffer(examBadgeLogoUrl);
      lastStep = 'Badge image loading';
      console.log('[DEBUG] Step: Badge image loading - bytes loaded');
    } catch (err) {
      lastStep = 'Badge image loading';
      const errMsg = (typeof err === 'object' && err !== null && 'message' in err) ? (err as any).message : String(err);
      const errStack = (typeof err === 'object' && err !== null && 'stack' in err) ? (err as any).stack : '';
      console.error('[Image] Erreur lors du chargement du badge:', errMsg, errStack, 'Last step:', lastStep);
      badgeBytes = undefined;
    }
    const badgeImageBuffer = badgeBytes ? await fetchImageBuffer(examBadgeLogoUrl) : undefined;
    if (badgeBytes !== undefined) {
      try {
        badgeImage = await pdfDoc.embedPng(badgeBytes);
        lastStep = 'Badge image embedding';
        console.log('[DEBUG] Step: Badge image embedding - success');
      } catch (err) {
        lastStep = 'Badge image embedding';
        const errMsg = (typeof err === 'object' && err !== null && 'message' in err) ? (err as any).message : String(err);
        const errStack = (typeof err === 'object' && err !== null && 'stack' in err) ? (err as any).stack : '';
        console.error('[Image] Erreur lors de l\'intégration du badge:', errMsg, errStack, 'Last step:', lastStep);
        badgeImage = undefined;
      }
    }

    // QR code embedding
    console.log('[DEBUG] Step: QR code loading - start');
    let qrImage = undefined;
    let qrBytes;
    try {
      qrBytes = await fetchImageBuffer(qrCodeDataUrl);
      lastStep = 'QR code loading';
      console.log('[DEBUG] Step: QR code loading - bytes loaded');
    } catch (err) {
      lastStep = 'QR code loading';
      const errMsg = (typeof err === 'object' && err !== null && 'message' in err) ? (err as any).message : String(err);
      const errStack = (typeof err === 'object' && err !== null && 'stack' in err) ? (err as any).stack : '';
      console.error('[Image] Erreur lors du chargement du QR:', errMsg, errStack, 'Last step:', lastStep);
      qrBytes = undefined;
    }
    const qrImageBuffer = qrBytes ? await fetchImageBuffer(qrCodeDataUrl) : undefined;
    if (qrBytes !== undefined) {
      try {
        qrImage = await pdfDoc.embedPng(qrBytes);
        lastStep = 'QR code embedding';
        console.log('[DEBUG] Step: QR code embedding - success');
      } catch (err) {
        lastStep = 'QR code embedding';
        const errMsg = (typeof err === 'object' && err !== null && 'message' in err) ? (err as any).message : String(err);
        const errStack = (typeof err === 'object' && err !== null && 'stack' in err) ? (err as any).stack : '';
        console.error('[Image] Erreur lors de l\'intégration du badge:', errMsg, errStack, 'Last step:', lastStep);
        qrImage = undefined;
      }
    }

    // Placement des éléments
    console.log('[DEBUG] Step: PDF element placement - start');
    try {
      // Centrer le nom d'utilisateur au milieu du certificat
      page.drawText(fullName, {
        x: 1123 / 2 - fontBold.widthOfTextAtSize(fullName, 80) / 2,
        y: 408,
        size: 80,
        font: fontBold,
        color: rgb(0, 0, 0),
      });

      // Placer le titre d'examen et le badge en bas
      page.drawText(`"${certificationTitle}"`, {
        x: 1123 / 2 - fontBold.widthOfTextAtSize(`"${certificationTitle}"`, 24) / 2,
        y: 280,
        size: 24,
        font: fontBold,
        color: rgb(0, 0, 0),
      });
      if (badgeImageBuffer !== undefined && badgeImage) {
        page.drawImage(badgeImage, {
          x: 1123 / 2 - 115,
          y: 40,
          width: 230,
          height: 230,
        });
      }
      if (qrImageBuffer !== undefined && qrImage) {
        page.drawImage(qrImage, {
          x: 865,
          y: 100,
          width: 130,
          height: 130,
        });
      }
      page.drawText(certificateSerial, {
        x: 850,
        y: 60,
        size: 16,
        font: font,
        color: rgb(0, 0, 0),
      });
      const formattedDate = format(new Date(issuedAt), 'MMMM d, yyyy');
      page.drawText(formattedDate, {
        x: 120,
        y: 150,
        size: 20,
        font: font,
        color: rgb(0, 0, 0),
      });
      lastStep = 'PDF element placement';
      console.log('[DEBUG] Step: PDF element placement - success');
    } catch (err) {
      lastStep = 'PDF element placement';
      const errMsg = (typeof err === 'object' && err !== null && 'message' in err) ? (err as any).message : String(err);
      const errStack = (typeof err === 'object' && err !== null && 'stack' in err) ? (err as any).stack : '';
      console.error('[PDF] Erreur lors du placement des éléments:', errMsg, errStack, 'Last step:', lastStep);
      return new Response(JSON.stringify({ error: 'PDF element placement failed', details: errMsg, stack: errStack, lastStep }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    // PDF export
    console.log('[DEBUG] Step: PDF export - start');
    let pdfBytes;
    try {
      pdfBytes = await pdfDoc.save();
      lastStep = 'PDF export';
      console.log('[DEBUG] Step: PDF export - success');
    } catch (err) {
      lastStep = 'PDF export';
      const errMsg = (typeof err === 'object' && err !== null && 'message' in err) ? (err as any).message : String(err);
      const errStack = (typeof err === 'object' && err !== null && 'stack' in err) ? (err as any).stack : '';
      console.error('[PDF] Erreur lors de la sauvegarde du PDF:', errMsg, errStack, 'Last step:', lastStep);
      return new Response(JSON.stringify({ error: 'PDF save failed', details: errMsg, stack: errStack, lastStep }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    // Retour PDF
    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', 'attachment; filename="certificate.pdf"');
    lastStep = 'response sent';
    console.log('[DEBUG] Step: Response sent - success');
    return new Response(Buffer.from(pdfBytes), { status: 200, headers });
  } catch (err: any) {
    let log = '';
    let message = '';
    if (typeof err === 'object' && err !== null) {
      log = 'stack' in err ? (err as any).stack : '';
      message = 'message' in err ? (err as any).message : String(err);
    } else {
      log = String(err);
      message = String(err);
    }
    console.error('[API] Erreur globale lors de la génération du PDF:', message, log, 'Last step:', lastStep);
    return new Response(JSON.stringify({ error: 'Erreur lors de la génération du PDF', details: message, stack: log || null, lastStep }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
