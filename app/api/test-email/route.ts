import { sendEmail } from "@/lib/email";

export async function GET() {
  console.log("Route /test-email déclenchée !");
  try {
    const result = await sendEmail(
      "tonemail@gmail.com",
      "Test Resend",
      "<b>Test email OK</b>"
    );
    return new Response(JSON.stringify({ ok: true, result }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ ok: false, error: error.message }), { status: 500 });
  }
}
