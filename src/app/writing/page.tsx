import Link from "next/link";
import { articleHref, listedArticles } from "./articles";

export const metadata = {
  title: "Writing",
  description:
    "Essays and research writing on AI safety, alignment, and adjacent topics.",
  alternates: { canonical: "/writing" },
};

const publications = [
  {
    title: "BAITBENCH: Measuring Agent Reward Hacking with Optional Shortcuts Planted in ML Tasks",
    href: "https://arxiv.org/abs/2608.30724",
  },
  {
    title: "Quantifying Phonosemantic Iconicity Distributionally in 6 Languages",
    href: "https://arxiv.org/abs/2510.14040",
  },
  {
    title: "Evaluating K-Fold Cross Validation for Transformer Based Symbolic Regression Models",
    href: "https://arxiv.org/abs/2410.21896",
  },
];

const titleLinkClass = "text-[17px] font-medium text-text hover:text-accent-hover transition-colors";

export default function WritingPage() {
  return (
    <main className="mx-auto max-w-[640px] px-6 pt-16 pb-12">
      <Link href="/" className="text-sm text-accent no-underline">&lt;back</Link>

      <h1 className="mt-8 text-3xl sm:text-4xl font-bold tracking-tight leading-[1.05] text-text">
        Everything I write
      </h1>

      <section className="mt-10">
        <ul className="space-y-5">
          {listedArticles.map((article) => {
            const ArticleLink = "pdfPath" in article ? "a" : Link;
            return (
              <li key={article.slug}>
                <ArticleLink
                  href={articleHref(article)}
                  className={titleLinkClass}
                >
                  {article.title}
                </ArticleLink>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="mt-12" aria-labelledby="publications">
        <h2 id="publications" className="text-2xl font-bold tracking-tight text-text">Publications</h2>
        <ul className="mt-5 space-y-5">
          {publications.map(({ title, href }) => (
            <li key={href}>
              <a href={href} className={titleLinkClass} target="_blank" rel="noopener noreferrer">{title}</a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
