"use client";

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

  return (
    <article
      className={`glass group relative flex flex-col overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1 ${
        featured ? "lg:col-span-2 lg:flex-row" : ""
      }`}
      style={{ boxShadow: `0 0 0 1px ${project.accent}18, 0 20px 60px -24px ${project.accent}40` }}
    >
      {cover && (
        <Link
          href={`/projects/${project.slug}`}
          className={`relative block overflow-hidden ${featured ? "lg:w-1/2 lg:shrink-0" : ""}`}
        >
          <img
            src={`/screens/${project.slug}/${cover.file}`}
            alt=""
            className={`w-full object-cover object-top opacity-90 transition-transform duration-500 group-hover:scale-[1.03] ${
              featured ? "h-44 sm:h-52 lg:h-full" : "h-44 sm:h-52"
            }`}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: featured
                ? `linear-gradient(90deg, transparent 55%, ${project.accent}22 100%)`
                : `linear-gradient(180deg, transparent 40%, ${project.accent}22 100%)`,
            }}
          />
        </Link>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#eef1f8]/30">{String(index + 1).padStart(2, "0")}</span>
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: project.accent, boxShadow: `0 0 8px 1px ${project.accent}aa` }}
          />
        </div>

        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <Link href={`/projects/${project.slug}`}>
            <h3 className="font-serif text-2xl text-[#f5f7fc] transition-colors group-hover:text-white">
              {project.name}
            </h3>
          </Link>
          <div className="flex gap-4">
            <Link
              href={`/projects/${project.slug}`}
              className="font-mono text-[11px] uppercase tracking-widest text-[#eef1f8]/45 transition-colors hover:text-[#eef1f8]"
            >
              {t.caseStudy}
            </Link>
            <a
              href={`https://github.com/${githubUsername}/${project.slug}`}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-widest text-[#eef1f8]/45 transition-colors hover:text-[#eef1f8]"
            >
              {t.viewCode}
            </a>
          </div>
        </div>

        <p className="mt-3 text-base text-[#eef1f8]/80">{tagline}</p>
        <p className="mt-2 text-sm leading-relaxed text-[#eef1f8]/50">{detail}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border px-2.5 py-1 font-mono text-[11px] text-[#eef1f8]/55"
              style={{ borderColor: `${project.accent}40` }}
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
