
import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { sendMail } from '@/utils/email';

// MVP persistence: utilise un fichier JSON pour stocker les retake tokens
const RETAKES_PATH = path.resolve(process.cwd(), "data/retakes.json");

/**
 * Normalise le nom pour éviter les erreurs de casse/espaces
 */
const normalizeName = (value?: string) =>
  value?.trim().toLowerCase().replace(/\s+/g, " ") || "";

export async function POST(request: Request) {
  // Parse le corps de la requête
  const body = (await request.json().catch(() => null)) as
    | { examId?: string; fullName?: string; email?: string }
    | null;

  // Validation des champs requis
  if (!body?.fullName) {
    return Response.json(
      { success: false, message: "fullName is required." },
      { status: 400 }
    );
  }

  // Ajout du retake token dans Supabase
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  const normalizedFullName = normalizeName(body.fullName);
  // Vérifie s'il existe déjà un token pour ce nom (et examId si fourni)
  const { data: existingAny, error: existingError } = await supabase
    .from('retake_tokens')
    .select('*')
    .eq('fullName', normalizedFullName)
    .eq('examId', body.examId || null);
  if (existingAny && existingAny.length > 0) {
    return Response.json({
      success: false,
      message: "A retake token already exists for this name (and exam if specified).",
      status: existingAny[0].status
    });
  }
  // Génère un nouveau token
  const tokenId = `RETAKE-${randomUUID().slice(0, 8).toUpperCase()}`;
  const newToken = {
    tokenId,
    examId: body.examId || null,
    fullName: normalizedFullName,
    status: "unused",
    createdAt: new Date().toISOString()
  };
  await supabase.from('retake_tokens').insert([newToken]);

  // Envoi d'un email d'encouragement avec lien vers les learning paths (sans code retake)
  if (body.email) {
    try {
      await sendMail({
        to: body.email,
        subject: `Abir-AI: Keep going!`,
        html: `<p>Bonjour <b>${body.fullName}</b>,<br>Ne baissez pas les bras ! Vous avez une seconde chance pour réussir votre certification.<br>Pour vous aider, découvrez nos <a href="https://abir-ai.com/learn">learning paths</a> et ressources.<br>Bonne chance !</p>`,
      });
    } catch (err) {}
  }
  return Response.json({
    success: true,
    tokenId,
    message: "Encouragement email sent."
  });
}
