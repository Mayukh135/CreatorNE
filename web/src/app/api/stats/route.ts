import { NextResponse } from "next/server";
import { homeStats } from "@/lib/home-data";

export async function GET() {
  return NextResponse.json({ data: homeStats });
}