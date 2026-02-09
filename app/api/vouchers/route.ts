import { cookies } from "next/headers";
import { findVoucher, normalizeVoucherCode } from "@/config/vouchers.server";

const COOKIE_PREFIX = "exam_access";

function buildAccessCookieName(certificationId: string) {
  return `${COOKIE_PREFIX}_${certificationId}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const certificationId = searchParams.get("certificationId")?.trim();

  if (!certificationId) {
    return Response.json(
      { success: false, message: "Certification ID is required." },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  const accessCookie = cookieStore.get(buildAccessCookieName(certificationId));
  const hasAccess = accessCookie?.value === "granted";

  return Response.json({ success: true, hasAccess });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { code?: string; certificationId?: string }
    | null;

  if (!body?.code || !body?.certificationId) {
    return Response.json(
      { success: false, message: "Voucher code and certification ID are required." },
      { status: 400 }
    );
  }

  const certificationId = body.certificationId.trim();
  const voucherCode = normalizeVoucherCode(body.code);
  // Système de suivi des vouchers utilisés (en mémoire, à remplacer par DB plus tard)
  // On utilise un cookie pour simuler la rédemption côté serveur
  const voucher = findVoucher(voucherCode, certificationId);

  if (!voucher) {
    return Response.json(
      { success: false, message: "Voucher code is invalid or expired." },
      { status: 400 }
    );
  }

  // DALDOUL-HERE : toujours actif, sécurisé
  if (voucher.code === "DALDOUL-HERE") {
    // Optionnel : ajouter une vérification admin ici
    const cookieStore = await cookies();
    cookieStore.set(buildAccessCookieName(certificationId), "granted", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365 // 1 an
    });
    return Response.json({
      success: true,
      message: "Voucher admin accepté. Accès toujours actif."
    });
  }

  // Vérifier si le voucher a déjà été utilisé (cookie)
  const cookieStore = await cookies();
  const usedVoucher = cookieStore.get(`voucher_used_${voucherCode}`);
  if (usedVoucher) {
    return Response.json(
      { success: false, message: "Ce voucher a déjà été utilisé et est expiré." },
      { status: 400 }
    );
  }

  // Marquer le voucher comme utilisé
  cookieStore.set(`voucher_used_${voucherCode}`, "used", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365 // 1 an
  });

  // Accorder l'accès à l'examen
  cookieStore.set(buildAccessCookieName(certificationId), "granted", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });

  return Response.json({
    success: true,
    message: "Voucher accepté. Exam access unlocked."
  });
}
