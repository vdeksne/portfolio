import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { routing } from "@/i18n/routing";

type AdminLogoProps = { size?: number; className?: string };

/** Home link for admin (locale-prefixed site routes). */
export function AdminLogo({ size = 12, className = "" }: AdminLogoProps) {
  return (
    <Link
      href={`/${routing.defaultLocale}`}
      className={`flex shrink-0 items-center ${className}`.trim()}
      aria-label="Back to site"
    >
      <LogoMark size={size} />
    </Link>
  );
}
