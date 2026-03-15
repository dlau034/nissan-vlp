# Nissan VLP — Storyblok POC

A Next.js proof-of-concept for the Nissan Qashqai Vehicle Landing Page (VLP),
powered by Storyblok as a headless CMS and styled with the Nissan WDS 2.0 design system.

---

## Getting started

### Prerequisites

- Node.js 18+
- A Storyblok account with the POC space set up
- `.env.local` with your Storyblok preview token

### Install

```bash
npm install
```

### Run locally

Two terminals are required:

```bash
# Terminal 1 — Next.js dev server
npm run dev

# Terminal 2 — HTTPS proxy (required for Storyblok Visual Editor)
npx local-ssl-proxy --source 3010 --target 3000
```

Open **https://localhost:3010** in your browser.

> ⚠️ The Storyblok Visual Editor requires HTTPS. Always use port **3010**, not 3000.

---

## Project structure

```
src/
├── app/                        # Next.js App Router pages
│   └── [[...slug]]/page.tsx    # Dynamic catch-all route (Storyblok)
├── components/
│   ├── bloks/                  # One folder per Storyblok blok
│   │   ├── VlpBanner/
│   │   ├── VlpIntroSpecs/
│   │   ├── VlpFeatures/
│   │   ├── VlpGradeSelector/
│   │   ├── VlpColourSelector/
│   │   ├── VlpDesignHighlights/
│   │   ├── VlpOffers/
│   │   ├── VlpEditorial/
│   │   ├── VlpSplitCta/
│   │   ├── VlpFaq/
│   │   ├── VlpNextSteps/
│   │   └── VlpPage/            # Root page blok — dispatches body[] sections
│   └── StoryblokProvider.tsx   # Client-side blok registry (Visual Editor)
├── lib/
│   └── storyblok.ts            # Server-side blok registry (RSC fetch)
└── wds/
    ├── tokens.css              # Nissan WDS 2.0 design tokens
    └── Typography.tsx          # WDS typography components
```

---

## Page sections

The Qashqai VLP story is built from 11 independently editable Storyblok bloks:

| # | Blok | Description |
|---|---|---|
| 1 | `vlp_banner` | Full-width hero image |
| 2 | `vlp_intro_specs` | Model name, spec badges, CTA |
| 3 | `vlp_features` | 3-col feature card grid |
| 4 | `vlp_grade_selector` | Grade/trim comparison cards |
| 5 | `vlp_colour_selector` | Colour swatch picker |
| 6 | `vlp_design_highlights` | 3-col highlight card grid |
| 7 | `vlp_offers` | Finance offer cards |
| 8 | `vlp_editorial` | Image + text editorial panel |
| 9 | `vlp_split_cta` | 2-col image CTA panel |
| 10 | `vlp_faq` | Accordion FAQ list |
| 11 | `vlp_next_steps` | Row of primary CTA buttons |

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| CMS | Storyblok (headless, Visual Editor) |
| Styling | CSS Modules + Nissan WDS 2.0 tokens |
| Language | TypeScript |
| HTTPS proxy | local-ssl-proxy |

---

## Environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_STORYBLOK_TOKEN=your_preview_token_here
STORYBLOK_SPACE_ID=your_space_id_here
```

> Never commit `.env.local` — it is gitignored.

---

## Troubleshooting

### "Jest worker exceeded retry limit" (Turbopack crash)

```bash
# Stop the dev server, then:
rm -rf .next        # bash/WSL
# or
Remove-Item -Recurse -Force .next   # PowerShell

npm run dev
```

Deleting the `.next` cache clears corrupted Turbopack build artefacts.
See `CLAUDE.md` for full developer notes.

### Visual Editor not loading

- Ensure the HTTPS proxy (`local-ssl-proxy`) is running on port 3010
- Check the Storyblok space domain is set to `https://localhost:3010/`
- Accept the self-signed certificate warning in the browser first
