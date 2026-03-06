# Phase 2: Vercel Apps Section - Research

**Researched:** 2026-03-06
**Domain:** Vercel REST API + Next.js 15 App Router data fetching + portfolio UI patterns
**Confidence:** HIGH (core decisions), MEDIUM (preview image approach)

## Summary

This phase adds a new "Apps in Production" section to Jose Valle's portfolio that showcases Vercel-deployed apps. The implementation involves two architectural decisions: (1) how to source the data (Vercel API vs static data file), and (2) how to show visual previews of each app.

The Vercel REST API (`GET /v10/projects`) provides the full list of projects with their live URLs, deployment status, and framework metadata. Authentication requires a Bearer token that must live exclusively server-side. The critical architectural decision is whether to call this API dynamically at build time (ISR/static), at runtime (server component with no-store), or skip the API entirely in favor of a manually curated static array in `data/portfolio.ts`. For a portfolio that rarely changes, **static data in `portfolio.ts` is the recommended approach** — it eliminates API token management complexity, build-time network dependency, and the risk of accidentally exposing Vercel account metadata.

For visual previews, the standard approach is to use OG (Open Graph) images fetched from each app's `<meta property="og:image">` tag, or to use a screenshot API. The simplest production-ready approach that requires zero additional dependencies is displaying OG images fetched at build time via Next.js `<Image>` with the app's `og:image` URL. Since most Vercel apps automatically have an OG image served at `<app-url>/og` or set in their metadata, this works without any external screenshot service. As a fallback, a colored placeholder card with the app's framework icon and name renders cleanly.

**Primary recommendation:** Use a static `VercelApp[]` array in `data/portfolio.ts` (matching existing patterns), fetch OG images at build time using Next.js `<Image>` with `unoptimized` or whitelisted remote domains, and follow the existing CaseStudies card grid layout pattern. Do NOT integrate the live Vercel API unless Jose explicitly wants live updates without redeploys.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js (built-in) | 16.1.4 (already installed) | Server component data fetching, Image optimization | Already in project; `fetch` with `force-cache` handles build-time API calls |
| framer-motion | 12.27.1 (already installed) | Card animations matching existing sections | Already used in CaseStudies, About, Hero — consistency |
| lucide-react | 0.562.0 (already installed) | External link icon, framework icons | Already used throughout project |
| Tailwind CSS | 4 (already installed) | Card styling matching design system | Design token variables already defined in globals.css |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `next/image` | built-in | OG image display with optimization | When fetching OG images from live app URLs |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Static data in portfolio.ts | Live Vercel API at build time | API approach introduces token secrets, build-time network calls, potential rate limit hits; static is simpler for content that rarely changes |
| OG image fetch | ScreenshotOne API | ScreenshotOne gives full-page screenshots but costs $0 free tier (100/month cap), requires API key, adds external dependency; OG images are free and already present on most apps |
| OG image fetch | iframe previews | iframes are blocked by X-Frame-Options on most production sites; not viable |
| OG image fetch | Manual screenshot PNG in /public | Works, requires manual maintenance; fine if dynamic previews are not a priority |

**Installation:** No new packages required. All needed libraries are already installed.

## Architecture Patterns

### Recommended Project Structure

```
components/
└── VercelApps.tsx      # New section component (client or server)

data/
└── portfolio.ts        # Add VercelApp interface + vercelApps array here

app/
└── page.tsx            # Add <VercelApps /> after <CaseStudies />
```

If choosing the live Vercel API approach (optional):
```
lib/
└── vercel.ts           # Server-only fetch helper for Vercel API

app/
└── api/
    └── vercel-projects/ # Optional: Route Handler if needed
        └── route.ts
```

### Pattern 1: Static Data (Recommended)

**What:** Define app data in `data/portfolio.ts` as a typed array, exactly like `caseStudies` and `experiences`. The component reads from this array — no API calls, no secrets.

**When to use:** When Jose manually curates the list of apps to showcase. Most portfolios do this because you don't want to show every internal/experimental project.

