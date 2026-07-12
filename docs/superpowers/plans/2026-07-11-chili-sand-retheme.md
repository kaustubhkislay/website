# Chili Pepper + Sand Dollar Retheme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the site's forest-green/white/grey palette with chili pepper (`#9B1B30`) on light sand (`#F4EDE3`), per `docs/superpowers/specs/2026-07-11-chili-sand-retheme-design.md`.

**Architecture:** The theme is centralized as CSS custom properties in the `:root` block of `src/app/globals.css`, mapped to Tailwind semantic tokens via `@theme inline` (which does not change). Two files carry hardcoded hexes outside CSS: `src/app/opengraph-image.tsx` (build-time Satori render — cannot use CSS vars) and `src/app/manifest.ts`. Nothing else changes.

**Tech Stack:** Next.js 16 App Router, Tailwind v4 (CSS-first config), no test framework in repo — verification is a contrast script, `npm run lint`, `npm run build`, and visual check in dev.

## Global Constraints

- Favicon and app-icon files are **NOT touched**: `src/app/favicon.ico`, `src/app/icon.png`, `src/app/apple-icon.png`, `public/android-chrome-192x192.png`, `public/android-chrome-512x512.png`.
- No new dependencies; pure value swaps.
- The `@theme inline` block and all component classes stay untouched — only `:root` values, the file header comment, `opengraph-image.tsx` hexes, and `manifest.ts` hexes change.
- Every text color must hold ≥4.5:1 contrast on its background; focus ring ≥3:1.
- Working directory: `/Users/kaustubhkislay/website-1`.

## Final palette (contrast-verified against bg `#F4EDE3` on 2026-07-11)

| Token | Value | Ratio on bg |
| --- | --- | --- |
| `--bg` | `#F4EDE3` | — |
| `--text` | `#201812` | 15.05 |
| `--text-muted` | `#362B22` | 11.84 |
| `--text-faint` | `#5C4F42` | 6.81 |
| `--text-ghost` | `#75655A` | 4.80 |
| `--heading`, `--accent` | `#9B1B30` | 6.97 |
| `--accent-hover` | `#7A1526` | 9.21 |
| `--border` | `#E8DCCB` | decorative |
| `--border-accent` | `#DECDBE` | decorative |
| `--tag-research` | `#9C4511` | 5.52 |
| `--tag-policy` | `#2E6E3C` | 5.30 |
| `--tag-self` | `#275F94` | 5.73 |
| `--tag-culture` | `#7D5E10` | 5.19 |

---

### Task 1: Retheme `globals.css`

**Files:**
- Modify: `src/app/globals.css` (header comment + `:root` block)

**Interfaces:**
- Produces: the CSS custom properties above, consumed unchanged by the existing `@theme inline` mapping. Task 2 reuses the same literal hexes.

- [ ] **Step 1: Write the contrast-check script (the "test")**

Create `/private/tmp/claude-501/-Users-kaustubhkislay/24f82f4a-c333-42b6-b846-f710fa2f7352/scratchpad/contrast.py`:

```python
import re, sys

def lum(hexc):
    h = hexc.lstrip('#')
    rgb = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
    lin = [c/12.92 if c <= 0.04045 else ((c+0.055)/1.055)**2.4 for c in rgb]
    return 0.2126*lin[0] + 0.7152*lin[1] + 0.0722*lin[2]

def ratio(fg, bg):
    l1, l2 = sorted([lum(fg), lum(bg)], reverse=True)
    return (l1+0.05) / (l2+0.05)

css = open('/Users/kaustubhkislay/website-1/src/app/globals.css').read()
root = css.split(':root')[1].split('}')[0]
tokens = dict(re.findall(r'--([\w-]+):\s*(#[0-9a-fA-F]{6})', root))
bg = tokens['bg']
need_45 = ['text', 'text-muted', 'text-faint', 'text-ghost', 'heading',
           'accent', 'accent-hover', 'tag-research', 'tag-policy',
           'tag-self', 'tag-culture']
failed = False
for name in need_45:
    r = ratio(tokens[name], bg)
    ok = r >= 4.5
    failed |= not ok
    print(f"{'PASS' if ok else 'FAIL'}  --{name} {tokens[name]} on bg: {r:.2f}")
r = ratio(tokens['accent'], bg)
print(f"{'PASS' if r >= 3 else 'FAIL'}  focus ring (accent) >=3:1: {r:.2f}")
sys.exit(1 if failed else 0)
```

- [ ] **Step 2: Run it against the current (green) CSS to verify it works**

Run: `python3 /private/tmp/claude-501/-Users-kaustubhkislay/24f82f4a-c333-42b6-b846-f710fa2f7352/scratchpad/contrast.py`
Expected: runs and prints PASS lines for the old palette (old values all pass on white), exit 0. This proves the script parses the file correctly before the swap.

- [ ] **Step 3: Swap the `:root` values and header comment**

In `src/app/globals.css`, replace the header comment's palette lines:

