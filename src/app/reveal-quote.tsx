"use client";

import { useState } from "react";

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
        {REVEAL_STEPS.map((sentence, index) => (
          <p key={sentence}>
            {index === revealedIndex ? (
              index === REVEAL_STEPS.length - 1 ? (
                <span className="text-accent">
                  {sentence}
                </span>
              ) : (
                <span>{sentence}</span>
              )
            ) : (
              <button
                type="button"
                aria-label={`Reveal part ${index + 1} of ${REVEAL_STEPS.length}`}
                onClick={() => setRevealedIndex(index)}
                className="group inline cursor-pointer appearance-none border-0 bg-transparent p-0 text-left font-[inherit] italic leading-[inherit] disabled:cursor-default"
              >
                <span aria-hidden="true" className="box-decoration-clone bg-text text-transparent select-none transition-colors duration-150 group-enabled:group-hover:bg-accent group-focus-visible:bg-accent">
                  {sentence}
                </span>
              </button>
            )}
          </p>
        ))}
      </div>
    </blockquote>
  );
}