```typescript
// Source: data/portfolio.ts (existing pattern from caseStudies/experiences)
export interface VercelApp {
  id: string;
  name: string;
  description: string;
  url: string;              // live app URL e.g. "https://my-app.vercel.app"
  repoUrl?: string;         // optional GitHub link
  framework: string;        // "Next.js", "React", "Vite", etc.
  tags: string[];           // e.g. ["AI", "Productivity", "Tool"]
  ogImage?: string;         // full URL to OG image if known
  featured?: boolean;       // highlight certain apps
}

export const vercelApps: VercelApp[] = [
  {
    id: "app-1",
    name: "My App Name",
    description: "Short description of what this app does.",
    url: "https://my-app.vercel.app",
    framework: "Next.js",
    tags: ["AI", "Portfolio"],
  },
  // ...
];
```

**Component (client component for animations, matching CaseStudies pattern):**

```typescript
// Source: Next.js 16.1.6 docs, matches existing component patterns
"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { vercelApps } from "@/data/portfolio";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export default function VercelApps() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="apps" className="py-24 bg-[var(--background)]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Apps in Production</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Live applications I've built and deployed to Vercel
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vercelApps.map((app, index) => (
            <motion.a
              key={app.id}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--primary)] transition-all"
            >
              {/* Preview image */}
              {app.ogImage && (
                <div className="aspect-video relative overflow-hidden bg-[var(--surface-elevated)]">
                  <Image
                    src={app.ogImage}
                    alt={app.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold group-hover:text-[var(--primary)] transition-colors">
                    {app.name}
                  </h3>
                  <ExternalLink
                    size={16}
                    className="text-[var(--text-tertiary)] group-hover:text-[var(--primary)] transition-colors flex-shrink-0 mt-1"
                  />
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                  {app.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-[var(--background)] border border-[var(--border)] rounded text-xs text-[var(--primary)]">
                    {app.framework}
                  </span>
                  {app.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-[var(--background)] border border-[var(--border)] rounded text-xs text-[var(--text-tertiary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Pattern 2: Build-Time Vercel API Fetch (Optional — if live data is needed)

**What:** Fetch projects from Vercel API in a Server Component using `fetch` with `force-cache`, executed at build time. No Route Handler needed — Server Components can safely access env vars.

**When to use:** If Jose wants the section to automatically include newly deployed apps without editing `portfolio.ts`. Requires `VERCEL_API_TOKEN` in environment variables.

```typescript
// Source: Next.js 16.1.6 docs (https://nextjs.org/docs/app/api-reference/functions/fetch)
// Source: Vercel REST API (https://vercel.com/docs/rest-api/endpoints/projects/retrieve-a-list-of-projects)

// lib/vercel.ts (server-only)
export interface VercelProject {
  id: string;
  name: string;
  framework: string | null;
  targets?: {
    production?: {
      url: string;
      alias: string[];
    };
  };
  latestDeployments: Array<{
    url: string;
    alias: string[];
    target: string | null;
  }>;
}

export async function getVercelProjects(): Promise<VercelProject[]> {
  const token = process.env.VERCEL_API_TOKEN;
  if (!token) throw new Error("VERCEL_API_TOKEN is not set");

  const res = await fetch("https://api.vercel.com/v10/projects", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // Cached at build time; revalidate daily
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error(`Vercel API error: ${res.status}`);
  }

  const data = await res.json();
  // API returns { projects: [...] } not an array directly
  return data.projects ?? [];
}
```

**Getting the production URL from API response:**

```typescript
// Source: Vercel REST API endpoint docs, targets.production.alias field
function getProductionUrl(project: VercelProject): string | null {
  // targets.production.alias contains custom domains if set
  const aliases = project.targets?.production?.alias;
  if (aliases && aliases.length > 0) {
    return `https://${aliases[0]}`;
  }
  // Fallback: construct from name
  return `https://${project.name}.vercel.app`;
}
```

### Pattern 3: OG Image Previews

**What:** Display OG images from the deployed apps as card preview images. Most Next.js apps export an OG image route (`/og`) or set `<meta property="og:image">` in metadata.

**Approach options (in order of effort):**

1. **Static ogImage URL in data array** (zero complexity): Just add the URL to the data array manually. Works immediately.
2. **Auto-fetch OG image at build time**: Not worth automating — different apps structure OG images differently.
3. **ScreenshotOne API**: `https://api.screenshotone.com/take?url=<app-url>&access_key=<key>` — 100 free/month, requires signup. Useful if Jose wants real page screenshots.

