import { NextRequest, NextResponse } from "next/server";
import { conversations } from "@/lib/message-data";

export async function GET() {
  return NextResponse.json({ data: conversations });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { recipientId?: string } | null;

  if (!body?.recipientId) {
    return NextResponse.json({ error: "recipientId is required." }, { status: 400 });
  }

  return NextResponse.json({ message: "Conversation created.", recipientId: body.recipientId });
}