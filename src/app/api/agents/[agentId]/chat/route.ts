import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { prisma } from '../../../../../lib/prisma';
import { checkRateLimit } from '../../../../../lib/rate-limit';
import { BILLING_TIERS } from '../../../../../lib/types';
import { getSocketIO } from '../../../../../lib/get-socket';
import { togetherChatCompletion } from '../../../../../lib/huggingface';

// Types for Hugging Face API
interface HuggingFaceResponse {
  generated_text: string;
  conversation?: {
    past_user_inputs: string[];
    generated_responses: string[];
  };
}

// API timeout duration
const API_TIMEOUT = 30000; // 30 seconds

export const dynamic = 'force-dynamic'; // Ensures full dynamic behavior
export const fetchCache = 'force-no-store'; // Disable caching

export async function POST(
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

    // Get user and tenant info
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { tenant: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check rate limit based on tenant's plan
    const tier = BILLING_TIERS[user.tenant.plan];
    const canProceed = await checkRateLimit(`tenant:${user.tenantId}`, {
      maxRequests: tier.maxCallsPerMonth,
      window: 30 * 24 * 60 * 60, // 30 days in seconds
    });
    if (!canProceed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { message } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Load agent configuration from database
    const agent = await prisma.agent.findUnique({
      where: { id: agentId },
      include: {
        tenant: true // Include tenant info for validation
      }
    });

    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    if (agent.tenantId !== user.tenantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    try {
      // Store user message first
      const userMessage = await prisma.chatMessage.create({
        data: {
          content: message,
          role: 'user',
          userId: user.id,
          agentId: agent.id,
        },
      });

      // Get conversation history
      const previousMessages = await prisma.chatMessage.findMany({
        where: { agentId: agent.id },
        orderBy: { createdAt: 'desc' },
        take: 10,
      });

      const past_user_inputs = previousMessages
        .filter(msg => msg.role === 'user')
        .map(msg => msg.content)
        .reverse();

      const generated_responses = previousMessages
        .filter(msg => msg.role === 'bot')
        .map(msg => msg.content)
        .reverse();

      // Call Together API for chat completion
      let result: any;
      try {
        result = await togetherChatCompletion({
          messages: [
            ...past_user_inputs.map((content: string) => ({ role: 'user', content })),
            ...generated_responses.map((content: string) => ({ role: 'assistant', content })),
            { role: 'user', content: message },
          ],
          model: agent.model || 'deepseek-ai/DeepSeek-R1',
          temperature: 0.5,
          top_p: 0.7,
          stream: false,
        });
      } catch (apiError) {
        console.error('[TOGETHER_API_ERROR]', apiError);
        await prisma.chatMessage.create({
          data: {
            content: 'Sorry, there was a problem contacting the AI model. Please try again later.',
            role: 'bot',
            userId: user.id,
            agentId: agent.id,
          },
        });
        return NextResponse.json(
          { error: 'Error contacting Together API', details: String(apiError) },
          { status: 502 }
        );
      }

      const aiResponse = result?.choices?.[0]?.message?.content || 'No response from AI.';

      // Store bot response
      const botMessage = await prisma.chatMessage.create({
        data: {
          content: aiResponse,
          role: 'bot',
          userId: user.id,
          agentId: agent.id,
        },
      });

      // Emit socket event with proper error handling
      try {
        const io = getSocketIO();
        if (io) {
          io.to(`chat:${agent.id}`).emit('new-message', {
            id: botMessage.id,
            content: botMessage.content,
            from: 'bot',
            createdAt: botMessage.createdAt
          });
        }
      } catch (socketError) {
        console.error('[SOCKET_ERROR]', socketError);
        // Continue execution even if socket emission fails
      }

      // Update usage records
      const estimatedTokens = Math.ceil((message.length + aiResponse.length) / 4);
      await prisma.usageRecord.create({
        data: {
          tenantId: user.tenantId,
          agentId: agent.id,
          calls: 1,
          tokensUsed: estimatedTokens,
          cost: estimatedTokens * 0.001,
        },
      });

      return NextResponse.json({
        success: true,
        result: aiResponse,
        messageId: botMessage.id
      });

    } catch (error) {
      console.error('[HUGGINGFACE_ERROR]', error);

      // Create an error message in the chat
      await prisma.chatMessage.create({
        data: {
          content: 'I apologize, but I encountered an error processing your request. Please try again.',
          role: 'bot',
          userId: user.id,
          agentId: agent.id,
        },
      });

      return NextResponse.json(
        { error: 'Error generating response' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('[CHAT]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
