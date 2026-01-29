import "server-only";

export type VoucherEntry = {
  code: string;
  certificationId: string;
};

/**
 * Server-only voucher registry.
 * - Store vouchers here until a database is available.
 * - Each voucher must be linked to a certification ID.
 */
export const VOUCHERS: VoucherEntry[] = [
  // TODO: Replace with DB lookups once persistence is available.
  { code: "ABIR-BETA-2026", certificationId: "ai-productivity-github-copilot" },
  { code: "GENAI-STUDENT", certificationId: "generative-ai-practitioner" },
  { code: "PARTNER-FREE", certificationId: "generative-ai-business-operations" },
  { code: "TEST-CHECK", certificationId: "ai-governance-responsible-ai-foundations" },
  { code: "DALDOUL-HERE", certificationId: "*" }
];

export function normalizeVoucherCode(code: string): string {
  return code.trim().toUpperCase();
}

export function findVoucher(code: string, certificationId: string): VoucherEntry | undefined {
  const normalizedCode = normalizeVoucherCode(code);
  return VOUCHERS.find(
    (voucher) =>
      normalizeVoucherCode(voucher.code) === normalizedCode &&
      (voucher.certificationId === certificationId || voucher.certificationId === "*")
  );
}
