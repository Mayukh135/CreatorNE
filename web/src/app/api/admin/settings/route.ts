import { NextResponse } from "next/server";
import { adminSettings } from "@/lib/admin-data";

export async function GET() {
  return NextResponse.json({ data: adminSettings });
}

export async function PUT() {
  return NextResponse.json({ message: "Settings updated." });
}