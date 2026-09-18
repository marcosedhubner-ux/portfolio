"use client";

import { githubUsername } from "@/lib/projects";
import { useLanguage } from "@/lib/i18n";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative px-6 pb-24 pt-36 sm:pb-32 sm:pt-44">
      <div className="mx-auto max-w-4xl">
        <span className="glass-sm inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[#eef1f8]/65">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2f6fed] shadow-[0_0_8px_2px_rgba(47,111,237,0.7)]" />
          {t.heroEyebrow}
        </span>

        <h1 className="mt-8 max-w-3xl font-serif text-4xl leading-[1.08] text-[#f5f7fc] sm:text-7xl">
          {t.heroHeadingPre}{" "}
          <em className="bg-gradient-to-r from-[#7ab0ff] via-[#a48bff] to-[#5be2c9] bg-clip-text italic text-transparent">
            {t.heroHeadingEm}
          </em>{" "}
          {t.heroHeadingPost}
        </h1>

        <p className="mt-7 max-w-xl text-base leading-relaxed text-[#eef1f8]/65 sm:text-lg">
          {t.heroBody}
        </p>

        <div className="mt-10 flex flex-wrap gap-3 font-mono text-xs">
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noreferrer"
            className="glass-sm rounded-full px-4 py-2 text-[#eef1f8]/75 transition-colors hover:text-[#f5f7fc] hover:border-[#2f6fed]/50"
          >
            github.com/{githubUsername}
          </a>
          <a
            href="https://www.linkedin.com/in/marcos-eduardo-leite-hubner-4a0bb0254/"
            target="_blank"
            rel="noreferrer"
            className="glass-sm rounded-full px-4 py-2 text-[#eef1f8]/75 transition-colors hover:text-[#f5f7fc] hover:border-[#2f6fed]/50"
          >
            linkedin.com/in/marcos-eduardo-leite-hubner
          </a>
          <a
            href="mailto:marcosedhubner@gmail.com"
            className="glass-sm rounded-full px-4 py-2 text-[#eef1f8]/75 transition-colors hover:text-[#f5f7fc] hover:border-[#2f6fed]/50"
          >
            marcosedhubner@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
