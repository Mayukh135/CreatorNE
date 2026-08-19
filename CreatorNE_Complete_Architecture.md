# CreatorNE — Complete Product, Data, and System Architecture

> Working architecture for a creator-intelligence and brand-collaboration marketplace. Validate current Meta API capabilities, payment-provider eligibility, and legal obligations before production launch.

## 1. Product definition

CreatorNE is a platform where creators connect verified social accounts, build credible profiles from permitted platform data, discover paid work, deliver campaign work, and get paid. Brands can find relevant creators, run campaigns, review work, and pay through a controlled marketplace flow.

CreatorNE is not merely a directory of follower counts. Its value is the intelligence layer:

```text
Social-platform data + creator-provided data + campaign history
                         ↓
          normalized creator intelligence
                         ↓
 creator score, analytics, trust signals, and brand matching
```

## 2. Primary users

| User | Core jobs |
|---|---|
| Creator | Create profile, connect social accounts, show portfolio, apply/accept work, submit deliverables, receive payout |
| Brand | Create organization, search creators, launch campaigns, select creators, fund work, review deliverables |
| Admin | Verify users, moderate content, resolve disputes, oversee payments and reconciliation |

## 3. Core marketplace transaction

```text
Brand pays → regulated payment infrastructure secures/defers settlement
          → creator performs work → brand approves
          → CreatorNE keeps its commission → creator receives payout
```

Do not receive funds into a normal CreatorNE bank account and manually hold or distribute them. Use a payment provider's supported marketplace/split-settlement product, and obtain legal/compliance advice for the final commercial model.

## 4. System architecture

```text
                       CREATORNE
 ┌──────────────────────────────────────────────────────────────┐
 │ Creator mobile app │ Brand web app │ Admin web app            │
 │ Expo / React Native│ Next.js       │ Next.js                  │
 └───────────────┬───────────────┬──────────────────────────────┘
                 └───────────────┼───────────────┐
                                 ▼               ▼
                    CreatorNE API / Backend   Realtime events
                         Next.js routes       Supabase Realtime
                                 │
       ┌─────────────────────────┼──────────────────────────┐
       ▼                         ▼                          ▼
 Supabase Auth/Postgres   Social integrations         Payment provider
       │                  Instagram, later            marketplace / Route
       │                  YouTube, TikTok              │
       ▼                         │                      ▼
  RLS + storage/data       sync workers/jobs      linked creator accounts
```

### Recommended initial stack

| Concern | Initial choice |
|---|---|
| Creator app | Expo / React Native |
| Brand/admin web | Next.js |
| API/business logic | Next.js server routes/actions or separate API later |
| Auth/database | Supabase Auth + PostgreSQL |
| Hosting | Vercel for web/API; Expo/EAS for mobile |
| Jobs | Vercel Cron initially; queue/worker when load requires it |
| User-uploaded media | Add Cloudinary/object storage when portfolios, assets, or UGC need it |

## 5. Data collection principles

Collect only data needed for discovery, matching, collaboration, compliance, and payment. Separate it by sensitivity:

| Class | Examples | Handling |
|---|---|---|
| Public | display name, bio, niche, portfolio, selected metrics | profile visibility controls |
| Private analytics | audience demographics, performance history | only owner/admin/authorized brand views |
| Sensitive | email, phone, OAuth tokens, KYC and payout references | strict server-side access; never public API fields |

Do not collect passwords, contacts, exact GPS, government IDs, or bank details during ordinary signup. KYC/payment information belongs in a separate provider-led flow when required.

## 6. Account and user data

### Basic account data

| Data | Requirement | Reason |
|---|---:|---|
| Display name | Required | profile identity |
| Legal name | private/when needed | contracting or payment requirements |
| Email | Required | authentication and communications |
| Phone | optional initially | verification/support |
| Country | Required | market, currency, eligibility |
| City | optional | local opportunities |
| Account role | Required | creator, brand member, admin |
| Profile image | optional | profile presentation |

### Creator profile data

