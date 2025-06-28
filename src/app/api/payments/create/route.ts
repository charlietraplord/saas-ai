import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { prisma } from '../../../../lib/prisma';
import { PayFast } from '../../../../lib/payfast';
import { BILLING_TIERS } from '../../../../lib/types';

const payfast = new PayFast({
  merchantId: process.env.PAYFAST_MERCHANT_ID!,
  merchantKey: process.env.PAYFAST_MERCHANT_KEY!,
  passPhrase: process.env.PAYFAST_PASSPHRASE!,
  sandbox: process.env.NODE_ENV !== 'production',
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { planId } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { tenant: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const plan = BILLING_TIERS[planId];
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const paymentUrl = payfast.generatePaymentForm({
      amount: plan.pricePerMonth,
      itemName: `${plan.name} Plan Subscription`,
      email: user.email,
      customStr1: `${user.tenantId}:${planId}`, // Store tenant and plan info
      returnUrl: `${baseUrl}/dashboard/billing?success=true`,
      cancelUrl: `${baseUrl}/dashboard/billing?success=false`,
      notifyUrl: `${baseUrl}/api/payments/payfast-webhook`,
    });

    return NextResponse.json({ url: paymentUrl });
  } catch (error) {
    console.error('[PAYMENT]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
