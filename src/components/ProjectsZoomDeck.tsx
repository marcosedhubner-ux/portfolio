"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectCard } from "./ProjectCard";
import { useLanguage } from "@/lib/i18n";
import type { Project } from "@/lib/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AHEAD = { opacity: 0, scale: 0.46 };
const HERE = { opacity: 1, scale: 1 };
const PASSED = { opacity: 0, scale: 1.55 };

function chunk<T>(items: T[], size: number): T[][] {
  const groups: T[][] = [];
  for (let i = 0; i < items.length; i += size) groups.push(items.slice(i, i + size));
  return groups;
}

export function ProjectsZoomDeck({ projects }: { projects: Project[] }) {
  const { t } = useLanguage();
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pairs = chunk(projects, 2);

  useLayoutEffect(() => {
    const pinEl = pinRef.current;
    const stage = stageRef.current;
    const groups = groupRefs.current.filter((g): g is HTMLDivElement => g !== null);
    if (!pinEl || !stage || groups.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sizeStage = () => {
      const tallest = Math.max(...groups.map((g) => g.scrollHeight));
      stage.style.height = `${tallest}px`;
    };
    sizeStage();
    const ro = new ResizeObserver(sizeStage);
    groups.forEach((g) => ro.observe(g));

    if (reduced || groups.length < 2) {
      groups.forEach((g) => gsap.set(g, HERE));
      return () => ro.disconnect();
    }

    const ctx = gsap.context(() => {
      groups.forEach((g, i) => {
        gsap.set(g, { transformOrigin: "50% 50%", zIndex: i + 1, ...(i === 0 ? HERE : AHEAD) });
      });

      const steps = groups.length - 1;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: "top top+=90",
          end: () => `+=${steps * Math.max(window.innerHeight * 1.5, 900)}`,
          scrub: 0.35,
          pin: true,
          anticipatePin: 1,
        },
      });

      for (let i = 0; i < steps; i++) {
        const outgoing = groups[i];
        const incoming = groups[i + 1];
        tl.to(outgoing, { ...PASSED, ease: "power2.in", duration: 0.48 }, i).to(
          incoming,
          { ...HERE, ease: "power2.out", duration: 0.48 },
          i + 0.52
        );
      }
    }, pinEl);

    return () => {
      ctx.revert();
      ro.disconnect();
    };
  }, [projects]);

  return (
    <div ref={pinRef}>
      <div className="flex items-baseline justify-between">
        <h2 className="font-serif text-3xl text-[#f5f7fc] sm:text-4xl">{t.workTitle}</h2>
        <span className="font-mono text-xs uppercase tracking-widest text-[#eef1f8]/35">
          {t.workCount(projects.length)}
        </span>
      </div>

      <div ref={stageRef} className="relative mt-10">
        {pairs.map((pair, i) => (
          <div
            key={pair.map((p) => p.slug).join("-")}
            ref={(el) => {
              groupRefs.current[i] = el;
            }}
            className="absolute inset-x-0 top-0 grid grid-cols-1 gap-6 will-change-transform lg:grid-cols-2"
          >
            {pair.map((project, j) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i * 2 + j}
                featured={pair.length === 1}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
