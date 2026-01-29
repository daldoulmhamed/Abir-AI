import { issueRetakeCode } from "@/config/retakeCodes.server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { certificationId?: string }
    | null;

  if (!body?.certificationId) {
    return Response.json(
      { success: false, message: "Certification ID is required." },
      { status: 400 }
    );
  }

  // TODO: Validate failed attempt + enforce one retake per paid exam in DB.
  const code = issueRetakeCode();

  return Response.json({
    success: true,
    code,
    message: "Retake code issued after failed attempt."
  });
}
