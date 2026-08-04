# CreatorNE — Development Roadmap

> **CreatorNE** — *Create. Connect. Grow.*  
> The largest Creator Discovery & Brand Collaboration Platform for Northeast India.

---

## Project Vision

Build an API-first platform where creators from NE India build professional profiles, and brands discover, filter, and collaborate with authentic creators. Website and future mobile app share one backend.

**Domain**: `creatorne.in`

---

## Tech Stack (Confirmed)

| Layer | Technology |
|-------|-----------|
| Language | **TypeScript** |
| Frontend | **Next.js 14+** (App Router, SSR/SSG for SEO) |
| Styling | **Tailwind CSS** + **Framer Motion** |
| Backend | Next.js API Routes (Node.js) |
| Database | **Supabase PostgreSQL** (Prisma ORM) |
| Auth | **Supabase Auth** (Email OTP, Google OAuth — Phone SMS OTP added later) |
| Media Storage | **Cloudinary** (25GB free, auto-WebP, face-aware cropping) |
| Real-time | **Supabase Realtime** (WebSocket for messaging) |
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

| Feature | Method |
|---------|--------|
| OTP Login | **Supabase Auth** Email OTP + Google OAuth (Phone SMS via Twilio later) |
| Email Verification | Supabase Auth built-in email confirmation |
| Admin Approval | Profiles stay PENDING until admin approves |
| SSL | HTTPS enforced (Vercel default) |
| Spam Protection | Rate limiting + reCAPTCHA v3 |

## SEO & Analytics

| Feature | Method |
|---------|--------|
| Meta Tags | Dynamic OG + Twitter Cards per page |
| Schema Markup | JSON-LD (Person, Organization, WebSite) |
| Sitemap | Auto-generated sitemap.xml |
| Robots.txt | Crawler directives |
| Google Analytics | GA4 |
| Meta Pixel | Facebook conversion tracking |

---

## User Roles

- **Creator** — NE India content creator. Registers, builds profile, receives opportunities, messages from Admin & Brands.
- **Brand** — Business user. Discovers creators, launches campaigns, messages creators.
- **Admin** — Approves users, manages campaigns, analytics, exports, settings, messages any user.

### Messaging Permission Matrix

| Sender → Receiver | Allowed? |
|-------------------|----------|
| Admin → Creator | ✅ |
| Admin → Brand | ✅ |
| Brand → Creator | ✅ |
| Creator → Brand | ❌ (receive only, prevents spam) |
| Creator → Admin | ✅ (can reply) |
| Brand → Admin | ✅ (can reply) |
| Creator → Creator | ❌ |

---

## Website Pages

Home · About · Register (unified sliding panel) · Login (unified sliding panel) · Find Creators · Categories · Blog · FAQ · Contact · Privacy Policy · Terms & Conditions · Creator Dashboard · Brand Dashboard · Admin Panel

---

## Creator Categories (19)

Travel · Food · Lifestyle · Fashion & Beauty · Photography · Cinematography · Tech · Comedy · Fitness · Music · Culture · Education · Finance · Gaming · Art · Wildlife · Adventure · Business · Others

---

## Design References

| File | What It Is |
|------|-----------|
| `creatorne page design.png` | Homepage / Landing page (source of truth) |
| `screen.png` | Find Creators directory page |
| `DESIGN for Screen.md` | Design tokens for directory page only |
| `code.html` | HTML reference for directory page only |
| `logos/` | 7 logo variants (gradient swoosh + sparkles) |

---

## Database Schema (Prisma)

```
Models:
├── User (id, email, phone, role, status, emailVerified, passwordHash, createdAt)
├── CreatorProfile (userId, name, photo, whatsApp, state, city, languages[], category,
│     socialLinks{}, followers, avgViews, engagementRate, bio, portfolioMedia[],
│     previousCollabs[], idVerificationUrl, bankDetails{private}, upiId, isVerified)
├── BrandProfile (userId, brandName, contactPerson, phone, website, industry,
│     budget, campaignGoal, targetState, timeline)
├── Category (id, name, slug, icon, creatorCount)
├── Stat (key, value, label)
├── Testimonial (id, name, role, content, avatar)
├── Conversation (id, participants[], createdAt, updatedAt, lastMessageAt)
└── Message (id, conversationId, senderId, content, readAt, createdAt)
```

---

