import { getHomeReading } from "@/lib/curius";
import { ThemeToggle } from "./theme-toggle";

export default async function Home() {
  const { today: reading, favorites } = await getHomeReading();
  return (
    <div className="mx-auto max-w-[640px] px-6 py-16">
      <div className="flex justify-between items-baseline mb-4">
        <h1 className="text-base font-semibold text-text">Kaustubh Kislay</h1>
        <ThemeToggle />
      </div>
      <p className="text-[15px] text-text-muted leading-relaxed">
        I write on{" "}
        <a href="https://www.lesswrong.com/users/kaustubh-kislay" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover transition-colors">LessWrong</a>
        {" "}and{" "}
        <a href="https://substack.com/@kaustubhais" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover transition-colors">Substack</a>.
      </p>
      <p className="text-[15px] text-text-muted leading-relaxed mb-14">
        <a href="/reading" className="text-accent hover:text-accent-hover transition-colors">Everything I&apos;ve read</a>.
      </p>
      <main className="space-y-14">
        <section id="reading">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-heading">What I&apos;ve Read Today</h2>
            <span className="text-xs text-text-ghost">{reading.length}</span>
          </div>
          {reading.length > 0 ? (
            <div className="max-h-60 overflow-y-auto space-y-5 pr-1">
              {reading.map((item) => (
                <div key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-medium text-text hover:text-accent-hover transition-colors truncate block"
                  >
                    {item.title}
                  </a>
                  {item.highlights.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {item.highlights.map((h, i) => (
                        <blockquote
                          key={i}
                          className="border-l border-border-accent pl-3 text-sm text-text-faint italic"
                        >
                          {h}
                        </blockquote>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-ghost">Nothing here yet.</p>
          )}
        </section>

        <section id="favorites">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-heading mb-5">Favorite Reads</h2>
          {favorites.length > 0 ? (
            <div className="space-y-5">
              {favorites.map((item) => (
                <div key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-medium text-text hover:text-accent-hover transition-colors"
                  >
                    {item.title}
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-ghost">Nothing here yet.</p>
          )}
        </section>

        <section id="writers">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-heading mb-5">People Who Write Well</h2>
          <ul className="space-y-1">
            <li className="flex justify-between items-baseline gap-4 py-1">
              <a href="https://substack.com/@jeremykintana" target="_blank" rel="noopener noreferrer" className="text-[15px] text-text hover:text-accent-hover transition-colors">Jeremy</a>
              <span className="text-sm text-text-ghost">Substack</span>
            </li>
            <li className="flex justify-between items-baseline gap-4 py-1">
              <a href="https://satchlj.com/" target="_blank" rel="noopener noreferrer" className="text-[15px] text-text hover:text-accent-hover transition-colors">Satya</a>
              <span className="text-sm text-text-ghost">Blog</span>
            </li>
            <li className="flex justify-between items-baseline gap-4 py-1">
              <a href="https://substack.com/@atharvanihalani" target="_blank" rel="noopener noreferrer" className="text-[15px] text-text hover:text-accent-hover transition-colors">Atharva</a>
              <span className="text-sm text-text-ghost">Substack</span>
            </li>
            <li className="flex justify-between items-baseline gap-4 py-1">
              <a href="https://substack.com/@liviaaaaaa" target="_blank" rel="noopener noreferrer" className="text-[15px] text-text hover:text-accent-hover transition-colors">Olivia</a>
              <span className="text-sm text-text-ghost">Substack</span>
            </li>
            <li className="flex justify-between items-baseline gap-4 py-1">
              <a href="https://wanyuli.com/" target="_blank" rel="noopener noreferrer" className="text-[15px] text-text hover:text-accent-hover transition-colors">Celeste</a>
              <span className="text-sm text-text-ghost">Blog</span>
            </li>
          </ul>
        </section>

        <section id="find-me">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-heading mb-5">Where to Find Me</h2>
          <ul className="space-y-3">
            <SocialLink label="GitHub" href="https://github.com/kaustubhkislay" />
            <SocialLink label="LinkedIn" href="https://www.linkedin.com/in/kaustubh-kislay" />
            <SocialLink label="X" href="https://x.com/kaustubhais" />
            <SocialLink label="Substack" href="https://substack.com/@kaustubhais" />
            <SocialLink label="LessWrong" href="https://www.lesswrong.com/users/kaustubh-kislay" />
            <SocialLink label="Curius" href="https://curius.app/kaustubh-kislay" />
            <SocialLink label="Email" description="kaustubh[dot]kislay[at]gmail[dot]com" />
            <SocialLink label="Signal" description="Kaustubh.62" />
            <SocialLink label="Book a chat" href="https://calendar.app.google/Zu5o4mviEVapDrZE9" />
            <li className="flex items-baseline gap-4">
              <a
                href="https://forms.gle/QnB7vAfVV3QgAta1A"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] text-accent hover:text-accent-hover transition-colors"
              >
                Leave anonymous feedback
              </a>
            </li>
          </ul>
        </section>
      </main>

      <nav className="mt-16 flex justify-between items-center">
        <a
          href="https://wanyuli.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-text-muted hover:text-accent-hover transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Celeste
        </a>
        <a
          href="https://www.wlanderson.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-text-muted hover:text-accent-hover transition-colors"
        >
          Will
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </nav>

      <footer className="mt-6">
        <p className="text-sm text-text-ghost">
          &copy; {new Date().getFullYear()} Kaustubh Kislay
        </p>
      </footer>
    </div>
  );
}

function SocialLink({
  label,
  href,
  description,
}: {
  label: string;
  href?: string;
  description?: string;
}) {
  return (
    <li className="flex items-baseline gap-4">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[15px] font-medium text-text hover:text-accent-hover transition-colors"
        >
          {label}
        </a>
      ) : (
        <span className="text-[15px] font-medium text-text">{label}</span>
      )}
      {description && (
        <span className="text-sm text-text-ghost">{description}</span>
      )}
    </li>
  );
}
