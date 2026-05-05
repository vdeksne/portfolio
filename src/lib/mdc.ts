/** Parse Nuxt Content MDC body blocks `::name ... ::` with `#slot` keys. */
export function parseMdcBlock(
  body: string,
  blockName: string,
): Record<string, string> {
  const re = new RegExp(`::${blockName}\\s*([\\s\\S]*?)::`, "m");
  const m = body.match(re);
  if (!m) return {};
  const inner = m[1] ?? "";
  const slots: Record<string, string> = {};
  const lines = inner.split("\n");
  let currentKey: string | null = null;
  const buf: string[] = [];
  const flush = () => {
    if (currentKey) {
      slots[currentKey] = buf.join("\n").trim();
    }
    buf.length = 0;
  };
  for (const line of lines) {
    const km = line.match(/^#(\w+)$/);
    if (km) {
      flush();
      currentKey = km[1] ?? null;
    } else {
      buf.push(line);
    }
  }
  flush();
  return slots;
}

export function firstMdcBlockName(body: string): string {
  const m = body.match(/::(\w+)/);
  return m?.[1] ?? "home";
}
