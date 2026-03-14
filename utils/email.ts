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
  const mailParams = {
    from: process.env.RESEND_FROM_EMAIL || "Abir AI <onboarding@resend.dev>",
    to,
    subject,
    html,
    attachments: attachments.length ? attachments : undefined,
  };
  console.log('[Resend] Params envoyés à resend.emails.send:', mailParams);
  return resend.emails.send(mailParams);
}
