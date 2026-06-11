# Goon — Full Product Build Plan

## 1. PRODUCT

Goon is an AI-powered stock prediction platform that turns unstructured market signals — earnings call tone, supply chain chatter, social sentiment, volume patterns — into plain-English directional forecasts for individual investors. The user types a ticker, the system returns a prediction (up/down), a confidence score, a price target, and a short human-readable reasoning paragraph. The primary user is the time-poor retail trader who knows what a candlestick chart is but cannot, in a given hour, read every 8-K, every executive interview, and every alternative data feed relevant to the positions they hold. Goon collapses that work into a single screen per ticker. Research backs the timing: the SEC's April 2026 removal of the $25K pattern day-trader rule expanded the addressable pool of active retail traders overnight, and the AI-in-fintech category is compounding at ~22% CAGR (Mordor). Competitors like Tickeron and Trade Ideas charge $50–$200/mo and front-load jargon; Goon's wedge is calm, opinionated, English-first predictions at $29/mo.

## 2. WHO IT'S FOR

The ICP is a US-based active retail investor, age 25–45, holding 5–30 positions across individual equities, trading 1–10 times a month. They follow finfluencers on X and YouTube, use Robinhood/Webull as a broker, and have tried TradingView but bounce off its complexity. They don't want to learn Python. They want a daily "what should I be looking at" answer, not a charting sandbox.

How this shapes the product:
- **Tone**: confident, plain English, no finance jargon used unnecessarily. ("Looks bullish" beats "RSI divergence on the 4H with positive MACD crossover.")
- **Density**: low. One prediction per card, one primary CTA per screen, no nested menus deeper than two levels.
- **Speed**: every screen must answer "what do I do next" in under 3 seconds. The dashboard opens on a single Today view, not a configurable widget grid.
- **Honesty**: predictions are probabilistic, never "guaranteed." Every prediction shows confidence, a timeframe, and a reasoning paragraph so the user can disagree.
- **Price**: $29/mo is the headline Pro tier — directly competitive with Trade Ideas' basic plan and below Tickeron Premium.

## 3. LOOK & FEEL

### Visual system
- **Vibe**: "atlas at dusk." Soft, expansive, low-stimulation. The product feels like the calm cousin of a Bloomberg terminal — generous whitespace, soft gradients, rounded geometry. No neon, no all-black mode (light only for v1).
- **Palette**:
  - `--sky` `#7CB9E8` — primary accent, links, active nav, chart line
  - `--mint` `#98D8C8` — bullish signal, success, positive P&L
  - `--sand` `#E8D5B7` — bearish signal, warnings, neutral highlight
  - `--paper` `#FAFAF5` — page background
  - `--ink` `#1F2937` — primary text
  - `--ink-soft` `#6B7280` — secondary text
  - `--cloud` `#EEF2F6` — card surface, hover bg
  - `--line` `#E5E7EB` — dividers, borders
- **Typography**: Geist Sans for body, UI, numbers, and most headings. Lora Serif reserved for hero/marketing copy and the brand wordmark in the sidebar. Sizes: 12/14/16/20/24/32/44. Line height 1.55 for body, 1.2 for display.
- **Spacing**: 4px base unit. Cards use 24px padding. Section gaps 48–64px. Pages max-width 1280px, content 1120px.
- **Shape**: `rounded-2xl` (16px) for cards, `rounded-xl` (12px) for inputs/buttons, `rounded-full` for chips and the user avatar.
- **Shadow**: single soft shadow `0 1px 2px rgba(31,41,55,.04), 0 8px 24px rgba(31,41,55,.04)`. No hard drop shadows.
- **Iconography**: Lucide icons, 1.5px stroke, default size 18px in UI, 22px in empty states.
- **Imagery**: no stock photos of traders. All illustrations are abstract gradient blobs (sky→mint) and the atlas-line motif (latitude lines, meridian arcs) used as background decoration at 4–8% opacity.
- **Motion**: 180ms ease-out on hover, 240ms ease-in-out on card expand, 320ms ease-out on route transitions. No bounce, no parallax.

