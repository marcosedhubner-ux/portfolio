"use client";

import { githubUsername, sideProjects } from "@/lib/projects";
import { useLanguage } from "@/lib/i18n";

export function SideProjectsSection() {
  const { lang, t } = useLanguage();

  return (
    <section className="border-t border-white/10 bg-[#0d1117]">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-3xl text-[#f4f2ec] sm:text-4xl">{t.alsoBuiltTitle}</h2>
          <span className="font-mono text-xs uppercase tracking-widest text-[#e8e6e0]/40">
            {t.alsoBuiltCount(sideProjects.length)}
          </span>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#e8e6e0]/55">
          {t.alsoBuiltSubtitle}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {sideProjects.map((project) => (
            <a
              key={project.slug}
              href={`https://github.com/${githubUsername}/${project.slug}`}
              target="_blank"
              rel="noreferrer"
              className="group rounded-lg border border-white/10 p-6 transition-colors hover:border-white/25"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-xl text-[#f4f2ec]">{project.name}</h3>
                <span className="font-mono text-xs uppercase tracking-widest text-[#e8e6e0]/40 transition-colors group-hover:text-[#f4f2ec]">
                  &#8599;
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#e8e6e0]/55">
                {lang === "pt" ? project.taglinePt : project.tagline}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[11px] text-[#e8e6e0]/50"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
