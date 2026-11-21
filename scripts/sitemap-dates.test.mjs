import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { pathToFileURL } from "node:url";
import { getSitemapDates } from "./sitemap-dates.mjs";

test("each page keeps the date of its own content in full and shallow clones", (t) => {
  const temp = mkdtempSync(join(tmpdir(), "website-sitemap-"));
  t.after(() => rmSync(temp, { recursive: true, force: true }));
  const repo = join(temp, "source");
  execFileSync("git", ["init", "--quiet", repo]);
  mkdirSync(join(repo, "src/app/writing/_articles"), { recursive: true });

  function commit(file, date) {
    const path = join(repo, file);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, date);
    execFileSync("git", ["add", "--", file], { cwd: repo });
    const args = [
      "-c", "user.name=Test", "-c", "user.email=test@example.com",
      "-c", "commit.gpgSign=false", "commit", "--quiet", "-m", file,
    ];
    execFileSync("git", args, {
      cwd: repo,
      env: { ...process.env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date },
    });
  }

  commit("src/app/page.tsx", "2026-01-01T12:00:00Z");
  commit("src/app/writing/page.tsx", "2026-01-02T12:00:00Z");
  assert.deepEqual(getSitemapDates(repo), { home: "2026-01-01", writing: "2026-01-02", articles: {} });

  commit("src/app/contact-bar.tsx", "2026-01-03T12:00:00Z");
  assert.deepEqual(getSitemapDates(repo), { home: "2026-01-03", writing: "2026-01-02", articles: {} });
  commit("public/pfp_2.png", "2026-01-04T12:00:00Z");
  assert.deepEqual(getSitemapDates(repo), { home: "2026-01-04", writing: "2026-01-02", articles: {} });
  commit("src/app/writing/page.tsx", "2026-01-05T12:00:00Z");
  commit("README.md", "2026-01-06T12:00:00Z");
  commit("src/app/writing/_articles/first.tsx", "2026-01-07T12:00:00Z");
  commit("src/app/writing/_articles/second.tsx", "2026-01-08T12:00:00Z");
  commit("public/writing/first/figure.png", "2026-01-09T12:00:00Z");
  const expected = {
    home: "2026-01-04", writing: "2026-01-08",
    articles: { first: "2026-01-09", second: "2026-01-08" },
  };
  assert.deepEqual(getSitemapDates(repo), expected);

  const shallow = join(temp, "shallow");
  execFileSync("git", ["clone", "--quiet", "--depth=1", pathToFileURL(repo).href, shallow]);
  assert.deepEqual(getSitemapDates(shallow), expected);

  const vercel = join(temp, "vercel");
  const fixtureUrl = pathToFileURL(repo).href;
  execFileSync("git", ["clone", "--quiet", "--depth=1", fixtureUrl, vercel]);
  execFileSync("git", ["remote", "remove", "origin"], { cwd: vercel });
  execFileSync("git", ["config", `url.${fixtureUrl}.insteadOf`, "https://github.com/kaustubhkislay/website.git"], { cwd: vercel });
  assert.deepEqual(getSitemapDates(vercel), expected);
});