### Shared components
- **Sidebar** (240px fixed, collapsible to 64px icon-rail at <1024px): logo wordmark, nav items with Lucide icons, current tier badge at bottom.
- **Top bar** (64px): breadcrumb on the left, search input in the center (sticky), user avatar dropdown on the right with name, email, sign out, settings link.
- **Card**: `--cloud` bg, `rounded-2xl`, 24px padding, 1px `--line` border, soft shadow.
- **Stat tile**: 4-up grid tile, large Geist number, small Lora label, optional delta chip.
- **Signal chip**: pill, mint bg for Bullish, sand bg for Bearish, cloud bg for Neutral. Includes an arrow glyph.
- **Confidence bar**: 4px tall, sky→mint gradient fill, ink-soft track.
- **Ticker input**: large, rounded-xl, with a small sparkline preview to the right.
- **Empty state**: centered Lucide icon (line style), Lora heading, Geist sub, one primary button.
- **Toast**: bottom-right, cloud bg, 12px border, 4s auto-dismiss.

### Screen-by-screen layout

**Landing (`/`, already exists — extend, do not redesign)**
Keep existing hero. Add a thin "Predictive signals for individual investors" sub. Add a section below the fold: "How Goon works" with three steps in card form, each with a soft gradient background. Add a "See live predictions" CTA that routes to `/register`. Footer stays as-is.

**Login (`/login`)**
Two-column layout on ≥md: left column (40%) is a soft sky→mint gradient panel with a Lora pull-quote and the brand wordmark. Right column (60%) is the form on paper background. Form: email input, password input, primary "Sign in" button, secondary "Create an account" link below. Single subtle "Forgot password?" link is a `<button disabled>` for v1 with tooltip "Coming soon" — no dead nav.

**Register (`/register`)**
Same shell as login. Form: name, email, password, confirm password, "Create account" button. Below the button: fine-print line "By creating an account you agree to our Terms and Privacy Policy" with both terms and privacy as disabled links (no invented pages).

**Dashboard home (`/dashboard`)**
Sidebar + top bar + main grid. Main grid is a 12-col, 64px gutter. Row 1: full-width welcome card (Lora "Good morning, {name}" + Geist date + a one-line market summary in ink-soft). Row 2: four stat tiles — Predictions accuracy (78.4%), Signals today, Watchlist count, Portfolio value. Row 3: 8-col "Top predictions for today" card (list of 5 predictions, each a row: ticker pill, company, direction chip, confidence bar, target) + 4-col "Market sentiment" card (gauge from sand to mint, label "Cautiously bullish", 3 supporting lines). Row 4: 6-col "Your watchlist" preview (3 items, "View all" link) + 6-col "Recent activity" card (last 4 viewed tickers).

**Predictions (`/dashboard/predictions`)**
Top: search input (full width, 56px tall, placeholder "Search a ticker — e.g. NVDA, AAPL, TSLA"). Below: filter chips (All, Bullish, Bearish, High Confidence ≥75%) on the left, sort dropdown (Confidence, Target upside, Most recent) on the right. Main: vertical list of prediction cards. Each card collapsed shows ticker, company, current price, direction chip, confidence %, target, timeframe ("7d"). Expanded shows the reasoning paragraph, a mini sparkline (SVG, sky stroke), and a row of supporting signal chips ("Strong momentum", "Positive sentiment", "Volume surge"). Expand/collapse is keyboard accessible.

**Watchlist (`/dashboard/watchlist`)**
Top: input to add ticker with autocomplete from a hardcoded list of ~40 popular tickers. Below: list/table of watched tickers. Columns: ticker, company, price, day change % (colored), AI signal chip, "Remove" icon button. Empty state centered.

