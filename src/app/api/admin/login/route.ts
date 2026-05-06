import { NextResponse } from "next/server";
import {
  CMS_COOKIE,
  createSessionValue,
  safeEqualPassword,
} from "@/lib/cms/session";

export async function POST(req: Request) {
  const secret = process.env.CMS_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "CMS_SECRET is not set. Add it to .env first." },
      { status: 503 },
    );
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const password =
    typeof body === "object" && body && "password" in body
      ? (body as { password?: unknown }).password
      : undefined;
  if (typeof password !== "string" || !safeEqualPassword(password, secret)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  const token = createSessionValue(secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(CMS_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return res;
}
