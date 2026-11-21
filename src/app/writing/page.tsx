import Link from "next/link";
import { articleHref, listedArticles } from "./articles";

export const metadata = {
  title: "Writing",
  description:
    "Essays and research writing on AI safety, alignment, and adjacent topics.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  return (
    <main className="mx-auto max-w-[640px] px-6 pt-16 pb-12">
      <Link href="/" className="text-sm text-accent no-underline">&lt;back</Link>

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
          {listedArticles.map((article) => {
            const ArticleLink = "pdfPath" in article ? "a" : Link;
            return (
              <li key={article.slug}>
                <ArticleLink
                  href={articleHref(article)}
                  className="text-[17px] font-medium text-text hover:text-accent-hover transition-colors"
                >
                  {article.title}
                </ArticleLink>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
