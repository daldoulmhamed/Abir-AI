// Utilisation côté client pour la démo (mock)
import { useState } from "react";

// Copie des codes pour usage local (normalement côté serveur)
const RETAKE_CODES = [
  "ABIR-RETAKE-019",
  "ABIR-RETAKE-029",
  "ABIR-RETAKE-039",
  "ABIR-RETAKE-049",
  "ABIR-RETAKE-059",
  "EXAM-RETAKE-069",
  "TEST-RETAKE-079",
  "CHANCE-RETAKE-099"
];

export function getMockRetakeCode() {
  // Pour la démo, retourne un code aléatoire
  const idx = Math.floor(Math.random() * RETAKE_CODES.length);
  return RETAKE_CODES[idx];
}
