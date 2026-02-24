
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    let userId = session.metadata?.userId;
    const examId = session.metadata?.examId;
    const email = session.customer_details?.email || session.customer_email;

    // Si userId absent, créer un nouvel utilisateur
    if (!userId && email) {
      // Exemple : création d'un utilisateur dans Supabase
      const { data, error } = await supabase
        .from('users')
        .insert([{ email }])
        .select();
      if (data && data.length > 0) {
        userId = data[0].id;
      }
    }

    // Associer l'achat à l'utilisateur
    if (userId && examId) {
      await supabase.from('exam_access').insert([
        { user_id: userId, exam_id: examId }
      ]);
    }

    console.log('Payment confirmed', { userId, examId, email });
  }

  return NextResponse.json({ received: true });
}