**Portfolio (`/dashboard/portfolio`)**
Top row: three stat tiles — Total value ($48,312.80), Daily P&L (+$312.40, mint), Total return (+12.4%, mint). Below: a line chart (recharts) showing portfolio value over 30 days, sky stroke, mint area fill, 4px rounded line caps. Below: holdings table — Ticker, Shares, Avg cost, Current price, Market value, Return %, small "Remove" action. Empty state: "No holdings yet — this is a demo portfolio."

**Settings (`/dashboard/settings`)**
Three sections stacked, each in its own card. Section 1: Profile (name, email read-only, Save button). Section 2: Notifications — four toggles (Daily digest, High-confidence alerts, Watchlist price alerts, Marketing). Section 3: Subscription — current plan chip ("Free" or "Pro"), feature list, "Upgrade to Pro" button (links to `/pricing`).

**Pricing (`/pricing`)**
Centered hero ("Simple, honest pricing"), Lora headline, Geist sub. Two cards side by side on md+. Free card: cloud bg, $0/mo, 5 features, "Get started" button → `/register`. Pro card: paper bg with sky→mint gradient border, $29/mo, 8 features, "Start Pro trial" button → `/register?plan=pro`. Below: small "All plans include..." line with three icons. No FAQ, no testimonials.

## 4. USER FLOWS

### A. Sign up
1. User lands on `/` → clicks "Get started" → `/register`.
2. Fills name, email, password, confirm password.
3. Client-side validation (zod). Password ≥8 chars, email format, names match.
4. Server action `registerUser` hashes password (bcrypt), writes to DB, creates NextAuth session via `signIn("credentials", ...)`.
5. Redirect to `/dashboard`. Welcome card shows.
6. Error states: duplicate email → inline red text "An account with that email already exists." Password mismatch → inline. Server error → toast.

### B. Log in
1. User on `/login` enters email + password.
2. Server action `loginUser` verifies hash, returns session.
3. Redirect to `/dashboard` (or to `?callbackUrl` if present and safe).
4. Error: invalid credentials → single inline message "Email or password is incorrect." (Do not reveal which is wrong.)

### C. View prediction
1. User on `/dashboard/predictions` types "NVDA" in search.
2. Search is client-side over a 200-ticker mock dataset (instant, debounced 120ms).
3. If ticker not in dataset → empty suggestion: "We don't have a prediction for {ticker} yet."
4. Matching ticker → list filters/scrolls to that card; if no exact match but suggestions exist, show dropdown of 5.
5. User clicks card → expands to show reasoning. Collapse by clicking again or pressing Esc.

### D. Add to watchlist
1. User on `/dashboard/watchlist` types a ticker, picks from autocomplete.
2. Server action `addToWatchlist` writes a `WatchlistItem` row.
3. UI revalidates via `revalidatePath("/dashboard/watchlist")`; new row appears at top.
4. Remove → server action `removeFromWatchlist` → row fades out 180ms, then unmounts.

### E. Sign out
1. User clicks avatar in top bar → dropdown.
2. Clicks "Sign out" → calls `signOut()` from `next-auth/react` (client) or server action variant.
3. Redirect to `/`. Session cookie cleared.

### F. Protected route access
1. Unauthenticated user hits `/dashboard/*` → middleware redirects to `/login?callbackUrl=...`.
2. After login, redirected to original destination.

## 5. PAGES / ROUTES

