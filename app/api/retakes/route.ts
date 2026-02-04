

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

  // Cette route n'est plus utilisée, la logique de génération de code est dans /api/retakes/generate
  return Response.json({
    success: false,
    message: "Use /api/retakes/generate for retake code issuance."
  }, { status: 400 });
}
