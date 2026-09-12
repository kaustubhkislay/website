import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ContactBar } from "./contact-bar";
import { RevealQuote } from "./reveal-quote";

// Temporarily hide affiliations; set to true to restore the section.
const SHOW_AFFILIATIONS = false;

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

const FRIENDS: { label: string; href?: string; nickname?: string }[] = [
  { label: "Anaya", nickname: "lation", href: "https://total-anayalation.github.io/" },
  { label: "Andy", nickname: "Big A", href: "https://yeedrag.github.io/" },
  { label: "Anish", nickname: "niche", href: "https://amhw460.github.io/" },
  { label: "Arya", nickname: "Big A^1", href: "https://www.linkedin.com/in/arya-p-ai/" },
  { label: "Celeste", nickname: "Boss", href: "https://wanyuli.com/" },
  { label: "Christine", nickname: "Carry", href: "https://christinecorry.com/index.html" },
  { label: "Coby", nickname: "KASSNER", href: "https://coby.lk/" },
  { label: "Harshul", nickname: "balkava", href: "https://harshul.org/" },
  { label: "Jeremy", nickname: "J-space", href: "https://jeremykintana.com/" },
  { label: "Satya", nickname: "Big S", href: "https://satchlj.com/" },
  { label: "Will", nickname: "Panda", href: "https://wlanderson.com/" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-[640px] px-6 pt-20 pb-12 sm:pt-28">
      {/* Header + content are grouped so the decorative sketch can hang in the
          whitespace to the right of the body text, right-aligned to the column
          edge and behind the text (-z-10) so words stay readable. It is
          bottom-anchored so its lower edge lines up with the bottom of the
          friends section; the top lands around the contact bar. Hidden on
          phones (<640px, no room); shown from sm+ once the column hits
          max-width. */}
      <div className="relative">
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 -z-10 hidden w-72 sm:block">
          <Image
            src="/giorno-sketch-transparent.webp"
            alt=""
            fill
            sizes="288px"
            className="select-none object-contain object-right-bottom"
          />
        </div>

        <div className="min-w-0">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-text [overflow-wrap:anywhere]">
            Kaustubh Kislay
          </h1>
          <ContactBar />
          <figure className="mt-4 sm:mr-[19rem]">
            <RevealQuote />
          </figure>
        </div>

        <div className="mt-4 flex max-w-[60ch] flex-col gap-4">
          <div className="space-y-2">
          <p className="text-[15px] text-text-muted leading-relaxed">
            I&apos;m trying to make AI go well.
          </p>
          <p className="text-[15px] text-text-muted leading-relaxed">
            I maintain{" "}
            <a
              href="https://aisopportunities.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline decoration-1 underline-offset-2 transition-colors hover:text-accent-hover"
            >
              AI Safety Opportunities
            </a>
            .
          </p>
          <p className="text-[15px] text-text-muted leading-relaxed">
            I{" "}
            <Link
              href="/writing"
              className="text-accent underline decoration-1 underline-offset-2 transition-colors hover:text-accent-hover"
            >
              write
            </Link>{" "}
            and I{" "}
            <Link
              href="/reading"
              className="text-accent underline decoration-1 underline-offset-2 transition-colors hover:text-accent-hover"
            >
              read
            </Link>
            .
          </p>
          </div>

        {SHOW_AFFILIATIONS && (
        <Section label="Affiliations, past and present">
          <ul className="space-y-2">
            <Affiliation
              org="Wisconsin AI Safety Initiative"
              role="Director"
              href="https://waisi.org/"
            />
            <Affiliation
              org="AI Safety Said Simply"
              role="Co-Founder"
              href="https://www.aisafetysaidsimply.com/"
            />
            <Affiliation
              org="SPAR"
              role="Mentor, Researcher"
              href="https://sparai.org/"
            />
            <Affiliation
              org="Bluedot"
              role="Contractor"
              href="https://bluedot.org/"
            />
            <Affiliation
              org="Kairos"
              role="SWE Contractor"
              href="https://kairos-project.org/"
            />
            <Affiliation
              org="Pathfinder"
              role="Mentor"
              href="https://pathfinder.kairos-project.org/"
            />
            <Affiliation
              org="UChicago XLab"
              role="Writer, Researcher"
              href="https://xrisk.uchicago.edu/"
            />
          </ul>
        </Section>
        )}

        <Section label="Free time">
          <div className="space-y-2">
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-text-faint mb-2">
                If touching grass
              </p>
              <InlineLinks items={TOUCHING_GRASS} />
            </div>
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-text-faint mb-2">
                If hikikomorimaxxing
              </p>
              <InlineLinks items={HIKIKOMORI} />
            </div>
          </div>
        </Section>

        <Section label="I have friends">
          {/* Two balanced lines so the list never runs under the sketch on
              the right. */}
          <InlineLinks items={FRIENDS.slice(0, Math.ceil(FRIENDS.length / 2))} />
          <InlineLinks items={FRIENDS.slice(Math.ceil(FRIENDS.length / 2))} tooltipPosition="below" />
        </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-sans text-xs uppercase tracking-[0.18em] text-heading">
        {label}
      </h2>
      <div className="mt-2 pl-5">{children}</div>
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

function InlineLinks({ items, tooltipPosition = "above" }: {
  items: { label: string; href?: string; nickname?: string }[];
  tooltipPosition?: "above" | "below";
}) {
  return (
    <p className="text-[15px] leading-relaxed text-text-muted">
      {items.map((it, i) => (
        <span key={it.label}>
          {i > 0 && ", "}
          {it.href ? (
            <a
              href={it.href}
              aria-describedby={it.nickname ? `nickname-${it.label}` : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block text-text underline decoration-1 underline-offset-2 transition-colors hover:text-accent-hover"
            >
              {it.label}
              {it.nickname && (
                <span
                  id={`nickname-${it.label}`}
                  role="tooltip"
                  className={`pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 ${tooltipPosition === "below" ? "top-full pt-2" : "bottom-full pb-2"}`}
                >
                  <span className="block whitespace-nowrap border border-border bg-bg px-2 py-1 text-xs font-normal not-italic text-text shadow-sm">
                    {it.nickname}
                  </span>
                </span>
              )}
            </a>
          ) : (
            <span>{it.label}</span>
          )}
        </span>
      ))}
    </p>
  );
}
