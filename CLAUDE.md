# Nissan VLP — Claude Development Guide

## Running the project

Two processes must be running simultaneously:

```bash
# Terminal 1 — Next.js dev server
npm run dev
# → http://localhost:3000

# Terminal 2 — HTTPS proxy (required for Storyblok Visual Editor)
npx local-ssl-proxy --source 3010 --target 3000
# → https://localhost:3010
```

Always use **https://localhost:3010** in the browser. The Storyblok Visual Editor
refuses to load http:// origins, so port 3010 is mandatory for editor work.

---

## Turbopack crash fix ("Jest worker exceeded retry limit")

**Symptom:** Browser shows a runtime error overlay:
> Jest worker encountered 2 child process exceptions, exceeding retry limit

**Cause:** Turbopack's compilation worker crashes when it hits a module resolution
failure, a syntax error, or a corrupted `.next` build cache.

**Fix (run in order):**

```bash
# 1. Kill the dev server (Ctrl+C in terminal, or kill the node process)

# 2. Delete the Turbopack build cache
Remove-Item -Recurse -Force .next          # PowerShell
# or
rm -rf .next                               # bash / WSL

# 3. Restart
npm run dev
```

**Prevention:**
- Always check for TypeScript/import errors before saving — Turbopack compiles on
  every save and will crash if a new import can't be resolved.
- After pulling remote changes, delete `.next` before starting the server if you
  see Turbopack errors immediately on load.
- If the crash happens again with no obvious code error, a stale cache is the
  most likely cause — delete `.next` first before investigating further.

---

## Project architecture

### Tech stack
- **Next.js 16 (App Router)** with Turbopack
- **Storyblok** as headless CMS (space ID in `.env.local`)
- **CSS Modules** for all component styles
- **Nissan WDS 2.0** design tokens (`src/wds/tokens.css`)

### Blok registration — two places, always both

Every new Storyblok component must be registered in **both** files:

| File | Purpose |
|---|---|
| `src/lib/storyblok.ts` | Server-side rendering (RSC fetch path) |
| `src/components/StoryblokProvider.tsx` | Client-side Visual Editor bridge |

Missing either registration causes the blok to silently render nothing.

### Page-level blok rendering

`VlpPage.tsx` maintains a `BLOKS` map that routes each `section.component` string
to its React component. When adding a **new page-level blok**, update the map too:

```tsx
// src/components/bloks/VlpPage/VlpPage.tsx
const BLOKS: Record<string, React.ComponentType<{ blok: any }>> = {
  vlp_banner: VlpBanner,
  vlp_your_new_blok: VlpYourNewBlok,  // ← add here
  ...
};
```

### Sub-blok components (nested bloks)

Child bloks (e.g. `vlp_spec_badge` inside `vlp_intro_specs`) do **not** need to be
registered in `StoryblokProvider` or `storyblok.ts`. They are rendered directly by
their parent component using the raw `blok` data — no `StoryblokComponent` wrapper.

---

## Storyblok component whitelist

The `vlp_page` body field uses `restrict_components: true`. Any new page-level blok
**must** be added to the `component_whitelist` array, otherwise it won't appear in
the Visual Editor's "Insert Block" panel.

Update via the MCP tool whenever a new section blok is created:

```
mcp__storyblok__update_component  →  vlp_page (ID: 154682904037560)
Add new blok name to component_whitelist[]
```

---

## Styling rules

### Always use WDS tokens
All CSS must use `var(--wds-*)` custom properties from `src/wds/tokens.css`.
Never hardcode brand colours — exception: Figma-specific background tones
(`#f9f9f9`, `#f8f8f9`) that have no matching WDS token.

Key tokens:
```css
--wds-color-nissan-black: #000000
--wds-color-nissan-white: #FFFFFF
--wds-color-nissan-grey:  #EFEFEF
--wds-color-background-grey: #F6F6F6
--wds-font-family-nissan: "Nissan Brand", system-ui, sans-serif
--wds-font-weight-bold: 700
--wds-font-weight-light: 300
```

