import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { ART, EVENT } from "@/config/event";
import { ArchOutline, Corners, Diamond, Mandala } from "./Ornaments";
import { EASE } from "./motion";
import { FloatingSparkles } from "./Sparkles";

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mandalaY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const show = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 1.3, delay, ease: EASE },
  });

  return (
    <section
      id="top"
      ref={ref}
      className="bg-royal frame-double relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-20"
    >
      <Corners />
      <motion.div
        style={{ y: mandalaY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <Mandala className="animate-spin-slow size-[150vmin] max-w-none opacity-[0.10] sm:size-[115vmin]" />
      </motion.div>
      <FloatingSparkles count={26} />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center"
      >
        {/* GANESHA IMAGE SLOT — replace ART.ganesha in src/config/event.ts */}
        <motion.div
          className="relative mb-6 h-40 w-32 sm:h-52 sm:w-40"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={
            ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }
          }
          transition={{ duration: 1.6, delay: 0.1, ease: EASE }}
        >
          <div className="animate-glow absolute inset-4 rounded-full bg-gold/25 blur-2xl" />
          <ArchOutline className="absolute inset-0 size-full" />
          <img
            src={ART.ganesha}
            alt="Lord Ganesha"
            width={640}
            height={640}
            fetchPriority="high"
            className="absolute inset-x-3 bottom-3 top-7 m-auto size-[calc(100%-1.5rem)] object-contain drop-shadow-[0_0_12px_var(--gold)]"
          />
        </motion.div>

        <motion.p
          {...show(0.4)}
          className="font-deva text-xl text-gold sm:text-2xl"
          lang="hi"
        >
          <span className="text-gold-shimmer">{EVENT.shloka}</span>
        </motion.p>

        <motion.p
          {...show(0.7)}
          className="font-display mt-5 text-[0.65rem] text-cream/80 sm:text-xs"
        >
          {EVENT.blessingLine}
        </motion.p>

        <motion.h2
          {...show(0.9)}
          className="font-display mt-3 text-sm text-gold sm:text-lg"
          style={{ letterSpacing: "0.45em" }}
        >
          {EVENT.occasion}
        </motion.h2>

        <h1 className="font-names my-6 flex flex-col items-center gap-0 italic leading-[1.05] sm:my-8 sm:flex-row sm:gap-5">
          <NameReveal text={EVENT.groom} delay={1.1} ready={ready} />
          <motion.span
            className="text-gold-shimmer text-[2.6rem] sm:text-6xl"
            initial={{ opacity: 0 }}
            animate={
              ready
                ? { opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }
                : { opacity: 0 }
            }
            transition={{
              duration: 3.5,
              delay: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            &amp;
          </motion.span>
          <NameReveal text={EVENT.bride} delay={1.5} ready={ready} />
        </h1>

        <motion.div {...show(2)} className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="hidden h-px w-14 bg-gold/60 sm:block" />
            {/* <p
              className="font-display text-gold-shimmer text-[0.7rem] sm:text-sm"
              style={{ letterSpacing: "0.18em" }}
            >
              {EVENT.dateLabel}
            </p> */}
            {/* <span className="hidden h-px w-14 bg-gold/60 sm:block" /> */}
          </div>
          {/* <p className="font-body text-lg italic text-cream/85">{EVENT.city}</p> */}
        </motion.div>
      </motion.div>

      <motion.a
        href="#invitation"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-gold-light/80"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2.6, duration: 1 }}
      >
        <span className="font-display text-[0.6rem]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Diamond className="size-3.5" />
        </motion.span>
      </motion.a>
    </section>
  );
}

function NameReveal({
  text,
  delay,
  ready,
}: {
  text: string;
  delay: number;
  ready: boolean;
}) {
  return (
    <span className="inline-flex" aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="text-gold-shimmer inline-block pb-2 pr-[0.02em] text-[3.6rem] sm:text-7xl md:text-8xl"
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={
            ready
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 24, filter: "blur(8px)" }
          }
          transition={{ duration: 1.1, delay: delay + i * 0.08, ease: EASE }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}