| Route | Purpose | Auth | Layout |
|---|---|---|---|
| `/` | Marketing landing | public | existing + 2 small extensions |
| `/login` | Sign in | public | two-column split |
| `/register` | Create account | public | two-column split |
| `/pricing` | Plan comparison | public | centered, 2 cards |
| `/dashboard` | Today overview | required | sidebar + top bar + grid |
| `/dashboard/predictions` | Browse & search predictions | required | sidebar + top bar + list |
| `/dashboard/watchlist` | Personal ticker tracking | required | sidebar + top bar + table |
| `/dashboard/portfolio` | Demo portfolio + chart | required | sidebar + top bar + chart + table |
| `/dashboard/settings` | Profile, notifications, plan | required | sidebar + top bar + stacked cards |
| `/api/auth/[...nextauth]` | NextAuth handler | n/a | route handler |
| `/api/predictions` | JSON for ticker lookup (mock) | required | GET `?ticker=` |
| `/api/watchlist` | Watchlist mutations | required | POST add, DELETE remove |

## 6. CORE FEATURES

### F1. Credentials authentication
- NextAuth v5, Credentials provider only.
- `authorize` reads email from SQLite (Prisma + better-sqlite3) or JSON file store, bcrypt-compares password.
- JWT session strategy (no DB session table required for MVP).
- `pages.signIn = "/login"`, `pages.error = "/login"`.
- Middleware (`middleware.ts`) matches `/dashboard/:path*`, redirects unauthenticated users to `/login?callbackUrl=`.

### F2. Mock prediction engine
- File: `lib/predictions.ts`. Exports `getPredictions(filters?)` and `getPrediction(ticker)`.
- Backed by `data/predictions.json` — array of 200 ticker records. Each record:
  ```ts
  { ticker, company, price, direction: "bullish"|"bearish"|"neutral",
    confidence: 0..1, target: number, timeframe: "3d"|"7d"|"14d"|"30d",
    reasoning: string[], updatedAt: string, sector: string }
  ```
- Direction distribution: ~55% bullish, 35% bearish, 10% neutral. Confidence distribution centered ~0.72, stddev 0.12.
- Reasonings are pulled from a pool of 40 hand-written templates and combined with ticker-specific numbers (e.g. "Momentum indicators on NVDA are trending up over the last 14 sessions, and recent executive commentary on the Q1 call signals confidence in data-center demand.").
- "Top predictions" on dashboard home = top 5 by confidence.
- "Accuracy 78.4%" stat is a constant in code; clearly labeled in the UI as "Model accuracy (backtest, 2024)" with a tooltip explaining it's a backtest metric, not a live guarantee.

### F3. Search & filter (predictions page)
- Client component with local state.
- Ticker dataset ships with the app (no external call). Autocomplete on input.
- Filters modify the visible list in-memory; URL state is synced via `searchParams` so links are shareable.
- High Confidence filter = confidence ≥ 0.75.

### F4. Watchlist CRUD
- Server actions: `addToWatchlist(ticker)`, `removeFromWatchlist(id)`.
- Schema: `WatchlistItem { id, userId, ticker, addedAt }`.
- Per-user scope via `session.user.id` in the action.
- The watchlist page also displays a derived "AI signal" by looking up the ticker in `predictions.json`.

### F5. Demo portfolio
- Seeded per-user on first visit to `/dashboard/portfolio` if no `Portfolio` record exists.
- 8 mock holdings (NVDA 15 sh @ $412, AAPL 30 sh @ $178, TSLA 8 sh @ $245, MSFT 20 sh @ $410, GOOGL 12 sh @ $165, AMZN 10 sh @ $185, META 14 sh @ $485, SPY 25 sh @ $520).
- 30-day performance series generated deterministically from a seeded RNG keyed on userId (so the same user always sees the same chart on the same day).
- Recharts `LineChart`, no animation on first paint to keep LCP fast.
- Remove action is wired but non-destructive for v1 (sets a `hidden` flag) so the demo always has data.

### F6. Settings
- Profile: name editable, email read-only with helper text "Contact support to change your email."
- Notification toggles: four boolean fields stored on `User.preferences` (JSON column). Saved via server action with optimistic UI.
- Subscription: reads `User.tier` ("free" | "pro"). Upgrade button is wired to `/pricing` — not Stripe (v1 demo).

