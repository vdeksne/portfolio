import { Navbar } from "@/components/Nav/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/Nav/ScrollToTop";
import { PlausibleScript } from "@/components/PlausibleScript";
import { LanguageToggle } from "@/components/Nav/LanguageToggle";
import { ThemeToggle } from "@/components/Nav/ThemeToggle";
import { Toaster } from "sonner";
import { NoImageCopy } from "@/components/NoImageCopy";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PlausibleScript />
      <NoImageCopy />
      <LanguageToggle />
      <ThemeToggle />
      <ScrollToTop />
      <Navbar />
      <div className="min-h-0 pt-[max(6.75rem,calc(5.125rem+env(safe-area-inset-top,0px)))] sm:pt-[max(4.125rem,calc(3.375rem+env(safe-area-inset-top,0px)))] md:pt-[max(4.375rem,calc(3.625rem+env(safe-area-inset-top,0px)))]">
        {children}
      </div>
      <Footer />
      <Toaster closeButton />
    </>
  );
}
