import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const sig = req.headers['stripe-signature'] as string;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const examId = session.metadata?.examId;
    const email = session.customer_details?.email || session.customer_email;
    const purchaseDate = new Date(session.created * 1000).toISOString().slice(0, 10);
    // Récupération des infos de certification
    let cert = null;
    let badge = '';
    let price = '';
    let examTitle = '';
    if (examId) {
      try {
        const { getCertificationById } = require('@/data/certifications');
        cert = getCertificationById(examId);
        if (cert) {
          badge = cert.icon;
          price = cert.price + '€';
          examTitle = cert.title;
        }
      } catch (err) {}
    }
    if (userId && examId) {
      await supabase.from('exam_access').insert([
        { user_id: userId, exam_id: examId }
      ]);
    }
    // Envoi de l'email de confirmation d'achat
    if (email && examTitle) {
      try {
        const { sendMail } = require('@/utils/email');
        await sendMail({
          to: email,
          subject: `Abir-AI: Payment Confirmed for ${examTitle}`,
          html: `<p>Hello,<br><br>Thank you for your purchase and trust in Abir-AI!<br><br><b>Exam:</b> ${examTitle} ${badge}<br><b>Price:</b> ${price}<br><b>Date:</b> ${purchaseDate}<br><br>You now have access to your exam. Good luck!<br><br>Explore our <a href='https://abir-ai.com/learn'>learning paths</a> to prepare and boost your skills.<br><br>Best regards,<br>The Abir-AI Team</p>`
        });
      } catch (err) {}
    }
  }

  res.status(200).json({ received: true });
}
