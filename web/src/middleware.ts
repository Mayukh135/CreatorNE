import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { checkRateLimit, RATE_LIMITS, type RateLimitConfig } from "@/lib/rate-limit";

/**
 * Rate limit configuration per API route pattern.
 * More specific patterns should be listed first.
 */
const RATE_LIMITED_ROUTES: Array<{
  pattern: RegExp;
  config: RateLimitConfig;
}> = [
  // Strict — forms, newsletter
  { pattern: /^\/api\/contact$/, config: RATE_LIMITS.strict },
  { pattern: /^\/api\/newsletter$/, config: RATE_LIMITS.strict },

  // Write — onboarding, uploads
  { pattern: /^\/api\/app\/onboard$/, config: RATE_LIMITS.write },
  { pattern: /^\/api\/upload$/, config: RATE_LIMITS.write },

  // Auth-sensitive
  { pattern: /^\/api\/app\/instagram/, config: RATE_LIMITS.auth },
  { pattern: /^\/api\/app\/push-token$/, config: RATE_LIMITS.auth },

  // Standard — everything else under /api
  { pattern: /^\/api\//, config: RATE_LIMITS.standard },
];

function getRateLimitConfig(pathname: string): RateLimitConfig | null {
  for (const route of RATE_LIMITED_ROUTES) {
    if (route.pattern.test(pathname)) {
      return route.config;
    }
  }
  return null;
}

function getClientIP(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Rate limiting for API routes ───────────────────────────
  if (pathname.startsWith("/api/")) {
    const rateLimitConfig = getRateLimitConfig(pathname);

    if (rateLimitConfig) {
      const clientIP = getClientIP(request);
      const key = `${clientIP}:${pathname}`;
      const result = checkRateLimit(key, rateLimitConfig);

      if (!result.allowed) {
        return NextResponse.json(
          {
            error: "Too many requests. Please try again later.",
            retryAfter: Math.ceil((result.resetAt - Date.now()) / 1000),
          },
          {
            status: 429,
            headers: {
              "Retry-After": String(
                Math.ceil((result.resetAt - Date.now()) / 1000)
              ),
              "X-RateLimit-Limit": String(result.limit),
              "X-RateLimit-Remaining": "0",
              "X-RateLimit-Reset": String(
                Math.ceil(result.resetAt / 1000)
              ),
            },
          }
        );
      }

      // Add rate limit headers to successful responses
      const response = await updateSession(request);
      response.headers.set("X-RateLimit-Limit", String(result.limit));
      response.headers.set(
        "X-RateLimit-Remaining",
        String(result.remaining)
      );
      response.headers.set(
        "X-RateLimit-Reset",
        String(Math.ceil(result.resetAt / 1000))
      );
      return response;
    }
  }

  // ── Supabase session refresh for non-API routes ────────────
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (browser favicon)
     * - Public assets (images, svgs, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
