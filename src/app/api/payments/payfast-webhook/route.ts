import { NextResponse } from 'next/server';
import { PayFast } from '../../../../lib/payfast';
import { prisma } from '../../../../lib/prisma';

const payfast = new PayFast({
  merchantId: process.env.PAYFAST_MERCHANT_ID!,
  merchantKey: process.env.PAYFAST_MERCHANT_KEY!,
  passPhrase: process.env.PAYFAST_PASSPHRASE!,
  sandbox: process.env.NODE_ENV !== 'production',
});

export async function POST(request: Request) {
  try {
    const body = await request.formData();
    const data = Object.fromEntries(body.entries());

    // Validate the notification
    if (!payfast.validateCallback(data as Record<string, string>)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Extract tenant and plan info
    const [tenantId, planId] = (data.custom_str1 as string).split(':');

    if (data.payment_status === 'COMPLETE') {
      // Update tenant's plan
      await prisma.tenant.update({
        where: { id: tenantId },
        data: { plan: planId },
      });

      // Create payment record
      await prisma.payment.create({
        data: {
          tenantId,
          amount: parseFloat(data.amount as string),
          paymentId: data.pf_payment_id as string,
          status: 'completed',
          planId,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[WEBHOOK]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
