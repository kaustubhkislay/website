"use client";

import { useState } from "react";
import type { ReadingItem } from "@/lib/curius";

export function ReadingList({ items, backHref }: { items: ReadingItem[]; backHref: string }) {
  const [query, setQuery] = useState("");
  const [researchOnly, setResearchOnly] = useState(false);

  const q = query.toLowerCase();
  const filtered = items.filter((item) => {
    if (researchOnly && item.tag !== "research") return false;
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
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setResearchOnly(false)}
          className={`text-xs px-2.5 py-1 rounded border transition-colors ${
            !researchOnly
              ? "border-border-accent text-text-muted"
              : "border-border text-text-ghost hover:text-text-muted"
          }`}
        >
          all
        </button>
        <button
          onClick={() => setResearchOnly(true)}
          className={`text-xs px-2.5 py-1 rounded border transition-colors ${
            researchOnly
              ? "border-[#8b2232] text-[#8b2232]"
              : "border-border text-text-ghost hover:text-[#8b2232]"
          }`}
        >
          research
        </button>
      </div>
      {filtered.length > 0 ? (
        <div className="space-y-5">
          {filtered.map((item) => (
            <div key={item.url}>
              <div className="flex items-baseline justify-between gap-4">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[15px] font-medium transition-colors truncate ${
                    item.tag === "research"
                      ? "text-[#8b2232] hover:text-[#b22e44]"
                      : "text-text hover:text-accent-hover"
                  }`}
                >
                  {item.title}
                </a>
                <span className="text-xs text-text-ghost shrink-0">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-text-ghost">
          {query ? "No matches found." : "Nothing here yet."}
        </p>
      )}
    </>
  );
}
