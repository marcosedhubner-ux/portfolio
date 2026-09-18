"use client";

import { useLanguage } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-[#e8e6e0]/60">
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`rounded px-1.5 py-0.5 transition-colors ${
          lang === "en" ? "text-[#f4f2ec]" : "hover:text-[#e8e6e0]/90"
        }`}
      >
        EN
      </button>
      <span className="text-[#e8e6e0]/30">/</span>
      <button
        type="button"
        onClick={() => setLang("pt")}
        aria-pressed={lang === "pt"}
        className={`rounded px-1.5 py-0.5 transition-colors ${
          lang === "pt" ? "text-[#f4f2ec]" : "hover:text-[#e8e6e0]/90"
        }`}
      >
        PT-BR
      </button>
    </div>
  );
}
