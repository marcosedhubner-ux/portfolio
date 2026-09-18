"use client";

import { useLanguage } from "@/lib/i18n";

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
  const { t } = useLanguage();

  return (
    <section id="about" className="border-t border-white/10 bg-[#0d1117]">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-20 sm:grid-cols-[200px_1fr] sm:py-28">
        <h2 className="font-serif text-3xl text-[#f4f2ec] sm:text-4xl">{t.aboutTitle}</h2>

        <div className="max-w-2xl space-y-5 text-base leading-relaxed text-[#e8e6e0]/70">
          <p>{t.aboutP1}</p>
          <p>{t.aboutP2}</p>
          <p>{t.aboutP3}</p>

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
