"use client";

import { useState } from "react";
import type { ReadingItem } from "@/lib/curius";

const TAG_CONFIG: Record<string, { label: string; short: string; color: string; hoverColor: string }> = {
  research:               { label: "research",            short: "r",   color: "#8b2232", hoverColor: "#b22e44" },
  "policy/fieldbuilding": { label: "policy/fieldbuilding", short: "p/f", color: "#1a5276", hoverColor: "#2980b9" },
  "self-improvement":     { label: "self-improvement",     short: "s-i", color: "#1a8a74", hoverColor: "#4df0d2" },
  culture:                { label: "culture",              short: "c",   color: "#6c3483", hoverColor: "#a569bd" },
  other:                  { label: "other",                short: "o",   color: "#5a7d76", hoverColor: "#8aaba4" },
};

export function ReadingList({ items, backHref }: { items: ReadingItem[]; backHref: string }) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  const q = query.toLowerCase();
  const filtered = items.filter((item) => {
    if (selectedTag !== "all" && item.tag !== selectedTag) return false;
    if (q && !item.title.toLowerCase().includes(q)) return false;
    return true;
  });

  return (
    <>
      <div className="flex items-center gap-3 mb-4">
        <a href={backHref} aria-label="Back" className="text-text-ghost hover:text-text-muted transition-colors shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </a>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent border border-border rounded px-3 py-2 text-sm text-text placeholder:text-text-ghost focus:outline-none focus:border-border-accent transition-colors"
        />
      </div>
      <div className="flex gap-2 mb-8 flex-wrap">
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
      {filtered.length > 0 ? (
        <div className="space-y-5">
          {filtered.map((item) => {
            const tagStyle = item.tag ? TAG_CONFIG[item.tag] : null;
            return (
              <div key={item.url}>
                <div className="flex items-baseline justify-between gap-4">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-medium transition-colors truncate text-text hover:text-accent-hover"
                  >
                    {item.title}
                  </a>
                  {tagStyle && (
                    <span className="text-xs shrink-0" style={{ color: tagStyle.color }}>
                      {tagStyle.short}
                    </span>
                  )}
                </div>
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
