"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ReadingListItem } from "@/lib/curius";

const TAG_CONFIG: Record<string, { label: string; short: string; color: string }> = {
  research:               { label: "research",            short: "r",   color: "var(--tag-research)" },
  "policy/fieldbuilding": { label: "policy/fieldbuilding", short: "p/f", color: "var(--tag-policy)" },
  "self-improvement":     { label: "self-improvement",     short: "s-i", color: "var(--tag-self)" },
  culture:                { label: "culture",              short: "c",   color: "var(--tag-culture)" },
};

// Filters live in the URL (?tags=a,b&q=...) so filtered views are shareable.
// The page is static, so the server render can't see the query string — state
// is read once after mount and written back imperatively from the handlers.
function readFiltersFromUrl(): { tags: Set<string>; q: string } {
  const params = new URLSearchParams(window.location.search);
  const tags = new Set(
    (params.get("tags") ?? "").split(",").filter((t) => t in TAG_CONFIG)
  );
  return { tags, q: params.get("q") ?? "" };
}

function writeFiltersToUrl(tags: ReadonlySet<string>, q: string) {
  const params = new URLSearchParams();
  if (tags.size > 0) params.set("tags", [...tags].join(","));
  if (q) params.set("q", q);
  const qs = params.toString();
  window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
}

export function ReadingList({
  items,
  favorites,
}: {
  items: ReadingListItem[];
  favorites: ReadingListItem[];
}) {
  const [query, setQuery] = useState("");
  // Multi-select: chips toggle independently; empty set = no filter ("all").
  const [selectedTags, setSelectedTags] = useState<ReadonlySet<string>>(new Set());
  const [searchOpen, setSearchOpen] = useState(false);
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  // Deliberate one-shot setState on mount: useSearchParams would be the
  // idiomatic read, but on a force-static page it client-renders everything
  // under the Suspense boundary, dropping the whole list from the prerendered
  // HTML. One batched extra render (only when the URL carries filters) is the
  // cheaper trade.
  useEffect(() => {
    const { tags, q } = readFiltersFromUrl();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (tags.size > 0) setSelectedTags(tags);
    if (q) {
      setQuery(q);
      setSearchOpen(true);
    }
  }, []);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  function toggleSearch() {
    if (searchOpen) {
      setSearchOpen(false);
      setQuery("");
      writeFiltersToUrl(selectedTags, "");
    } else {
      setSearchOpen(true);
    }
  }

  function onQueryChange(q: string) {
    setQuery(q);
    writeFiltersToUrl(selectedTags, q);
  }

  function clearTags() {
    setSelectedTags(new Set());
    writeFiltersToUrl(new Set(), query);
  }

  function toggleTag(tag: string) {
    const next = new Set(selectedTags);
    if (next.has(tag)) next.delete(tag);
    else next.add(tag);
    setSelectedTags(next);
    writeFiltersToUrl(next, query);
  }

  // Highlights reveal on hover/focus of the quote marker and stay open while
  // the cursor is anywhere in the row (so they can be read); tap still
  // toggles for touch devices, where hover doesn't exist.
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

  function toggleExpanded(url: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url);
      else next.add(url);
      return next;
    });
  }

  const q = query.toLowerCase();
  const filtered = items.filter((item) => {
    if (selectedTags.size > 0 && (!item.tag || !selectedTags.has(item.tag))) return false;
    if (q && !item.title.toLowerCase().includes(q)) return false;
    return true;
  });

  const chip =
    "font-sans text-[11px] uppercase tracking-wider px-3 py-1 border whitespace-nowrap transition-colors active:translate-y-px";

  return (
    <>
      <Link
        href="/"
        className="font-sans text-[11px] uppercase tracking-[0.18em] text-text hover:text-text-faint transition-colors"
      >
        <span className="font-bold">{"<"}</span> Home
      </Link>

      {favorites.length > 0 && (
        <section className="mt-8">
          <h2 className="font-sans text-xs uppercase tracking-[0.18em] text-heading mb-5">
            Favorites
          </h2>
          <ul className="space-y-3">
            {favorites.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-medium text-text hover:text-accent-hover transition-colors"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12">
        <h2 className="font-sans text-xs uppercase tracking-[0.18em] text-heading mb-5">
          Everything I&apos;ve read
        </h2>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex gap-2 flex-nowrap overflow-x-auto flex-1 min-w-0">
            <button
              onClick={clearTags}
              aria-pressed={selectedTags.size === 0}
              className={`${chip} ${
                selectedTags.size === 0
                  ? "border-text border-2 text-text"
                  : "border-border text-text-faint hover:text-text"
              }`}
            >
              all
            </button>
            {Object.entries(TAG_CONFIG).map(([tag, config]) => {
              const active = selectedTags.has(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  aria-pressed={active}
                  className={`${chip} ${
                    active ? "border-2" : "border-border text-text-faint hover:text-text"
                  }`}
                  style={active ? { borderColor: config.color, color: config.color } : undefined}
                >
                  {config.label}
                </button>
              );
            })}
          </div>
          <button
            onClick={toggleSearch}
            aria-label={searchOpen ? "Close search" : "Search"}
            aria-expanded={searchOpen}
            className="shrink-0 text-text-faint hover:text-accent-hover transition-colors active:translate-y-px"
          >
            {searchOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            )}
          </button>
        </div>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
            searchOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={query}
              tabIndex={searchOpen ? 0 : -1}
              aria-hidden={!searchOpen}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") toggleSearch();
              }}
              className="w-full mb-6 bg-transparent border border-border px-3 py-2 text-sm text-text placeholder:text-text-ghost focus:border-border-accent transition-colors"
            />
          </div>
        </div>

        {filtered.length > 0 ? (
          <ul className="space-y-3">
            {filtered.map((item) => {
              const tagStyle = item.tag ? TAG_CONFIG[item.tag] : null;
              const hasHighlights = (item.highlights?.length ?? 0) > 0;
              const isExpanded = expanded.has(item.url);
              return (
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
                      className="text-[15px] font-medium transition-colors truncate text-text hover:text-accent-hover"
                    >
                      {item.title}
                    </a>
                    {hasHighlights && (
                      <button
                        onClick={() => toggleExpanded(item.url)}
                        onMouseEnter={() => expandHighlights(item.url)}
                        onFocus={() => expandHighlights(item.url)}
                        onBlur={() => collapseHighlights(item.url)}
                        aria-expanded={isExpanded}
                        aria-label={`${isExpanded ? "Hide" : "Show"} ${item.highlights!.length} highlight${item.highlights!.length === 1 ? "" : "s"}`}
                        className={`shrink-0 font-mono text-[11px] transition-colors active:translate-y-px ${
                          isExpanded ? "text-accent" : "text-text-ghost hover:text-accent-hover"
                        }`}
                      >
                        &#10077;{item.highlights!.length}
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
              );
            })}
          </ul>
        ) : (
          <p className="font-sans text-xs uppercase tracking-wider text-text-ghost">
            {query ? "No matches found." : "Nothing here yet."}
          </p>
        )}
      </section>
    </>
  );
}
