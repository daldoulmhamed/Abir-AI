import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  console.log("[API /api/send-email] Route déclenchée");
  try {
    const { name, email, examTitle, score, certificateUrl, attachments } = await req.json();
    console.log("[API /api/send-email] Données reçues:", { name, email, examTitle, score, certificateUrl, attachments });

    const from = process.env.RESEND_FROM_EMAIL || "Abir AI <onboarding@resend.dev>";
    const subject = `Résultat de votre examen : ${examTitle}`;
    const html = `
      <h1>Bonjour ${name},</h1>
      <p>Votre score à l'examen <b>${examTitle}</b> est : <b>${score}</b>.</p>
      ${certificateUrl ? `<p>Votre certificat : <a href="${certificateUrl}">${certificateUrl}</a></p>` : ""}
      <p>Merci d'utiliser Abir-AI.</p>
    `;

    await sendEmail(
      email,
      subject,
      html,
      attachments || [],
      from
    );
    console.log("[API /api/send-email] Email envoyé à:", email);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[API /api/send-email] Erreur:", err);
    return NextResponse.json({ error: err?.message || "Erreur lors de l'envoi de l'email" }, { status: 500 });
  }
}
