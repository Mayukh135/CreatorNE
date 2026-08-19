import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/app/push-token
 *
 * Registers or updates a user's Expo push notification token.
 * Called by the mobile app on launch after getting push permissions.
 *
 * Body: { token: string }
 * Expects: Authorization: Bearer <supabase_access_token>
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

    const jwtToken = authHeader.replace("Bearer ", "");

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-key";

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(jwtToken);

    if (authError || !user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const body = (await request.json().catch(() => null)) as {
      token?: string;
    } | null;

    if (!body?.token) {
      return NextResponse.json(
        { error: "Push token is required" },
        { status: 400 }
      );
    }

    // Validate Expo push token format
    if (!body.token.startsWith("ExponentPushToken[")) {
      return NextResponse.json(
        { error: "Invalid push token format. Expected ExponentPushToken[...]" },
        { status: 400 }
      );
    }

    // Update the user's push token
    await prisma.user.updateMany({
      where: { supabaseId: user.id },
      data: { pushToken: body.token },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/app/push-token] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/app/push-token
 *
 * Removes the user's push token (e.g., on logout).
 */
export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing authorization header" },
        { status: 401 }
      );
    }

    const jwtToken = authHeader.replace("Bearer ", "");

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-key";

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(jwtToken);

    if (authError || !user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    await prisma.user.updateMany({
      where: { supabaseId: user.id },
      data: { pushToken: null },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/app/push-token] DELETE Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
