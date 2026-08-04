import { NextResponse } from "next/server";
import { homeTestimonials } from "@/lib/home-data";

export async function GET() {
  return NextResponse.json({ data: homeTestimonials });
}