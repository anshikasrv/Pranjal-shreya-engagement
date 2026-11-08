import { motion } from "framer-motion";

import { EVENT } from "@/config/event";
import { Diamond, DiamondDivider } from "./Ornaments";
import { EASE, Reveal, ScrollCue } from "./motion";

const cards = [
  { label: "Date", value: EVENT.dateLabel },
  { label: "Time", value: EVENT.timeLabel },
  { label: "Venue", value: EVENT.venue.full },
];

export function Details() {
  return (
    <section id="details" className="bg-paper relative overflow-hidden px-5 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <p className="font-display text-xs text-gold-dark">The Occasion</p>
          <h2 className="font-names mt-3 text-4xl italic text-maroon sm:text-5xl">Event Details</h2>
        </Reveal>
        <DiamondDivider className="my-10" />

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1, delay: i * 0.18, ease: EASE }}
              className="group"
            >
              <div className="relative flex h-full flex-col items-center gap-4 rounded-xl border border-gold/60 bg-cream/70 px-6 py-10 shadow-gold transition-all duration-700 group-hover:-translate-y-2 group-hover:shadow-gold-lift">
                <div className="pointer-events-none absolute inset-2 rounded-lg border border-gold/30" />
                <Diamond className="size-7 transition-transform duration-700 group-hover:rotate-45" />
                <p className="font-display text-xs text-gold-dark" style={{ letterSpacing: "0.35em" }}>
                  {c.label}
                </p>
                <p className="font-body text-xl leading-snug text-maroon sm:text-[1.35rem]">{c.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <ScrollCue href="#venue" label="the venue" tone="dark" />
    </section>
  );
}
