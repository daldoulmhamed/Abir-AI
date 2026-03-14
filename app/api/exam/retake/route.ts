import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export interface ExamRetakeBody {
  name: string;
  email: string;
  examTitle: string;
  score: number;
  passingScore: number;
}

function examFailed(name: string, examTitle: string) {
  return `
    <h1>Keep going, ${name}!</h1>
    <p>Unfortunately, you did not pass the <b>${examTitle}</b> exam this time.</p>
    <p>You can retake the exam and try again. Good luck!</p>
    <p>— Abir-AI Team</p>
  `;
}

export async function POST(req: NextRequest) {
  console.log("[API /exam/retake] Route déclenchée");
  try {
    const { name, email, examTitle, score, passingScore }: ExamRetakeBody = await req.json();
    console.log("[API /exam/retake] Données reçues:", { name, email, examTitle, score, passingScore });

    if (score < passingScore) {
      const from = process.env.RESEND_FROM_EMAIL || "Abir AI <onboarding@resend.dev>";
      const subject = `Encouragement for your exam: ${examTitle}`;
      const html = examFailed(name, examTitle);
      const result = await sendEmail(email, subject, html, undefined, from);
      console.log("[API /exam/retake] Email d'encouragement envoyé à:", email, "Résultat:", result);
    }
    return NextResponse.json({ success: true, message: "Retake email sent." });
  } catch (err: any) {
    console.error("[API /exam/retake] Erreur:", err);
    return NextResponse.json({ success: false, message: err?.message || "Erreur lors de l'envoi de l'email" }, { status: 500 });
  }
}
