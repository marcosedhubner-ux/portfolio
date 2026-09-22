"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";

const SECTION_IDS = ["work", "about", "contact"] as const;

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={`group/nav relative pb-1 transition-colors duration-200 ${
        active ? "text-[#eef1f8]" : "hover:text-[#eef1f8]"
      }`}
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#2f6fed]/50 transition-all duration-300 ease-out group-hover/nav:w-full" />
      {active && (
        <motion.span
          layoutId="nav-active"
          className="absolute -bottom-1 left-0 h-px w-full bg-[#2f6fed]"
          style={{ boxShadow: "0 0 8px 1px rgba(47,111,237,0.7)" }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
    </a>
  );
}

export function Nav() {
  const { t } = useLanguage();
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header id="site-nav" className="fade-up fixed inset-x-0 top-0 z-30 flex justify-center px-4 pt-4 sm:pt-6">
      <div className="glass-nav flex w-full max-w-2xl items-center justify-between gap-4 rounded-full px-5 py-3 transition-shadow duration-300 hover:shadow-[0_8px_32px_-12px_rgba(47,111,237,0.35)] sm:px-6">
        <a
          href="#top"
          className="font-mono text-xs tracking-widest text-[#eef1f8] transition-transform duration-200 hover:scale-110"
        >
          MH
        </a>
        <div className="flex items-center gap-5 sm:gap-7">
          <nav className="hidden gap-6 font-mono text-xs uppercase tracking-widest text-[#eef1f8]/55 sm:flex">
            <NavLink href="#work" active={active === "work"}>
              {t.navWork}
            </NavLink>
            <NavLink href="#about" active={active === "about"}>
              {t.navAbout}
            </NavLink>
            <NavLink href="#contact" active={active === "contact"}>
              {t.navContact}
            </NavLink>
          </nav>
          <span className="hidden h-4 w-px bg-white/15 sm:block" />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
