import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
});

  const { examId, priceId, userId } = await req.json();

  if (!examId || !priceId) {
    return NextResponse.json(
      { error: 'Missing parameters' },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/verify-info?examId=${examId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/certifications/${examId}`,
      metadata: { userId: userId || '', examId },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
