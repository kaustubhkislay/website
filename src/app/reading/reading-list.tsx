"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ReadingItem } from "@/lib/curius";

const TAG_CONFIG: Record<string, { label: string; short: string; color: string }> = {
  research:               { label: "research",            short: "r",   color: "var(--tag-research)" },
  "policy/fieldbuilding": { label: "policy/fieldbuilding", short: "p/f", color: "var(--tag-policy)" },
  "self-improvement":     { label: "self-improvement",     short: "s-i", color: "var(--tag-self)" },
  culture:                { label: "culture",              short: "c",   color: "var(--tag-culture)" },
  other:                  { label: "other",                short: "o",   color: "var(--tag-other)" },
};

export function ReadingList({
  items,
  favorites,
}: {
  items: ReadingItem[];
  favorites: ReadingItem[];
}) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  function toggleSearch() {
    if (searchOpen) {
      setSearchOpen(false);
      setQuery("");
    } else {
      setSearchOpen(true);
    }
  }

  const q = query.toLowerCase();
  const filtered = items.filter((item) => {
    if (selectedTag !== "all" && item.tag !== selectedTag) return false;
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
              onClick={() => setSelectedTag("all")}
              className={`${chip} ${
                selectedTag === "all"
                  ? "border-text border-2 text-text"
                  : "border-border text-text-faint hover:text-text"
              }`}
            >
              all
            </button>
            {Object.entries(TAG_CONFIG).map(([tag, config]) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`${chip} ${
                  selectedTag === tag ? "border-2" : "border-border text-text-faint hover:text-text"
                }`}
                style={
                  selectedTag === tag
                    ? { borderColor: config.color, color: config.color }
                    : undefined
                }
              >
                {config.label}
              </button>
            ))}
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
              onChange={(e) => setQuery(e.target.value)}
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
              return (
                <li key={item.url} className="flex items-baseline gap-3">
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
