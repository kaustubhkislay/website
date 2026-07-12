import { ImageResponse } from "next/og";

// Site-wide OG image, generated at build time in the site's sand/warm-black/
// chili-pepper editorial style. Lives at the root segment so every route
// inherits it.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Kaustubh Kislay";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F4EDE3",
          padding: 88,
        }}
      >
        <div style={{ display: "flex", width: 128, height: 12, background: "#9B1B30" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: "#201812",
              letterSpacing: -3,
            }}
          >
            Kaustubh Kislay
          </div>
          <div style={{ fontSize: 32, color: "#5C4F42", marginTop: 20, display: "flex" }}>
            research · writing · reading
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#9B1B30", display: "flex" }}>kaustubhais.com</div>
      </div>
    ),
    size
  );
}
