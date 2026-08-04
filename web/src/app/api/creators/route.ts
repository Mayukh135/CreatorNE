import { NextRequest, NextResponse } from "next/server";
import { directoryCreators } from "@/lib/directory-data";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const search = params.get("search")?.trim().toLowerCase() ?? "";
  const state = params.get("state")?.trim().toLowerCase() ?? "";
  const city = params.get("city")?.trim().toLowerCase() ?? "";
  const category = params.get("category")?.trim().toLowerCase() ?? "";
  const platform = params.get("platform")?.trim().toLowerCase() ?? "";
  const language = params.get("language")?.trim().toLowerCase() ?? "";
  const gender = params.get("gender")?.trim().toLowerCase() ?? "";
  const verified = params.get("verified")?.trim().toLowerCase();
  const sort = params.get("sort")?.trim().toLowerCase() ?? "relevance";
  const page = Math.max(Number(params.get("page") ?? "1"), 1);
  const limit = Math.min(Math.max(Number(params.get("limit") ?? "12"), 1), 24);

  const filtered = directoryCreators.filter((creator) => {
    const matchesSearch =
      !search ||
      [creator.name, creator.state, creator.city, creator.category, creator.bio, creator.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(search);
    const matchesState = !state || creator.state.toLowerCase() === state;
    const matchesCity = !city || creator.city.toLowerCase().includes(city);
    const matchesCategory = !category || creator.category.toLowerCase() === category;
    const matchesPlatform = !platform || creator.platform.some((item) => item.toLowerCase().includes(platform));
    const matchesLanguage = !language || creator.languages.some((item) => item.toLowerCase().includes(language));
    const matchesGender = !gender || creator.gender.toLowerCase() === gender;
    const matchesVerified =
      verified === undefined || verified === "" ||
      (verified === "true" ? creator.isVerified : verified === "false" ? !creator.isVerified : true);

    return (
      matchesSearch &&
      matchesState &&
      matchesCity &&
      matchesCategory &&
      matchesPlatform &&
      matchesLanguage &&
      matchesGender &&
      matchesVerified
    );
  });

  const sorted = [...filtered].sort((left, right) => {
    if (sort === "followers") {
      return right.followers - left.followers;
    }

    if (sort === "engagement") {
      return right.engagementRate - left.engagementRate;
    }

    if (sort === "newest") {
      return right.id.localeCompare(left.id);
    }

    return right.isVerified === left.isVerified ? right.followers - left.followers : Number(right.isVerified) - Number(left.isVerified);
  });

  const total = sorted.length;
  const start = (page - 1) * limit;
  const data = sorted.slice(start, start + limit);

  return NextResponse.json({
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.max(Math.ceil(total / limit), 1),
    },
  });
}