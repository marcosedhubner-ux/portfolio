"use client";

import { githubUsername } from "@/lib/projects";
import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { MagneticLink } from "./MagneticLink";

const linkClass =
  "glass-sm w-full rounded-full px-5 py-2.5 text-[#eef1f8]/80 transition-colors duration-200 ease-out hover:text-[#f5f7fc] hover:border-[#2f6fed]/60 hover:shadow-[0_10px_28px_-12px_rgba(47,111,237,0.55)] sm:w-auto";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="relative mx-auto max-w-5xl px-6 pb-24 pt-4 sm:pb-32">
      <Reveal variant="scale">
        <div className="spin-ring-bg rounded-[28px] p-[1px]">
          <div className="glass rounded-[27px] px-8 py-14 text-center sm:px-16 sm:py-20">
            <h2 className="font-serif text-3xl text-[#f5f7fc] sm:text-4xl">{t.footerTitle}</h2>
            <p className="mx-auto mt-4 max-w-md text-[#eef1f8]/60">{t.footerSubtitle}</p>

            <div className="mt-9 flex flex-col items-center gap-3 font-mono text-sm sm:flex-row sm:justify-center sm:gap-4">
              <MagneticLink href="mailto:marcosedhubner@gmail.com" className={linkClass}>
                marcosedhubner@gmail.com
              </MagneticLink>
              <MagneticLink href={`https://github.com/${githubUsername}`} className={linkClass}>
                github.com/{githubUsername}
              </MagneticLink>
              <MagneticLink
                href="https://www.linkedin.com/in/marcos-eduardo-leite-hubner-4a0bb0254/"
                className={linkClass}
              >
                linkedin.com/in/marcos-eduardo-leite-hubner
              </MagneticLink>
            </div>

            <p className="mt-14 font-mono text-[11px] text-[#eef1f8]/30">{t.footerSignature}</p>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
