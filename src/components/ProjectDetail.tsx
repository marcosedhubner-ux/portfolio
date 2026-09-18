"use client";

import Link from "next/link";
import { githubUsername, type Project } from "@/lib/projects";
import { useLanguage } from "@/lib/i18n";
import { ScreenViewer } from "@/components/ScreenViewer";
import { LanguageToggle } from "@/components/LanguageToggle";

export function ProjectDetail({ project }: { project: Project }) {
  const { lang, t } = useLanguage();
  const tr = lang === "pt" ? project.pt : project;

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0a0d12]/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-mono text-xs tracking-widest text-[#e8e6e0]/80">
            MH
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/#work"
              className="font-mono text-xs uppercase tracking-widest text-[#e8e6e0]/60 transition-colors hover:text-[#e8e6e0]"
            >
              {t.navBackToPortfolio}
            </Link>
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: project.accent }} />
          <span className="font-mono text-xs uppercase tracking-widest text-[#e8e6e0]/40">
            {t.caseEyebrow}
          </span>
        </div>

        <h1 className="mt-4 font-serif text-4xl text-[#f4f2ec] sm:text-5xl">{project.name}</h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#e8e6e0]/70">{tr.tagline}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
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

        <a
          href={`https://github.com/${githubUsername}/${project.slug}`}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block rounded-full border px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-[#f4f2ec] transition-colors hover:bg-white/5"
          style={{ borderColor: `${project.accent}80` }}
        >
          {t.viewSourceOnGithub}
        </a>

        <div className="mt-12">
          <ScreenViewer slug={project.slug} screens={project.screens} accent={project.accent} />
        </div>

        <section className="mt-16 border-t border-white/10 pt-10">
          <h2 className="font-serif text-2xl text-[#f4f2ec]">{t.whyThisExists}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#e8e6e0]/70">{tr.why}</p>
        </section>

        <section className="mt-14 border-t border-white/10 pt-10">
          <h2 className="font-serif text-2xl text-[#f4f2ec]">{tr.highlightTitle}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#e8e6e0]/70">
            {tr.highlightBody}
          </p>
        </section>

        <section className="mt-14 border-t border-white/10 pt-10">
          <h2 className="font-serif text-2xl text-[#f4f2ec]">{t.security}</h2>
          <ul className="mt-4 max-w-2xl space-y-3">
            {tr.security.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-[#e8e6e0]/60">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#e8e6e0]/30" />
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 border-t border-white/10 pt-10">
          <h2 className="font-serif text-2xl text-[#f4f2ec]">{t.tryIt}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#e8e6e0]/60">
            {t.tryItBody(project.demoPassword)}
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full max-w-2xl border-collapse text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-white/10 text-[#e8e6e0]/40">
                  <th className="py-2 pr-6 font-normal uppercase tracking-widest">{t.role}</th>
                  <th className="py-2 font-normal uppercase tracking-widest">{t.email}</th>
                </tr>
              </thead>
              <tbody>
                {project.demoAccounts.map((account) => (
                  <tr key={account.email} className="border-b border-white/5">
                    <td className="py-2 pr-6 text-[#e8e6e0]/70">{account.role}</td>
                    <td className="py-2 text-[#e8e6e0]/70">{account.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-16 border-t border-white/10 pt-10">
          <Link
            href="/#work"
            className="font-mono text-xs uppercase tracking-widest text-[#e8e6e0]/50 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#f4f2ec] hover:decoration-[#f4f2ec]/60"
          >
            {t.backToAllProjects}
          </Link>
        </div>
      </main>
    </>
  );
}
