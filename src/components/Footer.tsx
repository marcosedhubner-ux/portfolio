"use client";

import { githubUsername } from "@/lib/projects";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="relative mx-auto max-w-5xl px-6 pb-24 pt-4 sm:pb-32">
      <div className="rounded-[28px] bg-gradient-to-br from-[#2f6fed]/50 via-[#7c5cff]/40 to-[#12b8a6]/40 p-[1px]">
        <div className="glass rounded-[27px] px-8 py-14 text-center sm:px-16 sm:py-20">
          <h2 className="font-serif text-3xl text-[#f5f7fc] sm:text-4xl">{t.footerTitle}</h2>
          <p className="mx-auto mt-4 max-w-md text-[#eef1f8]/60">{t.footerSubtitle}</p>

          <div className="mt-9 flex flex-col items-center gap-3 font-mono text-sm sm:flex-row sm:justify-center sm:gap-4">
            <a
              href="mailto:marcosedhubner@gmail.com"
              className="glass-sm w-full rounded-full px-5 py-2.5 text-[#eef1f8]/80 transition-colors hover:text-[#f5f7fc] hover:border-[#2f6fed]/50 sm:w-auto"
            >
              marcosedhubner@gmail.com
            </a>
            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noreferrer"
              className="glass-sm w-full rounded-full px-5 py-2.5 text-[#eef1f8]/80 transition-colors hover:text-[#f5f7fc] hover:border-[#2f6fed]/50 sm:w-auto"
            >
              github.com/{githubUsername}
            </a>
            <a
              href="https://www.linkedin.com/in/marcos-eduardo-leite-hubner-4a0bb0254/"
              target="_blank"
              rel="noreferrer"
              className="glass-sm w-full rounded-full px-5 py-2.5 text-[#eef1f8]/80 transition-colors hover:text-[#f5f7fc] hover:border-[#2f6fed]/50 sm:w-auto"
            >
              linkedin.com/in/marcos-eduardo-leite-hubner
            </a>
          </div>

          <p className="mt-14 font-mono text-[11px] text-[#eef1f8]/30">{t.footerSignature}</p>
        </div>
      </div>
    </footer>
  );
}
