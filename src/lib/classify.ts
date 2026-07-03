import { Redis } from "@upstash/redis";

export type LinkTag =
  | "research"
  | "policy/fieldbuilding"
  | "self-improvement"
  | "culture";

const VALID_TAGS = new Set<LinkTag>([
  "research",
  "policy/fieldbuilding",
  "self-improvement",
  "culture",
]);

async function retry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === attempts - 1) throw err;
    }
  }
  throw new Error("retry exhausted");
}

export function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.redis1_KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.redis1_KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

async function scrapeMetaDescription(url: string): Promise<string | null> {
  try {
    return await retry(async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(url, {
        signal: controller.signal,
        headers: { "User-Agent": "Mozilla/5.0 (compatible; LinkClassifier/1.0)" },
        redirect: "follow",
      });
      clearTimeout(timeout);

      if (!res.ok || !res.headers.get("content-type")?.includes("text/html")) {
        return null;
      }

      const reader = res.body?.getReader();
      if (!reader) return null;

      let html = "";
      const decoder = new TextDecoder();
      while (html.length < 10000) {
        const { done, value } = await reader.read();
        if (done) break;
        html += decoder.decode(value, { stream: true });
      }
      reader.cancel();

      const metaRegex =
        /<meta\s+(?:[^>]*?)(?:name|property)\s*=\s*["'](?:description|og:description)["'][^>]*?content\s*=\s*["']([^"']*?)["'][^>]*?\/?>/gi;
      const contentFirstRegex =
        /<meta\s+(?:[^>]*?)content\s*=\s*["']([^"']*?)["'][^>]*?(?:name|property)\s*=\s*["'](?:description|og:description)["'][^>]*?\/?>/gi;

      const match = metaRegex.exec(html) || contentFirstRegex.exec(html);
      return match?.[1]?.trim() || null;
    });
  } catch {
    return null;
  }
}

export async function getCachedTags(
  links: Array<{ url: string }>
): Promise<Map<string, LinkTag>> {
  const result = new Map<string, LinkTag>();
  if (links.length === 0) return result;
  const redis = getRedis();
  if (!redis) return result;
  try {
    const keys = links.map((l) => `tag:${l.url}`);
    const cached = await redis.mget<(string | null)[]>(...keys);
    for (let i = 0; i < links.length; i++) {
      const tag = cached[i];
      if (tag && VALID_TAGS.has(tag as LinkTag)) {
        result.set(links[i].url, tag as LinkTag);
      }
    }
  } catch {
    // Redis unavailable
  }
  return result;
}

export async function classifyLinks(
  links: Array<{ url: string; title: string; snippet: string | null }>
): Promise<Map<string, LinkTag>> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("[classify] OPENROUTER_API_KEY is not set");
    return new Map();
  }
  if (links.length === 0) return new Map();

  const redis = getRedis();
  if (!redis) console.warn("[classify] Redis not configured — classifications will not persist");
  const result = await getCachedTags(links);

  const uncached = links.filter((l) => !result.has(l.url));
  if (uncached.length === 0) return result;

  try {
    const metaResults = await Promise.allSettled(
      uncached.map((l) => scrapeMetaDescription(l.url))
    );

    const linkDescriptions = uncached.map((link, i) => {
      const meta =
        metaResults[i].status === "fulfilled" ? metaResults[i].value : null;
      const description = meta || link.snippet || "";
      return `- URL: ${link.url} | Title: ${link.title} | Description: ${description}`;
    });

    const prompt = `You are a link classifier. For each link, assign exactly one of the four categories below. There is no "other" or "unknown" — always pick the closest fit, even for tools, code repos, product pages, or news.

Categories (with examples):
- research: AI alignment / interpretability / safety research, arxiv papers, technical ML posts on LessWrong / Alignment Forum / Redwood / Anthropic / blogs by AI researchers, model evals, agent foundations.
  Examples: "Steering Might Stop Working Soon", "Hidden Role Games as a Trusted Model Eval", "Fail safer at alignment by channeling reward-hacking", anything on lesswrong.com/posts about ML internals.
- policy/fieldbuilding: AI policy, AI governance, regulation, EA-Forum posts, AI safety career advice, talent pipelines, movement building, institutional responses, lab strategy critiques, 80,000 Hours-style content.
  Examples: "What 3,654 Job Postings Tell Us About AI Safety", "AI Populism's Warning Shots", anything on forum.effectivealtruism.org.
- self-improvement: productivity, habits, social skills, decisionmaking heuristics, personal effectiveness, life advice (non-career).
  Examples: "Do Thing, Do One Thing", "Why You Can't Just Do Things", "increase your surface area".
- culture: essays, philosophy, general nonfiction, fiction, poetry, music, art, criticism, memoir.
  Examples: "The Orange" (poem), "Annoyingly Principled People", literary essays, Substack posts about ideas/life.

Tie-breaking rules:
- LessWrong / Alignment Forum / Redwood / Anthropic blog posts default to "research" unless they're explicitly about policy or careers.
- Substack / personal blog posts about ideas, life, writing default to "culture" unless clearly self-help (then "self-improvement") or AI policy/career (then "policy/fieldbuilding").
- Poems, fiction, essays without a research/policy/self-help angle = "culture".
- Technical tools, code repos, and ML product pages lean "research"; everything else that resists categorization leans "culture".

Links to classify:
${linkDescriptions.join("\n")}

Respond with ONLY a JSON array of objects with "url" and "tag" fields. Example: [{"url":"https://example.com","tag":"research"}]`;

    const text = await retry(async () => {
      const res = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "google/gemma-4-26b-a4b-it",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
          }),
        }
      );

      if (!res.ok) throw new Error(`OpenRouter ${res.status}`);

      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content;
      if (!content) throw new Error("Empty response");
      return content;
    });
    if (!text) return result;

    // Strip markdown code fences and any prose before/after the JSON payload.
    // Open-weight models (Gemma etc.) often respond with ```json ... ``` or
    // include a sentence before the array.
    const cleaned = (() => {
      const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
      if (fenced) return fenced[1].trim();
      const firstBracket = text.search(/[\[{]/);
      const lastBracket = Math.max(text.lastIndexOf("]"), text.lastIndexOf("}"));
      if (firstBracket !== -1 && lastBracket > firstBracket) {
        return text.slice(firstBracket, lastBracket + 1);
      }
      return text;
    })();

    let raw: unknown;
    try {
      raw = JSON.parse(cleaned);
    } catch (e) {
      console.error("[classify] JSON parse failed:", e, "text:", text.slice(0, 300));
      return result;
    }

    // Models return varied shapes:
    //   1. Array of {url, tag} (the spec)
    //   2. Single {url, tag} object (Gemma sometimes does this for 1-item batches)
    //   3. Wrapper object like { items: [...] } (Gemini json_object mode)
    //   4. Map shape like { "https://...": "research" }
    let parsed: Array<{ url: string; tag: string }> = [];
    if (Array.isArray(raw)) {
      parsed = raw as Array<{ url: string; tag: string }>;
    } else if (raw && typeof raw === "object") {
      const obj = raw as Record<string, unknown>;
      if (typeof obj.url === "string" && typeof obj.tag === "string") {
        parsed = [obj as { url: string; tag: string }];
      } else {
        const arr = Object.values(obj).find((v) => Array.isArray(v));
        if (arr) {
          parsed = arr as Array<{ url: string; tag: string }>;
        } else {
          // url-keyed map: { "https://...": "research", ... }
          const entries = Object.entries(obj).filter(
            ([k, v]) => typeof v === "string" && /^https?:\/\//.test(k)
          );
          if (entries.length > 0) {
            parsed = entries.map(([url, tag]) => ({ url, tag: tag as string }));
          }
        }
      }
    }
    if (parsed.length === 0) {
      console.error("[classify] could not find array in LLM response:", JSON.stringify(raw).slice(0, 300));
    }

    // Store new classifications in Redis
    const pipeline = redis?.pipeline();
    for (const entry of parsed) {
      if (entry.url && VALID_TAGS.has(entry.tag as LinkTag)) {
        result.set(entry.url, entry.tag as LinkTag);
        pipeline?.set(`tag:${entry.url}`, entry.tag);
      }
    }
    if (pipeline) {
      try {
        await pipeline.exec();
      } catch {
        // Redis write failed, classifications still returned in-memory
      }
    }

    return result;
  } catch (err) {
    console.error("[classify] classification failed:", err);
    return result;
  }
}
