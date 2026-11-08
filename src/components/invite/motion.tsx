import { motion, type HTMLMotionProps } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function ScrollCue({ href, label, tone = "light" }: { href: string; label: string; tone?: "light" | "dark" }) {
  return (
    <motion.a
      href={href}
      aria-label={`Scroll to ${label}`}
      className={`absolute bottom-5 left-1/2 z-10 -translate-x-1/2 ${
        tone === "light" ? "text-gold-light/80" : "text-gold-dark"
      }`}
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <ChevronDown aria-hidden="true" className="size-7" strokeWidth={1.5} />
    </motion.a>
  );
}

/** Fade + slide up when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number; className?: string } & Omit<
  HTMLMotionProps<"div">,
  "children"
>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Section heading with a small diamond-flanked label. */
export function SectionLabel({ children, tone = "gold" }: { children: ReactNode; tone?: "gold" | "maroon" }) {
  return (
    <p
      className={
        tone === "gold"
          ? "font-display text-[0.7rem] text-gold-light/90 sm:text-xs"
          : "font-display text-[0.7rem] text-gold-dark sm:text-xs"
      }
    >
      {children}
    </p>
  );
}
