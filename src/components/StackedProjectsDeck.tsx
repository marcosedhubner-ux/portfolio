"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/lib/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BEHIND = { opacity: 0, y: 34, scale: 0.93, filter: "blur(5px)" };
const FRONT = { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" };
const RECEDED = { opacity: 0, y: -22, scale: 0.97, filter: "blur(3px)" };

export function StackedProjectsDeck({
  projects,
  startIndex,
}: {
  projects: Project[];
  startIndex: number;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const cards = cardRefs.current.filter((c): c is HTMLDivElement => c !== null);
    if (!stage || cards.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sizeStage = () => {
      const tallest = Math.max(...cards.map((c) => c.scrollHeight));
      stage.style.height = `${tallest}px`;
    };
    sizeStage();
    const ro = new ResizeObserver(sizeStage);
    cards.forEach((c) => ro.observe(c));

    if (reduced || cards.length < 2) {
      cards.forEach((c) => gsap.set(c, FRONT));
      return () => ro.disconnect();
    }

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.set(card, {
          transformOrigin: "50% 0%",
          zIndex: i + 1,
          ...(i === 0 ? FRONT : BEHIND),
        });
      });

      const steps = cards.length - 1;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top+=110",
          end: () => `+=${steps * Math.max(window.innerHeight * 1.4, 820)}`,
          scrub: 0.35,
          pin: true,
          anticipatePin: 1,
        },
      });

      for (let i = 0; i < steps; i++) {
        const outgoing = cards[i];
        const incoming = cards[i + 1];
        tl.to(outgoing, { ...RECEDED, ease: "power1.in", duration: 0.48 }, i).to(
          incoming,
          { ...FRONT, ease: "power1.out", duration: 0.48 },
          i + 0.52
        );
      }
    }, stage);

    return () => {
      ctx.revert();
      ro.disconnect();
    };
  }, [projects]);

  return (
    <div ref={stageRef} className="relative mt-2">
      {projects.map((project, i) => (
        <div
          key={project.slug}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="absolute inset-x-0 top-0 will-change-transform"
        >
          <ProjectCard project={project} index={startIndex + i} featured />
        </div>
      ))}
    </div>
  );
}
