import { motion } from "framer-motion";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

/** Deterministic pseudo-random so server and client render the same particles. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/** Slowly drifting gold particles (CSS-only, cheap). */
export function FloatingSparkles({ count = 22, seed = 7, className }: { count?: number; seed?: number; className?: string }) {
  const rnd = seeded(seed);
  const items = Array.from({ length: count }, (_, i) => ({
    i,
    left: rnd() * 100,
    top: 60 + rnd() * 50,
    size: 2 + rnd() * 4,
    dur: 16 + rnd() * 18,
    delay: -rnd() * 30,
    dx: (rnd() - 0.5) * 140,
    petal: rnd() > 0.7,
  }));
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {items.map((p) => (
        <span
          key={p.i}
          className={cn(
            "animate-drift absolute bg-gold-light",
            p.petal ? "rounded-[60%_0_60%_0] bg-gold/70" : "rounded-full shadow-[0_0_8px_var(--gold)]",
          )}
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.petal ? p.size * 2.2 : p.size,
              height: p.petal ? p.size * 1.4 : p.size,
              "--dur": `${p.dur}s`,
              "--delay": `${p.delay}s`,
              "--dx": `${p.dx}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** One-time shower of gold petals after the envelope opens. */
export function PetalShower({ count = 36 }: { count?: number }) {
  const rnd = seeded(42);
  const petals = Array.from({ length: count }, (_, i) => ({
    i,
    x: rnd() * 100,
    delay: rnd() * 1.6,
    dur: 3.5 + rnd() * 2.5,
    rot: rnd() * 540 - 270,
    drift: (rnd() - 0.5) * 160,
    size: 8 + rnd() * 10,
    sparkle: rnd() > 0.6,
  }));
  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <motion.span
          key={p.i}
          className={cn(
            "absolute -top-6",
            p.sparkle ? "rounded-full bg-gold-light shadow-[0_0_10px_var(--gold)]" : "bg-gold rounded-[70%_0_70%_0]",
          )}
          style={{
            left: `${p.x}%`,
            width: p.sparkle ? p.size * 0.4 : p.size,
            height: p.sparkle ? p.size * 0.4 : p.size * 0.65,
          }}
          initial={{ y: -20, x: 0, rotate: 0, opacity: 0 }}
          animate={{ y: "110vh", x: p.drift, rotate: p.rot, opacity: [0, 1, 1, 0] }}
          transition={{ duration: p.dur, delay: 0.8 + p.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}
