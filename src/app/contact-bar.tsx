"use client";

import { useState } from "react";

const EMAIL = "kaustubh[dot]kislay[at]gmail[dot]com";

const ICON = "text-text-faint hover:text-accent-hover transition-colors";

export function ContactBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/kaustubhkislay"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className={ICON}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/kaustubh-kislay"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className={ICON}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a
          href="https://x.com/kaustubhais"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X"
          className={ICON}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
          </svg>
        </a>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Hide email" : "Show email"}
          aria-expanded={open}
          className={`${ICON} active:translate-y-px`}
        >
          <svg viewBox="2 2 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Zm0 2v.4l8 5 8-5V6H4Zm16 2.75-7.47 4.67a1 1 0 0 1-1.06 0L4 8.75V18h16V8.75Z" />
          </svg>
        </button>
        <div
          className={`grid transition-[grid-template-columns,opacity] duration-300 ease-out ${
            open ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <span className="select-all whitespace-nowrap text-sm text-text-faint">{EMAIL}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