**next.config.ts change needed for external images:**

```typescript
// Source: Next.js docs - next/image requires domain allowlisting
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.vercel.app",  // for OG images from vercel.app domains
      },
      {
        protocol: "https",
        hostname: "**.vercel.app",
      },
      // Add specific custom domains as needed
    ],
  },
};

export default nextConfig;
```

### Anti-Patterns to Avoid

- **Calling Vercel API from a Client Component**: Exposes the API token in browser network traffic. Never do this.
- **iframe embeds for previews**: Production sites block iframe embedding via `X-Frame-Options: DENY` or `SAMEORIGIN`. This will show blank boxes.
- **Fetching OG images client-side**: Creates CORS issues and exposes unnecessary network requests on each page load.
- **Using `cache: 'no-store'` for Vercel API in a portfolio**: Makes every page visit hit Vercel's API — unnecessary for content that changes at most a few times per month.
- **Exposing Vercel token as a NEXT_PUBLIC_ env var**: Exposes it to the browser bundle. Use `VERCEL_API_TOKEN` (no NEXT_PUBLIC_ prefix) only.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization for OG images | Custom img tags with manual sizing | `next/image` with `fill` and `aspect-video` wrapper | Automatic WebP conversion, lazy loading, layout shift prevention |
| Card grid layout | Custom CSS grid with media queries | Tailwind `grid md:grid-cols-2 lg:grid-cols-3 gap-6` | Consistent with existing sections (CaseStudies uses same pattern) |
| Scroll-triggered animations | Custom IntersectionObserver | `framer-motion` `useInView` hook | Already installed, already used in all other sections |
| Build-time API caching | Custom caching layer | `next: { revalidate: N }` in fetch options | Built into Next.js 15, zero extra code |
| External link security | Manual `rel` attribute | `target="_blank" rel="noopener noreferrer"` | Standard pattern, prevents reverse tabnabbing |

**Key insight:** The entire section can be built by following the existing CaseStudies.tsx pattern — same grid, same animations, same data-in-portfolio.ts approach. No new patterns need to be invented.

## Common Pitfalls

### Pitfall 1: API Token Exposed to Browser

**What goes wrong:** Developer adds `NEXT_PUBLIC_VERCEL_API_TOKEN` thinking all env vars need the prefix. The token is embedded in the client bundle and visible to anyone who inspects the page source.

**Why it happens:** NEXT_PUBLIC_ prefix is required for client-accessible variables but wrong for secret tokens.

**How to avoid:** Use `VERCEL_API_TOKEN` (no prefix). Access only in Server Components, Route Handlers, or `lib/` files imported only by server code. Never import Vercel fetch helpers into files with `"use client"`.

**Warning signs:** If your env var has `NEXT_PUBLIC_` prefix and it's an API token, it's exposed.

### Pitfall 2: next/image Remote Domain Not Configured

**What goes wrong:** OG images from external URLs (`https://my-app.vercel.app/og`) fail with a 400 error and Next.js throws "hostname not configured under images in next.config.js".

**Why it happens:** Next.js Image Optimization requires whitelisting external image domains for security.

**How to avoid:** Add `remotePatterns` to `next.config.ts` for every hostname used in `<Image src={externalUrl}>`. Use wildcard patterns like `*.vercel.app` to cover all Vercel subdomains.

**Warning signs:** Console error "Invalid src prop" or "hostname not configured under images".

### Pitfall 3: Vercel API Response Shape Mismatch

