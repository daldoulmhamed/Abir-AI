

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
  // Ce système n'est plus utilisé : la logique double chance gère l'accès sans token visible.
  return Response.json({
    success: false,
    message: "Retake token system deprecated. Use double chance logic."
  });
}
