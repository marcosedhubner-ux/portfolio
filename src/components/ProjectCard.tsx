"use client";

import { useRef, useState } from "react";
import Link from "next/link";
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

  const imgWrapRef = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, active: false });

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = imgWrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -7, ry: px * 9, active: true });
  }

  function handleLeave() {
    setTilt({ rx: 0, ry: 0, active: false });
  }

  return (
    <article
      className={`glass group relative flex flex-col overflow-hidden rounded-2xl transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 ${
        featured ? "lg:col-span-2 lg:flex-row" : ""
      }`}
      style={{ boxShadow: `0 0 0 1px ${project.accent}18, 0 20px 60px -24px ${project.accent}40` }}
    >
      {cover && (
        <Link
          ref={imgWrapRef}
          href={`/projects/${project.slug}`}
          className={`relative block overflow-hidden [perspective:800px] ${featured ? "lg:w-1/2 lg:shrink-0" : ""}`}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          <img
            src={`/screens/${project.slug}/${cover.file}`}
            alt=""
            className={`w-full object-cover object-top opacity-90 will-change-transform ${
              featured ? "h-44 sm:h-52 lg:h-full" : "h-44 sm:h-52"
            }`}
            style={{
              transform: `scale(${tilt.active ? 1.06 : 1}) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: tilt.active ? "transform 120ms ease-out" : "transform 500ms cubic-bezier(0.22,1,0.36,1)",
            }}
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

      <div className="flex flex-1 flex-col p-6">
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
