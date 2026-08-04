import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Upload preset names
export const UPLOAD_PRESETS = {
  CREATOR_PHOTO: "creatorne_creator_photo",
  CREATOR_PORTFOLIO: "creatorne_creator_portfolio",
  BRAND_LOGO: "creatorne_brand_logo",
  ID_VERIFICATION: "creatorne_id_verification",
} as const;

// Cloudinary transformation helpers
export const TRANSFORMS = {
  avatar: {
    width: 200,
    height: 200,
    crop: "fill" as const,
    gravity: "face" as const,
    format: "webp" as const,
    quality: "auto" as const,
  },
  card: {
    width: 400,
    height: 300,
    crop: "fill" as const,
    format: "webp" as const,
    quality: "auto" as const,
  },
  portfolio: {
    width: 800,
    height: 600,
    crop: "limit" as const,
    format: "webp" as const,
    quality: "auto" as const,
  },
} as const;
