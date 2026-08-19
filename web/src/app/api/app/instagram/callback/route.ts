import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/app/instagram/callback
 *
 * Handles the OAuth redirect from Instagram after the user authorizes.
 * Instagram redirects here with ?code=... which we pass back to the app.
 *
 * For mobile: expo-web-browser intercepts this URL automatically.
 * For web: redirects back to the app with the code as a query param.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorReason = searchParams.get("error_reason");

  if (error) {
    // User denied permission or an error occurred
    console.error(
      `[api/app/instagram/callback] OAuth error: ${error}, reason: ${errorReason}`
    );

    // Redirect to a friendly error page
    return NextResponse.redirect(
      new URL(
        `/login?error=instagram_denied&reason=${errorReason || "unknown"}`,
        request.url
      )
    );
  }

  if (!code) {
    return NextResponse.json(
      { error: "No authorization code received" },
      { status: 400 }
    );
  }

  // For mobile app: the expo-web-browser will intercept this redirect URL
  // and extract the code from the URL automatically.
  // For web: redirect back with the code parameter.
  const callbackUrl = new URL("/login", request.url);
  callbackUrl.searchParams.set("instagram_code", code);

  return NextResponse.redirect(callbackUrl);
}
