import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Writing — Kaustubh Kislay",
};

const FEATURED: { title: string; href: string }[] = [
  {
    title: "Secret Loyalties Likely Raise Remote-Influenceability",
    href: "https://www.lesswrong.com/posts/YpAxXAcAFp4aFJRwf/secret-loyalties-likely-raise-remote-influenceability",
  },
  {
    title: "How does reasoning affect Ethical/Moral task results?",
    href: "https://www.lesswrong.com/posts/q8ZWCKZd24wDrGX7p/how-does-reasoning-affect-ethical-moral-task-results",
  },
  {
    title: "South Korea and the HBM Bottleneck",
    href: "https://lambheart.substack.com/p/south-korea-and-the-hbm-bottleneck",
  },
];

export default function WritingPage() {
  return (
    <div className="mx-auto max-w-[640px] px-6 py-16">
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
          href="https://www.lesswrong.com/users/kaustubh-kislay"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent-hover transition-colors"
        >
          LessWrong
        </a>
        <span className="text-border-accent"> | </span>
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
          href="https://scholar.google.com/citations?user=3INpQ98AAAAJ&hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent-hover transition-colors"
        >
          G-Scholar
        </a>
      </p>

      <section className="mt-10">
        <ul className="space-y-5">
          {FEATURED.map((post) => (
            <li key={post.href}>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[17px] font-medium text-text hover:text-accent-hover transition-colors"
              >
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Decorative closer, kin to the home page's sketch: centered at the
          page bottom, well under half its 264x358 source for 2x+ sharpness. */}
      <div className="mt-16 flex justify-center">
        <Image
          src="/penguin-prime.webp"
          alt=""
          width={80}
          height={108}
          className="select-none"
        />
      </div>
    </div>
  );
}
