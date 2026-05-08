/** Markup for 1200×630 Open Graph / Twitter preview (typography only — no thumbnail icon). */
export function buildOgShareElement() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#070707",
        padding: 72,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "center",
          textAlign: "center",
          maxWidth: 900,
        }}
      >
        <span
          style={{
            fontSize: 64,
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
            fontSize: 32,
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
            fontSize: 26,
            color: "rgba(255,251,240,0.45)",
            marginTop: 12,
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
