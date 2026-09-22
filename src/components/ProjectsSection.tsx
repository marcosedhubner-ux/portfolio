"use client";

import { projects } from "@/lib/projects";
import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { ProjectsZoomDeck } from "./ProjectsZoomDeck";

export function ProjectsSection() {
  const { t } = useLanguage();

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

      <ProjectsZoomDeck projects={projects} />
    </section>
  );
}
