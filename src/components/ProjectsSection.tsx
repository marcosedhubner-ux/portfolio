"use client";

import { projects } from "@/lib/projects";
import { useLanguage } from "@/lib/i18n";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { StackedProjectsDeck } from "./StackedProjectsDeck";

const LEAD_COUNT = 2;

export function ProjectsSection() {
  const { t } = useLanguage();
  const lead = projects.slice(0, LEAD_COUNT);
  const stacked = projects.slice(LEAD_COUNT);

  return (
    <section id="work" className="relative mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <Reveal>
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-3xl text-[#f5f7fc] sm:text-4xl">{t.workTitle}</h2>
          <span className="font-mono text-xs uppercase tracking-widest text-[#eef1f8]/35">
            {t.workCount(projects.length)}
          </span>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {lead.map((project, index) => (
          <Reveal key={project.slug} variant="soft" delay={index * 120}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>

      {stacked.length > 0 && (
        <Reveal variant="scale" className="mt-16">
          <StackedProjectsDeck projects={stacked} startIndex={LEAD_COUNT} />
        </Reveal>
      )}
    </section>
  );
}
