"use client";

import { projects } from "@/lib/projects";
import { Reveal } from "./Reveal";
import { ProjectsZoomDeck } from "./ProjectsZoomDeck";

export function ProjectsSection() {
  return (
    <section id="work" className="relative mx-auto max-w-5xl px-6 py-14 sm:py-20">
      <Reveal variant="soft">
        <ProjectsZoomDeck projects={projects} />
      </Reveal>
    </section>
  );
}
