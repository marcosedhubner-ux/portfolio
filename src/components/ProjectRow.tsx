"use client";

import Link from "next/link";
import { githubUsername, type Project } from "@/lib/projects";
import { useLanguage } from "@/lib/i18n";

export function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { lang, t } = useLanguage();
  const tagline = lang === "pt" ? project.pt.tagline : project.tagline;
  const detail = lang === "pt" ? project.pt.detail : project.detail;

  return (
    <div className="group grid grid-cols-1 gap-4 border-t border-white/10 py-10 sm:grid-cols-[80px_1fr]">
      <div className="flex sm:flex-col sm:items-start sm:gap-3">
        <span className="font-mono text-sm text-[#e8e6e0]/30">{String(index + 1).padStart(2, "0")}</span>
        <span
          className="ml-3 h-1.5 w-1.5 rounded-full sm:ml-0"
          style={{ backgroundColor: project.accent }}
        />
      </div>

      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h3 className="font-serif text-2xl text-[#f4f2ec] sm:text-3xl">{project.name}</h3>
          <div className="flex gap-5">
            <Link
              href={`/projects/${project.slug}`}
              className="font-mono text-xs uppercase tracking-widest text-[#e8e6e0]/50 transition-colors group-hover:text-[#f4f2ec]"
            >
              {t.caseStudy}
            </Link>
            <a
              href={`https://github.com/${githubUsername}/${project.slug}`}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-[#e8e6e0]/50 transition-colors group-hover:text-[#f4f2ec]"
            >
              {t.viewCode}
            </a>
          </div>
        </div>

        <p className="mt-3 text-base text-[#e8e6e0]/80">{tagline}</p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#e8e6e0]/55">{detail}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border px-2.5 py-1 font-mono text-[11px] text-[#e8e6e0]/60"
              style={{ borderColor: `${project.accent}55` }}
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
