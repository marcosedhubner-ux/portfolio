"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { githubUsername, type Project } from "@/lib/projects";
import { useLanguage } from "@/lib/i18n";

export function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const { lang, t } = useLanguage();
  const tagline = lang === "pt" ? project.pt.tagline : project.tagline;
  const detail = lang === "pt" ? project.pt.detail : project.detail;
  const cover = project.screens[0];

  const articleRef = useRef<HTMLElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const imgScale = useMotionValue(1);
  const springRx = useSpring(rx, { stiffness: 220, damping: 20, mass: 0.4 });
  const springRy = useSpring(ry, { stiffness: 220, damping: 20, mass: 0.4 });
  const springScale = useSpring(imgScale, { stiffness: 220, damping: 22 });

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const el = articleRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rx.set((py - 0.5) * -6);
    ry.set((px - 0.5) * 8);
    imgScale.set(1.05);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }

  function handleLeave() {
    rx.set(0);
    ry.set(0);
    imgScale.set(1);
  }

  return (
    <article
      ref={articleRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`glass group relative flex flex-col overflow-hidden rounded-2xl transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 ${
        featured ? "lg:col-span-2 lg:flex-row" : ""
      }`}
      style={{ boxShadow: `0 0 0 1px ${project.accent}18, 0 20px 60px -24px ${project.accent}40` }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), ${project.accent}20, transparent 60%)`,
        }}
      />

      {cover && (
        <Link
          href={`/projects/${project.slug}`}
          className={`relative block overflow-hidden [perspective:800px] ${featured ? "lg:w-1/2 lg:shrink-0" : ""}`}
        >
          <motion.img
            src={`/screens/${project.slug}/${cover.file}`}
            alt=""
            className={`w-full object-cover object-top opacity-90 will-change-transform ${
              featured ? "h-44 sm:h-52 lg:h-full lg:object-right" : "h-44 sm:h-52"
            }`}
            style={{ rotateX: springRx, rotateY: springRy, scale: springScale }}
          />
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              background: featured
                ? `linear-gradient(90deg, transparent 55%, ${project.accent}22 100%)`
                : `linear-gradient(180deg, transparent 40%, ${project.accent}22 100%)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ boxShadow: `inset 0 0 40px 4px ${project.accent}30` }}
          />
        </Link>
      )}

      <div className="relative z-20 flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#eef1f8]/30">{String(index + 1).padStart(2, "0")}</span>
          <span
            className="h-1.5 w-1.5 rounded-full transition-[box-shadow] duration-300 group-hover:scale-125"
            style={{ backgroundColor: project.accent, boxShadow: `0 0 8px 1px ${project.accent}aa` }}
          />
        </div>

        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <Link href={`/projects/${project.slug}`}>
            <h3 className="font-serif text-2xl text-[#f5f7fc] transition-colors duration-300 group-hover:text-white">
              {project.name}
            </h3>
          </Link>
          <div className="flex gap-4">
            <Link
              href={`/projects/${project.slug}`}
              className="group/link relative font-mono text-[11px] uppercase tracking-widest text-[#eef1f8]/45 transition-colors duration-200 hover:text-[#eef1f8]"
            >
              {t.caseStudy}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 ease-out group-hover/link:w-full"
                style={{ backgroundColor: project.accent }}
              />
            </Link>
            <a
              href={`https://github.com/${githubUsername}/${project.slug}`}
              target="_blank"
              rel="noreferrer"
              className="group/link relative font-mono text-[11px] uppercase tracking-widest text-[#eef1f8]/45 transition-colors duration-200 hover:text-[#eef1f8]"
            >
              {t.viewCode}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 ease-out group-hover/link:w-full"
                style={{ backgroundColor: project.accent }}
              />
            </a>
          </div>
        </div>

        <p className="mt-3 text-base text-[#eef1f8]/80">{tagline}</p>
        <p className="mt-2 text-sm leading-relaxed text-[#eef1f8]/50">{detail}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border px-2.5 py-1 font-mono text-[11px] text-[#eef1f8]/55 transition-all duration-200 hover:-translate-y-0.5"
              style={{ borderColor: `${project.accent}40` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${project.accent}1a`;
                e.currentTarget.style.borderColor = `${project.accent}90`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = `${project.accent}40`;
              }}
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
