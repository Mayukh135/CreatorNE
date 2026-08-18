import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/app/user/me
 *
 * Checks if the authenticated user has an existing profile.
 * Used by the mobile app after OTP verification to determine:
 *   - existing user → auto-login (skip onboarding)
 *   - new user → continue onboarding
 *
 * Expects: Authorization: Bearer <supabase_access_token>
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { exists: false, error: "Missing authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");

    // Verify the token with Supabase
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-key";

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { exists: false, error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Look up user in our database by supabaseId
    const dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id },
      include: {
        creatorProfile: true,
        brandProfile: true,
      },
    });

    if (!dbUser) {
      return NextResponse.json({ exists: false });
    }

    // Build profile response
    const profile =
      dbUser.role === "CREATOR" && dbUser.creatorProfile
        ? {
            id: dbUser.id,
            phone: dbUser.phone,
            role: dbUser.role,
            name: dbUser.creatorProfile.name,
            slug: dbUser.creatorProfile.slug,
            photo: dbUser.creatorProfile.photo,
            socialLinks: dbUser.creatorProfile.socialLinks,
            followers: dbUser.creatorProfile.followers,
          }
        : dbUser.role === "BRAND" && dbUser.brandProfile
          ? {
              id: dbUser.id,
              phone: dbUser.phone,
              role: dbUser.role,
              name: dbUser.brandProfile.brandName,
              slug: dbUser.brandProfile.slug,
              photo: dbUser.brandProfile.logo,
              socialLinks: {},
              followers: 0,
            }
          : {
              id: dbUser.id,
              phone: dbUser.phone,
              role: dbUser.role,
              name: "",
              slug: "",
              socialLinks: {},
              followers: 0,
            };

    return NextResponse.json({ exists: true, profile });
  } catch (error) {
    console.error("[api/app/user/me] Error:", error);
    return NextResponse.json(
      { exists: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
