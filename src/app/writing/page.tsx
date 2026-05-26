import Link from "next/link";

export const metadata = {
  title: "Writing — Kaustubh Kislay",
};

export default function WritingPage() {
  return (
    <div className="mx-auto max-w-[640px] px-6 py-16">
      <Link
        href="/"
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint hover:text-accent-hover transition-colors"
      >
        ← Home
      </Link>

      <h1 className="mt-8 text-3xl sm:text-4xl font-bold tracking-tight leading-[1.05] text-text">
        Everything I write
      </h1>
      <p className="mt-3 text-sm text-text-faint">
        Actual blog posts coming soon.
      </p>

      <ul className="mt-10 space-y-5">
        <PlatformLink
          href="https://www.lesswrong.com/users/kaustubh-kislay"
          name="LessWrong"
          note="lesswrong.com"
        />
        <PlatformLink
          href="https://substack.com/@kaustubhais"
          name="Substack"
          note="substack.com"
        />
      </ul>
    </div>
  );
}

function PlatformLink({
  href,
  name,
  note,
}: {
  href: string;
  name: string;
  note: string;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[17px] font-medium text-text hover:text-accent-hover transition-colors"
      >
        {name}
      </a>
      <p className="font-mono text-[11px] uppercase tracking-wide text-text-faint mt-1">
        {note}
      </p>
    </li>
  );
}
