# Homepage quote epigraph

**Date:** 2026-07-17
**Scope:** One static markup addition to the homepage. No new components,
client JS, data, or theme tokens.

## What

Add a short quote under the contact-bar icons on `/`:

> "We're all gonna make it brah"
> — Aziz Shavershian

## Decisions (user-confirmed)

1. **Placement:** `src/app/page.tsx`, directly after `<ContactBar />` inside
   the header `min-w-0` div, before the `mt-6` bio block.
2. **Style: quiet epigraph.** Small italic muted quote with a faint,
   non-italic attribution below it — matches the site's understated tone and
   does not compete with the bio. (Bordered pull-quote and section-label
   treatments were considered and rejected as too heavy for one line.)
3. **Markup:** semantic `<blockquote>` containing the quote and a `<cite>`
   for the attribution, em-dash prefixed.
4. **Styling:** existing tokens only — quote `text-[14px] italic
   text-text-muted`, attribution `text-text-faint` (non-italic via
   `not-italic` on the `cite`), `mt-5` above the block so it breathes between
   the icons and the bio. Inherits the chili/sand theme with no other changes.
5. **Attribution text is exactly** `— Aziz Shavershian` (as given by the
   user; no "Zyzz" nickname).

## Testing

- Visual check on `npm run dev` (desktop + narrow viewport — the sketch
  overlay is hidden <640px, so just confirm the quote wraps cleanly).
- `npm run build` passes (page stays fully static).
