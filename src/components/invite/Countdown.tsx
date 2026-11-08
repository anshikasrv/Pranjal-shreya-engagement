import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { EVENT } from "@/config/event";
import { buildIcs, eventStart, getRemaining, googleCalendarUrl, type Remaining } from "@/lib/invite";
import { Corners, DiamondDivider, Mandala } from "./Ornaments";
import { Reveal, ScrollCue } from "./motion";

function downloadIcs() {
  const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Ring-Ceremony-Shreya-Pranjal.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function Countdown() {
  const [left, setLeft] = useState<Remaining | null>(null);

  useEffect(() => {
    const target = eventStart();
    const tick = () => setLeft(getRemaining(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units: [string, number | undefined][] = [
    ["Days", left?.days],
    ["Hours", left?.hours],
    ["Minutes", left?.minutes],
    ["Seconds", left?.seconds],
  ];

  return (
    <section id="date" className="bg-royal frame-double relative overflow-hidden px-5 py-24 sm:py-32">
      <Corners />
      <Mandala className="animate-spin-slower pointer-events-none absolute -left-40 -top-40 size-[28rem] opacity-[0.07]" />
      <Mandala className="animate-spin-slow pointer-events-none absolute -bottom-48 -right-40 size-[32rem] opacity-[0.07]" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal>
          <h2 className="font-display text-sm text-gold-light sm:text-base" style={{ letterSpacing: "0.4em" }}>
            Save the Date
          </h2>
        </Reveal>
        <DiamondDivider className="my-8" />

        <Reveal className="flex flex-col items-center">
          <p className="font-display text-sm text-cream/85" style={{ letterSpacing: "0.5em" }}>
            {EVENT.weekday}
          </p>
          <p className="font-names text-gold-shimmer my-1 text-[8rem] leading-none sm:text-[11rem]">{EVENT.day}</p>
          <p className="font-display text-sm text-cream/85" style={{ letterSpacing: "0.4em" }}>
            {EVENT.monthYear}
          </p>
          <p className="font-body mt-3 text-lg italic text-gold-light/90">{EVENT.timeLabel}</p>
        </Reveal>

        <div className="mt-14 w-full">
          {left?.done ? (
            <Reveal>
              <p className="font-names text-gold-shimmer text-3xl italic sm:text-4xl">The celebration has begun!</p>
            </Reveal>
          ) : (
            <div className="mx-auto grid max-w-xl grid-cols-4 gap-2.5 sm:gap-5" aria-live="off">
              {units.map(([label, value], i) => (
                <Reveal key={label} delay={i * 0.12}>
                  <div className="arch relative flex aspect-[3/4] flex-col items-center justify-end overflow-hidden border border-gold/70 bg-maroon-deep/50 pb-3 shadow-gold sm:pb-5">
                    <div className="arch pointer-events-none absolute inset-1 border border-gold/25" />
                    <div className="relative h-10 w-full overflow-hidden sm:h-16">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={value ?? "x"}
                          className="font-names text-gold absolute inset-0 flex items-center justify-center text-3xl tabular-nums sm:text-5xl"
                          initial={{ y: "-100%", opacity: 0, rotateX: 70 }}
                          animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                          exit={{ y: "100%", opacity: 0, rotateX: -70 }}
                          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {value === undefined ? "--" : String(value).padStart(2, "0")}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <span className="font-display mt-1 text-[0.5rem] text-cream/75 sm:text-[0.65rem]" style={{ letterSpacing: "0.18em" }}>
                      {label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>

        <Reveal delay={0.3} className="mt-12 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="gold" size="xl" onClick={downloadIcs} className="w-full max-w-xs sm:w-auto">
            <CalendarPlus /> Add to Calendar
          </Button>
          <Button variant="goldOutline" size="xl" asChild className="w-full max-w-xs sm:w-auto">
            <a href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer">
              Google Calendar
            </a>
          </Button>
        </Reveal>
      </div>
      <ScrollCue href="#details" label="event details" />
    </section>
  );
}