- Bio, location, languages, content niches and sub-niches
- Content formats (Reels, posts, Shorts, tutorials, UGC, etc.)
- Collaboration availability, industries, platforms, locations, remote/physical preference
- Rate-card starting prices or quote preferences; avoid forcing public exact pricing
- Portfolio links, featured work, prior collaborations, testimonials, media kit
- Verification, ratings, completed campaigns, cancellation rate, and moderation status

### Brand data

- Organization name, website, logo, industry, description, country
- Verified business/contact information where appropriate
- Brand team members and roles
- Billing/payment-provider customer references
- Campaign history, ratings, dispute behavior, and internal trust signals

## 7. Instagram integration

Use **Instagram API with Instagram Login / Business Login for Instagram** for professional Instagram accounts. Do not build CreatorNE around scraping or the deprecated Basic Display approach.

This setup is suited to Creator and Business accounts and does not inherently require a linked Facebook Page. Request the minimum permission set necessary for the shipped feature.

### Permission strategy

| Permission | Use | MVP |
|---|---|---:|
| `instagram_business_basic` | connect account, profile/basic data, permitted media access | Yes |
| `instagram_business_content_publish` | publish creator content | later |
| `instagram_business_manage_comments` | comment workflows | later |
| `instagram_business_manage_messages` | Instagram messaging | later |

### OAuth flow

```text
Creator taps Connect Instagram
  → CreatorNE creates authorization URL with random state
  → Instagram authorization
  → callback with code
  → backend validates state and exchanges code for token
  → backend stores encrypted/server-side token metadata
  → backend fetches profile and media
  → profile and analytics are synchronized
```

Never put the Instagram App Secret in the mobile app or browser code. OAuth token exchange and social API calls with privileged credentials run on the backend.

### Profile data confirmed in prior planning

The `/me` endpoint can be used to request fields such as:

```text
user_id, username, name, account_type, profile_picture_url,
followers_count, follows_count, media_count
```

Illustrative request:

```text
GET https://graph.instagram.com/v25.0/me
  ?fields=user_id,username,name,account_type,profile_picture_url,
          followers_count,follows_count,media_count
  &access_token=<server-side token>
```

Media IDs are obtained from `/<IG_ID>/media`; request and persist only fields actually supported by the current endpoint/permission/account combination.

### Token lifecycle

```text
authorization code → short-lived access token → long-lived access token
                                                ↓
                                      refresh before expiration
```

Store token value encrypted or in a secrets system; store expiry, scopes, status, connected time, and last-refresh time. Handle revoked/expired tokens by marking the account reconnect-required, not by silently showing stale data as current.

### What must be verified before implementation

Do not treat any metric as guaranteed merely because it is desirable. Validate the current Meta endpoint, permission, app-review requirement, account eligibility, retention, and availability for:

- reach, impressions, views, engagement
- audience age, gender, country, and city
- Reel/post-specific performance
- historical trends and follower growth
- media fields, pagination, and webhook events

## 8. Social-account abstraction

Avoid Instagram-specific business logic everywhere. Model connected platforms generically.

```text
social_accounts
  ├── creator_id
  ├── platform                 instagram | youtube | tiktok | ...
  ├── external_account_id
  ├── username
  ├── account_type
  ├── profile_url
  ├── connection_status
  ├── token_reference          never public
  ├── token_expires_at
  └── last_synced_at
```

Platform-specific tables keep raw/external identifiers. Normalized tables expose common concepts such as audience size, content performance, and time-series snapshots.

## 9. Creator intelligence and analytics

### Three analytics layers

```text
Profile data:  Who is this creator?
Media data:    What do they publish?
Insights data: How does their content perform?
```

CreatorNE-derived metrics may include:

- engagement rate
- average views, likes, comments, and reach
- growth trends
- posting consistency
- content/category signals
- completion, response, and reliability signals
- creator score and brand-match score

Derived metrics must store their formula/version, source window, source snapshot timestamps, and confidence/availability status.

### Example formulas

```text
engagement_rate = (likes + comments + other verified engagements) / audience_size
average_reel_views = sum(eligible reel views) / eligible reel count
```

Avoid comparing creators using incomplete or unavailable insight fields. Present `not available` rather than inventing a zero.

### Creator Score

Creator Score should be configurable and explainable. A future model could weigh:

