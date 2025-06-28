/**
 * Agent configurations and types for the AI agent system
 */

export type AgentModel = 'gpt-3.5-turbo' | 'gpt-4';

export interface Agent {
  id: string;
  name: string;
  description?: string;
  model: AgentModel;
  systemPrompt: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentUsage {
  id: string;
  agentId: string;
  calls: number;
  tokensUsed: number;
  cost: number;
  date: Date;
}

export interface ChatMessage {
  id: string;
  agentId: string;
  from: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

/**
 * Error types for the chat system
 */
export class ChatError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = 'CHAT_ERROR'
  ) {
    super(message);
    this.name = 'ChatError';
  }
}

/**
 * Rate limiting configuration
 */
export interface RateLimitConfig {
  maxRequests: number;
  window: number; // in seconds
}

/**
 * Billing tiers and limits
 */
export interface BillingTier {
  name: string;
  maxAgents: number;
  maxCallsPerMonth: number;
  pricePerMonth: number;
  features: string[];
}

export const BILLING_TIERS: Record<string, BillingTier> = {
  FREE: {
    name: 'Free',
    maxAgents: 1,
    maxCallsPerMonth: 100,
    pricePerMonth: 0,
    features: ['1 AI Agent', 'Up to 100 calls/month', 'Basic support'],
  },
  PRO: {
    name: 'Pro',
    maxAgents: 5,
    maxCallsPerMonth: 1000,
    pricePerMonth: 49,
    features: ['Up to 5 AI Agents', 'Up to 1000 calls/month', 'Priority support'],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    maxAgents: -1, // unlimited
    maxCallsPerMonth: -1, // unlimited
    pricePerMonth: 499,
    features: ['Unlimited AI Agents', 'Unlimited calls', 'Dedicated support'],
  },
};

/**
 * User and Session types
 */
export interface User {
  id: string;
  name: string | null;
  email: string;
  image?: string | null;
  tenantId: string;
}
