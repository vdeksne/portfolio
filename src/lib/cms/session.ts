import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const CMS_COOKIE = "portfolio_cms_session";
const TTL_MS = 7 * 24 * 60 * 60 * 1000;

export function createSessionValue(secret: string): string {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + TTL_MS }),
    "utf8",
  ).toString("base64url");
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifySessionValue(
  token: string | undefined,
  secret: string,
): boolean {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot === -1) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  try {
    const a = Buffer.from(sig, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    if (!timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }
  try {
    const json = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { exp?: unknown };
    return typeof json.exp === "number" && json.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const secret = process.env.CMS_SECRET;
  if (!secret) return false;
  const jar = await cookies();
  return verifySessionValue(jar.get(CMS_COOKIE)?.value, secret);
}

export function safeEqualPassword(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a, "utf8");
    const bb = Buffer.from(b, "utf8");
    if (ba.length !== bb.length) return false;
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}
