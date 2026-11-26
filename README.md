# kaustubhais.com

Personal website of Kaustubh Kislay. Next.js 16 (App Router) + React 19 +
Tailwind v4, deployed on Vercel at [kaustubhais.com](https://kaustubhais.com).

## Pages

| Route       | What it is                                                        |
| ----------- | ----------------------------------------------------------------- |
| `/`         | Bio, contact links, and a moon photo.                             |
| `/writing`  | Article index.                                                   |
| `/writing/[slug]` | Full articles with local images and video.                 |

## Environment variables

| Variable                   | Purpose                                                    |
| -------------------------- | ---------------------------------------------------------- |
| `GOOGLE_SITE_VERIFICATION`  | Optional Google Search Console verification meta tag.       |
| `REVALIDATE_TOKEN`          | Authenticates `POST /api/revalidate` for a manual cache refresh. |

All pages use static content and need no database or external content API.
The manual cache-refresh endpoint invalidates `/` and `/writing`.

The build sets each date in `/sitemap.xml` from the last Git commit that changed
the page's sources. The homepage tracks its page, contact bar, and moon photo.
The writing index tracks `src/app/writing/`. Each article tracks its own source
in `src/app/writing/_articles/` and its media in `public/writing/<slug>/`.
To add an article, use its slug as the source filename and register it in
`src/app/writing/articles.ts`. The build generates its page and sitemap entry.

## Development

```bash
npm run dev     # local dev server
npm run build   # production build (prerenders all pages)
npm run lint
```

Deploys happen automatically on push to `main` (Vercel). The framework
configuration lives in `vercel.json`.
