import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ContactBar } from "./contact-bar";

const TOUCHING_GRASS: { label: string }[] = [
  { label: "Basketball" },
  { label: "Soccer" },
  { label: "Badminton" },
  { label: "MMA" },
  { label: "Hiking" },
];

const HIKIKOMORI: { label: string }[] = [
  { label: "Chess" },
  { label: "Call of Duty" },
  { label: "Manga/Manhwa/Anime" },
];

const FRIENDS: { label: string; href?: string }[] = [
  { label: "Anaya", href: "https://www.linkedin.com/in/anaya-mandal/" },
  { label: "Andy", href: "https://yeedrag.github.io/" },
  { label: "Anish" },
  { label: "Arya", href: "https://www.linkedin.com/in/arya-p-ai/" },
  { label: "Celeste", href: "https://wanyuli.com/" },
  { label: "Jeremy", href: "https://jeremykintana.com/" },
  { label: "Satya", href: "https://satchlj.com/" },
  { label: "Will", href: "https://wlanderson.com/" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-[640px] px-6 py-20 sm:py-28">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-text [overflow-wrap:anywhere]">
            Kaustubh Kislay
          </h1>
          <ContactBar />
        </div>
        {/* Profile photo — public/profile.webp (square crop via object-cover). */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-border sm:h-24 sm:w-24">
          <Image
            src="/profile.webp"
            alt="Kaustubh Kislay"
            fill
            priority
            sizes="(min-width: 640px) 96px, 64px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-12 max-w-[60ch] space-y-6">
        <p className="text-[15px] text-text-muted leading-relaxed">
          I am a researcher focused on technical AI Safety. I{" "}
          <Link
            href="/writing"
            className="text-accent underline decoration-1 underline-offset-2 transition-colors hover:text-accent-hover"
          >
            write
          </Link>{" "}
          and I also{" "}
          <Link
            href="/reading"
            className="text-accent underline decoration-1 underline-offset-2 transition-colors hover:text-accent-hover"
          >
            read
          </Link>
          .
        </p>

        <Section label="Affiliations, past and present">
          <ul className="space-y-2">
            <Affiliation
              org="Wisconsin AI Safety Initiative"
              role="Director"
              href="https://waisi.org/"
            />
            <Affiliation org="SPAR" role="Researcher" />
            <Affiliation org="UChicago XLab" role="Researcher" />
            <Affiliation org="Algoverse AI Safety Fellowship" role="Researcher" />
          </ul>
        </Section>

        <Section label="Free time">
          <div className="space-y-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-faint mb-2">
                If touching grass
              </p>
              <InlineLinks items={TOUCHING_GRASS} />
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-faint mb-2">
                If hikikomorimaxxing
              </p>
              <InlineLinks items={HIKIKOMORI} />
            </div>
          </div>
        </Section>

        <Section
          label={
            <>
              I have friends{" "}
              <sub className="text-[0.75em] font-normal normal-case tracking-normal text-text-faint">
                (somehow)
              </sub>
            </>
          }
        >
          <InlineLinks items={FRIENDS} />
        </Section>
      </div>

      <nav className="mt-12 flex justify-between items-center">
        <a
          href="https://wanyuli.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-text-muted hover:text-accent-hover transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Celeste
        </a>
        <a
          href="https://www.wlanderson.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-text-muted hover:text-accent-hover transition-colors"
        >
          Will
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </nav>
    </div>
  );
}

function Section({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-heading">
        {label}
      </h2>
      <div className="mt-3 pl-5">{children}</div>
    </section>
  );
}

function Affiliation({
  org,
  role,
  href,
}: {
  org: string;
  role: string;
  href?: string;
}) {
  return (
    <li className="text-[15px] leading-relaxed text-text">
      {role}
      <span className="text-text-faint"> @ </span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-faint underline decoration-1 underline-offset-2 transition-colors hover:text-accent-hover"
        >
          {org}
        </a>
      ) : (
        <span className="text-text-faint">{org}</span>
      )}
    </li>
  );
}

function InlineLinks({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <p className="text-[15px] leading-relaxed text-text-muted">
      {items.map((it, i) => (
        <span key={it.label}>
          {i > 0 && ", "}
          {it.href ? (
            <a
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text underline decoration-1 underline-offset-2 transition-colors hover:text-accent-hover"
            >
              {it.label}
            </a>
          ) : (
            <span>{it.label}</span>
          )}
        </span>
      ))}
    </p>
  );
}
