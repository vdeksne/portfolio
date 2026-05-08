import { getTranslations } from "next-intl/server";
import { Divider } from "@/components/primitives/Divider";
import { FooterLogo } from "@/components/Logo";
import { SocialLinks } from "@/components/SocialLinks";

export async function Footer() {
  const t = await getTranslations("global");
  return (
    <div className="mt-6 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] sm:pb-8">
      <Divider />
      <footer className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5 px-4 py-8 text-center sm:py-10 2xl:max-w-[90rem]">
        <FooterLogo />
        <SocialLinks compact />
        <span className="max-w-xl text-sm text-muted">
          © {new Date().getFullYear()},{" "}
          <a
            href="https://www.linkedin.com/in/vdeksne/"
            className="text-[var(--font-muted)] underline-offset-2 hover:underline"
          >
            Viktorija Deksne
          </a>{" "}
          - {t("all_rights_reserved")}.
        </span>
      </footer>
    </div>
  );
}
