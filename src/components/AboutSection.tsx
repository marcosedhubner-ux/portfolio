"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./Reveal";

const SKILLS = [
  "JavaScript / TypeScript",
  "Node.js & Express",
  "React & Next.js",
  "PostgreSQL & Prisma",
  "Socket.IO / WebSockets",
  "Python",
  "PHP",
  "Puppeteer & automation",
];

export function AboutSection() {
  const { t } = useLanguage();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("li");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => (item.style.opacity = "1"));
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animate(items, {
          opacity: [0, 1],
          scale: [0.85, 1],
          translateY: [10, 0],
          delay: stagger(45),
          duration: 520,
          ease: "outExpo",
        });
        observer.disconnect();
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <Reveal>
        <div className="glass grid grid-cols-1 gap-8 rounded-2xl p-8 sm:grid-cols-[200px_1fr] sm:p-12">
          <h2 className="font-serif text-3xl text-[#f5f7fc] sm:text-4xl">{t.aboutTitle}</h2>

          <div className="max-w-2xl space-y-5 text-base leading-relaxed text-[#eef1f8]/70">
            <p>{t.aboutP1}</p>
            <p>{t.aboutP2}</p>
            <p>{t.aboutP3}</p>

            <ul ref={listRef} className="flex flex-wrap gap-2 pt-2">
              {SKILLS.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-white/12 px-2.5 py-1 font-mono text-[11px] text-[#eef1f8]/60 opacity-0 transition-[transform,border-color,background-color,color] duration-200 hover:-translate-y-0.5 hover:border-[#2f6fed]/50 hover:bg-[#2f6fed]/10 hover:text-[#eef1f8]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
