import { permanentRedirect } from "next/navigation";

export const slug = "ai-safety-in-2026-and-beyond-non-negotiables";
export const title = "AI Safety in 2026 and Beyond: Non-Negotiables";
export const authors = [
  { name: "Kaustubh Kislay" },
  { name: "Christine Corry", url: "https://christinecorry.com/index.html" },
];
export const published = "2026-11";

export const pdfPath = `/writing/${slug}/memo.pdf`;

export default function NonNegotiables() {
  return permanentRedirect(pdfPath);
}
