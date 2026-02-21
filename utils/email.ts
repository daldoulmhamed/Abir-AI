
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'abir.ai.contact@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

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
  return transporter.sendMail({
    from: 'abir.ai.contact@gmail.com',
    to,
    subject,
    html,
    attachments,
  });
}
