# Reading page: click-to-toggle notes (remove hover reveal)

**Date:** 2026-07-23
**Scope:** `src/app/reading/reading-list.tsx` only.

## Problem

On `/reading`, hovering (or keyboard-focusing) an article title reveals the
Curius highlights ("notes") inline, and they collapse when the cursor leaves
the row. The owner no longer wants notes to appear on hover — revealing them
should be a deliberate action.

## Decision

Replace hover-reveal with an explicit click-to-toggle indicator.

## Behavior

- Remove the hover machinery: `onMouseEnter`/`onFocus`/`onBlur` on the title
  link, `onMouseLeave` on the row `<li>`, and the `expandHighlights` /
  `collapseHighlights` functions.
- Keep the existing `expanded: ReadonlySet<string>` state keyed by URL, driven
  by a single `toggleHighlights(url)`. Multiple rows may be open at once; a
  row stays open until its indicator is clicked again (no auto-collapse).

## The indicator

- Rows with notes render a small button after the title: a superscript-style
  note count in the site's mono font (e.g. `2`), `text-text-faint` at rest,
  `text-accent-hover` on hover and while expanded — matching the faint mono
  aesthetic of the `[r]`/`[c]` tag prefixes.
- It is a real `<button>` with `aria-expanded` and
  `aria-label="Show notes (N)"` / `"Hide notes"`, so keyboard users tab to it
  and activate with Enter/Space. Accessibility is preserved without hover.
- Rows without notes render nothing extra (unchanged).

## Unchanged

- The expanded notes markup (left-ruled list under the title).
- Filtering, search, URL sync, favorites section.
- Server side and data flow — `highlights` already ships only for rows that
  have them.

## Verification

- `npm run build` passes.
- Manual check in `npm run dev`: hover no longer expands notes; clicking the
  indicator toggles them; multiple rows can be open simultaneously; tab +
  Enter on the indicator works.