### Typography components
Import from `@/wds/Typography` — never set font sizes manually:
```tsx
import { DisplayXL, DisplayM, DisplayS, BodyMLight, BodyS } from "@/wds/Typography";
```

### storyblokEditable
Every blok's root element must spread `{...storyblokEditable(blok)}` for
click-to-edit in the Visual Editor:
```tsx
<section className={styles.section} {...storyblokEditable(blok)}>
```

---

## Figma reference node IDs (Qashqai VLP)

| Section | Figma Node |
|---|---|
| Full page | `3687:83113` |
| VLP Banner (hero image) | `3687:83114` |
| VLP Intro Specs | `3687:83160` |
| Features | `3687:83200` |
| Grade Selector | `3687:83242` |
| Colour Selector | `3687:83280` |
| Design Highlights | `3687:83356` |
| Offers | `3687:83386` |
| Editorial (Kuro) | `3687:83320` |
| Split CTA | `3687:83340` |
| FAQ | `3687:83360` |
| Next Steps | `3687:83380` |

Use `mcp__Figma__get_design_context` with these IDs to re-check designs.

---

## Storyblok data fetching — do NOT use getStoryblokApi()

**Rule:** Always use a direct `fetch()` call to the Storyblok CDN REST API.
Never use `getStoryblokApi()` from `@storyblok/react/rsc` for data fetching.

**Why:** `getStoryblokApi()` depends on `storyblokInit` having been called and its
state surviving the serverless cold-start lifecycle. In Vercel's serverless
environment this fails silently — the catch block returns `null`, `notFound()` fires,
and the page returns a **404 with no error logged**.

**Correct pattern (`src/app/[[...slug]]/page.tsx`):**

```ts
async function fetchStory(slug: string, isDraft: boolean) {
  const token = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN;
  const version = isDraft || process.env.NODE_ENV === "development" ? "draft" : "published";

  try {
    const res = await fetch(
      `https://api.storyblok.com/v2/cdn/stories/${slug}?token=${token}&version=${version}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      console.error("[fetchStory] HTTP error:", res.status, res.statusText, "slug:", slug);
      return null;
    }
    const data = await res.json();
    return data.story ?? null;
  } catch (err) {
    console.error("[fetchStory] fetch failed for slug:", slug, err);
    return null;
  }
}
```

`storyblokInit` is still called (via `import "@/lib/storyblok"`) for component
registration — `StoryblokStory` needs it to resolve `vlp_page` → `VlpPage`.
Only the HTTP data fetch bypasses the SDK.

---

## Deployment URLs

| Environment | URL | Purpose |
|---|---|---|
| **Local dev** | `https://localhost:3010` | Day-to-day development |
| **Staging** | `https://nissan-43uf7yuu0-david-laus-projects-6c554b32.vercel.app` | Preview deployments (auto on every push) |
| **Production** | `https://nissan-vlp.vercel.app` | Live site (`vercel --prod`) |

All three are registered as preview environments in Storyblok.
To switch environments in the Visual Editor: click the environment dropdown (top-right of the editor toolbar).

### Deploying

```bash
# Staging preview (creates a new preview URL)
vercel

# Promote to production
vercel --prod
```

Vercel is connected to GitHub (`dlau034/nissan-vlp`) and will auto-build
every push to `master` as a preview deployment.

---

## Environment variables

```
NEXT_PUBLIC_STORYBLOK_TOKEN=   # Preview token (public, safe to expose)
STORYBLOK_PREVIEW_TOKEN=       # Preview token (same value for this POC)
STORYBLOK_PREVIEW_SECRET=      # Random secret for draft mode API
```

Stored in `.env.local` (gitignored). Never commit this file.
All three are also set in Vercel for both production and preview environments.
