import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "../articles";
import "./article.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

type ArticlePageProps = { params: Promise<{ slug: string }> };

async function getArticle(params: ArticlePageProps["params"]) {
  const { slug } = await params;
  return articles.find((article) => article.slug === slug) ?? notFound();
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticle(params);
  const path = `/writing/${article.slug}`;
  return {
    title: article.title,
    description: `${article.title} by ${article.authors}.`,
    alternates: { canonical: path },
    openGraph: { type: "article", title: article.title, url: path, publishedTime: article.published },
  };
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params);
  const Content = article.default;
  return (
    <main className="mx-auto max-w-[720px] px-6 pt-12 pb-20 sm:pt-16">
      <Link href="/writing" className="text-sm text-accent underline underline-offset-2">&lt;back</Link>
      <article>
        <header className="mt-8 mb-9">
          <h1 className="text-3xl font-bold tracking-tight text-text leading-tight sm:text-4xl">{article.title}</h1>
          <p className="mt-4 text-base text-text">{article.authors}</p>
          <p className="mt-1 text-sm text-text-muted">
            <time dateTime={article.published}>{dateFormat.format(new Date(article.published))}</time>
            {"publication" in article && (
              <>
                {" · "}
                <a href={article.originalUrl} className="text-accent underline underline-offset-2">{article.publication}</a>
              </>
            )}
          </p>
        </header>
        <div className="article-body"><Content /></div>
      </article>
    </main>
  );
}
