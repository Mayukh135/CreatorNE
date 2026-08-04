import { NextRequest, NextResponse } from "next/server";
import { featuredBrands } from "@/lib/home-data";

export async function GET(request: NextRequest) {
  const featuredOnly = request.nextUrl.searchParams.get("featured") !== "false";
  const data = featuredOnly ? featuredBrands.filter((brand) => brand.isFeatured) : featuredBrands;

  return NextResponse.json({ data });
}