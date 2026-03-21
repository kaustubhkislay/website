import { Redis } from "@upstash/redis";

export type LinkTag =
  | "research"
  | "policy/fieldbuilding"
  | "self-improvement"
  | "culture"
  | "other";

const VALID_TAGS = new Set<LinkTag>([
  "research",
  "policy/fieldbuilding",
  "self-improvement",
  "culture",
  "other",
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

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
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

export async function classifyLinks(
  links: Array<{ url: string; title: string; snippet: string | null }>
): Promise<Map<string, LinkTag>> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || links.length === 0) return new Map();

  const redis = getRedis();
  const result = new Map<string, LinkTag>();

  // Check Redis for existing classifications
  if (redis) {
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
      // Redis unavailable, continue without cache
    }
  }

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

    const prompt = `You are a link classifier. For each link below, assign exactly one category.

Categories:
- research: technical AI papers, interpretability, alignment theory, AI safety research, arxiv papers
- policy/fieldbuilding: AI policy, regulation, safety evals, institutional responses to AI, EA, community organizing, career strategy in AI safety, movement building
- self-improvement: productivity, social skills, personal effectiveness, career advice
- culture: essays, philosophy, general nonfiction, music, art, parties
- other: anything that doesn't clearly fit the above categories

Links:
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
            model: "google/gemini-2.5-flash-lite",
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

    const raw = JSON.parse(text);
    const parsed: Array<{ url: string; tag: string }> = Array.isArray(raw)
      ? raw
      : raw.links || raw.results || Object.values(raw)[0] || [];

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
  } catch {
    return result;
  }
}
