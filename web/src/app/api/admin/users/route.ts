import { NextResponse } from "next/server";
import { adminUsers } from "@/lib/admin-data";

export async function GET() {
  return NextResponse.json({ data: adminUsers });
}