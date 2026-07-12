# Chili-dominant inversion: chili pepper background, sand dollar accents

**Date:** 2026-07-11
**Scope:** Color theme only — invert the chili-on-sand palette shipped earlier
today so deep chili (Pantone 19-1557, `#9B1B30`) is the page background and
Sand Dollar (Pantone 13-1106, `#DECDBE`) is the heading/link accent. Also
recolor the Giorno sketch to sand-dollar strokes on a transparent background.
No layout, typography, or component changes.

## Decisions (user-confirmed)

1. **Deep chili `#9B1B30` is the page background** — not the bright
   `#E32227`, which fails contrast against every light-sand text candidate
   (3.99:1 on light sand) and reads 1.74:1 against deep chili, so it appears
   nowhere in this theme.
2. **Full inversion, whole site.** All text tiers become sand-family;
   headings/links land on exact Sand Dollar `#DECDBE`; the four reading-list
   tag hues are re-tuned as light pastels; OG image and manifest flip too.
3. **Illustration:** `public/giorno-sketch.webp` is regenerated so ink
   darkness becomes alpha (dark stroke → opaque, background → fully
   transparent) and all strokes are colored `#DECDBE`. No baked background.
4. **Favicon and app-icon PNGs are NOT touched** (`src/app/favicon.ico`,
   `src/app/icon.png`, `src/app/apple-icon.png`,
   `public/android-chrome-*.png`).
5. **Links keep their existing underline treatment** — body text (bright
   sand) and links (dusty sand) are close in family, so the underline plus
   hover-brightening carries the distinction.

## Palette (contrast-verified against bg `#9B1B30` on 2026-07-11)

| Token | Old (sand theme) | New | Ratio on chili bg |
| --- | --- | --- | --- |
| `--bg` | `#F4EDE3` | `#9B1B30` | — |
| `--text` | `#201812` | `#FAF5EC` | 7.46 |
| `--text-muted` | `#362B22` | `#EFE5D6` | 6.50 |
| `--text-faint` | `#5C4F42` | `#D9C5B2` | 4.85 |
| `--text-ghost` | `#75655A` | `#D5C1AE` | 4.65 |
| `--heading` / `--accent` | `#9B1B30` | `#DECDBE` | 5.24 |
| `--accent-hover` | `#7A1526` | `#FAF5EC` | 7.46 |
| `--border` | `#E8DCCB` | `#B0374C` | decorative |
| `--border-accent` | `#DECDBE` | `#7A1526` | decorative |
| `--tag-research` | `#9C4511` | `#F5B48A` | 4.54 |
| `--tag-policy` | `#2E6E3C` | `#B4DDB4` | 5.38 |
| `--tag-self` | `#275F94` | `#B4D0F4` | 5.12 |
| `--tag-culture` | `#7D5E10` | `#EDD796` | 5.69 |
| `--glow-opacity` | `1` | `1` (unchanged) | — |
| `--glow-gradient` | chili rgba 5% | `rgba(222, 205, 190, 0.06)` sand glow, same shape | — |

Constraint carried over from the sand theme: every text color ≥4.5:1 on the
background; focus ring (accent) ≥3:1 (5.24 passes).

## Changes

### `src/app/globals.css`

`:root` values and the file header comment only; the `@theme inline` semantic
mapping and all component classes are untouched. Header comment updated to
describe the chili-dominant palette.

### `public/giorno-sketch.webp`

Regenerated from the current sand-baked file:

- Convert to grayscale to recover ink intensity `v` (0 = black stroke,
  255 = sand background).
- Normalize: alpha = `(bgmax − v) / bgmax` clamped to [0, 1], where `bgmax`
  is the background gray level (~237 for the sand-baked file), so the
  background maps to alpha 0 and full strokes to alpha 255, anti-aliased
  edges to partial alpha.
- Color every pixel `#DECDBE`; save as lossless-alpha WebP (RGBA).

The rendering code in `src/app/page.tsx` does not change.

### `src/app/opengraph-image.tsx`

| Element | Old | New |
| --- | --- | --- |
| background | `#F4EDE3` | `#9B1B30` |
| bar | `#9B1B30` | `#DECDBE` |
| title | `#201812` | `#FAF5EC` |
| subtitle | `#5C4F42` | `#D9C5B2` |
| domain | `#9B1B30` | `#DECDBE` |

### `src/app/manifest.ts`

`theme_color` and `background_color` → `#9B1B30`.

## Verification

Same regime as the sand retheme:

1. Contrast script over the new `:root` (all text tokens ≥4.5:1, accent ≥3:1
   as focus ring).
2. Grep `src/` for stale sand-theme values in the swapped roles (old `--bg`
   `#F4EDE3` must only appear as a text/hover color, `#201812`/`#362B22`/
   `#5C4F42`/`#75655A` must not appear at all).
3. Pixel-check the regenerated sketch: corners fully transparent, stroke
   pixels `#DECDBE`.
4. `npm run lint`, `npm run build` (routes stay static), visual check of
   `/`, `/writing`, `/reading` in dev.
5. Favicons untouched; working tree clean after commits.

## Out of scope

- No light/dark toggle; the site has one theme.
- Bright chili `#E32227` is not used anywhere.
- No layout, typography, spacing, or component changes.
