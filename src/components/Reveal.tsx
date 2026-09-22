"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Variant = "up" | "scale" | "left" | "right" | "soft";

const FROM: Record<Variant, gsap.TweenVars> = {
  up: { y: 26, opacity: 0 },
  scale: { y: 14, scale: 0.94, opacity: 0 },
  left: { x: -26, opacity: 0 },
  right: { x: 26, opacity: 0 },
  soft: { y: 42, scale: 0.97, opacity: 0, filter: "blur(10px)" },
};

const DURATION: Partial<Record<Variant, number>> = {
  soft: 1.3,
};

const EASE: Partial<Record<Variant, string>> = {
  soft: "power4.out",
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: Variant;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(el, FROM[variant], {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: DURATION[variant] ?? 0.9,
        delay: delay / 1000,
        ease: EASE[variant] ?? "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [delay, variant]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
