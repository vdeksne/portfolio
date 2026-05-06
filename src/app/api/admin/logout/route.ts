import { NextResponse } from "next/server";
import { CMS_COOKIE } from "@/lib/cms/session";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(CMS_COOKIE);
  return res;
}
