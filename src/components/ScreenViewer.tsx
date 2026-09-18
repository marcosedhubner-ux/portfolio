"use client";

import { useRef, useState } from "react";
import type { Screen } from "@/lib/projects";

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
  const screen = screens[index];

  const frameRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, active: false });

  function go(delta: number) {
    setIndex((i) => (i + delta + screens.length) % screens.length);
  }

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -4, ry: px * 5, active: true });
  }

  function handleLeave() {
    setTilt({ rx: 0, ry: 0, active: false });
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
        <div className="overflow-hidden">
          <img
            key={screen.file}
            src={`/screens/${slug}/${screen.file}`}
            alt={`${screen.label} screen`}
            className="w-full origin-top will-change-transform"
            style={{
              animation: "fade-up 420ms cubic-bezier(0.22,1,0.36,1) both",
              transform: `scale(${tilt.active ? 1.015 : 1}) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: tilt.active ? "transform 150ms ease-out" : "transform 500ms cubic-bezier(0.22,1,0.36,1)",
            }}
          />
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
              onClick={() => setIndex(i)}
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
