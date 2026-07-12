# Chili Pepper + Sand Dollar retheme

**Date:** 2026-07-11
**Scope:** Color theme only — replace the forest-green/white/grey palette with
chili pepper (Pantone 19-1557, `#9B1B30`) and sand dollar (Pantone 13-1106,
`#DECDBE`). No layout, typography, or component changes.

## Decisions (user-confirmed)

1. **Sand is the page background.** The whole site moves from white to warm
   sand. True Sand Dollar `#DECDBE` is too dark for a page background against
   the existing faint-text tiers, so it serves as the *deep* sand (borders,
   scrollbar, surfaces) and is lightened to approximately `#F4EDE3` for
   `--bg` — same hue, parchment-light.
2. **Chili pepper replaces green everywhere green appears:** headings, accent,
   links, hover, focus ring, glow gradient.
3. **All four reading-list tag hues are re-tuned for the sand background,**
   keeping each hue family (research warm, policy green, self blue, culture
   gold) at ≥4.5:1 contrast. Research shifts to burnt orange/terracotta so
   tags don't read as accent-colored links next to a chili accent.
4. **Favicon and app-icon PNGs are NOT touched.** The black shark-jaws sketch
   on white stays as-is (`favicon.ico`, `icon.png`, `apple-icon.png`,
   `public/android-chrome-*.png`).

## Changes

### `src/app/globals.css` (`:root` block only; the `@theme inline` semantic mapping is untouched)

| Token | Old | New (intent) |
| --- | --- | --- |
| `--bg` | `#ffffff` | light sand ≈ `#F4EDE3` |
| `--text` | `#0a0a0a` | warm near-black |
| `--text-muted` | `#262626` | warm dark grey-brown |
| `--text-faint` | `#525252` | warm mid grey-brown |
| `--text-ghost` | `#8a8a8a` | warm light grey-brown, darkened to hold ≥4.5:1 on sand |
| `--heading` / `--accent` | `#2f6b3a` | chili `#9B1B30` |
| `--accent-hover` | `#1f4a26` | darker chili ≈ `#7A1526` |
| `--border` | `#e5e5e5` | pale sand between bg and Sand Dollar |
| `--border-accent` | `#b8d0ad` | Sand Dollar `#DECDBE` |
| `--tag-research` | `#a23b2e` | burnt orange/terracotta, distinct from chili |
| `--tag-policy` | `#2f7a42` | green family, deepened for sand |
| `--tag-self` | `#2767a0` | blue family, adjusted for sand |
| `--tag-culture` | `#856515` | gold family, adjusted for sand |
| `--glow-gradient` | green rgba at 5% | chili rgba at the same subtlety |

Exact warm-neutral and tag hexes are chosen during implementation and
verified by a contrast script; the table records intent, not final values.
Also update the Hallmark header comment (anchor hue line) to describe the new
palette.

### `src/app/opengraph-image.tsx`

`#ffffff` background → light sand; `#2f6b3a` bar and domain line → chili;
`#0a0a0a` / `#525252` text → the new warm equivalents. Keep hexes literal
(this file renders at build via Satori, no CSS vars).

### `src/app/manifest.ts`

`theme_color` and `background_color` `#ffffff` → light sand.

## Constraints

- **Contrast:** every text/background pair (all text tiers, accent, all four
  tags, OG image colors) must hold ≥4.5:1 on its background; focus ring ≥3:1.
  Verified by a small script, not by eye.
- **No new dependencies.** Pure value swaps.
- The `@theme inline` token names and every component class (`text-accent`,
  `border-border`, etc.) are stable — nothing outside the three files above
  changes.

## Verification

1. Contrast-ratio script over every pair listed above.
2. `npm run lint` and `npm run build` pass (build also regenerates the OG
   image).
3. Visual check of `/`, `/writing`, `/reading` (including tag badges, filter
   UI, highlights hover) in `npm run dev`.

## Out of scope

Favicon/app icons, layout, typography, component structure, `profile.webp`,
`giorno-sketch.webp`, reading-list behavior, dark mode (site has none today).