## Mobile-First Optimization

> **Design approach**: Mobile-first — build for `320px` first, enhance for larger screens.

### Responsive Breakpoints (Tailwind)
| Breakpoint | Width | Target |
|-----------|-------|--------|
| Default | `< 640px` | **Mobile phones** (primary) |
| `sm` | `≥ 640px` | Large phones / small tablets |
| `md` | `≥ 768px` | Tablets |
| `lg` | `≥ 1024px` | Laptops |
| `xl` | `≥ 1280px` | Desktops |

### Key Mobile Adjustments
- **Navbar**: Hamburger → slide-out drawer
- **Hero**: Single-column stack (text above, map below)
- **Categories**: Horizontal scroll with snap
- **Footer**: Accordion columns
- **Custom cursor**: Hidden on touch
- **Parallax**: Disabled on mobile
- **Floating doodles**: Reduced to 2-3 on mobile
- **Sticky CTA bar**: Fixed bottom "Join as Creator" on mobile
- **Tap targets**: All buttons minimum 44×44px
- **Performance**: < 500KB initial load, < 2.5s LCP on 4G

---

## Animation Strategy

> **Inspiration**: [alike.page](https://www.alike.page/) · **Engine**: Framer Motion (LazyMotion, < 15KB)

### Core Techniques
- **Self-drawing SVG doodles** — `pathLength: 0→1` on scroll enter (squiggles under key text)
- **Floating doodles** — Cameras, airplanes, sparkles with sine-wave `y` float loops
- **Custom cursor follower** — 8px dot → 40px on interactive, `mix-blend-mode: difference`
- **Hero entrance choreography** — Staggered 1.5s sequence (navbar → badge → headline → CTAs → map → stats → doodles)
- **Scroll progress bar** — 3px gradient bar at viewport top
- **Parallax depth layers** — Map at 0.3×, doodles at 0.6×, content at 1× scroll speed
- **Squircle corners** — `corner-shape: superellipse(2)` on cards
- **Animated gradient text** — "Grow Together." has cycling `background-position`

### Spring Configs
| Config | Values | Use Case |
|--------|--------|----------|
| Snappy | `stiffness: 400, damping: 30` | Button taps |
| Smooth | `stiffness: 200, damping: 20` | Section reveals |
| Gentle | `stiffness: 100, damping: 20` | Floating doodles |
| Morph | `stiffness: 300, damping: 25` | Tab indicators, layout shifts |

### Micro-Interactions
- **Buttons**: Hover `scale: 1.04, y: -2` + glow; Tap `scale: 0.96`
- **Cards**: Hover `y: -8` + deeper shadow; Image zoom 1.05×
- **Category chips**: Icon shifts up, background tint on hover
- **Nav links**: Animated underline from left (`scaleX: 0→1`)
- **Click sparkle burst**: 4-5 mini doodles expand on CTA click

### Retention Features
- **Hover profile previews** — Floating chip with stats on creator card hover
- **Live activity toasts** — "🟢 Sentila from Nagaland joined 2m ago"
- **Counter animations** — Stats count up from 0 on viewport enter (spring-based)
- **Gamified registration** — Progress ring + confetti burst on step completion
- **Sticky quick-filter bar** — Pill bar floats at bottom after scrolling past hero

### Performance Rules
- **GPU only**: Animate `transform` + `opacity` only (never width/height/margin)
- `will-change: transform` on floating elements
- `viewport={{ once: true }}` — fire once, don't re-trigger
- SVGs minified with SVGO, inline `<path>` only
- Next.js `<Image>` with WebP, blurDataURL placeholders
- `prefers-reduced-motion` check — disables all animations

### Performance Targets
| Metric | Target |
|--------|--------|
| FCP | `< 0.9s` (desktop) / `< 1.2s` (mobile 4G) |
| LCP | `< 1.8s` (desktop) / `< 2.5s` (mobile 4G) |
| CLS | `0.00` |
| Frame Rate | `60-120 FPS` |
| INP | `< 50ms` |

---

## Phased Roadmap

### Phase 0: Core Foundation (Priority) ⬜

#### 0.1 — Project Setup
- [ ] Initialize Next.js project in `CreatorNE/web/` (TypeScript, Tailwind CSS)
- [ ] Set up Supabase PostgreSQL + Prisma schema
- [ ] Configure Supabase Auth (Email OTP + Google OAuth)
- [ ] Configure Cloudinary for media uploads (next-cloudinary)
- [ ] Set up security middleware (rate limiting, CORS, Helmet)
- [ ] SEO foundation (meta tags, schema markup, sitemap, robots.txt, GA4, Meta Pixel)
- [ ] Install deps: `prisma`, `@supabase/supabase-js`, `@supabase/auth-helpers-nextjs`, `framer-motion`, `lucide-react`, `next-cloudinary`, `react-hook-form`, `zod`

#### 0.2 — Dynamic Landing Page (Homepage)
Pixel-match to `creatorne page design.png` with full animation suite.

- [ ] **Global**: Custom cursor follower, scroll progress bar, scroll-to-top button
- [ ] **Navbar** — Logo, nav links, Log In, Join as Creator; glassmorphism on scroll; mobile hamburger drawer
- [ ] **Hero** — Choreographed entrance (1.5s stagger); "Discover. Collaborate. Grow Together." (gradient text + SVG squiggle); CTAs with sparkle burst; NE map with parallax + floating creator cards (3D tilt) + stat badges (counter animation); decorative doodles
- [ ] **Why CreatorNE** — 6 feature cards; staggered grid reveal; SVG squiggle under "succeed"
- [ ] **Featured Creators** — Dynamic from DB; staggered card entrance; hover preview
- [ ] **Featured Brands** — Infinite marquee ticker; pause on hover
- [ ] **Categories** — 11 chips; staggered entrance; SVG squiggle under "every niche"
- [ ] **How It Works** — Tab switcher with `layoutId` pill; `AnimatePresence` content swap
- [ ] **Testimonials** — Auto-rotating carousel; drag/swipe; dot indicators
- [ ] **FAQ** — Animated accordion; chevron rotation
- [ ] **App CTA** — Gradient card; floating phone mockup
- [ ] **Footer** — 5 columns; social icon spring hovers; newsletter input focus animation

#### 0.3 — Authentication (Supabase Auth)
Unified sliding double-panel design (like reference image).

- [ ] `/register` — Single page; sliding overlay to switch Creator ↔ Brand; spring animation
- [ ] `/login` — Single page; sliding overlay to switch Creator ↔ Brand login
- [ ] Creator registration: 5-step wizard (Basics → Location → Creator Info → Portfolio → Verification) with progress ring + confetti
- [ ] Brand registration: Single-step form
- [ ] Google OAuth button on both forms
- [ ] Mobile: Panels stack vertically, overlay becomes toggle banner
- [ ] reCAPTCHA v3 on all forms

#### 0.4 — Creator Profile + Dashboard
- [ ] `/creators/[slug]` — Public profile (banner, avatar, bio, stats, socials, portfolio gallery, hire CTA, JSON-LD)
- [ ] `/dashboard/creator/profile` — Edit ALL registration fields, drag-and-drop uploads, unsaved changes warning
- [ ] `/dashboard/creator/messages` — Inbox from Admin & Brands, reply
- [ ] `/dashboard/creator/campaigns` — Received opportunities (placeholder)
- [ ] `/dashboard/creator/notifications` — System alerts, approval status

#### 0.5 — Brand Profile + Dashboard
- [ ] `/brands/[slug]` — Public brand page (logo, info, campaign goals)
- [ ] `/dashboard/brand/profile` — Edit brand fields
- [ ] `/dashboard/brand/messages` — Send to creators, receive from Admin; "Message Creator" button on public profiles
- [ ] `/dashboard/brand/shortlist` — Saved creator profiles
- [ ] `/dashboard/brand/campaigns` — Created campaigns (placeholder)

#### 0.6 — Admin Panel
- [ ] `/admin` — Overview stats dashboard
- [ ] `/admin/approvals` — Pending queue with approve/reject
- [ ] `/admin/users` — Search, filter, edit, suspend users
- [ ] `/admin/messages` — Unified inbox, message any creator/brand, view history per user
- [ ] `/admin/analytics` — Registration trends, category distribution, state heatmap
- [ ] `/admin/export` — Excel download
- [ ] `/admin/notifications` — Send emails to users
- [ ] `/admin/settings` — Manage homepage content (featured creators, stats, testimonials, FAQ)

#### 0.7 — In-App Messaging System
- [ ] Supabase Realtime WebSocket setup for instant delivery
- [ ] Conversation + Message models (Prisma)
- [ ] `MessagesSidebar.tsx` — Conversation list, last message preview, unread badge
- [ ] `ChatWindow.tsx` — Message bubbles, timestamps, read receipts
- [ ] `ComposeMessage.tsx` — Auto-resize textarea, send button
- [ ] `MessageNotificationBadge.tsx` — Unread count in sidebar nav
- [ ] Permission enforcement middleware (Admin→all, Brand→Creator, Creator→reply only)
- [ ] Messaging API: 6 endpoints (list/create conversations, send/read messages, unread count)

#### 0.8 — Seed Data
- [ ] Seed ~15-20 creator profiles across all 8 NE states (Google-hosted images from `code.html`)
- [ ] Seed categories with icons and counts
- [ ] Seed homepage stats, testimonials, FAQ
- [ ] Seed admin account: `mayukh.clients@gmail.com` / `Admin@99`

---

### Phase 1: Find Creators + Categories ⬜

Uses design tokens from `DESIGN for Screen.md` and reference from `code.html` / `screen.png`.

- [ ] `/find-creators` — Search bar, sidebar filters, creator card grid, pagination
- [ ] Filters: State, City, Category, Followers, Platform, Language, Gender, Verification
- [ ] Sort: Relevance, Followers, Engagement, Newest
- [ ] `/categories` — All 19 categories with icons and counts → filtered directory

---

### Phase 2: Enhanced Dashboards ⬜
- [ ] Creator Dashboard — Campaigns with real data, portfolio management
- [ ] Brand Dashboard — Campaign creation, shortlist management, payments (placeholder)

---

### Phase 3: Static & Content Pages ⬜
- [ ] About · Blog · FAQ · Contact · Privacy Policy · Terms & Conditions

---

### Phase 4: Future Features ⬜
- [ ] Campaign Marketplace — brands post, creators apply, payments
- [ ] AI Matching — smart creator-brand matching
- [ ] Ratings & Reviews — post-campaign feedback
- [ ] Payment Gateway — escrow, commission system
- [ ] Mobile App — React Native / Flutter, shared API

---

## Confirmed Decisions (from Q&A)

| # | Decision | Details |
|---|----------|---------|
| Q1 | Auth | Supabase Auth (Email OTP + Google OAuth). Phone SMS later. |
| Q2 | Database | Supabase PostgreSQL (Prisma ORM) |
| Q3 | Media | Cloudinary (25GB free) |
| Q4 | Seed Data | ~15-20 creators across 8 NE states |
| Q5 | Admin | `mayukh.clients@gmail.com` / `Admin@99` |
| Q6 | Language | TypeScript |
| Q7 | Styling | Tailwind CSS |
| Q8 | NE Map | Custom SVG illustration (careful execution) |
| Q9 | Doodles | Inline animated SVGs (pathLength) |
| Q10 | Deploy | Vercel (may shift to AWS) |
| Q11 | Auth Platform | Supabase Auth — one platform for Auth + DB |
| Q12 | Folder | `CreatorNE/web/` |
| Q13 | Colors | Merged logo + design PNG palette |

---

## Business Context

### Market Opportunity
- **8 States** across Northeast India
- **500+ Creators** target Year 1 onboarding
- **₹0 Competition** — no focused NE platform exists
- **10K+ Creators** addressable by Year 3

### Competitive Gap
| Platform | Gap |
|----------|-----|
| Instagram | Not searchable professionally |
| LinkedIn | Not creator-focused |
| National Platforms | Ignore Northeast India |
| WhatsApp Groups | Unorganized, no discovery |

### Business Product Roadmap
1. Creator Directory — searchable profiles by state/niche
2. Creator Network — connect, collaborate, messaging
3. Campaign Management — brand campaigns, payments, tracking
4. Creator Academy — workshops, online education
5. Annual Awards — PR events, sponsorships

---

## Reference Documents
- **Implementation Plan**: Detailed technical specs with animation per component → `implementation_plan.md` (artifact)
- **Animation Plan**: Full v4 animation strategy → `animation_plan.md` (artifact)
- **Q&A**: All confirmed decisions → `qna.md` (artifact)
- **Export Instructions**: Supabase/Cloudinary/Firebase migration guide → `instructions.md`

---

*Last updated: August 3, 2026*
