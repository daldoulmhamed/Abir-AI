import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { examRegistered } from "@/emails/examRegistered";

export async function POST(req: NextRequest) {
  const { name, email, candidateId, examTitle } = await req.json();

  console.log("[API /exam/register] Données reçues:", { name, email, candidateId, examTitle });

  // TODO: Ajouter la logique d'enregistrement du candidat ici

  // Envoi de l'email de confirmation
  try {
    const result = await sendEmail(
      email,
      "Your exam registration is confirmed",
      examRegistered(name, examTitle)
    );
    console.log("[API /exam/register] Email envoyé à:", email, "Résultat:", result);
  } catch (err) {
    console.error("[API /exam/register] Erreur lors de l'envoi de l'email:", err);
  }

  return NextResponse.json({ success: true, message: "Registration email sent." });
}
