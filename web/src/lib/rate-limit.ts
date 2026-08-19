/**
 * In-memory rate limiter for API routes.
 *
 * Uses a sliding window counter per IP. Simple, zero-dependency,
 * works well for single-instance deployments. For multi-instance
 * production setups, swap this for Redis-based rate limiting.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) {
      store.delete(key);
    }
  }
}

export interface RateLimitConfig {
  /** Max requests allowed in the window */
  limit: number;
  /** Window duration in seconds */
  windowSeconds: number;
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
}

/**
 * Check if a request from the given identifier (usually IP) is within rate limits.
 *
 * @param identifier — Unique key (IP address, user ID, etc.)
 * @param config — Rate limit configuration
 * @returns Result indicating whether the request is allowed
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  cleanup();

  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;
  const key = identifier;

  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    // New window
    store.set(key, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      limit: config.limit,
      remaining: config.limit - 1,
      resetAt: now + windowMs,
    };
  }

  if (entry.count < config.limit) {
    // Within limit
    entry.count++;
    return {
      allowed: true,
      limit: config.limit,
      remaining: config.limit - entry.count,
      resetAt: entry.resetAt,
    };
  }

  // Exceeded
  return {
    allowed: false,
    limit: config.limit,
    remaining: 0,
    resetAt: entry.resetAt,
  };
}

/**
 * Preset rate limit configurations for different route types.
 */
export const RATE_LIMITS = {
  /** Standard API endpoints — 60 req/min */
  standard: { limit: 60, windowSeconds: 60 } satisfies RateLimitConfig,

  /** Auth / sensitive endpoints — 10 req/min */
  auth: { limit: 10, windowSeconds: 60 } satisfies RateLimitConfig,

  /** Write operations (onboard, contact) — 5 req/min */
  write: { limit: 5, windowSeconds: 60 } satisfies RateLimitConfig,

  /** Very limited (newsletter, contact form) — 3 req/min */
  strict: { limit: 3, windowSeconds: 60 } satisfies RateLimitConfig,
} as const;
