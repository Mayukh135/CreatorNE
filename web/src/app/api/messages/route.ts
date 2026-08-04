import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Use /api/messages/conversations or /api/messages/unread-count." });
}