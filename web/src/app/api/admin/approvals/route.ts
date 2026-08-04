import { NextResponse } from "next/server";
import { adminApprovals } from "@/lib/admin-data";

export async function GET() {
  return NextResponse.json({ data: adminApprovals });
}