```text
content performance + engagement quality + consistency + audience fit
+ profile completeness + verification + campaign reliability
```

Scores influence recommendations; they should not be the sole basis for access, pricing, or adverse decisions.

## 10. Brand discovery and matching

Brand search/filter dimensions:

- niche, language, location, social platform, format
- audience size and verified performance ranges
- audience geography/demographics when permitted
- pricing/budget, availability, verification, campaign history

Matching combines explicit campaign requirements with normalized data:

```text
Campaign brief + budget + audience target + platform + deliverables
                              ↓
                     candidate creators
                              ↓
                    match score / rationale
```

Always retain human choice. Brands should see the reason for a recommendation, not just an opaque rank.

## 11. Campaign and collaboration model

### Campaign fields

```text
campaigns
  id, brand_id, title, description, status, budget, currency
  target niches/audience, platforms, location, application deadline
  deliverable requirements, approval deadline, payment terms
  created_at, updated_at
```

### Collaboration lifecycle

```text
DRAFT → PUBLISHED → APPLICATIONS_OPEN → CREATOR_SELECTED
      → AWAITING_PAYMENT → FUNDED → IN_PROGRESS
      → SUBMITTED → UNDER_REVIEW → APPROVED → PAYOUT_PENDING → PAID
```

Alternative paths:

```text
SUBMITTED → REVISION_REQUESTED → RESUBMITTED → UNDER_REVIEW
FUNDED → CANCELLED → REFUND_PENDING → REFUNDED
SUBMITTED/UNDER_REVIEW → DISPUTE_OPEN → RESOLUTION
```

Store transitions as events, including who triggered them and why. Do not rely on a single `campaign.status = completed` field for financial truth.

### Deliverables

Deliverables should have versions, submission timestamps, asset/link references, status, brand feedback, revision count, approval time, and evidence/notes. The brand approval action triggers a server-side eligibility check, not an unconditional client call to release money.

## 12. Payments and payouts

### Financial model

Example for a ₹10,000 campaign with a 20% platform commission:

```text
Gross brand payment:       ₹10,000
CreatorNE commission:      ₹ 2,000
Creator payout obligation: ₹ 8,000
```

Decide and display before checkout how processing fees, transfer fees, tax, refunds, and partial cancellations are handled.

### Provider approach

Investigate marketplace products such as Razorpay Route, which may support linked accounts, payment splitting, transfers, reversals, refunds, deferred settlement, and reconciliation. Eligibility and RBI/compliance conditions can change, so confirm eligibility with the provider and qualified advisers before accepting real money.

### Secure payment release

```text
Brand approves deliverable
  → backend verifies collaboration, funded payment, assigned creator,
    deliverable status, contract conditions, and no active dispute
  → backend requests provider transfer/release
  → provider webhook confirms result
  → ledger and payout states update atomically/idempotently
```

The client must never be trusted to decide that a campaign is complete or that a payout should occur.

### Creator payout onboarding

```text
Creator account → payout onboarding/KYC with provider
→ linked payout account verified → eligible for payout
```

Prefer provider-hosted/managed onboarding. Avoid directly storing bank/KYC details unless the chosen lawful architecture requires it.

### Financial ledger

Keep an append-only, immutable-ish internal ledger in addition to the provider dashboard.

```text
ledger_entries
  id, campaign_id, payment_id, provider_event_id, user_id
  amount, currency, direction, entry_type, status
  related_entry_id, idempotency_key, occurred_at, recorded_at
```

Example:

```text
+ ₹10,000  brand payment captured
- ₹ 2,000  platform commission recognized
- ₹ 8,000  creator payout obligation
```

Record every payment, refund, transfer, reversal, fee, tax, dispute, and adjustment with provider IDs and webhook event IDs.

### Webhooks and reconciliation

```text
Payment provider → /api/webhooks/payments
  → verify signature → deduplicate event ID → persist raw event
  → process state transition → update ledger → alert/retry if needed
```

Never mark payment successful solely because a frontend returned from checkout. Reconcile provider balances/events against internal orders, payments, transfers, refunds, and ledger entries on a schedule.

### Disputes and refunds

Define policy before launch for revision windows, rejection reasons, no-response timeouts, partial payout/refund, cancellation, chargeback evidence, and admin arbitration.

