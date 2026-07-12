import { ImageResponse } from "next/og";

// Site-wide OG image, generated at build time in the site's
// chili-dominant editorial style (sand-dollar on deep chili). Lives at the root
// segment so every route inherits it.
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
          background: "#9B1B30",
          padding: 88,
        }}
      >
        <div style={{ display: "flex", width: 128, height: 12, background: "#DECDBE" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: "#FAF5EC",
              letterSpacing: -3,
            }}
          >
            Kaustubh Kislay
          </div>
          <div style={{ fontSize: 32, color: "#D9C5B2", marginTop: 20, display: "flex" }}>
            research · writing · reading
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#DECDBE", display: "flex" }}>kaustubhais.com</div>
      </div>
    ),
    size
  );
}
