import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { ScrollToTop } from "./scroll-to-top";
import { DotPattern } from "./dot-pattern";
import { PlausibleScript } from "./plausible-script";
import { Toaster } from "sonner";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PlausibleScript />
      <ScrollToTop />
      <Navbar />
      <div className="sm:mt-[50px]">{children}</div>
      <Footer />
      <DotPattern className="pointer-events-none absolute inset-0 -z-10 size-full fill-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />
      <Toaster closeButton />
    </>
  );
}
