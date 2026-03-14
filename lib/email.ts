import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  attachments: any[] = [],
  from?: string
) {
  const mailParams = {
    from: from || process.env.RESEND_FROM_EMAIL || "Abir AI <onboarding@resend.dev>",
    to,
    subject,
    html,
    attachments: attachments.length ? attachments : undefined,
  };
  try {
    const result = await resend.emails.send(mailParams);
    console.log("[Resend] Résultat:", result);
    return result;
  } catch (error) {
    console.error("[Resend] ERREUR:", error);
    throw error;
  }
}
