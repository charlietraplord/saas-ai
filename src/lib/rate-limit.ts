import { Redis } from '@upstash/redis';
import { RateLimitConfig } from './types';

// Initialize Redis client only if configuration is available
const redis =
  process.env.UPSTASH_REDIS_URL && process.env.UPSTASH_REDIS_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_URL,
        token: process.env.UPSTASH_REDIS_TOKEN,
      })
    : null;

export async function checkRateLimit(
  key: string,
  config: RateLimitConfig
): Promise<boolean> {
  // If Redis is not configured, allow all requests
  if (!redis) {
    console.warn('Redis is not configured. Rate limiting is disabled.');
    return true;
  }

  const now = Date.now();
  const windowStart = now - config.window * 1000;

  // Create a sorted set key for this user/endpoint
  const rateLimitKey = `ratelimit:${key}`;

  // Remove old entries
  await redis.zremrangebyscore(rateLimitKey, 0, windowStart);

  // Count requests in current window
  const requestCount = await redis.zcard(rateLimitKey);

  if (requestCount >= config.maxRequests) {
    return false;
  }

  // Add current request
  await redis.zadd(rateLimitKey, { score: now, member: now.toString() });

  // Set expiry on the set
  await redis.expire(rateLimitKey, config.window);

  return true;
}
