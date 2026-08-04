# CreatorNE — Service Setup Guide

> Step-by-step instructions to create and configure all external services for CreatorNE.  
> After completing each section, update the values in [`web/.env.local`](file:///Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/web/.env.local).

---

## 1. Supabase (Database + Auth)

Supabase provides your PostgreSQL database and authentication (Email OTP + Google OAuth).

### 1.1 — Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and click **Start your project**
2. Sign in with GitHub (recommended) or email
3. Click **New project**
4. Fill in:
   - **Organization**: Create one or use existing (e.g., "CreatorNE")
   - **Project name**: `creatorne`
   - **Database password**: Generate a strong password — **save this somewhere safe**, you'll need it for `DATABASE_URL`
   - **Region**: Choose the closest to your users (e.g., `South Asia (Mumbai)` → `ap-south-1`)
   - **Plan**: Free tier is fine to start
5. Click **Create new project** — wait ~2 minutes for provisioning

### 1.2 — Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API** (left sidebar)
2. Copy these values:

| Key | Where to Find | Env Variable |
|-----|--------------|--------------|
| **Project URL** | Under "Project URL" | `NEXT_PUBLIC_SUPABASE_URL` |
| **Anon (public) key** | Under "Project API keys" → `anon` `public` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| **Service role key** | Under "Project API keys" → `service_role` `secret` | `SUPABASE_SERVICE_ROLE_KEY` |

> ⚠️ **Never expose the service role key** in client-side code. It bypasses Row Level Security.

### 1.3 — Get Database Connection Strings

1. Go to **Settings** → **Database**
2. Scroll to **Connection string** section
3. Select the **URI** tab
4. Copy the two connection strings:

| Type | Format | Env Variable |
|------|--------|--------------|
| **Transaction pooler** (port 6543) | `postgresql://postgres.[PROJECT]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres` | `DATABASE_URL` |
| **Direct connection** (port 5432) | `postgresql://postgres.[PROJECT]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres` | `DIRECT_URL` |

> Replace `[PASSWORD]` with the database password you set in step 1.1.

### 1.4 — Configure Email Auth (OTP / Magic Link)

1. Go to **Authentication** → **Providers** (left sidebar)
2. **Email** should be enabled by default
3. Click on **Email** to expand settings:
   - ✅ Enable Email provider
   - ✅ Confirm email (keeps it on)
   - Set **OTP expiry** to `300` seconds (5 minutes)
   - Set **Min password length** to `8`
4. Click **Save**

> 📧 Supabase sends emails via their built-in SMTP (rate-limited to 3/hour on free tier).  
> For production, set up a custom SMTP under **Settings** → **Authentication** → **SMTP Settings** (e.g., Resend, SendGrid, or Amazon SES).

### 1.5 — Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing):
   - Name: `CreatorNE`
3. Go to **APIs & Services** → **OAuth consent screen**:
   - User Type: **External**
   - App name: `CreatorNE`
   - User support email: your email
   - Authorized domains: add `supabase.co` and `creatorne.in`
   - Click **Save and Continue** through all steps
4. Go to **APIs & Services** → **Credentials**:
   - Click **Create Credentials** → **OAuth client ID**
   - Application type: **Web application**
   - Name: `CreatorNE Web`
   - **Authorized redirect URIs**: Add:
     ```
     https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback
     ```
     (Replace `YOUR-PROJECT-REF` with your Supabase project reference from the dashboard URL)
   - Click **Create**
5. Copy the **Client ID** and **Client Secret**
6. Back in Supabase dashboard: **Authentication** → **Providers** → **Google**:
   - Toggle **Enable Google provider** ON
   - Paste the **Client ID** and **Client Secret**
   - Click **Save**

### 1.6 — Push the Prisma Schema

Once your `.env.local` has the real database URLs:

```bash
cd web
npx prisma db push
```

This creates all tables in your Supabase PostgreSQL database. Verify by going to **Table Editor** in your Supabase dashboard — you should see all 9 tables.

---

## 2. Cloudinary (Media Storage)

Cloudinary handles creator photos, portfolio media, brand logos, and ID verification uploads.

### 2.1 — Create an Account

1. Go to [https://cloudinary.com](https://cloudinary.com) and click **Sign Up for Free**
2. Fill in your details and sign up
3. You'll land on the **Dashboard** after email verification

### 2.2 — Get Your Credentials

On the Cloudinary Dashboard, you'll see a box labeled **Account Details**:

| Key | Where to Find | Env Variable |
|-----|--------------|--------------|
| **Cloud name** | Displayed prominently (e.g., `dxxxxxx`) | `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` |
| **API Key** | Under cloud name | `CLOUDINARY_API_KEY` |
| **API Secret** | Click "Reveal" next to it | `CLOUDINARY_API_SECRET` |

### 2.3 — Create Upload Presets

Upload presets allow secure client-side uploads with pre-configured transformations.

1. Go to **Settings** (gear icon) → **Upload** tab
2. Scroll down to **Upload presets**
3. Click **Add upload preset** and create these 4 presets:

#### Preset 1: Creator Photos
| Field | Value |
|-------|-------|
| Preset name | `creatorne_creator_photo` |
| Signing mode | **Unsigned** |
| Folder | `creatorne/creators/photos` |
| Format | Auto (WebP) |
| Transformation | `c_fill,w_400,h_400,g_face` (face-aware crop) |

#### Preset 2: Creator Portfolio
| Field | Value |
|-------|-------|
| Preset name | `creatorne_creator_portfolio` |
| Signing mode | **Unsigned** |
| Folder | `creatorne/creators/portfolio` |
| Format | Auto (WebP) |
| Max file size | 10 MB |

#### Preset 3: Brand Logos
| Field | Value |
|-------|-------|
| Preset name | `creatorne_brand_logo` |
| Signing mode | **Unsigned** |
| Folder | `creatorne/brands/logos` |
| Format | Auto (PNG/WebP) |
| Transformation | `c_fit,w_300,h_300` |

#### Preset 4: ID Verification
| Field | Value |
|-------|-------|
| Preset name | `creatorne_id_verification` |
| Signing mode | **Signed** (private — requires API secret) |
| Folder | `creatorne/verification` |
| Access mode | **authenticated** |

4. Click **Save** for each preset

> 💡 **Free tier**: 25 GB storage, 25 GB bandwidth/month — more than enough to start.

---

## 3. Google Analytics (GA4)

GA4 tracks page views, user behavior, and conversion events.

### 3.1 — Create a GA4 Property

1. Go to [https://analytics.google.com](https://analytics.google.com)
2. Sign in with your Google account
3. Click **Admin** (gear icon, bottom-left)
4. Click **Create** → **Property**
5. Fill in:
   - **Property name**: `CreatorNE`
   - **Reporting time zone**: `India (GMT+5:30)`
   - **Currency**: `Indian Rupee (₹)`
6. Click **Next**
7. Business details:
   - Industry: **Arts & Entertainment** or **Business & Industrial**
   - Size: **Small**
8. Click **Create**

### 3.2 — Set Up a Web Data Stream

1. After creating the property, you'll be asked "Choose a platform" → Select **Web**
2. Fill in:
   - **Website URL**: `https://creatorne.in` (or `http://localhost:3000` for now)
   - **Stream name**: `CreatorNE Web`
3. Click **Create stream**
4. Copy the **Measurement ID** — it looks like `G-XXXXXXXXXX`

### 3.3 — Update `.env.local`

```env
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX    ← paste your Measurement ID
```

> The GA4 script in `layout.tsx` automatically loads when this value is set and not the placeholder.

### 3.4 — Recommended Events to Track (later)

These will be added as we build features:

| Event | When |
|-------|------|
| `sign_up` | Creator/Brand registration complete |
| `login` | User logs in |
| `view_profile` | Someone views a creator profile |
| `contact_creator` | Brand clicks "Message Creator" |
| `search` | User searches on Find Creators page |

---

## 4. Meta Pixel (Facebook/Instagram Ads)

Meta Pixel tracks conversions from Facebook/Instagram ad campaigns.

### 4.1 — Create a Meta Pixel

1. Go to [Meta Events Manager](https://business.facebook.com/events_manager)
2. Sign in with your Facebook account
3. Click **Connect Data Sources** (green button)
4. Select **Web** → Click **Connect**
5. Name your pixel: `CreatorNE Pixel`
6. Enter your website URL: `https://creatorne.in`
7. Click **Continue**
8. Choose **Meta Pixel only** (not Conversions API for now)
9. Click **Create Pixel**

### 4.2 — Get Your Pixel ID

1. After creation, you'll see your **Pixel ID** — a 15-16 digit number
2. You can also find it in Events Manager → **Data Sources** → your pixel → **Settings**

### 4.3 — Update `.env.local`

```env
NEXT_PUBLIC_META_PIXEL_ID=123456789012345    ← paste your Pixel ID
```

> The Meta Pixel script in `layout.tsx` automatically loads when this value is set and not the placeholder.

### 4.4 — Verify Installation

1. Install the [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/) Chrome extension
2. Visit your site → the extension icon should show a green checkmark with "PageView" event

---

## 5. Update `.env.local`

After completing all sections above, your [`.env.local`](file:///Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/web/.env.local) should look like this:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...

# Database (from Supabase → Settings → Database → Connection string)
DATABASE_URL=postgresql://postgres.abcdefghijk:YOUR_PASSWORD@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
DIRECT_URL=postgresql://postgres.abcdefghijk:YOUR_PASSWORD@aws-0-ap-south-1.pooler.supabase.com:5432/postgres

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxxxxxx
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwx

# Analytics
NEXT_PUBLIC_GA4_ID=G-ABC1234DEF
NEXT_PUBLIC_META_PIXEL_ID=123456789012345

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 6. Verify Everything Works

After updating `.env.local`, run these commands:

```bash
cd web

# 1. Push database schema to Supabase
npx prisma db push

# 2. Verify tables were created
npx prisma studio
# → Opens a browser UI showing all 9 tables

# 3. Restart dev server (to pick up new env vars)
npm run dev

# 4. Verify in browser
# → Visit http://localhost:3000
# → Check browser console for any errors
# → GA4: Check Google Analytics → Realtime for a live visitor
# → Meta Pixel: Use Meta Pixel Helper extension
```

---

## Quick Reference

| Service | Dashboard URL |
|---------|--------------|
| Supabase | [app.supabase.com](https://app.supabase.com) |
| Cloudinary | [console.cloudinary.com](https://console.cloudinary.com) |
| Google Analytics | [analytics.google.com](https://analytics.google.com) |
| Meta Events Manager | [business.facebook.com/events_manager](https://business.facebook.com/events_manager) |
| Google Cloud Console | [console.cloud.google.com](https://console.cloud.google.com) |

---

*You can configure these services at any point. The app builds and runs locally without them — the placeholder values simply disable the real connections.*
