"use client";

import { useLanguage } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-[#eef1f8]/55">
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`rounded px-1.5 py-0.5 transition-colors ${
          lang === "en" ? "text-[#eef1f8]" : "hover:text-[#eef1f8]/85"
        }`}
      >
        EN
      </button>
      <span className="text-[#eef1f8]/25">/</span>
      <button
        type="button"
        onClick={() => setLang("pt")}
        aria-pressed={lang === "pt"}
        className={`rounded px-1.5 py-0.5 transition-colors ${
          lang === "pt" ? "text-[#eef1f8]" : "hover:text-[#eef1f8]/85"
        }`}
      >
        PT-BR
      </button>
    </div>
  );
}
