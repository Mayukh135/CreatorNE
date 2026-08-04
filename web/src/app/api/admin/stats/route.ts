import { NextResponse } from "next/server";
import { adminStats } from "@/lib/admin-data";

export async function GET() {
  return NextResponse.json({ data: adminStats });
}