import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  to: string,
  subject: string,
  html: string
) {
  return resend.emails.send({
    from: "Abir AI <contact@abir-ai.com>",
    to,
    subject,
    html,
  });
}
