

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
    | {
        tokenId?: string;
        examId?: string;
        fullName?: string;
      }
    | null;

  // Validation des champs requis
  if (!body?.tokenId || !body?.examId || !body?.fullName) {
    return Response.json(
      { success: false, message: "tokenId, examId, and fullName are required." },
      { status: 400 }
    );
  }

  // Lecture du fichier JSON (MVP, pas de cache mémoire)
  let retakes: any[] = [];
  try {
    const file = await fs.readFile(RETAKES_PATH, "utf-8");
    retakes = JSON.parse(file);
  } catch (e) {
    retakes = [];
  }

  const normalizedFullName = normalizeName(body.fullName);

  // Recherche du token correspondant
  const idx = retakes.findIndex(
    (r) =>
      r.tokenId === body.tokenId &&
      (r.examId === body.examId || r.examId == null) &&
      normalizeName(r.fullName) === normalizedFullName
  );
  if (idx === -1) {
    return Response.json({
      success: false,
      message: "Invalid or expired retake token."
    });
  }
  if (retakes[idx].status !== "unused") {
    return Response.json({
      success: false,
      message: "Retake token already used."
    });
  }

  // Marque le token comme utilisé
  retakes[idx].status = "used";
  await fs.writeFile(RETAKES_PATH, JSON.stringify(retakes, null, 2), "utf-8");

  return Response.json({
    success: true,
    message: "Retake token is valid and now marked as used."
  });
}
