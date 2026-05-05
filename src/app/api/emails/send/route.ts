import { Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod";

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
    return NextResponse.json({ error: "Missing API key" }, { status: 501 });
  }
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { email, subject, message, phone, fullname } = parsed.data;
  const resend = new Resend(key);
  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["viktorijadeksne@gmail.com"],
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
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "send failed" },
      { status: 500 },
    );
  }
}
