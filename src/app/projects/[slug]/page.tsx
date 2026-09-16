import Link from "next/link";
import { notFound } from "next/navigation";
import { githubUsername, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Marcos Hubner`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0a0d12]/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-mono text-xs tracking-widest text-[#e8e6e0]/80">
            MH
          </Link>
          <Link
            href="/#work"
            className="font-mono text-xs uppercase tracking-widest text-[#e8e6e0]/60 transition-colors hover:text-[#e8e6e0]"
          >
            ← Portfolio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: project.accent }} />
          <span className="font-mono text-xs uppercase tracking-widest text-[#e8e6e0]/40">
            Case study
          </span>
        </div>

        <h1 className="mt-4 font-serif text-4xl text-[#f4f2ec] sm:text-5xl">{project.name}</h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#e8e6e0]/70">{project.tagline}</p>

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
          View source on GitHub &#8599;
        </a>

        <section className="mt-16 border-t border-white/10 pt-10">
          <h2 className="font-serif text-2xl text-[#f4f2ec]">Why this exists</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#e8e6e0]/70">{project.why}</p>
        </section>

        <section className="mt-14 border-t border-white/10 pt-10">
          <h2 className="font-serif text-2xl text-[#f4f2ec]">{project.highlightTitle}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#e8e6e0]/70">
            {project.highlightBody}
          </p>
        </section>

        <section className="mt-14 border-t border-white/10 pt-10">
          <h2 className="font-serif text-2xl text-[#f4f2ec]">Security</h2>
          <ul className="mt-4 max-w-2xl space-y-3">
            {project.security.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-[#e8e6e0]/60">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#e8e6e0]/30" />
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 border-t border-white/10 pt-10">
          <h2 className="font-serif text-2xl text-[#f4f2ec]">Try it</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#e8e6e0]/60">
            Clone the repo, run the seed script, and log in with any of the demo accounts below
            (password <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs">{project.demoPassword}</code> for all).
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full max-w-2xl border-collapse text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-white/10 text-[#e8e6e0]/40">
                  <th className="py-2 pr-6 font-normal uppercase tracking-widest">Role</th>
                  <th className="py-2 font-normal uppercase tracking-widest">Email</th>
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
            ← Back to all projects
          </Link>
        </div>
      </main>
    </>
  );
}
