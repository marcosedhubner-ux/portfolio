"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, type Variants } from "motion/react";
import type { Screen } from "@/lib/projects";

const screenVariants: Variants = {
  enter: (d: number) => ({ opacity: 0, x: d * 24 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -24 }),
};

export function ScreenViewer({
  slug,
  screens,
  accent,
}: {
  slug: string;
  screens: Screen[];
  accent: string;
}) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const screen = screens[index];

  const frameRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 240, damping: 22, mass: 0.4 });
  const springRy = useSpring(ry, { stiffness: 240, damping: 22, mass: 0.4 });

  function go(delta: number) {
    setDir(delta);
    setIndex((i) => (i + delta + screens.length) % screens.length);
  }

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(py * -4);
    ry.set(px * 5);
  }

  function handleLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <div className="glass rounded-2xl p-2 sm:p-3">
      <div
        ref={frameRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0d16] [perspective:1000px]"
      >
        <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <div className="flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-center font-mono text-[11px] text-[#eef1f8]/50">
            {screen.path}
          </div>
        </div>
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.img
              key={screen.file}
              custom={dir}
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              src={`/screens/${slug}/${screen.file}`}
              alt={`${screen.label} screen`}
              className="w-full origin-top will-change-transform"
              style={{ rotateX: springRx, rotateY: springRy }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center justify-between px-2 py-3 sm:px-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous screen"
          className="rounded-full border border-white/12 px-3 py-1.5 font-mono text-xs text-[#eef1f8]/60 transition-all duration-200 hover:-translate-x-0.5 hover:border-white/25 hover:text-[#f5f7fc]"
        >
          &#8592;
        </button>

        <div className="flex flex-wrap justify-center gap-2">
          {screens.map((s, i) => (
            <button
              key={s.file}
              type="button"
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
              }}
              className="rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-all duration-200 hover:-translate-y-0.5"
              style={
                i === index
                  ? { borderColor: accent, color: "#f5f7fc", backgroundColor: `${accent}22` }
                  : { borderColor: "rgba(255,255,255,0.14)", color: "rgba(238,241,248,0.5)" }
              }
            >
              {s.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next screen"
          className="rounded-full border border-white/12 px-3 py-1.5 font-mono text-xs text-[#eef1f8]/60 transition-all duration-200 hover:translate-x-0.5 hover:border-white/25 hover:text-[#f5f7fc]"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}
