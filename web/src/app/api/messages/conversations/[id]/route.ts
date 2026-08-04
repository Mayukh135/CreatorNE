import { NextRequest, NextResponse } from "next/server";
import { messages } from "@/lib/message-data";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedParams = await params;
  const data = messages.filter((message) => message.conversationId === resolvedParams.id);

  return NextResponse.json({ data });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedParams = await params;
  const body = (await request.json().catch(() => null)) as { content?: string } | null;

  if (!body?.content) {
    return NextResponse.json({ error: "content is required." }, { status: 400 });
  }

  return NextResponse.json({
    message: "Message sent.",
    conversationId: resolvedParams.id,
    content: body.content,
  });
}