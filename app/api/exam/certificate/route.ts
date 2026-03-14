import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export interface ExamCertificateBody {
  name: string;
  email: string;
  examTitle: string;
  score: number;
  passingScore: number;
  certificateUrl: string;
  attachments?: any[];
}

function examPassed(name: string, examTitle: string, certificateUrl: string) {
  return `
    <h1>Congratulations, ${name}!</h1>
    <p>You passed the <b>${examTitle}</b> exam.</p>
    <p>Your certificate: <a href="${certificateUrl}">${certificateUrl}</a></p>
    <p>— Abir-AI Team</p>
  `;
}

export async function POST(req: NextRequest) {
  console.log("[API /exam/certificate] Route déclenchée");
  try {
    const { name, email, examTitle, score, passingScore, certificateUrl, attachments }: ExamCertificateBody = await req.json();
    console.log("[API /exam/certificate] Données reçues:", { name, email, examTitle, score, passingScore, certificateUrl, attachments });

    if (score >= passingScore) {
      const from = process.env.RESEND_FROM_EMAIL || "Abir AI <onboarding@resend.dev>";
      const subject = `Your certificate for ${examTitle}`;
      const html = examPassed(name, examTitle, certificateUrl);
      const result = await sendEmail(email, subject, html, attachments, from);
      console.log("[API /exam/certificate] Email de certificat envoyé à:", email, "Résultat:", result);
    }
    return NextResponse.json({ success: true, message: "Certificate email sent." });
  } catch (err: any) {
    console.error("[API /exam/certificate] Erreur:", err);
    return NextResponse.json({ success: false, message: err?.message || "Erreur lors de l'envoi de l'email" }, { status: 500 });
  }
}
