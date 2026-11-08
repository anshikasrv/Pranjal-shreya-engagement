import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { ART, EVENT } from "@/config/event";
import { LeafCorner, LotusDivider } from "./Ornaments";
import { EASE, Reveal, ScrollCue } from "./motion";

export function Invitation() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const floralY = useTransform(scrollYProgress, [0, 1], ["-8%", "10%"]);
  const floralY2 = useTransform(scrollYProgress, [0, 1], ["10%", "-6%"]);

  return (
    <section id="invitation" ref={ref} className="bg-paper relative overflow-hidden px-6 py-24 sm:py-32">
      <LeafCorner className="absolute left-0 top-0 size-28 sm:size-40" />
      <LeafCorner className="absolute bottom-0 left-0 size-24 -scale-y-100 sm:size-36" />

      {/* FLORAL ARTWORK SLOT — replace ART.floral in src/config/event.ts */}
      <motion.div style={{ y: floralY }} className="pointer-events-none absolute -right-14 top-6 w-36 opacity-90 sm:-right-6 sm:w-56 lg:right-6 lg:w-64">
        <img src={ART.floral} alt="" width={480} height={800} loading="lazy" className="animate-sway w-full" />
      </motion.div>
      <motion.div
        style={{ y: floralY2 }}
        className="pointer-events-none absolute -bottom-10 -left-16 hidden w-44 -scale-x-100 opacity-60 md:block lg:left-4"
      >
        <img src={ART.floral} alt="" width={480} height={800} loading="lazy" className="animate-sway w-full [animation-delay:-3s]" />
      </motion.div>

      <div className="relative mx-auto max-w-2xl text-center">
        <Reveal className="mb-4 flex justify-center">
          {/* RIBBON SLOT — replace ART.ribbon in src/config/event.ts */}
          <img src={ART.ribbon} alt="" width={480} height={360} loading="lazy" className="h-auto w-24 drop-shadow-md sm:w-28" />
        </Reveal>
        <Reveal>
          <p className="font-display text-xs text-gold-dark">Invitation</p>
        </Reveal>
        <LotusDivider className="my-8" />

        <div className="font-body space-y-1 text-[1.3rem] italic leading-snug min-[400px]:text-[1.45rem] text-maroon sm:text-3xl">
          {EVENT.invitationLines.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.1, delay: i * 0.22, ease: EASE }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <LotusDivider className="my-8" />

        <Reveal delay={0.2}>
          <p className="font-body mx-auto max-w-md text-lg text-maroon/80 sm:text-xl">{EVENT.closingLine}</p>
        </Reveal>
      </div>
      <ScrollCue href="#date" label="the date" tone="dark" />
    </section>
  );
}
