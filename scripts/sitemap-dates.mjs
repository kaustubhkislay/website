import { execFileSync } from "node:child_process";

export function getSitemapDates(cwd = process.cwd()) {
  function git(...args) {
    return execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
  }

  // Git treats a shallow boundary as if every file was added in that commit.
  if (git("rev-parse", "--is-shallow-repository") === "true") {
    git("fetch", "--quiet", "--no-tags", "--unshallow", "origin", git("rev-parse", "HEAD"));
  }

  function lastChange(...paths) {
    return git("log", "-1", "--format=%cs", "HEAD", "--", ...paths);
  }

  return {
    home: lastChange("src/app/page.tsx", "src/app/contact-bar.tsx", "public/pfp_2.png"),
    writing: lastChange("src/app/writing"),
  };
}