**What goes wrong:** Developer expects `GET /v10/projects` to return an array directly. Actually returns `{ projects: [...], pagination: {...} }`.

**Why it happens:** The API wraps results in a pagination envelope.

**How to avoid:** Always access `data.projects` not just `data`. Type the response properly.

**Warning signs:** `vercelProjects.map is not a function` error at runtime.

### Pitfall 4: Build Fails Due to Missing VERCEL_API_TOKEN

**What goes wrong:** The Vercel API fetch is called at build time but `VERCEL_API_TOKEN` is not set in the Vercel project environment variables. Build fails.

**Why it happens:** Environment variables must be added to Vercel dashboard under "Environment Variables" for them to be available during production builds.

**How to avoid:** (a) Add graceful fallback — return empty array if token missing. (b) Or use the static data approach to avoid this problem entirely.

**Warning signs:** Build log shows "VERCEL_API_TOKEN is not set" or API returns 401.

### Pitfall 5: Production URL Not in latestDeployments

**What goes wrong:** `project.latestDeployments` is empty or doesn't contain a production deployment, so URL construction fails.

**Why it happens:** A project may have no live deployment if it was just created, or the latest deployment may not be the production one.

**How to avoid:** Use `project.targets?.production?.alias` first (most reliable for custom domains), then fall back to `project.name + ".vercel.app"`. Always null-check.

**Warning signs:** Cards render without links or with broken URLs.

## Code Examples

Verified patterns from official sources:

### Next.js 15 Server Component Fetch with Revalidation

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/fetch (v16.1.6, 2026-02-27)
// fetch responses with next: { revalidate: N } are statically cached and revalidated on schedule.
// Default behavior (no cache option): fetched once at build time for static routes.

async function getVercelProjects() {
  const res = await fetch("https://api.vercel.com/v10/projects", {
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
    },
    next: { revalidate: 86400 }, // 24 hours
  });
  const data = await res.json();
  return data.projects ?? []; // Response wraps in { projects: [] }
}
```

### Vercel REST API Projects Endpoint

```bash
# Source: https://vercel.com/docs/rest-api/endpoints/projects/retrieve-a-list-of-projects
# Base URL: https://api.vercel.com
# Auth: Bearer token in Authorization header
# Response: { projects: VercelProject[], pagination: { count, next, prev } }

curl -H "Authorization: Bearer TOKEN" "https://api.vercel.com/v10/projects?limit=100"
```

### Extracting Production URL from Vercel Project

```typescript
// Source: Vercel REST API docs - targets.production.alias field
function getProductionUrl(project: VercelProject): string {
  // 1. Custom domain from targets.production.alias (most reliable)
  const productionAliases = project.targets?.production?.alias;
  if (productionAliases && productionAliases.length > 0) {
    return `https://${productionAliases[0]}`;
  }
  // 2. Fallback: vercel.app subdomain from project name
  return `https://${project.name}.vercel.app`;
}
```

### next.config.ts Remote Image Patterns

```typescript
// Source: Next.js docs - next/image requires remote pattern configuration
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.vercel.app",  // wildcard covers all vercel subdomains
      },
    ],
  },
};

export default nextConfig;
```

### Static Data Pattern (Matching Existing portfolio.ts Structure)

```typescript
// Source: data/portfolio.ts existing pattern (caseStudies, experiences)
export interface VercelApp {
  id: string;
  name: string;
  description: string;
  url: string;
  repoUrl?: string;
  framework: string;
  tags: string[];
  ogImage?: string;
  featured?: boolean;
}

export const vercelApps: VercelApp[] = [
  // Populated manually by Jose with his actual deployed apps
];
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| getStaticProps + fetch at build time (Pages Router) | async Server Components + fetch with cache options (App Router) | Next.js 13+, stable in 14 | No need for getStaticProps; fetch happens in the component itself |
| next.config.js `images.domains` array | `images.remotePatterns` array with hostname/protocol/pathname | Next.js 13+ | More flexible wildcard patterns, `domains` is now deprecated |
| GET /v9/projects (Vercel API) | GET /v10/projects | ~2023 | v10 returns more fields; response is `{ projects: [] }` not array |
| Pages Router API Routes for token proxy | Server Components access env vars directly | Next.js 13+ App Router | No API route needed to hide tokens; Server Components never send env vars to client |

