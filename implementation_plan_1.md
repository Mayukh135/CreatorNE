# CreatorNE — Implementation Plan

> **Sources**: [website project requirements.md](file:///Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/business%20and%20SDR/website%20project%20requirements.md) · [CreatorNE_BusinessPlan.md](file:///Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/business%20and%20SDR/CreatorNE_BusinessPlan.md) · [creatorne page design.png](file:///Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/stitch_image_to_dynamic_web/creatorne%20page%20design.png) · [screen.png](file:///Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/stitch_image_to_dynamic_web/screen.png) · [DESIGN for Screen.md](file:///Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/stitch_image_to_dynamic_web/DESIGN%20for%20Screen.md) · [logos/](file:///Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/logos)

---

## Project Vision

Build the largest Creator Discovery and Brand Collaboration Platform for Northeast India where creators build professional profiles and brands discover, filter, and collaborate with authentic creators.

**Long-term goal**: API-first platform so the website and mobile app share one backend and can scale into the leading creator marketplace for NE India.

---

## Tech Stack (Confirmed)

| Layer | Technology |
|-------|----------|
| Language | **TypeScript** |
| Frontend | **Next.js 14+** (App Router, SSR/SSG for SEO) |
| Styling | **Tailwind CSS** + **Framer Motion** |
| Backend | Next.js API Routes (Node.js) |
| Database | **Supabase PostgreSQL** (Prisma ORM) |
| Auth | **Supabase Auth** (Email OTP, Google OAuth — Phone SMS OTP added later) |
| Media Storage | **Cloudinary** (25GB free, auto-WebP) |
| Deployment | **Vercel** (free tier, may shift to AWS later) |
| Design | Premium UI · Light Theme · Blue/Purple/Pink Gradient · Inter font |

## Color Palette (from logo + design PNG)

```
Primary Purple:     #7C3AED   (CTA buttons, gradient text, active states)
Secondary Blue:     #3B82F6   (Links, secondary buttons, logo arrow)
Gradient Pink:      #E91E8C   (Gradient start for hero/CTA backgrounds)
Gradient Cyan:      #06B6D4   (Gradient end, "NE" accent)
Success Green:      #10B981   ("succeed" text, verified badges)
Sparkle Gold:       #FBBF24   (Sparkles, highlights, premium accents)
Dark Text:          #1E293B   (Headlines, body text)
Muted Text:         #64748B   (Subtitles, descriptions)
Light Background:   #F8FAFC   (Page background)
Card White:         #FFFFFF   (Cards, elevated sections)
```

## Security

| Feature | Implementation |
|---------|---------------|
| OTP Login | **Supabase Auth** Email OTP + Google OAuth (Phone SMS OTP via Twilio added later) |
| Email Verification | Supabase Auth built-in email confirmation |
| SSL | HTTPS enforced (Vercel default) |
| Admin Approval | Profiles stay `PENDING` until admin approves |
| Spam Protection | Rate limiting + reCAPTCHA v3 on all forms |

## SEO & Analytics

| Feature | Implementation |
|---------|---------------|
| Meta Tags | Dynamic OG/Twitter cards per page |
| Schema Markup | JSON-LD (`Person`, `Organization`, `WebSite`) |
| XML Sitemap | Auto-generated for all public profiles/pages |
| Robots.txt | Crawler directives |
| Google Analytics | GA4 integration |
| Meta Pixel | Facebook Pixel for conversion tracking |

## Mobile-First Optimization (Priority: Most Users on Mobile)

> **Design approach**: Mobile-first — build for `320px` first, then enhance for larger screens.

### Responsive Breakpoints (Tailwind defaults)
| Breakpoint | Width | Target |
|-----------|-------|--------|
| Default | `< 640px` | **Mobile phones** (primary target) |
| `sm` | `≥ 640px` | Large phones / small tablets |
| `md` | `≥ 768px` | Tablets |
| `lg` | `≥ 1024px` | Laptops |
| `xl` | `≥ 1280px` | Desktops |
| `2xl` | `≥ 1536px` | Large monitors |

### Mobile Layout Adjustments (per section)
| Section | Desktop | Mobile |
|---------|---------|--------|
| **Navbar** | Horizontal nav links + buttons | Hamburger menu → slide-out drawer |
| **Hero** | 2-column (text left + map right) | Single column — text → map stacked, map scaled down |
| **Hero creator cards** | Floating on map | Horizontally scrollable row below map |
| **Hero stat badges** | Positioned around map | Inline row with horizontal scroll |
| **Feature cards** | 3×2 grid | 2×3 grid (sm) → 1-column stack (xs) |
| **Category chips** | 11 chips in one row | Horizontally scrollable with overflow, scroll snap |
| **How It Works** | Side-by-side tabs | Stacked tabs, swipeable steps |
| **Testimonials** | Multi-card carousel | Single-card swipe carousel |
| **App CTA** | Phone mockup + text side-by-side | Phone mockup above text |
| **Footer** | 5-column grid | Accordion columns (tap to expand) |
| **Creator cards** | 3-column grid | 1-column full-width cards |
| **Admin Panel** | Sidebar + content | Bottom tab navigation + full-width content |

### Mobile Touch Interactions
| Interaction | Desktop | Mobile |
|-------------|---------|--------|
| Card hover preview | Hover popup | Tap to expand / long-press preview |
| Custom cursor follower | Visible (8px → 40px) | **Hidden** (no cursor on touch) |
| 3D tilt on cards | Mouse-based `rotateX/Y` | **Disabled** (no mouse position) |
| Category selection | Click | Tap + scroll snap |
| Testimonial navigation | Auto-rotate + dot click | **Swipe gesture** (`drag="x"`) |
| Navbar glassmorphism | Scroll-triggered | Same (scroll-triggered) |

### Mobile Animation Adjustments
- **Reduce motion distance**: `y: 35→0` on desktop becomes `y: 20→0` on mobile (less jarring on small screens)
- **Faster stagger**: `staggerChildren: 0.08` → `0.05` on mobile (content visible faster)
- **Disable parallax**: Parallax depth layers disabled on mobile (performance + disorienting on touch scroll)
- **Disable floating doodles**: Only show 2-3 key doodles on mobile instead of all (reduce visual clutter)
- **Hero entrance**: Simplified choreography — 3 stages instead of 8 (headline → CTAs → map)

### Mobile Performance Budget
| Metric | Mobile Target |
|--------|--------------|
| First Contentful Paint | `< 1.2s` on 4G |
| Largest Contentful Paint | `< 2.5s` on 4G |
| Total Page Weight | `< 500KB` initial load |
| Images | WebP with `loading="lazy"`, responsive `srcset` via Cloudinary |
| Fonts | Subset Inter to Latin only (`< 20KB`), `font-display: swap` |

### Mobile-Specific Features
- **Sticky mobile CTA bar**: Fixed bottom bar on mobile with "Join as Creator" button (always visible)
- **Pull-to-refresh**: Visual feedback on pull gesture (optional, enhances native feel)
- **Touch-friendly tap targets**: All buttons/links minimum `44px × 44px` (WCAG guideline)
- **No horizontal scroll**: Page body `overflow-x: hidden`, only intentional scroll containers
- **Viewport meta**: `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />`

---

## User Roles

| Role | Description |
|------|-------------|
| **Creator** | NE India content creator — registers, builds public profile, receives opportunities |
| **Brand** | Business — registers, discovers creators, launches campaigns |
| **Admin** | Platform admin — approves users, manages campaigns, analytics, exports, settings |

---

## All Website Pages (from requirements)

Home · About · Creator Registration · Brand Registration · Find Creators · Categories · Blog · FAQ · Contact · Privacy Policy · Terms & Conditions · Login · Dashboard (Creator + Brand + Admin)

---

## Registration Data Models

### Creator Registration Fields
Name · Photo · Email · Phone · WhatsApp · State · City · Languages · Category · Social Links (Instagram, YouTube, etc.) · Followers · Average Views · Engagement Rate · Bio · Portfolio · Previous Collaborations · ID Verification · Bank Details (private) · UPI

### Brand Registration Fields
Brand Name · Contact Person · Email · Phone · Website · Industry · Budget · Campaign Goal · Target State · Timeline

### Creator Categories
Travel · Food · Lifestyle · Fashion & Beauty · Photography · Cinematography · Tech · Comedy · Fitness · Music · Culture · Education · Finance · Gaming · Art · Wildlife · Adventure · Business · Others

---

## Dashboards

| Dashboard | Features |
|-----------|----------|
| **Creator** | Profile management (edit all fields from registration), Campaigns, Notifications, Portfolio, **Messages** (receive from Admin & Brands) |
| **Brand** | Search creators, Filter, Shortlist, Campaigns, Payments, **Messages** (send to Creators, receive from Admin) |
| **Admin** | Approve users, Manage campaigns, Analytics, Export Excel, Email notifications, Website settings, **Messages** (send to any Creator or Brand) |

### Messaging Permission Matrix
| Sender → Receiver | Allowed? |
|-------------------|----------|
| Admin → Creator | ✅ |
| Admin → Brand | ✅ |
| Brand → Creator | ✅ |
| Creator → Brand | ❌ (Creators receive, don't initiate — prevents spam) |
| Creator → Admin | ✅ (Can reply to admin messages) |
| Brand → Admin | ✅ (Can reply to admin messages) |
| Creator → Creator | ❌ |

---

## Search & Filter System (Find Creators Page)
State · City · Category · Followers · Platform · Language · Gender · Verification Status

---

## Design References

| File | What It Is | Scope |
|------|-----------|-------|
| [creatorne page design.png](file:///Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/stitch_image_to_dynamic_web/creatorne%20page%20design.png) | **Landing page / Homepage design** | The entire homepage layout |
| [screen.png](file:///Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/stitch_image_to_dynamic_web/screen.png) | **Find Creators directory page design** | Only the directory/search page |
| [DESIGN for Screen.md](file:///Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/stitch_image_to_dynamic_web/DESIGN%20for%20Screen.md) | Design tokens (colors, typography, spacing) | **Only for screen.png / directory page** |
| [code.html](file:///Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/stitch_image_to_dynamic_web/code.html) | HTML/CSS reference | **Only for screen.png / directory page** |
| [logos/](file:///Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/logos) (7 variants) | Brand logos — swooping arrow + sparkles + "CreatorNE" | Navbar, favicon, social, splash |

### Design Directive (from requirements)
> **Premium UI · Light Theme (matching design PNG) · Blue/Purple Gradient · Mobile Responsive · Fast · SEO Friendly**
>
> Dark mode can be added as a future enhancement.

---

## Homepage Sections (from design PNG + requirements)

The homepage (`creatorne page design.png`) contains these sections:

1. **Navbar** — Logo + nav links (Creators, Categories, About Us, How It Works, Blog, FAQ, Contact) + "Log In" + "Join as Creator"
2. **Hero Banner** — "Discover. Collaborate. Grow Together." + "Join as Creator" and "Hire Creators" buttons + NE India map with floating creator cards + stat badges (500+ Verified Creators, 20+ Partner States, 100+ Collaborations) + avatar stack
3. **Why CreatorNE** — 6 feature cards (Verified Creators, Smart Discovery, Easy Collaboration, Secure Platform, Creator Growth, Community First)
4. **Categories** — Scrollable chips (Travel, Food, Lifestyle, Fashion, Photography, Tech, Gaming, Fitness, Music, Comedy, Education, More)
5. **How It Works** — Two tabs (For Creators: 5 steps / For Brands: 5 steps)
6. **App CTA** — "Take CreatorNE with you, everywhere!" + app store badges + phone mockup
7. **Footer** — 5-column (Brand, Platform, Company, Resources, Newsletter) + social icons + copyright

**Additional homepage sections from requirements** (not in current design PNG, to be added):
- Featured Creators section (dynamic, from DB)
- Featured Brands section (dynamic, from DB)
- Testimonials section
- FAQ section (accordion)

---

## Phased Implementation

---

### Phase 0: Core Foundation (Priority Build)

Everything needed to launch a functional platform with user registration, profiles, admin control, and a polished landing page.

#### 0.1 — Project Setup

##### [NEW] Next.js Project → `CreatorNE/web/`
- Initialize with `npx create-next-app@latest ./` (App Router, **TypeScript**, **Tailwind CSS**)
- Configure project structure for API-first architecture
- Install deps: `prisma`, `@prisma/client`, `@supabase/supabase-js`, `@supabase/auth-helpers-nextjs`, `react-hook-form`, `zod`, `framer-motion`, `lucide-react`, `cloudinary`, `next-cloudinary`

##### [NEW] PostgreSQL Database (Prisma ORM)
```
Models:
├── User (id, email, phone, role, status, emailVerified, passwordHash, createdAt)
├── CreatorProfile (userId, name, photo, whatsApp, state, city, languages[], category,
│     socialLinks{}, followers, avgViews, engagementRate, bio, portfolioMedia[],
│     previousCollabs[], idVerificationUrl, bankDetails{private}, upiId, isVerified)
├── BrandProfile (userId, brandName, contactPerson, phone, website, industry,
│     budget, campaignGoal, targetState, timeline)
├── Category (id, name, slug, icon, creatorCount)
├── Stat (key, value, label) — for dynamic homepage stats
├── Testimonial (id, name, role, content, avatar)
├── Conversation (id, participants[], createdAt, updatedAt, lastMessageAt)
└── Message (id, conversationId, senderId, content, readAt, createdAt)
```

##### [NEW] Media Upload Service (Cloudinary)
- Cloudinary integration via `next-cloudinary` for:
  - Creator photos, portfolio media, ID verification docs
  - Brand logos
- Unsigned upload presets for client-side uploads (with server-side validation)
- Auto-WebP conversion, responsive `srcset`, face-aware cropping

##### [NEW] SEO Foundation
- Dynamic `<head>` meta tags (OG, Twitter) via Next.js `metadata` API
- JSON-LD schema markup component
- `sitemap.xml` route (auto-generated from public profiles)
- `robots.txt` static file
- GA4 script + Meta Pixel script in root layout
- Cookie consent banner

---

#### 0.2 — Dynamic Landing Page (Homepage)

Pixel-accurate match to [creatorne page design.png](file:///Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/stitch_image_to_dynamic_web/creatorne%20page%20design.png) with dynamic data from PostgreSQL + full animation suite from [animation_plan.md](file:///Users/mayukhbhattacharyya/.gemini/antigravity-ide/brain/32ecb1df-d795-41df-958d-62c0c83483f9/animation_plan.md).

##### [NEW] Global Animation Infrastructure
- **Custom Cursor Follower**: `<CursorFollower />` — 8px dot follows mouse, scales to 40px on interactive elements, `mix-blend-mode: difference`, hidden on touch
- **Scroll Progress Bar**: Thin 3px gradient bar (purple→blue) at viewport top, fills with `useScroll` + `useTransform`
- **Hero Entrance Choreography**: Staggered 1.5s load sequence (see below)
- **Scroll-to-Top Button**: Appears after 500px scroll, scale-in animation

##### [NEW] `app/page.jsx` — Homepage Sections

| Section | Component | Data Source |
|---------|-----------|-------------|
| Navbar | `Navbar.jsx` | Static + auth state |
| Hero Banner | `HeroSection.jsx` | `GET /api/stats` |
| Why CreatorNE | `FeaturesSection.jsx` | Static content |
| Featured Creators | `FeaturedCreators.jsx` | `GET /api/creators?featured=true` |
| Featured Brands | `FeaturedBrands.jsx` | `GET /api/brands?featured=true` |
| Categories | `CategoriesSection.jsx` | `GET /api/categories` |
| How It Works | `HowItWorksSection.jsx` | Static content |
| Testimonials | `TestimonialsSection.jsx` | `GET /api/testimonials` |
| FAQ | `FAQSection.jsx` | Static or `GET /api/faqs` |
| App CTA | `AppCTASection.jsx` | Static content |
| Footer | `Footer.jsx` | Static + newsletter |

---

##### `Navbar.jsx` — Animations
- **Initial state**: Transparent background, no shadow
- **On scroll (>50px)**: Smooth transition to glassmorphism (`backdrop-filter: blur(16px)`, `bg-white/70`, bottom shadow fades in)
- **Hero entrance**: Fades in from `y: -20` at **t=0.0s**
- **Nav links hover**: Animated underline slides in from left (`scaleX: 0→1, transformOrigin: left`)
- **"Join as Creator" button hover**: `scale: 1.04, y: -2` + gradient glow shadow expansion
- **"Join as Creator" button tap**: `scale: 0.96`
- **Mobile hamburger**: Slide-out drawer from right with `AnimatePresence`

---

##### `HeroSection.jsx` — Animations (Choreographed Entrance)

**Left Column — Timed Load Sequence:**
| Delay | Element | Animation |
|-------|---------|-----------|
| 0.2s | Purple badge "The Creator Economy of NE India ✨" | `y: 20→0, opacity: 0→1` (spring smooth) |
| 0.4s | "Discover." | `y: 30→0, opacity: 0→1` |
| 0.5s | "Collaborate." | `y: 30→0, opacity: 0→1` |
| 0.6s | "Grow Together." (gradient text) | `y: 30→0, opacity: 0→1` + animated gradient mask (`background-position` shifting over 6s infinite loop) |
| 0.7s | Subtitle text | `y: 20→0, opacity: 0→1` |
| 0.8s | "Join as Creator →" button | `scale: 0.8→1, opacity: 0→1` + click sparkle burst on press |
| 0.85s | "Hire Creators →" button | `scale: 0.8→1, opacity: 0→1` |
| 1.0s | Avatar stack + "500+ creators joined" | `x: -20→0, opacity: 0→1` |

**Right Column — Map & Floating Elements:**
| Delay | Element | Animation |
|-------|---------|-----------|
| 1.0s | NE India map illustration | `opacity: 0→1, scale: 0.95→1` — **Parallax Layer 1** (moves at 0.3× scroll speed) |
| 1.1s | "Travel Creator — Meghalaya" card | `y: 20→0, opacity: 0→1` then **continuous float** `y: [0, -8, 0]` over 4s loop |
| 1.2s | "Food Creator — Nagaland" card | Same with 0.5s offset float timing |
| 1.3s | "Tech Creator — Assam" card | Same with 1.0s offset float timing |
| 1.3s | "Lifestyle Creator — Tripura" card | Same with 1.5s offset float timing |
| 1.2s | "500+ Verified Creators" stat badge | `scale: 0→1` pop-in + continuous float `y: [0, -6, 0]` |
| 1.3s | "20+ Partner States" stat badge | Same with offset |
| 1.4s | "100+ Successful Collaborations" badge | Same with offset |
| 1.0s+ | Stat badge numbers | **Counter animation**: count up from 0→500+, 0→20+, 0→100+ (spring-based, not linear) |

**Decorative Doodles (visible in design):**
| Element | Animation |
|---------|-----------|
| Camera icon (top-right area) | **Parallax Layer 2** (0.6× scroll) + gentle rotate `[-5°, 5°]` loop |
| Megaphone icon (left margin) | Float `y: [0, -10, 0]` over 5s + hover wiggle (15° shake) |
| Chat bubble icons (scattered) | Float with alternating sine timing |
| Star/sparkle icons (multiple) | Subtle scale pulse `[1, 1.2, 1]` over 3s |
| Geometric shapes (circles, dots) | Static but parallax-responsive at 0.4× scroll speed |
| **SVG squiggle underline** under "Grow Together." | Self-drawing `pathLength: 0→1` at t=0.6s when headline appears |

**3D Tilt**: Creator cards on map respond to mouse position with subtle `rotateX/rotateY` (max 5°)

---

##### `FeaturesSection.jsx` — "Why CreatorNE" Animations
- **Section label "WHY CREATONE"**: Scroll-reveal `y: 20→0, opacity: 0→1`
- **Headline "Everything you need to succeed"**: Scroll-reveal + SVG squiggle self-draws under "succeed" (green gradient)
- **6 Feature Cards**: Staggered grid reveal (`staggerChildren: 0.08`), each card `y: 25→0, opacity: 0→1`
- **Card hover**: `y: -8` lift + deeper shadow (`0 20px 40px rgba(124,58,237,0.12)`)
- **Card icons**: Subtle scale pulse on hover (`scale: 1→1.1`)
- **Squircle corners**: `border-radius: 16px; corner-shape: superellipse(2)`

---

##### `FeaturedCreators.jsx` — Animations
- **Section**: Scroll-reveal fade-up
- **Creator cards**: Staggered entrance (`staggerChildren: 0.1`)
- **Card hover**: Image zoom (1.05×), card lifts, verified badge pulses
- **Hover preview**: Floating chip with quick stats appears on hover

---

##### `FeaturedBrands.jsx` — Animations
- **Brand logos**: Infinite marquee ticker scrolling left (`translateX: 0%→-100%` CSS keyframe, continuous)
- **Pause on hover**: Marquee pauses when user hovers

---

##### `CategoriesSection.jsx` — "Explore Categories" Animations
- **Label + "Find creators in every niche"**: Scroll-reveal + SVG squiggle self-draws under "every niche" (green gradient)
- **"View all categories →" link**: Hover underline animation
- **11 Category chips** (Travel, Food, Lifestyle, Fashion, Photography, Tech, Gaming, Fitness, Music, Comedy, Education, More): Staggered entrance from left (`x: -20→0, staggerChildren: 0.06`)
- **Chip hover**: Icon shifts up `y: -3`, background tint intensifies, spring bounce
- **Chip click**: `scale: 0.95` tap feedback

---

##### `HowItWorksSection.jsx` — "How It Works" Animations
- **Label + headline**: Scroll-reveal + SVG squiggle self-draws under "powerful collaborations" (purple gradient)
- **Tab switcher ("For Creators" / "For Brands")**: `layoutId="activeTabPill"` — purple pill indicator slides smoothly between tabs
- **Tab content swap**: `AnimatePresence mode="wait"` — old steps slide out left, new steps slide in from right (`x: 30→0, opacity: 0→1`)
- **5 step icons/cards**: Staggered reveal within each tab (`staggerChildren: 0.1`)
- **Step icon hover**: Subtle bounce (`scale: 1→1.1→1` spring)

---

##### `TestimonialsSection.jsx` — Animations
- **Auto-rotating carousel**: Slides auto-advance every 5s with `AnimatePresence` slide transition
- **Drag/swipe support**: `drag="x"` with `dragConstraints` for mobile
- **Dot indicators**: `layoutId="activeDot"` — active dot slides smoothly
- **Pause on hover**: Carousel pauses when user hovers a testimonial

---

##### `FAQSection.jsx` — Animations
- **Accordion items**: Smooth animated height expansion (`animate: { height: "auto" }`) with spring transition
- **Chevron icon**: Rotates `0°→180°` on open
- **Content fade**: `opacity: 0→1` as answer expands

---

##### `AppCTASection.jsx` — "Take CreatorNE with you" Animations
- **Gradient card background**: Subtle animated gradient shift (purple→indigo cycling over 8s)
- **Phone mockup**: Scroll-reveal `y: 40→0, opacity: 0→1` + gentle continuous float `y: [0, -6, 0]`
- **App store badges**: Staggered entrance, hover `scale: 1.05`
- **Section entrance**: Entire card `y: 50→0, opacity: 0→1` on scroll

---

##### `Footer.jsx` — Animations
- **5-column content**: Staggered column reveal (`staggerChildren: 0.1`)
- **Social icons**: Hover `y: -3, scale: 1.1` with spring
- **Newsletter input**: Focus state — border color transition, label float animation
- **Subscribe button**: Hover glow + tap squish
- **"Made with ❤️ in Northeast India"**: Heart icon subtle pulse animation

---

##### API Endpoints for Homepage
```
GET  /api/stats                     → { verifiedCreators, partnerStates, collaborations }
GET  /api/categories                → [{ id, name, slug, icon, creatorCount }]
GET  /api/creators?featured=true    → [top verified creators for homepage]
GET  /api/brands?featured=true      → [featured brand logos/names]
GET  /api/testimonials              → [{ name, role, content, avatar }]
POST /api/newsletter                → { email } → subscribe
```

---

#### 0.3 — Authentication System (Supabase Auth)

> **Phase 0**: Email OTP + Google OAuth (free). Phone SMS OTP added later with Twilio.
> **Future**: May migrate to Firebase Auth or custom JWT per [website project requirements.md](file:///Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/business%20and%20SDR/website%20project%20requirements.md).

##### [NEW] Supabase Auth Login Flow
1. User enters email → `supabase.auth.signInWithOtp({ email })`
2. OTP/Magic Link sent via Supabase's built-in email service
3. User enters OTP or clicks link → auto-verified, session created
4. Supabase session cookie (HTTP-only) → redirect to onboarding or dashboard
5. Google OAuth: `supabase.auth.signInWithOAuth({ provider: 'google' })`

##### [NEW] Auth Pages — Unified Sliding Double-Panel Design

One page per action, with a **sliding overlay panel** to switch between Creator and Brand views (like the reference image).

| Page | Route | Description |
|------|-------|-------------|
| Register | `/register` | Single page — slide between Creator ↔ Brand registration |
| Login | `/login` | Single page — slide between Creator ↔ Brand login |

##### `/register` — Sliding Panel Registration Page

```
┌──────────────────────────────────────────────┐
│                                              │
│  ┌─────────────────┬─────────────────┐       │
│  │                 │                 │       │
│  │  OVERLAY PANEL  │   FORM PANEL    │       │
│  │  (purple/blue   │                 │       │
│  │   gradient)     │  Creator Reg    │       │
│  │                 │  Form Fields    │       │
│  │  "Are you a     │  - Name         │       │
│  │   Brand?"       │  - Email        │       │
│  │                 │  - Phone...     │       │
│  │  [Switch →]     │  - Category     │       │
│  │                 │  [Sign Up]      │       │
│  │                 │                 │       │
│  └─────────────────┴─────────────────┘       │
│                                              │
└──────────────────────────────────────────────┘

User clicks "Switch" → Overlay SLIDES to the right:

┌──────────────────────────────────────────────┐
│                                              │
│  ┌─────────────────┬─────────────────┐       │
│  │                 │                 │       │
│  │   FORM PANEL    │  OVERLAY PANEL  │       │
│  │                 │  (purple/blue   │       │
│  │  Brand Reg      │   gradient)     │       │
│  │  Form Fields    │                 │       │
│  │  - Brand Name   │  "Are you a     │       │
│  │  - Contact      │   Creator?"     │       │
│  │  - Industry...  │                 │       │
│  │  [Sign Up]      │  [← Switch]     │       │
│  │                 │                 │       │
│  └─────────────────┴─────────────────┘       │
│                                              │
└──────────────────────────────────────────────┘
```

**Animation Details:**
- Overlay panel slides left↔right with spring physics (`stiffness: 300, damping: 25`)
- Form panels crossfade with `AnimatePresence mode="wait"` (`opacity + x offset`)
- Overlay has CreatorNE gradient background (purple→blue matching logo)
- Social login buttons (Google) sit above the form: `[G]`
- Overlay text: "Welcome Back!" / "Are you a Brand?" / "Are you a Creator?"
- Overlay CTA: "Sign In" or "Switch to Brand/Creator"
- Mobile: Panels stack vertically — overlay becomes a top banner with toggle button

##### `/login` — Sliding Panel Login Page
Same double-panel pattern:
- **Left/Right panel**: Email OTP form (email input → send OTP → verify code)
- **Overlay panel**: Slides to switch between "Creator Login" and "Brand Login"
- After login, user is redirected to their role-specific dashboard
- "Don't have an account? Register" link → navigates to `/register`

##### Creator Registration Form Fields (inside the form panel)
Multi-step wizard with animated progress ring:
1. **Step 1 — Basics**: Name, Photo (Cloudinary upload), Email, Phone, WhatsApp
2. **Step 2 — Location**: State (8 NE states), City, Languages
3. **Step 3 — Creator Info**: Category (19 categories), Social Links, Followers, Avg Views, Engagement Rate
4. **Step 4 — Portfolio**: Bio, Portfolio Media (multi-upload), Previous Collaborations
5. **Step 5 — Verification**: ID Verification (upload), Bank Details (encrypted), UPI
- Step transitions: slide left-to-right with `AnimatePresence`
- Progress ring updates with spring animation on each step completion
- Confetti doodle burst on final step submission

##### Brand Registration Form Fields (inside the form panel)
Single-step form: Brand Name, Contact Person, Email, Phone, Website, Industry, Budget, Campaign Goal, Target State, Timeline

##### Security Middleware
- Rate limiting on auth endpoints (5 requests/min)
- reCAPTCHA v3 on registration forms
- Input sanitization (XSS/SQL injection prevention)
- CORS configuration
- Helmet security headers

---

#### 0.4 — Creator Profile Page + Dashboard

##### [NEW] `/creators/[slug]` — Public Creator Profile
- Hero banner (cover image) + circular avatar with gradient verified border
- Name, city/state, verified badge, niche chip
- Bio section
- Stats: Followers, Avg Views, Engagement Rate
- Social links (Instagram, YouTube, etc.) with icons
- Portfolio gallery (images/videos from Cloudinary)
- Previous Collaborations section
- "Hire Now" / "Contact" CTA button (for brands)
- JSON-LD `Person` schema for SEO

##### [NEW] `/dashboard/creator` — Creator Dashboard
Available immediately after registration (creators can update their profile right away).

| Tab | Route | Features |
|-----|-------|----------|
| Profile | `/dashboard/creator/profile` | Edit ALL registration fields, re-upload photos/portfolio, preview public profile |
| Messages | `/dashboard/creator/messages` | Inbox — messages from Admin and Brands, reply capability |
| Campaigns | `/dashboard/creator/campaigns` | Received opportunities (placeholder for Phase 2) |
| Notifications | `/dashboard/creator/notifications` | System alerts, approval status, new messages |

##### Profile Editing Details
- **Every field from registration** is editable: Name, Photo, Email, Phone, WhatsApp, State, City, Languages, Category, Social Links, Followers, Avg Views, Engagement Rate, Bio, Portfolio, Previous Collabs
- Photo/portfolio upload with drag-and-drop preview (Cloudinary)
- Unsaved changes warning before navigation
- Save → `PUT /api/creators/:id` with optimistic UI update

---

#### 0.5 — Brand Profile Page + Dashboard

##### [NEW] `/brands/[slug]` — Public Brand Profile
- Brand logo + company name + industry
- Description, website link
- Campaign goal, target states
- Contact button

##### [NEW] `/dashboard/brand` — Brand Dashboard

| Tab | Route | Features |
|-----|-------|----------|
| Profile | `/dashboard/brand/profile` | Edit all brand registration fields |
| Messages | `/dashboard/brand/messages` | Send messages to creators, receive from Admin |
| Shortlist | `/dashboard/brand/shortlist` | Saved creator profiles |
| Campaigns | `/dashboard/brand/campaigns` | Created campaigns (placeholder for Phase 2) |

##### Brand → Creator Messaging
- From any creator's public profile (`/creators/[slug]`), brands see a **"Message Creator"** button
- Opens a compose window → message sent to creator's inbox
- Brand dashboard shows all conversations with read/unread status

---

#### 0.6 — Admin Panel

##### [NEW] `/admin` — Protected Admin Dashboard
Only accessible by users with `role: ADMIN`.

| Feature | Route | Description |
|---------|-------|-------------|
| Dashboard | `/admin` | Overview stats (total creators, brands, pending, approved) |
| Approval Queue | `/admin/approvals` | List of pending Creator/Brand registrations with Approve/Reject buttons |
| User Management | `/admin/users` | Search, filter, view, edit, suspend users |
| **Messages** | **`/admin/messages`** | **Send messages to any creator or brand, view all conversations** |
| Campaign Management | `/admin/campaigns` | (Placeholder for future) |
| Analytics | `/admin/analytics` | Registration trends, category distribution, state heatmap |
| Export Excel | `/admin/export` | Download creator/brand data as .xlsx |
| Email Notifications | `/admin/notifications` | Send bulk/individual emails to creators/brands |
| Website Settings | `/admin/settings` | Edit homepage stats, featured creators, testimonials, FAQ content |

##### Admin Messaging
- Admin sees a unified inbox with all conversations
- Can initiate new conversations with any creator or brand
- Can view message history per user from User Management page
- Unread message count badge in sidebar

##### Admin API Endpoints
```
GET    /api/admin/stats              → dashboard overview numbers
GET    /api/admin/approvals          → pending users list
POST   /api/admin/approvals/:id      → { action: 'approve' | 'reject' }
GET    /api/admin/users              → paginated user list with filters
PUT    /api/admin/users/:id          → edit user
DELETE /api/admin/users/:id          → suspend/delete user
GET    /api/admin/export/creators    → Excel download
POST   /api/admin/notifications      → send email to users
GET    /api/admin/settings           → site settings
PUT    /api/admin/settings           → update site settings
```

---

#### 0.7 — In-App Messaging System

##### [NEW] Messaging Infrastructure
Real-time messaging using **Supabase Realtime** (built-in, free tier — PostgreSQL change listeners via WebSockets).

##### Database: Conversations + Messages
```
Conversation:
├── id (UUID)
├── participants[] (array of user IDs — always 2 users)
├── lastMessageAt (timestamp — for sorting)
├── createdAt, updatedAt

Message:
├── id (UUID)
├── conversationId (FK → Conversation)
├── senderId (FK → User)
├── content (text)
├── readAt (nullable timestamp — null = unread)
├── createdAt
```

##### Messaging UI Components
- **`MessagesSidebar.tsx`**: List of conversations with last message preview, unread badge, sorted by recent
- **`ChatWindow.tsx`**: Selected conversation — message bubbles (sender on right, receiver on left), timestamp, read receipt
- **`ComposeMessage.tsx`**: New message input with send button, auto-resize textarea
- **`MessageNotificationBadge.tsx`**: Unread count in dashboard sidebar nav

##### Real-time with Supabase Realtime
```typescript
// Subscribe to new messages in a conversation
supabase
  .channel('messages')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'messages',
    filter: `conversation_id=eq.${conversationId}`
  }, (payload) => {
    // Add new message to UI instantly
  })
  .subscribe()
```

##### Messaging API Endpoints
```
GET    /api/messages/conversations           → list user's conversations (sorted by lastMessageAt)
POST   /api/messages/conversations           → create new conversation { recipientId }
GET    /api/messages/conversations/:id        → get messages in a conversation (paginated)
POST   /api/messages/conversations/:id        → send message { content }
PATCH  /api/messages/:messageId/read          → mark message as read
GET    /api/messages/unread-count              → { count } for badge
```

##### Permission Enforcement (Middleware)
```typescript
// Before sending a message, check:
// 1. Admin can message anyone
// 2. Brand can message Creators
// 3. Creator can only REPLY (conversation must already exist, initiated by Admin/Brand)
// 4. Creator cannot message other Creators
```

---

### Phase 1: Find Creators Directory + Categories Page

Build the creator discovery page matching [screen.png](file:///Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/stitch_image_to_dynamic_web/screen.png). Use design tokens from [DESIGN for Screen.md](file:///Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/stitch_image_to_dynamic_web/DESIGN%20for%20Screen.md) and reference [code.html](file:///Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/stitch_image_to_dynamic_web/code.html) for this page.

##### [NEW] `/find-creators` — Directory Page
- Hero: "Find the Voice of the Northeast"
- Pill-shaped search bar: text + category dropdown + location dropdown + Search
- Sidebar filters: State, City, Category, Followers, Platform, Language, Gender, Verification
- Creator card grid (3 columns) with pagination
- Each card: cover image, verified badge, name, niche chip, location, followers, engagement rate, "View Profile" + "Hire Now"
- Sort by: Relevance, Followers, Engagement, Newest

##### [NEW] `/categories` — Categories Listing Page
- All 19 categories with icons and creator counts
- Click → filtered directory view

##### API
```
GET /api/creators?search=&state=&city=&category=&followers=&platform=&language=&gender=&verified=&sort=&page=&limit=
```

---

### Phase 2: Creator Dashboard + Brand Dashboard

##### Creator Dashboard (`/dashboard/creator`)
- Profile overview + edit
- Campaigns (received opportunities)
- Notifications
- Portfolio management

##### Brand Dashboard (`/dashboard/brand`)
- Search & filter creators
- Shortlist management
- Campaigns (created)
- Payments (placeholder)

---

### Phase 3: Static & Content Pages

- `/about` — About CreatorNE, mission, NE India focus
- `/blog` — Blog listing + individual post pages
- `/faq` — FAQ accordion
- `/contact` — Contact form
- `/privacy-policy` — Privacy Policy
- `/terms` — Terms & Conditions

---

### Phase 4: Future Features (from requirements)

| Feature | Description |
|---------|-------------|
| Campaign Marketplace | Brands create campaigns, creators apply, get paid |
| AI Matching | Smart creator-brand matching based on niche/audience |
| ~~Chat~~ | ~~Real-time messaging~~ → **Moved to Phase 0.7** |
| Ratings & Reviews | Post-campaign feedback system |
| Payment Gateway | Escrow payments, commission system |
| Mobile App | React Native / Flutter, shared API backend |

---

## Resolved Decisions

| Question | Decision |
|----------|----------|
| **Theme** | Stick with the **light theme** from `creatorne page design.png`. Ignore the "Black Theme" mention in requirements — the design PNG is the source of truth. |
| **Logos** | Use the existing logo images **as-is** (dark backgrounds). Transparent PNG versions will be made later and swapped in. |
| **Creator Images** | Use the **Google-hosted creator images** from [code.html](file:///Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/stitch_image_to_dynamic_web/code.html) for sample/seed data. |

---

## Verification Plan

### Phase 0 Checks
```bash
# Build succeeds
npm run build

# API health
curl localhost:3000/api/health

# Auth flow
curl -X POST localhost:3000/api/auth/send-otp -d '{"email":"test@test.com"}'

# Creator/Brand APIs
curl localhost:3000/api/creators
curl localhost:3000/api/brands

# Admin APIs (with admin JWT)
curl -H "Authorization: Bearer <token>" localhost:3000/api/admin/stats
curl -H "Authorization: Bearer <token>" localhost:3000/api/admin/approvals
```

### Visual QA
- Landing page vs [creatorne page design.png](file:///Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/stitch_image_to_dynamic_web/creatorne%20page%20design.png) — pixel comparison
- Directory page vs [screen.png](file:///Users/mayukhbhattacharyya/Desktop/Project/CreatorNE/stitch_image_to_dynamic_web/screen.png) — pixel comparison
- Responsive: 320px, 768px, 1024px, 1440px
- Lighthouse: Performance, Accessibility, SEO scores

### SEO Audit
- Google Rich Results Test for schema markup
- Validate `sitemap.xml` and `robots.txt`
- Verify GA4 and Meta Pixel events fire on page loads and key actions
