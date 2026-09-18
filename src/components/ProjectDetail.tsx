"use client";

import Link from "next/link";
import { githubUsername, type Project } from "@/lib/projects";
import { useLanguage } from "@/lib/i18n";
import { ScreenViewer } from "@/components/ScreenViewer";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Reveal } from "@/components/Reveal";

export function ProjectDetail({ project }: { project: Project }) {
  const { lang, t } = useLanguage();
  const tr = lang === "pt" ? project.pt : project;

  return (
    <>
      <header className="fade-up fixed inset-x-0 top-0 z-30 flex justify-center px-4 pt-4 sm:pt-6">
        <div className="glass-nav flex w-full max-w-2xl items-center justify-between gap-4 rounded-full px-5 py-3 sm:px-6">
          <Link
            href="/"
            className="font-mono text-xs tracking-widest text-[#eef1f8] transition-transform duration-200 hover:scale-110"
          >
            MH
          </Link>
          <div className="flex items-center gap-5 sm:gap-7">
            <Link
              href="/#work"
              className="group/nav relative font-mono text-xs uppercase tracking-widest text-[#eef1f8]/55 transition-colors duration-200 hover:text-[#eef1f8]"
            >
              {t.navBackToPortfolio}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#2f6fed] transition-all duration-300 ease-out group-hover/nav:w-full" />
            </Link>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-24 pt-36 sm:pb-32 sm:pt-44">
        <div className="fade-up flex items-center gap-3">
          <span
            className="h-2 w-2 animate-pulse rounded-full"
            style={{ backgroundColor: project.accent, boxShadow: `0 0 8px 2px ${project.accent}90` }}
          />
          <span className="font-mono text-xs uppercase tracking-widest text-[#eef1f8]/40">
            {t.caseEyebrow}
          </span>
        </div>

        <h1 className="fade-up mt-4 font-serif text-4xl text-[#f5f7fc] sm:text-5xl" style={{ animationDelay: "70ms" }}>
          {project.name}
        </h1>
        <p
          className="fade-up mt-4 max-w-xl text-lg leading-relaxed text-[#eef1f8]/70"
          style={{ animationDelay: "140ms" }}
        >
          {tr.tagline}
        </p>

        <ul className="fade-up mt-6 flex flex-wrap gap-2" style={{ animationDelay: "200ms" }}>
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border px-2.5 py-1 font-mono text-[11px] text-[#eef1f8]/60 transition-all duration-200 hover:-translate-y-0.5"
              style={{ borderColor: `${project.accent}55` }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${project.accent}1a`)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {tech}
            </li>
          ))}
        </ul>

        <a
          href={`https://github.com/${githubUsername}/${project.slug}`}
          target="_blank"
          rel="noreferrer"
          className="glass-sm fade-up mt-8 inline-block rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-[#f5f7fc] transition-all duration-200 hover:-translate-y-0.5"
          style={{ animationDelay: "260ms", borderColor: `${project.accent}80` }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 10px 28px -12px ${project.accent}70`;
            e.currentTarget.style.backgroundColor = `${project.accent}14`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.backgroundColor = "";
          }}
        >
          {t.viewSourceOnGithub}
        </a>

        <Reveal>
          <div
            className="mt-12 rounded-2xl p-[1px]"
            style={{ background: `linear-gradient(160deg, ${project.accent}55, transparent 60%)` }}
          >
            <ScreenViewer slug={project.slug} screens={project.screens} accent={project.accent} />
          </div>
        </Reveal>

        <Reveal>
          <section className="glass mt-10 rounded-2xl p-7 sm:p-9">
            <h2 className="font-serif text-2xl text-[#f5f7fc]">{t.whyThisExists}</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#eef1f8]/70">{tr.why}</p>
          </section>
        </Reveal>

        <Reveal delay={60}>
          <section className="glass mt-6 rounded-2xl p-7 sm:p-9">
            <h2 className="font-serif text-2xl text-[#f5f7fc]">{tr.highlightTitle}</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#eef1f8]/70">
              {tr.highlightBody}
            </p>
          </section>
        </Reveal>

        <Reveal delay={60}>
          <section className="glass mt-6 rounded-2xl p-7 sm:p-9">
            <h2 className="font-serif text-2xl text-[#f5f7fc]">{t.security}</h2>
            <ul className="mt-4 max-w-2xl space-y-3">
              {tr.security.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-[#eef1f8]/60">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#eef1f8]/30" />
                  {point}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal delay={60}>
          <section className="glass mt-6 rounded-2xl p-7 sm:p-9">
            <h2 className="font-serif text-2xl text-[#f5f7fc]">{t.tryIt}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#eef1f8]/60">
              {t.tryItBody(project.demoPassword)}
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full max-w-2xl border-collapse text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-[#eef1f8]/40">
                    <th className="py-2 pr-6 font-normal uppercase tracking-widest">{t.role}</th>
                    <th className="py-2 font-normal uppercase tracking-widest">{t.email}</th>
                  </tr>
                </thead>
                <tbody>
                  {project.demoAccounts.map((account) => (
                    <tr
                      key={account.email}
                      className="border-b border-white/5 transition-colors duration-150 hover:bg-white/[0.03]"
                    >
                      <td className="py-2 pr-6 text-[#eef1f8]/70">{account.role}</td>
                      <td className="py-2 text-[#eef1f8]/70">{account.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </Reveal>

        <div className="mt-10 text-center">
          <Link
            href="/#work"
            className="group/back relative font-mono text-xs uppercase tracking-widest text-[#eef1f8]/50 transition-colors duration-200 hover:text-[#f5f7fc]"
          >
            {t.backToAllProjects}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#2f6fed] transition-all duration-300 ease-out group-hover/back:w-full" />
          </Link>
        </div>
      </main>
    </>
  );
}
