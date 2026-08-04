import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ messageId: string }> },
) {
  const resolvedParams = await params;
  return NextResponse.json({ message: "Message marked as read.", messageId: resolvedParams.messageId });
}