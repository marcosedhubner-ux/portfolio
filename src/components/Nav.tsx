"use client";

import { useLanguage } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";

export function Nav() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0a0d12]/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-xs tracking-widest text-[#e8e6e0]/80">
          MH
        </a>
        <div className="flex items-center gap-6">
          <nav className="flex gap-6 font-mono text-xs uppercase tracking-widest text-[#e8e6e0]/60">
            <a href="#work" className="transition-colors hover:text-[#e8e6e0]">
              {t.navWork}
            </a>
            <a href="#about" className="transition-colors hover:text-[#e8e6e0]">
              {t.navAbout}
            </a>
            <a href="#contact" className="transition-colors hover:text-[#e8e6e0]">
              {t.navContact}
            </a>
          </nav>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
