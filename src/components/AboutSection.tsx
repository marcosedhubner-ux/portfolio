const SKILLS = [
  "JavaScript / TypeScript",
  "Node.js & Express",
  "React & Next.js",
  "PostgreSQL & Prisma",
  "Socket.IO / WebSockets",
  "Python",
  "PHP",
  "Puppeteer & automation",
];

export function AboutSection() {
  return (
    <section id="about" className="border-t border-white/10 bg-[#0d1117]">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-20 sm:grid-cols-[200px_1fr] sm:py-28">
        <h2 className="font-serif text-3xl text-[#f4f2ec] sm:text-4xl">About</h2>

        <div className="max-w-2xl space-y-5 text-base leading-relaxed text-[#e8e6e0]/70">
          <p>
            I&apos;m a self-taught full-stack developer with two years of hands-on production
            experience — from freelance landing pages to systems currently running in production
            for a small business, moving between frontend, backend and automation depending on
            what the week needs.
          </p>
          <p>
            Recent work includes a WhatsApp AI agent with audio-message processing, a system for
            routing messages across multiple WhatsApp instances, and Puppeteer-based scraping
            tools built to work around anti-bot protections. Most of what I know came from
            shipping real things for real clients, end to end, rather than from a classroom.
          </p>
          <p>
            The five projects on this page are what I build when nobody is waiting on a deadline:
            a chance to slow down on the part that usually gets skipped — the state machine, the
            concurrency edge case, the algorithm — and get it right.
          </p>

          <ul className="flex flex-wrap gap-2 pt-2">
            {SKILLS.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[11px] text-[#e8e6e0]/60"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
