import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Markup for 1200×630 Open Graph / Twitter preview (vector logo + text). */
export async function buildOgShareElement() {
  const logoSvg = await readFile(
    join(process.cwd(), "public/icons/maison-hochard.svg"),
    "utf8",
  );
  const logoSrc = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(logoSvg)}`;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        background: "#070707",
        gap: 48,
        padding: 64,
      }}
    >
      {/* next/image unsupported in ImageResponse; SVG is embedded as data URL */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logoSrc} width={280} height={283} alt="" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          maxWidth: 720,
        }}
      >
        <span
          style={{
            fontSize: 58,
            fontWeight: 600,
            color: "#fffbf0",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
          }}
        >
          Viktorija Deksne
        </span>
        <span
          style={{
            fontSize: 30,
            color: "rgba(255,251,240,0.78)",
            lineHeight: 1.35,
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
          }}
        >
          Frontend Engineer & Designer
        </span>
        <span
          style={{
            fontSize: 24,
            color: "rgba(255,251,240,0.45)",
            marginTop: 8,
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
          }}
        >
          Portfolio
        </span>
      </div>
    </div>
  );
}
