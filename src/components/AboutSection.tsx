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
    <section id="about" className="relative mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <div className="glass grid grid-cols-1 gap-8 rounded-2xl p-8 sm:grid-cols-[200px_1fr] sm:p-12">
        <h2 className="font-serif text-3xl text-[#f5f7fc] sm:text-4xl">{t.aboutTitle}</h2>

        <div className="max-w-2xl space-y-5 text-base leading-relaxed text-[#eef1f8]/70">
          <p>{t.aboutP1}</p>
          <p>{t.aboutP2}</p>
          <p>{t.aboutP3}</p>

          <ul className="flex flex-wrap gap-2 pt-2">
            {SKILLS.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-white/12 px-2.5 py-1 font-mono text-[11px] text-[#eef1f8]/60"
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