```css
/* Hallmark · redesign · genre: editorial (brutalist voice) · macrostructure: Index/Hub (line-light)
 * tone: eco-brutalist · anchor hue: chili-pepper red + warm black over light sand
 * pre-emit critique: P5 H4 E4 S5 R5 V5
 * contrast: pass (46–50) · nav: hub links · footer: none · mobile: pass
 */
```

Replace the `:root` block (comment line included) with:

```css
/* light-sand · warm-black · chili-pepper palette */
:root {
  --bg: #F4EDE3;
  --text: #201812;
  --text-muted: #362B22;
  --text-faint: #5C4F42;
  --text-ghost: #75655A;
  --heading: #9B1B30;
  --accent: #9B1B30;
  --accent-hover: #7A1526;
  --border: #E8DCCB;
  --border-accent: #DECDBE;
  /* reading-list tag hues — each ≥4.5:1 on light-sand --bg */
  --tag-research: #9C4511;
  --tag-policy: #2E6E3C;
  --tag-self: #275F94;
  --tag-culture: #7D5E10;
  --glow-opacity: 1;
  --glow-gradient: radial-gradient(
    ellipse 70% 45% at 50% 100%,
    rgba(155, 27, 48, 0.05) 0%,
    transparent 70%
  );
}
```

- [ ] **Step 4: Run the contrast script to verify the new palette passes**

Run: `python3 /private/tmp/claude-501/-Users-kaustubhkislay/24f82f4a-c333-42b6-b846-f710fa2f7352/scratchpad/contrast.py`
Expected: all lines PASS, exit 0.

- [ ] **Step 5: Confirm no green remains anywhere in src**

Run: `rg -in '2f6b3a|1f4a26|b8d0ad|a23b2e|2f7a42|2767a0|856515|47, 107, 58' /Users/kaustubhkislay/website-1/src/`
Expected: no matches in `globals.css`; the only remaining matches are `#2f6b3a` and `#525252`/`#0a0a0a`/`#ffffff` in `opengraph-image.tsx` and `manifest.ts` (handled in Task 2).

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css
git commit -m "Retheme CSS tokens: chili pepper on light sand

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Retheme OG image and web manifest

**Files:**
- Modify: `src/app/opengraph-image.tsx:20,24,30,36,40`
- Modify: `src/app/manifest.ts:11-12`

**Interfaces:**
- Consumes: the literal hexes from Task 1's palette table (this file cannot read CSS vars — it renders at build time via Satori).

- [ ] **Step 1: Swap the five hexes in `opengraph-image.tsx`**

| Line | Old | New |
| --- | --- | --- |
| 20 | `background: "#ffffff"` | `background: "#F4EDE3"` |
| 24 | `background: "#2f6b3a"` (bar) | `background: "#9B1B30"` |
| 30 | `color: "#0a0a0a"` (title) | `color: "#201812"` |
| 36 | `color: "#525252"` (subtitle) | `color: "#5C4F42"` |
| 40 | `color: "#2f6b3a"` (domain) | `color: "#9B1B30"` |

- [ ] **Step 2: Swap the manifest colors**

In `src/app/manifest.ts` lines 11-12:

```ts
    theme_color: "#F4EDE3",
    background_color: "#F4EDE3",
```

- [ ] **Step 3: Verify no old theme hexes remain in src**

Run: `rg -in '2f6b3a|1f4a26|b8d0ad|ffffff|#e5e5e5|#8a8a8a|#525252|#262626|#0a0a0a' /Users/kaustubhkislay/website-1/src/`
Expected: no matches.

- [ ] **Step 4: Commit**

```bash
git add src/app/opengraph-image.tsx src/app/manifest.ts
git commit -m "Retheme OG image and manifest to chili + sand

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Build, lint, and visual verification

**Files:** none created or modified (verification only; fix-forward if anything fails).

**Interfaces:**
- Consumes: the completed changes from Tasks 1-2.

- [ ] **Step 1: Lint**

Run: `npm run lint`
Expected: exit 0, no errors.

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: exit 0; all routes prerender (build regenerates the OG image with the new colors). Note: `/reading` prerender may attempt Redis/Curius using `.env.local` creds — a network-degraded fallback (empty list) is acceptable and unrelated to the theme.

- [ ] **Step 3: Visual check in dev**

Start `npm run dev` in the background, then screenshot or curl-inspect `/`, `/writing`, `/reading`:
- Page background is light sand, not white.
- Headings/links/name-underline render chili red; hover state darkens.
- Reading page: all four tag badges legible and mutually distinct; research tag reads terracotta/orange, clearly different from chili links.
- Bottom glow gradient is a faint warm red, not green.
Stop the dev server when done.

- [ ] **Step 4: Final check — working tree clean, favicon untouched**

Run: `git status --short && git log --oneline -3`
Expected: clean tree; the two retheme commits on top. Confirm no icon files appear in either commit: `git show --stat HEAD HEAD~1 | grep -i -E 'icon|favicon|chrome'` → no matches.
