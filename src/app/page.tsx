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
  { label: "Anaya", href: "https://total-anayalation.github.io/" },
  { label: "Andy", href: "https://yeedrag.github.io/" },
  { label: "Anish", href: "https://amhw460.github.io/" },
  { label: "Arya", href: "https://www.linkedin.com/in/arya-p-ai/" },
  { label: "Celeste", href: "https://wanyuli.com/" },
  { label: "Coby", href: "https://coby.lk/" },
  { label: "Jeremy", href: "https://jeremykintana.com/" },
  { label: "Satya", href: "https://satchlj.com/" },
  { label: "Will", href: "https://wlanderson.com/" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-[640px] px-6 py-20 sm:py-28">
      {/* Header + content are grouped so the decorative sketch can span from the
          top of the header down to the top of the footer (the -bottom-12 offset
          reaches across the nav's mt-12 gap). It sits in the whitespace to the
          right of the body text, right-aligned to the column/footer edge, and
          behind the text (-z-10) so words stay readable. Hidden on phones
          (<640px, no room); shown from sm+ once the column hits max-width. */}
      <div className="relative">
        <div className="pointer-events-none absolute right-0 top-0 -bottom-12 -z-10 hidden w-72 sm:block">
          <Image
            src="/giorno-sketch.webp"
            alt=""
            fill
            sizes="288px"
            className="select-none object-contain object-right"
          />
        </div>

        <div className="min-w-0">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-text [overflow-wrap:anywhere]">
            Kaustubh Kislay
          </h1>
          <ContactBar />
        </div>

        <div className="mt-6 max-w-[60ch] space-y-6">
        <div className="space-y-1">
          <p className="text-[15px] text-text-muted leading-relaxed">
            I am a researcher focused on making things better.
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

        <Section label="Affiliations, past and present">
          <ul className="space-y-2">
            <Affiliation
              org="Wisconsin AI Safety Initiative"
              role="Director"
              href="https://waisi.org/"
            />
            <Affiliation
              org="SPAR"
              role="Mentor, Researcher"
              href="https://sparai.org/"
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
            <Affiliation
              org="Algoverse AI Safety Fellowship"
              role="Researcher"
              href="https://algoverseairesearch.org/ai-safety-fellowship"
            />
          </ul>
        </Section>

        <Section label="Free time">
          <div className="space-y-4">
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
          <InlineLinks items={FRIENDS} />
        </Section>
        </div>
      </div>

      <nav className="mt-12 flex justify-between items-center">
        <a
          href="https://wanyuli.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-text hover:text-text-faint transition-colors"
        >
          <span className="font-bold">{"<"}</span> Celeste
        </a>
        <a
          href="https://www.wlanderson.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-text hover:text-text-faint transition-colors"
        >
          Will <span className="font-bold">{">"}</span>
        </a>
      </nav>
    </div>
  );
}

function Section({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-sans text-xs uppercase tracking-[0.18em] text-heading">
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