```text
DISPUTE_OPEN → CREATORNE_REVIEW → FULL PAYOUT | PARTIAL PAYOUT | REFUND
```

## 13. Database structure

### Identity and organizations

```text
profiles
organizations
organization_members
creator_profiles
brand_profiles
roles / permissions
verification_records
audit_logs
```

### Social and analytics

```text
social_accounts
social_account_tokens            (restricted server-only access)
social_media
social_metric_snapshots
social_media_insights
audience_snapshots
creator_metric_snapshots
```

### Marketplace

```text
campaigns
campaign_requirements
campaign_applications
collaborations / campaign_contracts
deliverables
deliverable_versions
reviews
messages
message_participants
notifications
```

### Payments

```text
payment_customers
creator_payout_accounts
payment_orders
payments
payment_splits
commissions
transfers
refunds
disputes
payout_events
payment_webhooks
ledger_entries
```

### Important constraints

- Unique `(platform, external_account_id)` for social accounts as appropriate
- Idempotency keys for payment actions/webhook processing
- Foreign keys for campaign/payment/ledger relationships
- Soft deletion or archival where auditability matters
- Timestamps on every business entity and immutable event tables for critical transitions

## 14. API surface

Illustrative routes (enforce authentication, authorization, RLS, validation, and rate limits):

```text
POST   /api/auth/instagram/start
GET    /api/auth/instagram/callback
POST   /api/social-accounts/:id/sync
GET    /api/creators
GET    /api/creators/:id
PATCH  /api/creator/profile

POST   /api/brands
POST   /api/campaigns
PATCH  /api/campaigns/:id
POST   /api/campaigns/:id/applications
POST   /api/collaborations/:id/deliverables
POST   /api/deliverables/:id/approve

POST   /api/payments/checkout
POST   /api/payout-accounts/onboarding
POST   /api/webhooks/payments
POST   /api/disputes
```

Use resource and role checks on every route. A creator must never access another creator's tokens, analytics, private contact data, or payout records by changing an ID.

## 15. Background jobs

Jobs cover data synchronization and resilient external integration:

- refresh expiring social tokens where supported
- synchronize profile/media data and paginated content
- calculate normalized analytics and scores
- retry safe, idempotent provider operations
- reconcile payments and transfers
- send reminders for pending submissions/reviews
- purge/rotate expired transient data according to policy

Record job run, input identity, attempt count, result, error class, and retry time. Respect API rate limits and back off on failures.

## 16. Notifications and messaging

Start with in-app notifications and email. Use realtime events for messaging and status updates when useful.

Notification examples: application updates, creator selection, payment funded, deliverable submitted, revision requested, approval, payout result, and dispute changes.

Messaging requires collaboration-based authorization, reporting/blocking tools, retention rules, attachment scanning/storage policy, and audit logging for moderation.

## 17. Media and Cloudinary

Cloudinary is not required to connect Instagram or display Instagram-provided profile URLs. For an MVP, use the `profile_picture_url` returned by Instagram subject to its current behavior/terms.

Add Cloudinary or comparable object storage/CDN when CreatorNE owns uploads:

- native creator profile images
- portfolios and media kits
- brand logos and campaign briefs/assets
- deliverable/UGC videos, thumbnails, and documents

Use direct signed upload flows, restrict file type/size, scan content when appropriate, store asset metadata/ownership, and serve via controlled URLs.

## 18. Environment variables

### Mobile app (`app/.env`)

```env
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
EXPO_PUBLIC_API_URL=http://<local-network-ip>:3000
EXPO_PUBLIC_INSTAGRAM_APP_ID=...
```

On a physical phone, `localhost` refers to the phone, not the development machine. Use a secure deployed API URL in production.

### Web/backend (`web/.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_APP_URL=...

INSTAGRAM_APP_ID=...
INSTAGRAM_APP_SECRET=...
INSTAGRAM_REDIRECT_URI=...

