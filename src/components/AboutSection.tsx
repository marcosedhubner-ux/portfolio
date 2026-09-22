"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/i18n";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

function seeded(seed: number) {
  const x = Math.sin(seed * 999.7) * 10000;
  return x - Math.floor(x);
}

// One crack, radiating out from a single off-center point, splits the panel
// into exactly 6 irregular wedges — like a real cracked pane, not a web.
const IMPACT = { x: 44, y: 40 };
const PIECE_COUNT = 6;
const REACH = 190; // far enough past any edge, whatever the panel's aspect ratio

function angleFor(index: number) {
  const step = 360 / PIECE_COUNT;
  const base = step * index;
  const jitter = (seeded(index * 7.3 + 1) - 0.5) * step * 0.55;
  return ((base + jitter) * Math.PI) / 180;
}

function pointAt(angle: number, radius: number): [number, number] {
  return [IMPACT.x + Math.cos(angle) * radius, IMPACT.y + Math.sin(angle) * radius];
}

const SHARD_TINTS = [
  "linear-gradient(135deg, rgba(122,176,255,0.26), rgba(122,176,255,0.06) 70%)",
  "linear-gradient(135deg, rgba(164,139,255,0.24), rgba(164,139,255,0.05) 70%)",
  "linear-gradient(135deg, rgba(91,226,201,0.24), rgba(91,226,201,0.05) 70%)",
  "linear-gradient(135deg, rgba(238,241,248,0.16), rgba(238,241,248,0.03) 70%)",
  "linear-gradient(135deg, rgba(47,111,237,0.26), rgba(47,111,237,0.06) 70%)",
  "linear-gradient(135deg, rgba(198,161,255,0.22), rgba(198,161,255,0.04) 70%)",
];

const SHARDS = Array.from({ length: PIECE_COUNT }, (_, i) => {
  const a1 = angleFor(i);
  const a2 = angleFor(i + 1);
  const reach = REACH * (1 + (seeded(i * 9 + 3) - 0.5) * 0.15);
  const points: [number, number][] = [
    [IMPACT.x, IMPACT.y],
    pointAt(a1, reach),
    pointAt((a1 + a2) / 2, reach * (1 + (seeded(i * 9 + 5) - 0.5) * 0.1)),
    pointAt(a2, reach),
  ];
  const cx = points.reduce((sum, p) => sum + p[0], 0) / points.length;
  const cy = points.reduce((sum, p) => sum + p[1], 0) / points.length;

  return {
    key: `${i}`,
    clipPath: `polygon(${points.map(([x, y]) => `${x.toFixed(2)}% ${y.toFixed(2)}%`).join(", ")})`,
    cx,
    cy,
  };
});

export function AboutSection() {
  const { t } = useLanguage();
  const listRef = useRef<HTMLUListElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const content = contentRef.current;
    const shardsWrap = shardsRef.current;
    if (!panel || !content || !shardsWrap) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shards = Array.from(shardsWrap.children) as HTMLElement[];

    if (reduced) {
      gsap.set(content, { opacity: 1 });
      gsap.set(shardsWrap, { opacity: 0 });
      return;
    }

    gsap.set(content, { opacity: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: "top 78%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      shards.forEach((shard, i) => {
        const s = SHARDS[i];
        const vx = s.cx - IMPACT.x;
        const vy = s.cy - IMPACT.y;
        const len = Math.hypot(vx, vy) || 1;
        const dx = vx / len;
        const dy = vy / len;
        const dist = 120 + seeded(i * 11) * 420;
        tl.to(
          shard,
          {
            x: dx * dist,
            y: dy * dist,
            rotate: (seeded(i * 17) - 0.5) * 18,
            scale: 0.4,
            opacity: 0,
            duration: 1,
            ease: "power3.in",
          },
          i * 0.06
        );
      });

      tl.to(content, { opacity: 1, duration: 0.7, ease: "power2.out" }, 0.15);
    }, panel);

    return () => ctx.revert();
  }, []);

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
    <section id="about" className="relative mx-auto max-w-5xl px-6 py-14 sm:py-20">
      <div ref={panelRef} className="relative">
        <div ref={contentRef} className="glass grid grid-cols-1 gap-8 rounded-2xl p-8 sm:grid-cols-[200px_1fr] sm:p-12">
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

        <div ref={shardsRef} className="pointer-events-none absolute inset-0">
          {SHARDS.map((s, i) => (
            <div
              key={s.key}
              className="absolute inset-0 will-change-transform"
              style={{
                clipPath: s.clipPath,
                background: SHARD_TINTS[i % SHARD_TINTS.length],
                border: "1.5px solid rgba(238,241,248,0.45)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
