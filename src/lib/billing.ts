export interface BillingTier {
  name: string;
  description: string;
  price: number;
  maxCallsPerMonth: number;
  maxCostPerMonth: number;
  features: string[];
}

export const BILLING_TIERS: Record<string, BillingTier> = {
  FREE: {
    name: 'Free',
    description: 'Perfect for trying out our platform',
    price: 0,
    maxCallsPerMonth: 100,
    maxCostPerMonth: 0,
    features: [
      '100 API calls per month',
      'Basic AI models',
      'Community support',
      'Standard response time'
    ]
  },
  PRO: {
    name: 'Pro',
    description: 'For professionals and small teams',
    price: 49,
    maxCallsPerMonth: 10000,
    maxCostPerMonth: 49,
    features: [
      '10,000 API calls per month',
      'Advanced AI models',
      'Priority support',
      'Fast response time',
      'Custom AI training'
    ]
  },
  ENTERPRISE: {
    name: 'Enterprise',
    description: 'For large organizations with custom needs',
    price: 499,
    maxCallsPerMonth: 100000,
    maxCostPerMonth: 499,
    features: [
      'Unlimited API calls',
      'All AI models',
      'Dedicated support',
      'Fastest response time',
      'Custom AI training',
      'Custom integrations',
      'SLA guarantee'
    ]
  }
};
