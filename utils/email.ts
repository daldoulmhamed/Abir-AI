import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.mailerlite.com', // à adapter selon MailerLite
  port: 587,
  secure: false, // true pour 465, false pour autres ports
  auth: {
    user: 'abir.ai.contact@gmail.com',
    pass: process.env.MAILERLITE_SMTP_PASSWORD,
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
