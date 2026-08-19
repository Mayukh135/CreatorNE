import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/app/instagram
 *
 * Exchanges an Instagram authorization code for user profile data
 * using the Instagram Graph API (requires business/creator accounts).
 *
 * Body: { code: string, redirectUri?: string }
 * Expects: Authorization: Bearer <supabase_access_token>
 *
 * Flow:
 * 1. Exchange code → short-lived token (Basic Display API)
 * 2. Exchange short-lived → long-lived token
 * 3. Fetch profile with Graph API: username, profile_picture_url, followers_count
 */
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing authorization header" },
        { status: 401 }
      );
    }

    const body = (await request.json().catch(() => null)) as {
      code?: string;
      redirectUri?: string;
    } | null;

    if (!body?.code) {
      return NextResponse.json(
        { error: "Authorization code is required" },
        { status: 400 }
      );
    }

    const instagramAppId =
      process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID || "your-instagram-app-id";
    const instagramAppSecret =
      process.env.INSTAGRAM_APP_SECRET || "your-instagram-app-secret";
    const redirectUri =
      body.redirectUri ||
      process.env.INSTAGRAM_REDIRECT_URI ||
      "https://localhost:3000/api/app/instagram/callback";

    // ── Placeholder mode ──────────────────────────────────────
    if (
      instagramAppId === "your-instagram-app-id" ||
      instagramAppSecret === "your-instagram-app-secret"
    ) {
      return NextResponse.json({
        username: "placeholder_user",
        profilePicture: "https://via.placeholder.com/150",
        followersCount: 0,
        _placeholder: true,
        _note:
          "Instagram API credentials not configured. Set NEXT_PUBLIC_INSTAGRAM_APP_ID and INSTAGRAM_APP_SECRET in .env.local",
      });
    }

    // ── Step 1: Exchange code for short-lived access token ────
    const tokenResponse = await fetch(
      "https://api.instagram.com/oauth/access_token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: instagramAppId,
          client_secret: instagramAppSecret,
          grant_type: "authorization_code",
          redirect_uri: redirectUri,
          code: body.code,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error("[api/app/instagram] Token exchange failed:", error);
      return NextResponse.json(
        { error: "Failed to exchange Instagram authorization code" },
        { status: 400 }
      );
    }

    const tokenData = (await tokenResponse.json()) as {
      access_token: string;
      user_id: number;
    };

    // ── Step 2: Exchange for long-lived token ─────────────────
    const longLivedResponse = await fetch(
      `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${instagramAppSecret}&access_token=${tokenData.access_token}`
    );

    let accessToken = tokenData.access_token;

    if (longLivedResponse.ok) {
      const longLivedData = (await longLivedResponse.json()) as {
        access_token: string;
        token_type: string;
        expires_in: number;
      };
      accessToken = longLivedData.access_token;
    }

    // ── Step 3: Fetch profile via Graph API ───────────────────
    // For business/creator accounts, followers_count is available
    const profileResponse = await fetch(
      `https://graph.instagram.com/me?fields=id,username,account_type,media_count,profile_picture_url,followers_count&access_token=${accessToken}`
    );

    if (!profileResponse.ok) {
      // Fallback: try without followers_count (personal accounts)
      const fallbackResponse = await fetch(
        `https://graph.instagram.com/me?fields=id,username,account_type,media_count&access_token=${accessToken}`
      );

      if (!fallbackResponse.ok) {
        return NextResponse.json(
          { error: "Failed to fetch Instagram profile" },
          { status: 400 }
        );
      }

      const fallbackData = (await fallbackResponse.json()) as {
        id: string;
        username: string;
        account_type: string;
        media_count: number;
      };

      return NextResponse.json({
        username: fallbackData.username,
        profilePicture: `https://via.placeholder.com/150?text=${fallbackData.username}`,
        followersCount: 0,
        accountType: fallbackData.account_type,
        mediaCount: fallbackData.media_count,
        _note: "Follower count unavailable — account may not be a Business/Creator account",
      });
    }

    const profileData = (await profileResponse.json()) as {
      id: string;
      username: string;
      account_type: string;
      media_count: number;
      profile_picture_url?: string;
      followers_count?: number;
    };

    return NextResponse.json({
      username: profileData.username,
      profilePicture:
        profileData.profile_picture_url ||
        `https://via.placeholder.com/150?text=${profileData.username}`,
      followersCount: profileData.followers_count || 0,
      accountType: profileData.account_type,
      mediaCount: profileData.media_count,
    });
  } catch (error) {
    console.error("[api/app/instagram] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