### F7. Pricing page
- Two tiers. No annual toggle for v1 (keep it simple, can add later).
- Buttons route to `/register?plan=...`. The register form reads `plan` from search params and stores it as the user's intended tier (applied on first login if Pro — for v1, this is a display-only flag).

### F8. Dashboard stats
- "Predictions accuracy": constant `0.784` rendered with one decimal.
- "Signals today": count of predictions with `updatedAt` >= today UTC.
- "Watchlist count": `count(WatchlistItem where userId = session.user.id)`.
- "Portfolio value": sum of `shares * currentPrice` for active holdings, or the seeded total for the demo user.
- Market sentiment card computes bullish-bearish ratio across the full prediction set and renders a labeled gauge (0–100 scale, mint at >60, sand at <40, cloud in between).

## 7. DATA MODEL

**Prisma schema (SQLite):**

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String
  passwordHash  String
  tier          String   @default("free") // "free" | "pro"
  preferences   String   @default("{}")   // JSON: { dailyDigest, highConfAlerts, watchlistAlerts, marketing }
  createdAt     DateTime @default(now())
  watchlist     WatchlistItem[]
  portfolio     PortfolioItem[]
}

model WatchlistItem {
  id        String   @id @default(cuid())
  userId    String
  ticker    String
  addedAt   DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([userId, ticker])
  @@index([userId])
}

