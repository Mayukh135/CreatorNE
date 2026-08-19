import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/notifications/push
 *
 * Sends push notifications to users via Expo Push API.
 * Can target a specific user or broadcast to multiple users.
 *
 * Body: {
 *   userId?: string       — target a specific user (by DB id)
 *   userIds?: string[]    — target multiple users
 *   title: string         — notification title
 *   body: string          — notification body text
 *   data?: object         — custom data payload (e.g., screen to navigate to)
 * }
 *
 * Triggers:
 *   - New message received
 *   - Profile approved by admin
 *   - New brand connection request
 */

interface ExpoPushMessage {
  to: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  sound?: "default";
  priority?: "default" | "normal" | "high";
}

interface ExpoPushTicket {
  id?: string;
  status: "ok" | "error";
  message?: string;
}

async function sendExpoPush(messages: ExpoPushMessage[]): Promise<ExpoPushTicket[]> {
  if (messages.length === 0) return [];

  // Expo Push API accepts batches of up to 100
  const chunks: ExpoPushMessage[][] = [];
  for (let i = 0; i < messages.length; i += 100) {
    chunks.push(messages.slice(i, i + 100));
  }

  const tickets: ExpoPushTicket[] = [];

  for (const chunk of chunks) {
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chunk),
    });

    if (!response.ok) {
      console.error("[push] Expo Push API error:", await response.text());
      continue;
    }

    const result = (await response.json()) as { data: ExpoPushTicket[] };
    tickets.push(...result.data);
  }

  return tickets;
}

export async function POST(request: NextRequest) {
  try {
    // Auth — require a valid Supabase token (admin or service call)
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
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
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const body = (await request.json().catch(() => null)) as {
      userId?: string;
      userIds?: string[];
      title?: string;
      body?: string;
      data?: Record<string, unknown>;
    } | null;

    if (!body?.title || !body?.body) {
      return NextResponse.json(
        { error: "title and body are required" },
        { status: 400 }
      );
    }

    // Find target users' push tokens
    let users: { id: string; pushToken: string | null }[];

    if (body.userId) {
      users = await prisma.user.findMany({
        where: { id: body.userId, pushToken: { not: null } },
        select: { id: true, pushToken: true },
      });
    } else if (body.userIds) {
      users = await prisma.user.findMany({
        where: { id: { in: body.userIds }, pushToken: { not: null } },
        select: { id: true, pushToken: true },
      });
    } else {
      return NextResponse.json(
        { error: "userId or userIds is required" },
        { status: 400 }
      );
    }

    const messages: ExpoPushMessage[] = users
      .filter((u): u is typeof u & { pushToken: string } => !!u.pushToken)
      .map((u) => ({
        to: u.pushToken,
        title: body.title!,
        body: body.body!,
        data: body.data,
        sound: "default" as const,
        priority: "high" as const,
      }));

    if (messages.length === 0) {
      return NextResponse.json({
        sent: 0,
        message: "No users with push tokens found",
      });
    }

    const tickets = await sendExpoPush(messages);

    // Log any failures
    const failures = tickets.filter((t) => t.status === "error");
    if (failures.length > 0) {
      console.error("[push] Some notifications failed:", failures);
    }

    return NextResponse.json({
      sent: tickets.filter((t) => t.status === "ok").length,
      failed: failures.length,
      total: messages.length,
    });
  } catch (error) {
    console.error("[api/notifications/push] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
