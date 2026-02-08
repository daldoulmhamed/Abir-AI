import { NextApiRequest, NextApiResponse } from 'next';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import { format } from 'date-fns';

// Utilitaire pour charger une image en ArrayBuffer
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

// DEBUG: Bloc try/catch global pour traçage des erreurs serveur
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let lastStep = 'start';
  try {
    console.log('[DEBUG] Step: Input validation - start');
    if (req.method !== 'POST') {
      lastStep = 'input validation';
      console.log('[DEBUG] Step: Input validation - failed (method)');
      return res.status(405).json({ error: 'Method not allowed' });
    }
    const {
      fullName,
      certificationTitle,
      certificateSerial,
      issuedAt,
      qrCodeDataUrl,
      examBadgeLogoUrl,
      backgroundTemplateUrl
    } = req.body;
    lastStep = 'input validation';
    console.log('[DEBUG] Step: Input validation - success');

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
      throw new Error('PDF creation failed');
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
      throw new Error('PDF page add failed');
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
      throw new Error('Font embedding failed');
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
        x: 1123 / 2 - fontBold.widthOfTextAtSize(fullName, 32) / 2,
        y: 397,
        size: 32,
        font: fontBold,
        color: rgb(0, 0, 0),
      });

      // Placer le titre d'examen et le badge en bas
      page.drawText(`"${certificationTitle}"`, {
        x: 1123 / 2 - fontBold.widthOfTextAtSize(`"${certificationTitle}"`, 24) / 2,
        y: 120,
        size: 24,
        font: fontBold,
        color: rgb(0, 0, 0),
      });
      if (badgeImageBuffer !== undefined && badgeImage) {
        page.drawImage(badgeImage, {
          x: 1123 / 2 - 60,
          y: 40,
          width: 120,
          height: 120,
        });
      }
      if (qrImageBuffer !== undefined && qrImage) {
        page.drawImage(qrImage, {
          x: 950,
          y: 80,
          width: 100,
          height: 100,
        });
      }
      page.drawText(certificateSerial, {
        x: 950,
        y: 60,
        size: 12,
        font: font,
        color: rgb(0, 0, 0),
      });
      const formattedDate = format(new Date(issuedAt), 'MMMM d, yyyy');
      page.drawText(formattedDate, {
        x: 60,
        y: 60,
        size: 14,
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
      throw new Error('PDF element placement failed');
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
      throw new Error('PDF save failed');
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="certificate.pdf"');
    res.send(Buffer.from(pdfBytes));
    lastStep = 'response sent';
    console.log('[DEBUG] Step: Response sent - success');
  } catch (err: any) {
    const log = (typeof err === 'object' && err !== null && 'stack' in err) ? (err as any).stack : err;
    const message = (typeof err === 'object' && err !== null && 'message' in err) ? (err as any).message : String(err);
    console.error('[API] Erreur globale lors de la génération du PDF:', message, log, 'Last step:', lastStep);
    res.status(500).json({ error: 'Erreur lors de la génération du PDF', details: message, stack: log || null, lastStep });
  }
};

export default handler;
