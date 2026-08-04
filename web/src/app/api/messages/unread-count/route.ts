import { NextResponse } from "next/server";
import { messages } from "@/lib/message-data";

export async function GET() {
  const count = messages.filter((message) => !message.readAt).length;
  return NextResponse.json({ count });
}