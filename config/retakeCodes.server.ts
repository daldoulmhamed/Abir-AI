import "server-only";

export const RETAKE_CODES = [
  "ABIR-RETAKE-019",
  "ABIR-RETAKE-029",
  "ABIR-RETAKE-039",
  "ABIR-RETAKE-049",
  "ABIR-RETAKE-059",
  "EXAM-RETAKE-069",
  "TEST-RETAKE-079",
  "ABIR-RETAKE-089",
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
