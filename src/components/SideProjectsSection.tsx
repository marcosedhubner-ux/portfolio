"use client";

import { githubUsername, sideProjects } from "@/lib/projects";
import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function SideProjectsSection() {
  const { lang, t } = useLanguage();

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <Reveal>
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-3xl text-[#f5f7fc] sm:text-4xl">{t.alsoBuiltTitle}</h2>
          <span className="font-mono text-xs uppercase tracking-widest text-[#eef1f8]/35">
            {t.alsoBuiltCount(sideProjects.length)}
          </span>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#eef1f8]/50">{t.alsoBuiltSubtitle}</p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {sideProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 90}>
            <a
              href={`https://github.com/${githubUsername}/${project.slug}`}
              target="_blank"
              rel="noreferrer"
              className="glass-sm group block rounded-xl p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#2f6fed]/50 hover:shadow-[0_16px_40px_-16px_rgba(47,111,237,0.45)]"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-lg text-[#f5f7fc]">{project.name}</h3>
                <span className="font-mono text-xs uppercase tracking-widest text-[#eef1f8]/35 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#eef1f8]">
                  &#8599;
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#eef1f8]/50">
                {lang === "pt" ? project.taglinePt : project.tagline}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[11px] text-[#eef1f8]/45 transition-colors duration-200 group-hover:border-white/25"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
