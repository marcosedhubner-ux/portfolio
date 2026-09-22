"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { githubUsername } from "@/lib/projects";
import { useLanguage } from "@/lib/i18n";
import { MagneticLink } from "./MagneticLink";

const pillClass =
  "glass-sm rounded-full px-4 py-2 text-[#eef1f8]/75 transition-colors duration-200 ease-out hover:text-[#f5f7fc] hover:border-[#2f6fed]/60 hover:shadow-[0_10px_24px_-12px_rgba(47,111,237,0.55)]";

export function Hero() {
  const { t } = useLanguage();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    if (!heading || !subtitle) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([heading, subtitle], { clipPath: "inset(0 0 0 0)", opacity: 1 });
      return;
    }

    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(
      heading,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 1.05, ease: "power4.inOut" }
    ).fromTo(
      subtitle,
      { clipPath: "inset(0 0 0 100%)", opacity: 0 },
      { clipPath: "inset(0 0 0 0%)", opacity: 1, duration: 0.9, ease: "power4.inOut" },
      "-=0.2"
    );
  }, []);

  return (
    <section id="top" className="relative px-6 pb-24 pt-36 sm:pb-32 sm:pt-44">
      <div className="mx-auto max-w-4xl">
        <span
          className="fade-up glass-sm inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[#eef1f8]/65"
          style={{ animationDelay: "0ms" }}
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2f6fed] shadow-[0_0_8px_2px_rgba(47,111,237,0.7)]" />
          {t.heroEyebrow}
        </span>

        <h1
          ref={headingRef}
          className="mt-8 max-w-3xl font-serif text-4xl leading-[1.08] text-[#f5f7fc] sm:text-7xl"
        >
          {t.heroHeadingPre}{" "}
          <em className="bg-gradient-to-r from-[#7ab0ff] via-[#a48bff] to-[#5be2c9] bg-clip-text italic text-transparent">
            {t.heroHeadingEm}
          </em>{" "}
          {t.heroHeadingPost}
        </h1>

        <p
          ref={subtitleRef}
          className="mt-7 max-w-xl text-base leading-relaxed text-[#eef1f8]/65 sm:text-lg"
        >
          {t.heroBody}
        </p>

        <div
          className="fade-up mt-10 flex flex-wrap gap-3 font-mono text-xs"
          style={{ animationDelay: "620ms" }}
        >
          <MagneticLink href={`https://github.com/${githubUsername}`} className={pillClass}>
            github.com/{githubUsername}
          </MagneticLink>
          <MagneticLink
            href="https://www.linkedin.com/in/marcos-eduardo-leite-hubner-4a0bb0254/"
            className={pillClass}
          >
            linkedin.com/in/marcos-eduardo-leite-hubner
          </MagneticLink>
          <MagneticLink href="mailto:marcosedhubner@gmail.com" className={pillClass}>
            marcosedhubner@gmail.com
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
