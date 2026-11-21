import * as RewardHacking from "./_articles/your-ais-dont-do-what-you-want";
import * as HighBandwidthMemory from "./_articles/south-korea-and-the-hbm-bottleneck";
import * as SecretLoyalties from "./_articles/secret-loyalties-and-remote-influenceability";
import * as Gametime from "./_articles/gametime";
import * as OneOnOnes from "./_articles/how-to-approach-a-one-on-one";
import * as MoralReasoning from "./_articles/reasoning-and-ethical-moral-task-results";
import * as NonNegotiables from "./_articles/ai-safety-in-2026-and-beyond-non-negotiables";

export const articles = [
  NonNegotiables,
  Gametime,
  OneOnOnes,
  RewardHacking,
  SecretLoyalties,
  MoralReasoning,
  HighBandwidthMemory,
];

export const listedArticles = articles.filter(
  (article) => article.slug !== OneOnOnes.slug && article.slug !== MoralReasoning.slug,
);

export function articleHref(article: (typeof articles)[number]) {
  return "pdfPath" in article ? article.pdfPath : `/writing/${article.slug}`;
}