**Deprecated/outdated:**
- `images.domains` in next.config: deprecated in favor of `remotePatterns` — use `remotePatterns` instead.
- `GET /v9/projects`: use `/v10/projects` for fuller response.
- getStaticProps: Pages Router only — not applicable in App Router.

## Open Questions

1. **Which apps does Jose want to showcase?**
   - What we know: The Vercel account has deployed apps, but we don't know names, descriptions, or whether all should be shown.
   - What's unclear: Should this be all projects or a curated subset?
   - Recommendation: Start with static data array in `portfolio.ts`; Jose populates it manually. Can wire to Vercel API later if needed.

2. **Does each app have OG images?**
   - What we know: OG images require each app to define them in metadata or have an `/og` route.
   - What's unclear: Whether Jose's deployed apps actually have OG images set up.
   - Recommendation: Make `ogImage` optional in the interface. Render a styled fallback card (framework name + colored border) when no OG image is available. This avoids broken images.

3. **Vercel API Rate Limits for Projects Endpoint**
   - What we know: The Vercel rate limits doc lists `Deployments list per minute: 1000` and related deployment/project-level limits, but does not specifically list a projects-list rate limit. General API limits are generous (hundreds of requests/minute for most endpoints).
   - What's unclear: The exact rate limit for `GET /v10/projects` specifically. The limits page did not enumerate it.
   - Recommendation: At build time, one API call fetches all projects. This is well within any reasonable rate limit. Use `revalidate: 86400` (daily) to minimize API calls. Not a practical concern for this use case.

## Sources

### Primary (HIGH confidence)

- Vercel REST API endpoint docs: `https://vercel.com/docs/rest-api/endpoints/projects/retrieve-a-list-of-projects` — GET /v10/projects endpoint, response shape, authentication
- Next.js 16.1.6 official docs (fetched 2026-02-27): `https://nextjs.org/docs/app/getting-started/fetching-data` — Server Component fetch patterns, cache options
- Next.js 16.1.6 fetch API reference (fetched 2026-02-27): `https://nextjs.org/docs/app/api-reference/functions/fetch` — cache: 'force-cache', next.revalidate behavior
- Vercel Limits page (fetched 2026-03-06): `https://vercel.com/docs/limits/overview` — Rate limits table, confirms generous per-minute limits
- Next.js ISR docs (fetched 2026-02-27): `https://nextjs.org/docs/app/guides/incremental-static-regeneration` — revalidate patterns

### Secondary (MEDIUM confidence)

- Vercel REST API projects endpoint (verified against official Vercel docs URL): response wraps in `{ projects: [] }` not a bare array; `targets.production.alias` for production URL.
- ScreenshotOne API (fetched 2026-03-06): `https://www.screenshotone.com` — 100 free screenshots/month, API endpoint `https://api.screenshotone.com/take?url=<url>&access_key=<key>`

### Tertiary (LOW confidence)

- General Vercel API rate limit for projects list endpoint — not explicitly documented; inferred from related limits being "hundreds per minute"; LOW confidence on exact number but not a practical concern.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — All libraries already in project; API endpoint verified against official docs.
- Architecture: HIGH — Static data pattern mirrors existing portfolio.ts exactly; Server Component fetch pattern verified against Next.js 16.1.6 official docs.
- Pitfalls: HIGH — NEXT_PUBLIC_ token exposure is a well-documented Next.js security issue; API response shape verified against official endpoint docs.
- OG image previews: MEDIUM — ScreenshotOne verified against official site; OG image approach is standard but depends on each app having images configured.

**Research date:** 2026-03-06
**Valid until:** 2026-04-06 (stable stack; 30-day estimate)
