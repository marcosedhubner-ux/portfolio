"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/lib/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
      cards.forEach((c) => gsap.set(c, { opacity: 1, z: 0, y: 0, scale: 1, filter: "blur(0px)" }));
      return () => ro.disconnect();
    }

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.set(card, {
          zIndex: i + 1,
          opacity: i === 0 ? 1 : 0,
          z: i === 0 ? 0 : -520,
          y: i === 0 ? 0 : 80,
          scale: i === 0 ? 1 : 0.84,
          filter: i === 0 ? "blur(0px)" : "blur(12px)",
        });
      });

      const steps = cards.length - 1;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top+=110",
          end: () => `+=${steps * Math.max(window.innerHeight * 0.9, 620)}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      for (let i = 0; i < steps; i++) {
        const outgoing = cards[i];
        const incoming = cards[i + 1];
        tl.to(
          outgoing,
          { opacity: 0, scale: 0.9, y: -70, filter: "blur(8px)", ease: "power2.inOut", duration: 1 },
          i
        ).to(
          incoming,
          { opacity: 1, z: 0, y: 0, scale: 1, filter: "blur(0px)", ease: "power2.out", duration: 1 },
          i
        );
      }
    }, stage);

    return () => {
      ctx.revert();
      ro.disconnect();
    };
  }, [projects]);

  return (
    <div
      ref={stageRef}
      className="relative mt-2"
      style={{ perspective: "1800px" }}
    >
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
