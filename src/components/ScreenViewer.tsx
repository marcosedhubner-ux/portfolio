"use client";

import { useState } from "react";
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

  function go(delta: number) {
    setIndex((i) => (i + delta + screens.length) % screens.length);
  }

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-white/10 bg-[#11151c]">
        <div className="flex items-center gap-3 border-b border-white/10 bg-[#161b23] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <div className="flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-center font-mono text-[11px] text-[#e8e6e0]/50">
            {screen.path}
          </div>
        </div>
        <img
          src={`/screens/${slug}/${screen.file}`}
          alt={`${screen.label} screen`}
          className="w-full"
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous screen"
          className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-xs text-[#e8e6e0]/60 transition-colors hover:text-[#f4f2ec]"
        >
          &#8592;
        </button>

        <div className="flex flex-wrap justify-center gap-2">
          {screens.map((s, i) => (
            <button
              key={s.file}
              type="button"
              onClick={() => setIndex(i)}
              className="rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors"
              style={
                i === index
                  ? { borderColor: accent, color: "#f4f2ec", backgroundColor: `${accent}22` }
                  : { borderColor: "rgba(255,255,255,0.15)", color: "rgba(232,230,224,0.5)" }
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
          className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-xs text-[#e8e6e0]/60 transition-colors hover:text-[#f4f2ec]"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}
