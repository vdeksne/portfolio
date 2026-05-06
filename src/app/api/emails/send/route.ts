import { Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
  subject: z.string().min(5),
  fullname: z.string().min(3),
  phone: z.string().optional(),
});

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY || process.env.NUXT_PRIVATE_RESEND_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Email sending is not configured (set RESEND_API_KEY on the server)." },
      { status: 503 },
    );
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { email, subject, message, phone, fullname } = parsed.data;
  const resend = new Resend(key);
  const from = process.env.RESEND_FROM?.trim() || "Portfolio <onboarding@resend.dev>";
  const to = (process.env.RESEND_TO?.trim() || "viktorijadeksne@gmail.com")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  try {
    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio: ${subject}`,
      html: `
      <p>New message</p>
      <ul>
        <li>Name: ${fullname}</li>
        <li>Email: ${email}</li>
        <li>Phone: ${phone ?? "—"}</li>
        <li>Subject: ${subject}</li>
        <li>Message: ${message}</li>
      </ul>
      `,
    });
    // Resend returns { data, error } in some versions; expose helpful errors.
    const apiError = (result as unknown as { error?: unknown }).error;
    if (apiError) {
      const msg =
        typeof apiError === "string"
          ? apiError
          : typeof apiError === "object" && apiError !== null && "message" in apiError
            ? String((apiError as { message: unknown }).message)
            : JSON.stringify(apiError);
      return NextResponse.json(
        {
          error:
            `Resend rejected the request. ` +
            `Check RESEND_FROM (verified sender/domain) and RESEND_API_KEY. ` +
            `Details: ${msg}`,
        },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      {
        error:
          e instanceof Error
            ? e.message
            : "Email send failed.",
      },
      { status: 500 },
    );
  }
}
