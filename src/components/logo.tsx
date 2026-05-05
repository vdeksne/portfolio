import Image from "next/image";
import { Link } from "@/i18n/routing";

export function Logo({ size = 8 }: { size?: number }) {
  const px = size * 4;
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center"
      aria-label="Go back to home page"
    >
      <Image
        src="/icons/maison-hochard.svg"
        alt=""
        width={px}
        height={px}
        className="size-8"
      />
    </Link>
  );
}

export function FooterLogo() {
  return <Logo size={8} />;
}
