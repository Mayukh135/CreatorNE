import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import cloudinary from "@/lib/cloudinary";

/**
 * POST /api/upload
 *
 * Uploads an image to Cloudinary. Accepts multipart/form-data.
 * Auth required — verifies Supabase Bearer token.
 *
 * Form fields:
 *   - file: File (required) — image file (jpg, png, webp, max 5MB)
 *   - type: string (optional) — "profile" | "portfolio" | "logo" (default: "profile")
 */

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export async function POST(request: NextRequest) {
  try {
    // ── Auth ─────────────────────────────────────────────────
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-key";

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // ── Parse form data ──────────────────────────────────────
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const uploadType = (formData.get("type") as string) || "profile";

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: `Invalid file type: ${file.type}. Allowed: jpg, png, webp`,
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Max: 5MB`,
        },
        { status: 400 }
      );
    }

    // ── Upload to Cloudinary ─────────────────────────────────
    const folderMap: Record<string, string> = {
      profile: `creatorne/profiles/${user.id}`,
      portfolio: `creatorne/portfolio/${user.id}`,
      logo: `creatorne/logos/${user.id}`,
    };

    const folder = folderMap[uploadType] || folderMap.profile;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Check if Cloudinary credentials are configured
    if (
      !process.env.CLOUDINARY_API_KEY ||
      process.env.CLOUDINARY_API_KEY === "your-api-key"
    ) {
      return NextResponse.json({
        url: `https://via.placeholder.com/400x400?text=${uploadType}`,
        publicId: `placeholder_${uploadType}_${Date.now()}`,
        _placeholder: true,
        _note:
          "Cloudinary credentials not configured. Set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in .env.local",
      });
    }

    const result = await new Promise<{
      secure_url: string;
      public_id: string;
      width: number;
      height: number;
      format: string;
      bytes: number;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: "image",
            transformation:
              uploadType === "profile"
                ? [
                    {
                      width: 400,
                      height: 400,
                      crop: "fill",
                      gravity: "face",
                      quality: "auto",
                      format: "webp",
                    },
                  ]
                : [
                    {
                      width: 800,
                      height: 600,
                      crop: "limit",
                      quality: "auto",
                      format: "webp",
                    },
                  ],
          },
          (error, result) => {
            if (error || !result) {
              reject(error || new Error("Upload failed"));
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      size: result.bytes,
    });
  } catch (error) {
    console.error("[api/upload] Error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
