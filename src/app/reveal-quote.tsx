"use client";

import { useState } from "react";
import "./reveal-quote.css";

const REVEAL_STEPS = [
  "I slept and dreamt that life was joy.",
  "I awoke and saw that life was service.",
  "I acted and behold,",
  "service was joy.",
];

export function RevealQuote() {
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);

  return (
    <blockquote className="text-[15px] italic text-text-muted leading-relaxed">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-2">
        {REVEAL_STEPS.map((sentence, index) => {
          const revealed = index === revealedIndex;
          return (
            <p key={sentence}>
              <button
                type="button"
                aria-label={revealed ? sentence : `Reveal part ${index + 1} of ${REVEAL_STEPS.length}`}
                aria-pressed={revealed}
                onClick={() => setRevealedIndex((current) => current === index ? null : index)}
                className="quote-redaction"
                data-revealed={revealed}
              >
                <span
                  aria-hidden="true"
                  className={`quote-redaction-text ${index === REVEAL_STEPS.length - 1 ? "text-accent" : ""}`}
                >
                  {sentence}
                </span>
                <svg
                  aria-hidden="true"
                  className="quote-redaction-ink"
                  viewBox="0 0 300 30"
                  preserveAspectRatio="none"
                  fill="none"
                  style={{ rotate: `${index % 2 === 0 ? -0.35 : 0.3}deg` }}
                >
                  <g stroke="currentColor" strokeLinecap="round">
                    <path d="M5 7 L77 5 L153 7 L224 5 L295 7 M3 13 L92 11 L181 13 L297 11 M5 20 L80 18 L165 20 L294 18 M7 24 L96 23 L190 24 L292 22" strokeWidth="7" />
                    <path d="M8 3 L108 2 L205 4 L287 2 M11 28 L118 27 L216 28 L289 26" strokeWidth="1.2" opacity="0.45" />
                  </g>
                </svg>
              </button>
            </p>
          );
        })}
      </div>
    </blockquote>
  );
}
