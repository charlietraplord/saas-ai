import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic'; // Ensures full dynamic behavior
export const fetchCache = 'force-no-store'; // Disable caching

export async function GET(
  request: Request,
  { params }: { params: { agentId: string } }
) {
  try {
    if (!params?.agentId) {
      return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 });
    }
    const agentId = params.agentId;

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get agent and verify access
    const agent = await prisma.agent.findUnique({
      where: { id: agentId },
    });

    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    if (agent.tenantId !== user.tenantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }    // Get chat messages
    const dbMessages = await prisma.chatMessage.findMany({
      where: { agentId },
      orderBy: { createdAt: 'asc' },
      take: 100, // Limit to last 100 messages
    });

    // Transform messages to match chat client expectations
    const messages = dbMessages.map(msg => ({
      id: msg.id,
      content: msg.content,
      from: msg.role === 'user' ? 'user' : 'bot',
      createdAt: msg.createdAt
    }));

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('[MESSAGES]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
