import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { examRegistered } from "@/emails/examRegistered";

export async function POST(req: NextRequest) {
  const { name, email, candidateId, examTitle } = await req.json();

  // TODO: Ajouter la logique d'enregistrement du candidat ici

  // Envoi de l'email de confirmation
  await sendEmail(
    email,
    "Your exam registration is confirmed",
    examRegistered(name, examTitle)
  );

  return NextResponse.json({ success: true, message: "Registration email sent." });
}
