import { getRecentReading } from "@/lib/curius";
import { ThemeToggle } from "./theme-toggle";

export default async function Home() {
  const reading = await getRecentReading(3);
  return (
    <div className="mx-auto max-w-[640px] px-6 py-16">
      <div className="flex justify-between items-baseline mb-4">
        <h1 className="text-base font-semibold text-text">Kaustubh Kislay <span className="text-[#8b2232] font-normal">- redteam</span></h1>
        <ThemeToggle />
      </div>
      <p className="text-[15px] text-text-muted leading-relaxed mb-14">
        I write on{" "}
        <a href="https://www.lesswrong.com/users/kaustubh-kislay" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover transition-colors">LessWrong</a>
        {" "}and{" "}
        <a href="https://substack.com/@kaustubhais" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover transition-colors">Substack</a>.
      </p>
      <main className="space-y-14">
        <section id="reading">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-heading mb-5">Recent Reading</h2>
          {reading.length > 0 ? (
            <div className="space-y-5">
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
          <div className="space-y-5">
            <div>
              <a
                href="https://www.benkuhn.net/pjm/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-medium text-text hover:text-accent-hover transition-colors"
              >
                How I&apos;ve run major projects
              </a>
              <span className="text-sm text-text-ghost ml-2">&mdash; Ben Kuhn</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-text-ghost italic">
            More to come &mdash; I haven&apos;t been keeping much track but I&apos;ll find these eventually.
          </p>
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
          </ul>
        </section>

        <section id="music">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-heading mb-5">Music I Enjoy</h2>
          <ul className="space-y-1">
            <li className="py-1">
              <a href="https://open.spotify.com/album/4jI9SU1GmpIVhHMuYZuvX7" target="_blank" rel="noopener noreferrer" className="text-[15px] text-text hover:text-accent-hover transition-colors">The Fall-Off</a>
            </li>
            <li className="py-1">
              <a href="https://open.spotify.com/album/2noRn2Aes5aoNVsU6iWThc" target="_blank" rel="noopener noreferrer" className="text-[15px] text-text hover:text-accent-hover transition-colors">Discovery</a>
            </li>
            <li className="py-1">
              <a href="https://open.spotify.com/playlist/3VdA44n3ig9WIiCuOxNsYX" target="_blank" rel="noopener noreferrer" className="text-[15px] text-text hover:text-accent-hover transition-colors">Thatcher&apos;s Antithesis</a>
            </li>
            <li className="py-1">
              <a href="https://open.spotify.com/album/2S8AWAM0nxyFy66YnUfIs3" target="_blank" rel="noopener noreferrer" className="text-[15px] text-text hover:text-accent-hover transition-colors">Man On The Moon: The End Of Day</a>
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

      <footer className="mt-16 pt-6 border-t border-border">
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
