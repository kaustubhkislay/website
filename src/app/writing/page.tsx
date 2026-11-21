import Link from "next/link";
import { articles } from "./articles";

export const metadata = {
  title: "Writing",
  description:
    "Essays and research writing on AI safety, alignment, and adjacent topics.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  return (
    <main className="mx-auto max-w-[640px] px-6 pt-16 pb-12">
      <Link
        href="/"
        className="font-sans text-[11px] uppercase tracking-[0.18em] text-text hover:text-text-faint transition-colors"
      >
        <span className="font-bold">{"<"}</span> Home
      </Link>

      <h1 className="mt-8 text-3xl sm:text-4xl font-bold tracking-tight leading-[1.05] text-text">
        Everything I write
      </h1>

      <p className="mt-3 font-sans text-[11px] uppercase tracking-wide text-text-faint">
        <a
          href="https://substack.com/@kaustubhais"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent-hover transition-colors"
        >
          Substack
        </a>
        <span className="text-border-accent"> | </span>
        <a
          href="https://arxiv.org/search/cs?query=Kislay,+Kaustubh&searchtype=author&abstracts=show&order=-announced_date_first&size=50"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent-hover transition-colors"
        >
          arXiv
        </a>
      </p>

      <section className="mt-10">
        <ul className="space-y-5">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/writing/${article.slug}`}
                className="text-[17px] font-medium text-text hover:text-accent-hover transition-colors"
              >
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
