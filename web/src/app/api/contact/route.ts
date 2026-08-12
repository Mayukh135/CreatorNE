import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 * Stores a contact form submission.
 *
 * For now this logs the submission and returns success.
 * When Supabase is fully wired, replace with an insert into
 * a `contact_submissions` table.
 */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as {
    name?: string;
    email?: string;
    topic?: string;
    message?: string;
  } | null;

  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  // TODO: Insert into Supabase `contact_submissions` table
  // const supabase = createServerClient();
  // await supabase.from("contact_submissions").insert(body);

  console.log(`[Contact] New submission from ${body.email}: ${body.topic}`);

  return NextResponse.json({ message: "Your message has been received." });
}