PAYMENT_PROVIDER_KEY_ID=...
PAYMENT_PROVIDER_KEY_SECRET=...
PAYMENT_WEBHOOK_SECRET=...
```

If Prisma is in active use, database connection variables may also be required. Do not remove existing variables until code references have been checked.

### Never expose to a client

```text
SUPABASE_SERVICE_ROLE_KEY
Instagram App Secret
payment-provider secret keys/webhook secret
database credentials
OAuth access/refresh tokens
KYC or bank details
```

## 19. Security and privacy

- Supabase Row Level Security for all user-facing tables; test policies as each role.
- Backend-only secrets; use environment configuration and secret rotation.
- Encrypt/restrict tokens and sensitive references; redact them from logs.
- Validate OAuth `state`, redirect URIs, webhook signatures, and idempotency keys.
- Apply authorization checks independently of client UI, plus input validation, rate limits, CSRF/session protections where applicable.
- Keep audit logs for moderation, permissions, payments, verification, and status changes.
- Establish consent, privacy notice, retention/deletion, account unlinking, and data-export processes.
- Do not claim or display metrics that cannot be currently verified from the connected account/API.

## 20. Deployment

```text
Internet
  ├─ Expo mobile application
  └─ Vercel
       ├─ Next.js brand/admin web UI
       ├─ Next.js API
       └─ scheduled jobs (initially)
              │
              ├─ Supabase Auth/Postgres/Realtime
              ├─ Instagram and future social APIs
              └─ payment-provider APIs/webhooks
```

At larger scale, move long-running synchronization, analytics, media processing, and reliable retries to a queue-backed worker service. Do not run heavy background work in request handlers.

## 21. Admin panel

Admin capabilities should include:

- creator/brand verification and moderation queue
- campaign, deliverable, review, and dispute review
- payment/transfer/refund state and reconciliation exceptions
- webhook/event history with sensitive values redacted
- audit history and role-controlled actions
- metric sync health, token reconnect queue, and support tools

Admin access needs least-privilege roles, MFA where possible, audit logs, and no casual access to raw secrets or payout data.

## 22. Phased development roadmap

### Phase 1 — identity and creator onboarding

```text
Supabase Auth → basic profiles → creator/brand roles → creator profile fields
```

### Phase 2 — Instagram connection

```text
Instagram Login → OAuth callback → token lifecycle → /me → permitted media sync
```

### Phase 3 — brand and campaign system

```text
brand organization → campaign creation → applications → selection → collaboration
```

### Phase 4 — payment transaction engine

```text
brand checkout → funded campaign → delivery → approval → commission → creator payout
```

### Phase 5 — trust, disputes, and reputation

```text
reviews → verification → revision/dispute workflows → reconciliation/operations
```

### Phase 6 — advanced intelligence and platforms

```text
YouTube/TikTok integrations → deeper analytics → matching improvements → scale workers
```

Payments belong to the core architecture, not a distant add-on: they are the transaction engine of the marketplace.

## 23. Pre-launch checklist

- [ ] Confirm exact current Meta endpoints, permissions, app review, eligibility, and metric availability.
- [ ] Implement and test OAuth state, token refresh/reconnect, pagination, and webhook verification.
- [ ] Define public/private/sensitive data access rules and test RLS/API authorization.
- [ ] Confirm marketplace/payment provider eligibility and legal/compliance structure.
- [ ] Define fees, taxes, payout timing, cancellation/refund/dispute policy, and contracts.
- [ ] Implement provider-webhook idempotency, internal ledger, and reconciliation.
- [ ] Complete creator payout onboarding/KYC flow with the provider.
- [ ] Create operational dashboards, alerts, audit logs, and support runbooks.
- [ ] Publish privacy, terms, creator/brand policies, and consent language.

## 24. Final target architecture

```text
Creator / Brand / Admin
          ↓
Mobile and web applications
          ↓
CreatorNE API + authorization layer
          ↓
Supabase data layer ── Social data sync ── Payment provider
          ↓                    ↓                    ↓
Profiles, campaigns,       normalized data       provider-confirmed
messages, ledger            and intelligence      payments/transfers
          └──────────────────────┬──────────────────────┘
                                 ↓
              trusted creator discovery and collaboration marketplace
```

The foundation is: **creator consented data, transparent matching, enforceable collaboration workflow, and provider-controlled payment settlement.**
