import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { CMS_COOKIE, verifySessionValue } from "./session";

export async function requireCmsAuth(): Promise<Response | null> {
  const secret = process.env.CMS_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "CMS is not configured (set CMS_SECRET in .env)." },
      { status: 503 },
    );
  }
  const jar = await cookies();
  if (!verifySessionValue(jar.get(CMS_COOKIE)?.value, secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
