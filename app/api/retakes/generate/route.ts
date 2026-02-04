
import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

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
    | { examId?: string; fullName?: string }
    | null;

  // Validation des champs requis
  if (!body?.fullName) {
    return Response.json(
      { success: false, message: "fullName is required." },
      { status: 400 }
    );
  }

  // Lecture du fichier JSON (MVP, pas de cache mémoire)
  let retakes: any[] = [];
  try {
    const file = await fs.readFile(RETAKES_PATH, "utf-8");
    retakes = JSON.parse(file);
  } catch (e) {
    // Si le fichier n'existe pas, on part d'un tableau vide
    retakes = [];
  }


  const normalizedFullName = normalizeName(body.fullName);

  // Vérifie s'il existe déjà un token pour ce nom (et examId si fourni), qu'il soit utilisé ou non
  const existingAny = retakes.find(
    (r) =>
      normalizeName(r.fullName) === normalizedFullName &&
      (!body.examId || r.examId === body.examId)
  );
  if (existingAny) {
    return Response.json({
      success: false,
      message: "A retake token already exists for this name (and exam if specified).",
      tokenId: existingAny.tokenId,
      status: existingAny.status
    });
  }

  // Génère un nouveau token
  const tokenId = `RETAKE-${randomUUID().slice(0, 8).toUpperCase()}`;
  const newToken = {
    tokenId,
    examId: body.examId || null,
    fullName: body.fullName,
    status: "unused",
    createdAt: new Date().toISOString()
  };
  retakes.push(newToken);

  // Écrit le fichier JSON (MVP, pas de gestion de concurrence)
  await fs.writeFile(RETAKES_PATH, JSON.stringify(retakes, null, 2), "utf-8");

  return Response.json({
    success: true,
    tokenId,
    message: "Retake token generated."
  });
}
