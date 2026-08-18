import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/app/onboard
 *
 * Creates a new user profile after mobile onboarding.
 * Called from the React Native app after phone OTP + name entry + social connect.
 *
 * Body: { phone, name, role: "CREATOR" | "BRAND", instagramData? }
 * Expects: Authorization: Bearer <supabase_access_token>
 */
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Missing authorization header" },
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
        { success: false, error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const body = (await request.json().catch(() => null)) as {
      phone?: string;
      name?: string;
      role?: "CREATOR" | "BRAND";
      instagramData?: {
        username?: string;
        profilePicture?: string;
        followersCount?: number;
      };
    } | null;

    if (!body?.name || !body?.role) {
      return NextResponse.json(
        { success: false, error: "name and role are required" },
        { status: 400 }
      );
    }

    const { name, role, phone, instagramData } = body;

    // Generate slug from name
    const baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    const slug = `${baseSlug}-${Date.now().toString(36)}`;

    // Check if user already exists
    let dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id },
    });

    if (dbUser) {
      // User exists — update
      dbUser = await prisma.user.update({
        where: { supabaseId: user.id },
        data: {
          phone: phone || dbUser.phone,
          role: role,
        },
      });
    } else {
      // Create new user
      const email = user.email || `${user.phone?.replace("+", "")}@phone.creatorne.in`;

      dbUser = await prisma.user.create({
        data: {
          email,
          phone: phone || user.phone || null,
          role: role,
          supabaseId: user.id,
          emailVerified: !!user.email_confirmed_at,
          status: "PENDING",
        },
      });
    }

    // Create role-specific profile
    if (role === "CREATOR") {
      const existingProfile = await prisma.creatorProfile.findUnique({
        where: { userId: dbUser.id },
      });

      if (!existingProfile) {
        await prisma.creatorProfile.create({
          data: {
            userId: dbUser.id,
            name,
            slug,
            state: "Assam", // Default, can be updated later
            category: "Others",
            languages: [],
            socialLinks: instagramData?.username
              ? { instagram: `https://instagram.com/${instagramData.username}` }
              : {},
            followers: instagramData?.followersCount || 0,
            photo: instagramData?.profilePicture || null,
          },
        });
      }
    } else if (role === "BRAND") {
      const existingProfile = await prisma.brandProfile.findUnique({
        where: { userId: dbUser.id },
      });

      if (!existingProfile) {
        await prisma.brandProfile.create({
          data: {
            userId: dbUser.id,
            brandName: name,
            slug,
            contactPerson: name,
            phone: phone || null,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      profile: {
        id: dbUser.id,
        phone: dbUser.phone,
        role: dbUser.role,
        name,
        slug,
      },
    });
  } catch (error) {
    console.error("[api/app/onboard] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
