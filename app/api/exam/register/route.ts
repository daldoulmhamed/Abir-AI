import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { examRegistered } from "@/emails/examRegistered";

export interface ExamRegisterBody {
  name: string;
  email: string;
  candidateId: string;
  examTitle: string;
  passingScore?: number;
}

export async function POST(req: NextRequest) {
  console.log("[API /exam/register] Route déclenchée");
  try {
    const { name, email, candidateId, examTitle }: ExamRegisterBody = await req.json();
    console.log("[API /exam/register] Données reçues:", { name, email, candidateId, examTitle });

    const from = process.env.RESEND_FROM_EMAIL || "Abir AI <onboarding@resend.dev>";
    const subject = "Your exam registration is confirmed";
    const html = examRegistered(name, examTitle);

    const result = await sendEmail(email, subject, html, undefined, from);
    console.log("[API /exam/register] Email envoyé à:", email, "Résultat:", result);
    return NextResponse.json({ success: true, message: "Registration email sent." });
  } catch (err: any) {
    console.error("[API /exam/register] Erreur:", err);
    return NextResponse.json({ success: false, message: err?.message || "Erreur lors de l'envoi de l'email" }, { status: 500 });
  }
}
