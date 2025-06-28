import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { DEFAULT_MODEL } from '@/lib/huggingface';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { tenant: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { name, description, systemPrompt } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Create the agent
    const agent = await prisma.agent.create({
      data: {
        name,
        description,
        model: DEFAULT_MODEL,
        systemPrompt: systemPrompt || "You are a helpful customer service AI assistant. Please be polite and professional.",
        userId: user.id,
        tenantId: user.tenantId,
      },
    });

    return NextResponse.json({
      id: agent.id,
      name: agent.name,
      description: agent.description,
      model: agent.model,
    });
  } catch (error) {
    console.error('[CREATE_AGENT]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
