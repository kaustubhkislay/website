# kaustubhais.com

Personal website of Kaustubh Kislay. Next.js 16 (App Router) + React 19 +
Tailwind v4, deployed on Vercel at [kaustubhais.com](https://kaustubhais.com).

## Pages

| Route       | What it is                                                        |
| ----------- | ----------------------------------------------------------------- |
| `/`         | Bio, affiliations, friends webring. Fully static.                 |
| `/writing`  | Featured posts (hardcoded in `src/app/writing/page.tsx`).         |
| `/reading`  | Live mirror of my [Curius](https://curius.app/kaustubh-kislay) bookmarks, auto-tagged by an LLM, with multi-tag filtering, search, and expandable highlights. Filters sync to the URL (`?tags=research,culture&q=...`). |
| `/feed.xml` | RSS feed of the reading list (latest 50 links).                   |

## How the reading list works

```
Curius API ──crawl──> cron (/api/cron, every 5 min)
                        ├─ classify uncached links (OpenRouter LLM) ──> Redis tag:<url>
                        ├─ write render-ready snapshot ──────────────> Redis curius:snapshot
                        └─ new links or tags? ── revalidatePath(/reading, /feed.xml)

/reading, /feed.xml ── ISR (force-static, 1h) ── read curius:snapshot (1 round trip)
```

Design constraints worth knowing before touching this:

- **The Curius API is slow** (2–4s per 25-link page), so nothing user-facing
  ever crawls it. Pages regenerate from the Redis snapshot; a live crawl is
  only the cold-start fallback when the snapshot key is missing.
- **`force-static` on `/reading` and `/feed.xml` is load-bearing.** The
  Upstash client issues `no-store` fetches, which would otherwise flip those
  routes to dynamic rendering and put Redis on every request.
- **Crawl failures return `null`, never a partial list** — a flaky Curius
  response must not persist a truncated snapshot (`src/lib/curius.ts`).
- **Classification is cached forever per URL** in Redis (`tag:<url>`).
  `POST /api/reclassify` (Bearer `CRON_SECRET`) wipes and re-tags — body
  `{"mode": "all" | "other" | "urls", "urls": [...]}`.

## Environment variables

| Var                                                | Purpose                                     |
| -------------------------------------------------- | ------------------------------------------- |
| `KV_REST_API_URL` / `redis1_KV_REST_API_URL`       | Upstash Redis REST endpoint                 |
| `KV_REST_API_TOKEN` / `redis1_KV_REST_API_TOKEN`   | Upstash Redis token                         |
| `OPENROUTER_API_KEY`                               | LLM classification (`src/lib/classify.ts`)  |
| `CRON_SECRET`                                      | Auths `/api/cron` and `/api/reclassify`     |
| `REVALIDATE_TOKEN`                                 | Auths `POST /api/revalidate` (manual purge) |

Without Redis everything still renders — links just show untagged and every
regeneration pays the full crawl. Without OpenRouter, new links stay untagged.

## Development

```bash
npm run dev     # local dev server
npm run build   # production build (prerenders all pages)
npm run lint
```

Deploys happen automatically on push to `main` (Vercel). The cron schedule
lives in `vercel.json`.
