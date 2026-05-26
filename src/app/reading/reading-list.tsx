"use client";

import { useEffect, useRef, useState } from "react";
import type { ReadingItem } from "@/lib/curius";

const TAG_CONFIG: Record<string, { label: string; short: string; color: string }> = {
  research:               { label: "research",            short: "r",   color: "var(--tag-research)" },
  "policy/fieldbuilding": { label: "policy/fieldbuilding", short: "p/f", color: "var(--tag-policy)" },
  "self-improvement":     { label: "self-improvement",     short: "s-i", color: "var(--tag-self)" },
  culture:                { label: "culture",              short: "c",   color: "var(--tag-culture)" },
  other:                  { label: "other",                short: "o",   color: "var(--tag-other)" },
};

export function ReadingList({ items, backHref }: { items: ReadingItem[]; backHref: string }) {
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

  return (
    <>
      <div className={`flex items-center gap-3 ${searchOpen ? "mb-4" : "mb-8"}`}>
        <a href={backHref} aria-label="Back" className="text-text-ghost hover:text-text-muted transition-colors shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </a>
        <div className="flex gap-2 flex-nowrap overflow-x-auto flex-1 min-w-0">
          <button
            onClick={() => setSelectedTag("all")}
            className={`text-xs px-2.5 py-1 rounded border transition-colors ${
              selectedTag === "all"
                ? "border-border-accent text-text-muted"
                : "border-border text-text-ghost hover:text-text-muted"
            }`}
          >
            all
          </button>
          {Object.entries(TAG_CONFIG).map(([tag, config]) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                selectedTag !== tag ? "border-border text-text-ghost" : ""
              }`}
              style={
                selectedTag === tag
                  ? { borderColor: config.color, color: config.color }
                  : undefined
              }
              onMouseEnter={(e) => {
                if (selectedTag !== tag) {
                  (e.target as HTMLButtonElement).style.color = config.color;
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTag !== tag) {
                  (e.target as HTMLButtonElement).style.color = "";
                }
              }}
            >
              {config.label}
            </button>
          ))}
        </div>
        <button
          onClick={toggleSearch}
          aria-label={searchOpen ? "Close search" : "Search"}
          aria-expanded={searchOpen}
          className="shrink-0 text-text-ghost hover:text-text-muted transition-colors"
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
        className={`grid transition-all duration-200 ease-out ${
          searchOpen ? "grid-rows-[1fr] opacity-100 mb-8" : "grid-rows-[0fr] opacity-0"
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
            className="w-full bg-transparent border border-border rounded px-3 py-2 text-sm text-text placeholder:text-text-ghost focus:border-border-accent transition-colors"
          />
        </div>
      </div>
      {filtered.length > 0 ? (
        <div className="space-y-5">
          {filtered.map((item) => {
            const tagStyle = item.tag ? TAG_CONFIG[item.tag] : null;
            return (
              <div key={item.url} className="relative flex items-baseline gap-2">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-medium transition-colors truncate text-text hover:text-accent-hover"
                >
                  {item.title}
                </a>
                {tagStyle && (
                  <span
                    className="shrink-0 text-xs px-1.5 py-0.5 rounded border md:absolute md:top-0.5 md:-right-10"
                    style={{ color: tagStyle.color, borderColor: tagStyle.color }}
                  >
                    {tagStyle.short}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-text-ghost">
          {query ? "No matches found." : "Nothing here yet."}
        </p>
      )}
    </>
  );
}
