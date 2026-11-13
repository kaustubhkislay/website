import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ContactBar } from "./contact-bar";

// Temporarily hide affiliations; set to true to restore the section.
const SHOW_AFFILIATIONS = false;

export default function Home() {
  return (
    <main className="home-page mx-auto w-full max-w-[640px] px-6 pb-12">
      <div className="grid grid-cols-[minmax(0,max-content)_96px] items-center justify-center gap-x-5 gap-y-6 sm:grid-cols-[minmax(0,max-content)_160px] sm:gap-x-8">
        <div className="min-w-0">
          <h1 className="text-[26px] sm:text-4xl font-bold tracking-tight leading-[1.1] text-text [overflow-wrap:anywhere]">
            Kaustubh Kislay
          </h1>
          <ContactBar />

          <div className="mt-4 space-y-2">
            <p className="text-[15px] text-text-muted leading-relaxed">
              I&apos;m trying to make AI go well.
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
        </div>

        <div className="aspect-[4/5] overflow-hidden">
          <Image
            src="/pfp_2.png"
            alt="Kaustubh Kislay"
            width={624}
            height={520}
            sizes="(min-width: 640px) 160px, 96px"
            preload
            className="h-full w-full object-cover"
          />
        </div>

        {SHOW_AFFILIATIONS && (
          <div className="col-span-2">
            <Section label="Affiliations, past and present">
              <ul className="space-y-2">
                <Affiliation
                  org="Wisconsin AI Safety Initiative"
                  role="Director"
                  href="https://waisi.org/"
                />
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
          </div>
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
