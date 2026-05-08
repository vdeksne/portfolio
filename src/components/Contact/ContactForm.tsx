"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { siteConfig } from "@/lib/site-config";
import { MeetingButton } from "@/components/MeetingButton";
import { Divider } from "@/components/primitives/Divider";

const schema = z.object({
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message is too short"),
  subject: z.string().min(5, "Subject is too short"),
  fullname: z.string().min(3, "Name is too short"),
  phone: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm({
  resendEnabled,
  slots,
}: {
  resendEnabled: boolean;
  slots: { title?: string; subtitle?: string };
}) {
  const t = useTranslations("contact");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      message: "",
      phone: "",
      fullname: "",
      subject: "",
    },
  });

  async function onSubmit(data: FormValues) {
    if (!resendEnabled) {
      toast.error("Email is not configured yet.");
      return;
    }
    try {
      const res = await fetch("/api/emails/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: unknown };
        const msg =
          typeof j.error === "string" ? j.error : JSON.stringify(j.error ?? "send failed");
        throw new Error(msg);
      }
      reset();
      toast.success(t("success"));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("error"));
    }
  }

  const fieldCls =
    "w-full rounded-md border border-(--border-primary) bg-(--bg-card) px-3 py-2 text-(--font-primary) placeholder:opacity-60 outline-none transition-[border-color,box-shadow] focus-visible:ring-2 focus-visible:ring-(--font-primary)/20 focus-visible:ring-offset-2 focus-visible:ring-offset-(--ui-bg)";

  return (
    <section className="mx-auto mt-4 flex w-full max-w-5xl flex-col p-7 sm:mt-20 xl:max-w-6xl">
      <h1 className="font-newsreader text-left text-4xl text-white-shadow">
        {slots.title}
      </h1>
      <h2 className="mt-5 text-left text-lg font-extralight text-muted sm:mt-6">
        {slots.subtitle}
      </h2>
      <Divider className="mb-8 mt-2" />
      <div className="flex flex-col sm:items-center sm:justify-between">
        <div className="mx-auto flex w-full max-w-full flex-row flex-nowrap items-center gap-3 overflow-x-auto overscroll-x-contain pb-0.5 sm:gap-4 md:overflow-visible">
          <span className="text-muted shrink-0 whitespace-nowrap text-sm sm:text-base">
            {siteConfig.profile.phone}
          </span>
          <span className="text-muted shrink-0 select-none" aria-hidden>
            |
          </span>
          <a
            href={`mailto:${siteConfig.profile.email}`}
            className="text-muted min-w-0 shrink truncate text-sm transition-colors duration-300 hover:text-(--font-primary) sm:max-w-none sm:shrink-0 sm:whitespace-nowrap sm:text-base"
            title={siteConfig.profile.email}
          >
            {siteConfig.profile.email}
          </a>
          <div className="ml-auto shrink-0">
            <MeetingButton />
          </div>
        </div>
        <Divider className="my-10" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-3"
        >
          <label className="flex flex-col gap-1 text-sm">
            <span>{t("fullname")}</span>
            <input
              {...register("fullname")}
              autoComplete="name"
              className={fieldCls}
            />
            {errors.fullname ? (
              <span className="text-red-400">{errors.fullname.message}</span>
            ) : null}
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>{t("email")}</span>
            <input
              type="email"
              {...register("email")}
              autoComplete="email"
              className={fieldCls}
            />
            {errors.email ? (
              <span className="text-red-400">{errors.email.message}</span>
            ) : null}
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>{t("phone")}</span>
            <input
              {...register("phone")}
              autoComplete="tel"
              className={fieldCls}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>{t("subject")}</span>
            <input
              {...register("subject")}
              className={fieldCls}
            />
            {errors.subject ? (
              <span className="text-red-400">{errors.subject.message}</span>
            ) : null}
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>{t("message")}</span>
            <textarea
              {...register("message")}
              rows={4}
              className={`${fieldCls} min-h-28 resize-y`}
            />
            {errors.message ? (
              <span className="text-red-400">{errors.message.message}</span>
            ) : null}
          </label>
          <div className="flex w-full justify-start">
            <div className="group relative w-full">
              <button
                type="submit"
                disabled={!resendEnabled || isSubmitting}
                className="w-full rounded-lg bg-white px-4 py-2 font-medium text-[#070707] underline-offset-[0.35rem] decoration-2 decoration-[#070707] transition-[text-decoration-color,background-color] duration-200 enabled:hover:underline hover:bg-white/90 disabled:opacity-40 disabled:no-underline"
                title={!resendEnabled ? t("disabled") : undefined}
              >
                {t("submit")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
