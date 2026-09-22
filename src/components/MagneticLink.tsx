"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function MagneticLink({
  href,
  className,
  strength = 0.3,
  style,
  onHoverStart,
  onHoverEnd,
  children,
}: {
  href: string;
  className?: string;
  strength?: number;
  style?: CSSProperties;
  onHoverStart?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onHoverEnd?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });
  const isExternal = href.startsWith("http");

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
    onHoverStart?.(e);
  }

  function handleLeave(e: React.MouseEvent<HTMLAnchorElement>) {
    x.set(0);
    y.set(0);
    onHoverEnd?.(e);
  }

  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={className}
      ref={ref}
      style={{ x: springX, y: springY, ...style }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.a>
  );
}
