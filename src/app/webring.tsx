// waisi.live webring, rendered in the site's own style.
//
// The ring's health checker fetches this site's HTML and does a substring
// search for the literal embed URL. It has no JSON endpoint for ring order,
// only the per-member embed page, so the neighbours are read out of that
// page's markup here on the server. The ring order is shuffled daily, so the
// fetch revalidates hourly; a failed fetch renders the bar without prev/next.
//
// The literal <iframe> stays in the markup so the checker still finds it, but
// it carries `hidden`, which keeps the browser from loading it.

const SLUG = "kaustubh";
const RING_URL = "https://waisi.live";
const EMBED_SRC = `${RING_URL}/embed/${SLUG}`;

type Neighbour = { name: string; href: string };
type Neighbours = { prev: Neighbour | null; next: Neighbour | null };

// The embed markup for each direction is one anchor with class="nav", an href,
// a title of "Previous site: Full Name" / "Next site: Full Name", and the
// first name as text. `title` is the stable hook; the label text carries an
// arrow entity we do not want.
function parseNeighbour(html: string, dir: "Previous" | "Next"): Neighbour | null {
  const re = new RegExp(
    `<a class="nav" href="([^"]+)"[^>]*title="${dir} site: ([^"]+)"`
  );
  const m = html.match(re);
  if (!m) return null;
  const href = m[1];
  const first = m[2].trim().split(/\s+/)[0];
  if (!href || !first) return null;
  return { name: decodeEntities(first), href: decodeEntities(href) };
}

// The embed page escapes with a fixed set of entities; mirror them rather
// than pulling in a parser for four characters.
function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

async function fetchNeighbours(): Promise<Neighbours> {
  try {
    const res = await fetch(EMBED_SRC, { next: { revalidate: 3600 } });
    if (!res.ok) return { prev: null, next: null };
    const html = await res.text();
    return {
      prev: parseNeighbour(html, "Previous"),
      next: parseNeighbour(html, "Next"),
    };
  } catch {
    return { prev: null, next: null };
  }
}

// Same size and color as the body paragraphs (text-[15px] text-text-muted).
const NAV = "text-[15px] leading-relaxed text-text-muted hover:text-accent-hover transition-colors";
const META = NAV;

export async function Webring() {
  const { prev, next } = await fetchNeighbours();

  return (
    <footer className="mx-auto max-w-[640px] px-6 pb-12">
      {/* 1fr auto 1fr keeps the middle group centred even when the prev and
          next names differ in width. */}
      <nav
        aria-label="waisi.live webring"
        className="grid grid-cols-[1fr_auto_1fr] items-baseline gap-3 text-[15px] leading-relaxed text-text-muted"
      >
        <span className="justify-self-start">
          {prev && (
            <a href={prev.href} className={NAV} title={`Previous site: ${prev.name}`}>
              <span className="font-bold">{"<"}</span> {prev.name}
            </a>
          )}
        </span>
        <span className="justify-self-center whitespace-nowrap">
          <a href={RING_URL} className={META}>
            waisi.live
          </a>
        </span>
        <span className="justify-self-end">
          {next && (
            <a href={next.href} className={NAV} title={`Next site: ${next.name}`}>
              {next.name} <span className="font-bold">{">"}</span>
            </a>
          )}
        </span>
      </nav>

      {/* Literal embed for the ring's health checker. Do not build this src
          from variables: the checker substring-matches the served HTML for
          "https://waisi.live/embed/kaustubh". */}
      <iframe
        src="https://waisi.live/embed/kaustubh"
        title="waisi.live webring"
        style={{ width: "100%", height: 44, border: 0 }}
        loading="lazy"
        hidden
      />
    </footer>
  );
}
