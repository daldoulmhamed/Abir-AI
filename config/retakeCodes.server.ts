import "server-only";

// Répartition sécurisée des retake codes par examen :
export const RETAKE_CODES = [
  // AI Productivity & GitHub Copilot
  "ABIR-RETAKE-019",
  "ABIR-RETAKE-029",

  // Generative AI Practitioner
  "ABIR-RETAKE-039",
  "ABIR-RETAKE-049",

  // Generative AI for Business Operations
  "ABIR-RETAKE-059",
  "EXAM-RETAKE-069",

  // AI Governance & Responsible AI Foundations
  "TEST-RETAKE-079",
  "CHANCE-RETAKE-099"
];

/**
 * Issue a retake code from the pool.
 * TODO: Replace with DB-backed issuance + redemption tracking.
 */
export function issueRetakeCode(): string {
  const index = Math.floor(Math.random() * RETAKE_CODES.length);
  return RETAKE_CODES[index];
}
