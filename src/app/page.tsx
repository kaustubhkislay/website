import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ContactBar } from "./contact-bar";

// Temporarily hide affiliations; set to true to restore the section.
const SHOW_AFFILIATIONS = false;
const bioLinkClass = "text-accent underline decoration-1 underline-offset-2 transition-colors hover:text-accent-hover";

export default function Home() {
  return (
    <main className="home-page mx-auto w-full max-w-[640px] px-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="min-w-0">
          <h1 className="text-[26px] sm:text-4xl font-bold tracking-tight leading-[1.1] text-text [overflow-wrap:anywhere]">
            Kaustubh Kislay
          </h1>
          <ContactBar />

          <div className="mt-4 space-y-2 text-[15px] text-text-muted leading-relaxed">
            <p>I&apos;m trying to make AI go well.</p>
            <p>
              I{" "}
              <Link href="/writing" className={bioLinkClass}>
                write
              </Link>
              .
            </p>
            <p>
              <a href="https://dconai.org/" className={bioLinkClass}>
                DC on AI
              </a>
              {" and "}
              <a href="https://aisaidsimply.com/" className={bioLinkClass}>
                AI Said Simply
              </a>
            </p>
          </div>
        </div>

        <Image
          src="/moon.png"
          alt="The moon shines through a break in dark clouds."
          width={512}
          height={512}
          sizes="(min-width: 640px) 224px, 176px"
          className="h-auto w-44 max-w-full justify-self-center sm:w-56"
        />

        {SHOW_AFFILIATIONS && (
          <Section label="Affiliations, past and present">
            <ul className="space-y-2">
              <Affiliation
                org="AI Said Simply"
                role="Co-Founder"
                href="https://aisaidsimply.com/"
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
      </div>
    </main>
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
