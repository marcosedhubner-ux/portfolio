"use client";

import { projects } from "@/lib/projects";
import { useLanguage } from "@/lib/i18n";
import { ProjectRow } from "./ProjectRow";

export function ProjectsSection() {
  const { t } = useLanguage();

  return (
    <section id="work" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <div className="flex items-baseline justify-between">
        <h2 className="font-serif text-3xl text-[#f4f2ec] sm:text-4xl">{t.workTitle}</h2>
        <span className="font-mono text-xs uppercase tracking-widest text-[#e8e6e0]/40">
          {t.workCount(projects.length)}
        </span>
      </div>

      <div>
        {projects.map((project, index) => (
          <ProjectRow key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
