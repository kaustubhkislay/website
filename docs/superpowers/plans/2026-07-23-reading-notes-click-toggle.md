# Reading Notes Click-to-Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** On `/reading`, stop revealing Curius highlights ("notes") on hover; reveal them only via an explicit click on a per-row note-count indicator.

**Architecture:** Single client component change in `src/app/reading/reading-list.tsx`. The existing `expanded: ReadonlySet<string>` state (keyed by URL) is kept but driven by one `toggleHighlights(url)` function instead of hover-driven expand/collapse handlers. Rows with notes gain a small `<button>` after the title showing the note count; it toggles that row's notes. No server, data-flow, or styling-system changes.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind v4. No test framework exists in this repo — verification is `npm run lint`, `npm run build`, and a manual check in `npm run dev` (this matches the spec).

**Spec:** `docs/superpowers/specs/2026-07-23-reading-notes-click-toggle-design.md`

## Global Constraints

- Only `src/app/reading/reading-list.tsx` may change.
- Multiple rows may be open at once; a row stays open until its indicator is clicked again (no auto-collapse, no hover reveal, no focus reveal).
- Rows without notes render nothing extra.
- Indicator at rest: `text-text-faint`; on hover and while expanded: `text-accent-hover`; mono font, matching the faint mono aesthetic of the `[r]`/`[c]` tag prefixes.
- Accessibility: the indicator is a real `<button>` with `aria-expanded`, and `aria-label` of `Show notes (N)` / `Hide notes`.
- The expanded-notes markup (left-ruled list), filtering, search, URL sync, and favorites section are unchanged.

---

### Task 1: Replace hover-reveal with click-to-toggle indicator

**Files:**
- Modify: `src/app/reading/reading-list.tsx:94-108` (handler functions) and `src/app/reading/reading-list.tsx:229-267` (row rendering)

**Interfaces:**
- Consumes: `ReadingListItem` from `@/lib/curius` (already imported; `highlights?: string[]` is optional and only present when non-empty).
- Produces: n/a (leaf UI component; no other file references these handlers).

- [ ] **Step 1: Replace the hover expand/collapse handlers with a single toggle**

In `src/app/reading/reading-list.tsx`, replace this block (currently lines 94–108):

```tsx
  // Highlights reveal on hover/focus of the title and stay open while the
  // cursor is anywhere in the row (so they can be read); they close when the
  // cursor leaves the row.
  function expandHighlights(url: string) {
    setExpanded((prev) => (prev.has(url) ? prev : new Set(prev).add(url)));
  }

  function collapseHighlights(url: string) {
    setExpanded((prev) => {
      if (!prev.has(url)) return prev;
      const next = new Set(prev);
      next.delete(url);
      return next;
    });
  }
```

with:

```tsx
  // Notes are deliberate: they open/close only via the per-row count
  // indicator. Multiple rows can be open at once; nothing auto-collapses.
  function toggleHighlights(url: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url);
      else next.add(url);
      return next;
    });
  }
```

- [ ] **Step 2: Rewrite the row rendering — strip hover handlers, add the indicator button**

In the same file, replace the row `<li>` block inside `filtered.map` (currently lines 233–266):

```tsx
                <li
                  key={item.url}
                  onMouseLeave={hasHighlights ? () => collapseHighlights(item.url) : undefined}
                >
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-mono text-[11px] uppercase shrink-0 w-12 tabular-nums"
                      style={tagStyle ? { color: tagStyle.color } : undefined}
                    >
                      {tagStyle ? `[${tagStyle.short}]` : ""}
                    </span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={hasHighlights ? () => expandHighlights(item.url) : undefined}
                      onFocus={hasHighlights ? () => expandHighlights(item.url) : undefined}
                      onBlur={hasHighlights ? () => collapseHighlights(item.url) : undefined}
                      className="text-[15px] font-medium transition-colors truncate text-text hover:text-accent-hover"
                    >
                      {item.title}
                    </a>
                  </div>
                  {hasHighlights && isExpanded && (
                    <ul className="mt-2 mb-1 ml-[60px] space-y-2 border-l border-border-accent pl-4">
                      {item.highlights!.map((h, i) => (
                        <li key={i} className="text-[13px] leading-relaxed text-text-muted">
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
```

with:

```tsx
                <li key={item.url}>
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-mono text-[11px] uppercase shrink-0 w-12 tabular-nums"
                      style={tagStyle ? { color: tagStyle.color } : undefined}
                    >
                      {tagStyle ? `[${tagStyle.short}]` : ""}
                    </span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] font-medium transition-colors truncate text-text hover:text-accent-hover"
                    >
                      {item.title}
                    </a>
                    {hasHighlights && (
                      <button
                        onClick={() => toggleHighlights(item.url)}
                        aria-expanded={isExpanded}
                        aria-label={
                          isExpanded
                            ? "Hide notes"
                            : `Show notes (${item.highlights!.length})`
                        }
                        className={`font-mono text-[10px] shrink-0 self-start transition-colors active:translate-y-px ${
                          isExpanded
                            ? "text-accent-hover"
                            : "text-text-faint hover:text-accent-hover"
                        }`}
                      >
                        {item.highlights!.length}
                      </button>
                    )}
                  </div>
                  {hasHighlights && isExpanded && (
                    <ul className="mt-2 mb-1 ml-[60px] space-y-2 border-l border-border-accent pl-4">
                      {item.highlights!.map((h, i) => (
                        <li key={i} className="text-[13px] leading-relaxed text-text-muted">
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
```

Notes on the markup: `self-start` in the baseline-aligned flex row raises the small count toward the top of the title line, giving the superscript look from the spec; `text-[10px] font-mono` matches the tag-prefix aesthetic; the button sits after the (truncating) title so it never overlaps it.

- [ ] **Step 3: Lint and build**

Run: `npm run lint && npm run build`
Expected: lint passes with no errors; build completes and prerenders all pages (watch for the `/reading` route in the build output). An unused-variable lint error here means a leftover `expandHighlights`/`collapseHighlights` reference — Step 1 or 2 was applied incompletely.

- [ ] **Step 4: Manual verification in dev**

Run: `npm run dev`, open `http://localhost:3000/reading`, and check:
1. Hovering a title with notes does NOT expand anything (title still gets its hover color).
2. Rows with notes show a small faint count after the title; rows without notes show nothing extra.
3. Clicking the count expands the notes; clicking again collapses them; moving the mouse away collapses nothing.
4. Two rows can be open at the same time.
5. Tab to an indicator button and press Enter — it toggles; `aria-expanded` flips (visible in devtools accessibility pane if desired).

- [ ] **Step 5: Commit**

```bash
git add src/app/reading/reading-list.tsx
git commit -m "Replace hover-reveal reading notes with click-to-toggle count indicator

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```
