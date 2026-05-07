import Image from "next/image";
import { Link } from "@/i18n/routing";

/** Logo image only — use with your own link on routes outside `next-intl` (e.g. `/admin`). */
export function LogoMark({ size = 8 }: { size?: number }) {
  const px = size * 4;
  return (
    <Image
      src="/icons/maison-hochard.svg"
      alt=""
      width={px}
      height={px}
      className="logo-mark object-contain"
      style={{ width: px, height: px }}
    />
  );
}

/** `size` is in Tailwind spacing units (×4 px). Navbar uses 12 → 48px; footer uses 5 → 20px (slightly above 12px social glyphs). */
export function Logo({ size = 8 }: { size?: number }) {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center"
      aria-label="Go back to home page"
    >
      <LogoMark size={size} />
    </Link>
  );
}

export function FooterLogo() {
  return <Logo size={5} />;
}
