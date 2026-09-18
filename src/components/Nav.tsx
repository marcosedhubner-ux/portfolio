"use client";

import { useLanguage } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";

export function Nav() {
  const { t } = useLanguage();

  return (
    <header className="fixed inset-x-0 top-0 z-30 flex justify-center px-4 pt-4 sm:pt-6">
      <div className="glass-nav flex w-full max-w-2xl items-center justify-between gap-4 rounded-full px-5 py-3 sm:px-6">
        <a href="#top" className="font-mono text-xs tracking-widest text-[#eef1f8]">
          MH
        </a>
        <div className="flex items-center gap-5 sm:gap-7">
          <nav className="hidden gap-6 font-mono text-xs uppercase tracking-widest text-[#eef1f8]/55 sm:flex">
            <a href="#work" className="transition-colors hover:text-[#eef1f8]">
              {t.navWork}
            </a>
            <a href="#about" className="transition-colors hover:text-[#eef1f8]">
              {t.navAbout}
            </a>
            <a href="#contact" className="transition-colors hover:text-[#eef1f8]">
              {t.navContact}
            </a>
          </nav>
          <span className="hidden h-4 w-px bg-white/15 sm:block" />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