model PortfolioItem {
  id           String  @id @default(cuid())
  userId       String
  ticker       String
  shares       Float
  avgCost      Float
  hidden       Boolean @default(false)
  user         User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@index([userId])
}
```

**Static data files:**
- `data/predictions.json` — 200 ticker records (mock).
- `data/portfolio-series.json` — none needed; generated per-user via seeded RNG.

**Relationships:**
- A `User` has many `WatchlistItem` and many `PortfolioItem`, both cascade-deleted.
- `WatchlistItem.ticker` joins to the static `predictions.json` by string key (no FK, since JSON).
- `PortfolioItem.ticker` joins the same way for current-price lookups.

## 8. AUTH

- **Provider**: NextAuth v5 Credentials only.
- **Storage**: Prisma + SQLite (file at `./prisma/dev.db`). No external DB.
- **Session**: JWT strategy. `jwt` callback embeds `id` and `tier` into the token; `session` callback exposes them.
- **Password hashing**: `bcryptjs` (no native build issues, works in serverless).
- **Registration**: a server action that creates the user, then immediately calls `signIn("credentials", ...)` to establish the session.
- **Login**: a server action that wraps `signIn` and returns `{ ok, error }` for inline UI feedback.
- **Middleware**: `middleware.ts` at repo root, `matcher: ["/dashboard/:path*"]`, calls `auth()` from NextAuth, redirects to `/login?callbackUrl=` if no session.
- **No Clerk. No social OAuth. No magic links.** No "Sign in with Google" button — none would be wired.

## 9. FILES (preview)

See end of document for the full JSON array.

## 10. ACCEPTANCE

The build is "done" when **every** item below is true.

**Auth**
- [ ] `POST /register` with valid name/email/password creates a user and lands on `/dashboard`.
- [ ] `POST /login` with valid credentials lands on `/dashboard`.
- [ ] `POST /login` with bad credentials shows an inline error and does not navigate.
- [ ] Unauthenticated visit to any `/dashboard/*` route redirects to `/login?callbackUrl=...`.
- [ ] After login, the `callbackUrl` is honored if it begins with `/`.
- [ ] Sign out from the top bar returns to `/` and clears the session cookie.
- [ ] No "Sign in with Google/GitHub/Apple" buttons exist anywhere.
- [ ] No Clerk dependency in `package.json`.

**Dashboard**
- [ ] Sidebar shows: Dashboard, Predictions, Watchlist, Portfolio, Settings — each routes correctly and highlights the active item.
- [ ] Top bar shows the signed-in user's name and a sign-out menu that works.
- [ ] Dashboard home renders the welcome card, four stat tiles, the top-5 predictions list, and the sentiment card without runtime errors.
- [ ] All numbers (accuracy, signals, etc.) come from real code, not hard-coded JSX literals (the constant is fine; the rendered number must update from data).

**Predictions**
- [ ] Typing a known ticker filters the list within 200ms.
- [ ] Typing an unknown ticker shows a "no prediction yet" empty state, not a crash.
- [ ] Filters (All / Bullish / Bearish / High Confidence) each produce a non-error result and reflect in the URL.
- [ ] Clicking a card expands it; clicking again or pressing Esc collapses it.
- [ ] Expanded card shows the reasoning paragraph and supporting signal chips.

**Watchlist**
- [ ] Adding a ticker from the input with autocomplete creates a row.
- [ ] Removing a ticker removes the row.
- [ ] Each row shows price, day change %, and an AI signal chip derived from the predictions dataset.
- [ ] Empty state renders with the "Add stocks..." copy when the user has no items.

**Portfolio**
- [ ] First visit seeds 8 holdings; subsequent visits show the same seeded data.
- [ ] Total value, daily P&L, and total return are computed (not hard-coded).
- [ ] Line chart renders with 30 data points and a sky stroke.
- [ ] Holdings table lists all 8 rows with correct return signs.

**Settings**
- [ ] Editing the name and clicking Save persists across reloads.
- [ ] Toggling any notification updates state in the DB.
- [ ] Subscription tier shows "Free" by default; the "Upgrade to Pro" button routes to `/pricing`.

**Pricing**
- [ ] Two cards render, Pro is visually distinguished.
- [ ] "Get started" and "Start Pro trial" both go to `/register` (the latter with `?plan=pro`).
- [ ] No "Most popular" badge with fake counts, no testimonial carousel, no invented logos.

**Visual & technical**
- [ ] All pages use Geist for body, Lora for serif accents only.
- [ ] Palette matches the spec: sky `#7CB9E8`, mint `#98D8C8`, sand `#E8D5B7`, paper `#FAFAF5`.
- [ ] No `export const dynamic = "error"` anywhere.
- [ ] No 404s when clicking any nav item, button, or link from any page.
- [ ] `pnpm build` (or `npm run build`) completes with no TypeScript errors.
- [ ] `pnpm dev` boots cleanly; all routes return 200.
- [ ] No `console.error` in the browser on any page load.
- [ ] No fake testimonial, customer name, photo, revenue number, or press logo anywhere in the app or landing page.

---

FILES: ["middleware.ts","auth.ts","app/api/auth/[...nextauth]/route.ts","app/login/page.tsx","app/login/actions.ts","app/register/page.tsx","app/register/actions.ts","app/pricing/page.tsx","app/dashboard/layout.tsx","app/dashboard/page.tsx","app/dashboard/predictions/page.tsx","app/dashboard/predictions/PredictionsClient.tsx","app/dashboard/watchlist/page.tsx","app/dashboard/watchlist/actions.ts","app/dashboard/portfolio/page.tsx","app/dashboard/portfolio/PortfolioChart.tsx","app/dashboard/settings/page.tsx","app/dashboard/settings/actions.ts","components/Sidebar.tsx","components/TopBar.tsx","components/StatTile.tsx","components/SignalChip.tsx","components/ConfidenceBar.tsx","components/EmptyState.tsx","components/Card.tsx","components/UserMenu.tsx","components/Sparkline.tsx","lib/auth.ts","lib/db.ts","lib/predictions.ts","lib/portfolio.ts","lib/format.ts","lib/rng.ts","prisma/schema.prisma","prisma/seed.ts","data/predictions.json","data/tickers.ts","app/globals.css","tailwind.config.ts","app/page.tsx","app/api/predictions/route.ts","app/api/watchlist/route.ts","types/next-auth.d.ts"]