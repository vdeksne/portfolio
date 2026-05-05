import { getTranslations } from "next-intl/server";
import { Divider } from "./divider";
import { FooterLogo } from "./logo";

export async function Footer() {
  const t = await getTranslations("global");
  return (
    <div className="mt-6 pb-20">
      <Divider />
      <footer className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6">
        <FooterLogo />
        <span className="text-center text-sm text-muted">
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
