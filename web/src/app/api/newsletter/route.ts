import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { email?: string } | null;
  const email = body?.email?.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  // TODO: Insert into Supabase `newsletter_subscribers` table
  // const supabase = createServerClient();
  // await supabase.from("newsletter_subscribers").upsert({ email });

  console.log(`[Newsletter] New subscriber: ${email}`);

  return NextResponse.json({ message: "Subscribed successfully." });
}