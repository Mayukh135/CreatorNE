import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { email?: string } | null;

  if (!body?.email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  return NextResponse.json({ message: "Subscribed successfully." });
}