type RetakeStore = {
  codes: string[];
  issuedAt: string;
};

function normalizeRetakeCode(code: string) {
  return code.trim().toUpperCase();
}

function getStorageKey(certificationId: string) {
  return `abir_retake_codes_${certificationId}`;
}

export function getIssuedRetakeCodes(certificationId: string): string[] {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(getStorageKey(certificationId));
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as RetakeStore;
    return Array.isArray(parsed.codes) ? parsed.codes : [];
  } catch {
    return [];
  }
}

export function storeIssuedRetakeCode(certificationId: string, code: string) {
  if (typeof window === "undefined") return;

  const existing = getIssuedRetakeCodes(certificationId);
  const normalized = normalizeRetakeCode(code);
  const updated = Array.from(new Set([...existing, normalized]));

  const payload: RetakeStore = {
    codes: updated,
    issuedAt: new Date().toISOString()
  };

  window.localStorage.setItem(getStorageKey(certificationId), JSON.stringify(payload));
}

export function validateRetakeCodeLocal(certificationId: string, code: string): boolean {
  const issued = getIssuedRetakeCodes(certificationId);
  return issued.includes(normalizeRetakeCode(code));
}

export async function requestRetakeCode(certificationId: string): Promise<string | null> {
  // Call this after a failed attempt to issue & store a retake code locally.
  const response = await fetch("/api/retakes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ certificationId })
  });

  const data = (await response.json()) as { success?: boolean; code?: string };

  if (!data?.success || !data?.code) {
    return null;
  }

  storeIssuedRetakeCode(certificationId, data.code);
  return data.code;
}
