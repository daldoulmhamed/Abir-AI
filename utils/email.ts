

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMail({
  to,
  subject,
  html,
  attachments = [],
}: {
  to: string;
  subject: string;
  html: string;
  attachments?: any[];
}) {
  // Resend attend des champs différents pour les pièces jointes
  // et le champ 'from' doit être un email vérifié sur Resend
  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Abir AI <onboarding@resend.dev>",
    to,
    subject,
    html,
    attachments: attachments.length ? attachments : undefined,
  });
}
