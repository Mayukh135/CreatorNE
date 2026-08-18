import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/app/instagram
 *
 * Exchanges an Instagram authorization code for user profile data.
 * This route handles the server-side token exchange so the app secret
 * never leaves the backend.
 *
 * Body: { code: string, redirectUri?: string }
 * Expects: Authorization: Bearer <supabase_access_token>
 *
 * PLACEHOLDER: Instagram API credentials are not configured yet.
 * Once you have a Meta Developer App, replace the placeholder values
 * in .env.local with real credentials.
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

    // Check if credentials are configured
    if (
      instagramAppId === "your-instagram-app-id" ||
      instagramAppSecret === "your-instagram-app-secret"
    ) {
      // Return placeholder data when credentials aren't set up
      return NextResponse.json({
        username: "placeholder_user",
        profilePicture: "https://via.placeholder.com/150",
        followersCount: 0,
        _note:
          "Instagram API credentials not configured. Set NEXT_PUBLIC_INSTAGRAM_APP_ID and INSTAGRAM_APP_SECRET in .env.local",
      });
    }

    // Step 1: Exchange authorization code for short-lived access token
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

    // Step 2: Fetch user profile with the access token
    const profileResponse = await fetch(
      `https://graph.instagram.com/me?fields=id,username,account_type,media_count&access_token=${tokenData.access_token}`
    );

    if (!profileResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Instagram profile" },
        { status: 400 }
      );
    }

    const profileData = (await profileResponse.json()) as {
      id: string;
      username: string;
      account_type: string;
      media_count: number;
    };

    return NextResponse.json({
      username: profileData.username,
      profilePicture: `https://via.placeholder.com/150?text=${profileData.username}`,
      followersCount: 0, // Basic Display API doesn't expose follower count
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
