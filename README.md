# kaustubhais.com

Personal website of Kaustubh Kislay. Next.js 16 (App Router) + React 19 +
Tailwind v4, deployed on Vercel at [kaustubhais.com](https://kaustubhais.com).

## Pages

| Route       | What it is                                                        |
| ----------- | ----------------------------------------------------------------- |
| `/`         | Bio, profile photo, contact links, and writing navigation.         |
| `/writing`  | Featured posts (hardcoded in `src/app/writing/page.tsx`).         |

## Environment variables

| Variable                   | Purpose                                                    |
| -------------------------- | ---------------------------------------------------------- |
| `GOOGLE_SITE_VERIFICATION`  | Optional Google Search Console verification meta tag.       |
| `REVALIDATE_TOKEN`          | Authenticates `POST /api/revalidate` for a manual cache refresh. |

Both pages use static content and need no database or external content API.
The manual cache-refresh endpoint invalidates `/` and `/writing`.

## Development

```bash
npm run dev     # local dev server
npm run build   # production build (prerenders all pages)
npm run lint
```

Deploys happen automatically on push to `main` (Vercel). The framework
configuration lives in `vercel.json`.
