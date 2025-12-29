# Copilot Instructions — milton-hq

Short, actionable guidance for AI coding agents working in this repo.

## Quick Context
- Tech stack: **Next.js 14 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **NextAuth v5**, **MongoDB (Mongoose)**, **Vercel Blob** for storage. See `README.md`.
- Project purpose: personal portfolio, blog, and an admin dashboard (the admin dashboard has been disabled/removed in the recent commit).

## Dev & CI commands ✅
- Install: `npm install`
- Dev server: `npm run dev` (uses `next dev`)
- Build: `npm run build` (used by Vercel)
- Start (production): `npm run start`
- Lint: `npm run lint` (eslint)

Always run `npm run build` locally when validating changes that will run on Vercel.

## Important patterns & conventions (do not change lightly) 🔧
- App Router (server-first): files under `src/app` are server components by default. To make a component client-side, add a top-line `"use client"` directive.
- Pages must have a default export (server/page components): a missing default export will cause a build-time TypeScript error like: `Property 'default' is missing in type 'typeof import(".../page")'`.
- Server actions: use files under `src/actions` with `"use server"` for server-only logic. Keep them idempotent and revalidation-friendly.
- Auth: NextAuth v5 is used under `src/app/api/auth/[...nextauth]/route.ts`.
- Styling: Tailwind classes are used everywhere; keep the class approach consistent and prefer utility-first styles.
- Routing: Keep route names concise and avoid orphan links — broken links to non-existent `app` routes can surface in production builds.

## Key files / places to inspect 🧭
- `src/app/layout.tsx` — global layout, ThemeProvider usage
- `src/app/page.tsx` — main landing page (hero contains the "Start a Project" link)
- `src/components/NavbarUI.tsx` & `src/components/Navbar.tsx` — top navigation (adjust links here)
- `src/components/AdminSidebar.tsx` — admin sidebar component (now noop after admin removal)
- `src/actions` — server actions; `adminActions.ts` used to exist (now neutralized)
- `src/app/api/auth/[...nextauth]/route.ts` — auth route (NextAuth config)

## Recent change & example (how to safely remove a route) 💡
Problem observed on Vercel: build failed with

  Type error: Property 'default' is missing in type 'typeof import("/src/app/admin/setup/page")'

Cause: code referenced a non-existent or invalid route (`/admin/setup`) and the build attempted to type-check the corresponding route module.

How I fixed it (example steps):
1. Replace references to the non-existent route (changed `href="/admin/setup"` → `href="/start-project"`) in `src/app/page.tsx`.
2. Provide a safe default export for removed routes so the app doesn't fail to type-check. I replaced `src/app/admin/page.tsx` with a redirecting default export that redirects to `/`.
3. Update navigation: changed any `href="/admin"` links in `src/components/NavbarUI.tsx` and `src/components/Navbar.tsx` to `href="/login"` so no UI points to disabled admin routes.
4. Neutralized `src/actions/adminActions.ts` (file left as a safe placeholder) to avoid dangling imports.

When removing features, prefer either removing all references or adding a redirecting `page.tsx` to preserve build-time invariants.

## Practical rules for the agent (do this first) ✅
- Run `npm run dev` locally for quick iteration. Run `npm run build` before pushing code expected to deploy to Vercel.
- If you see build errors about `AppPageConfig` or missing `default` exports, check `src/app/**/page.tsx` files for missing default exports or references to non-existent routes.
- When changing routes:
  - Update any `Link href="/..."` usages across `src/components` and `src/app`.
  - Add a small redirecting `page.tsx` at the removed path if you can't delete every reference immediately.
- Use `"use client"` for components that use state/hooks or browser-only APIs (e.g., Framer Motion, event listeners).

## Helpful examples (from this repo) ✏️
- Replace a broken hero link: `src/app/page.tsx` — changed `<Link href="/admin/setup">` → `<Link href="/start-project">`.
- Safe removal: `src/app/admin/page.tsx` was replaced with a minimal redirect:

  import { redirect } from "next/navigation";
  export default function Page() { redirect("/"); }

## Environment & secrets ⚠️
- Make sure required env vars are present for local builds and for Vercel (e.g., MongoDB connection, NEXTAUTH_SECRET, VERCEL_BLOB or storage credentials). Missing env vars can change runtime behavior; however, the TypeScript build step should still succeed as long as route files are valid.

## When in doubt (debugging tips) 🔎
- Search for literal strings like `/admin`, `/admin/setup` to find UI references quickly.
- If Vercel build fails with a missing page export, run `npm run build` locally and inspect the TypeScript error — it points you to the problematic path.
- Check both `src/app` and `src/components` for references when fixing broken navigation.

---
If you'd like, I can also:
- Remove the leftover `admin` files completely (delete) and double-check for other stale references.
- Add one-liner tests (or sanity checks) that verify no `Link` hrefs point to non-existent paths.

Feedback? Tell me which parts you'd like expanded or any other local conventions you'd like captured. 👇