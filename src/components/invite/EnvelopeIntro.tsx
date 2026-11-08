import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { EVENT } from "@/config/event";
import { Button } from "@/components/ui/button";
import { Corners, Mandala } from "./Ornaments";
import { EASE } from "./motion";
import { PetalShower } from "./Sparkles";

type Stage = "closed" | "opening" | "open";

export function EnvelopeIntro({ onOpen }: { onOpen?: () => void }) {
  const [stage, setStage] = useState<Stage>("closed");
  const [showPetals, setShowPetals] = useState(false);

  // Lock page scroll until the invitation is opened.
  useEffect(() => {
    if (stage === "open") {
      document.documentElement.style.overflow = "";
      return;
    }
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [stage]);

  useEffect(() => {
    if (!showPetals) return;
    const t = setTimeout(() => setShowPetals(false), 7000);
    return () => clearTimeout(t);
  }, [showPetals]);

  const open = () => {
    if (stage !== "closed") return;
    setStage("opening");
    setShowPetals(true);
    window.scrollTo({ top: 0 });
    onOpen?.();
    setTimeout(() => setStage("open"), 2600);
  };

  const opening = stage === "opening";

  return (
    <>
      <AnimatePresence>
        {stage !== "open" && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[60] overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            role="dialog"
            aria-label="Invitation envelope"
          >
            {/* Left door */}
            <motion.div
              className="bg-royal absolute inset-y-0 left-0 w-1/2 overflow-hidden border-r border-gold/60"
              animate={opening ? { x: "-101%" } : { x: 0 }}
              transition={{ duration: 1.8, delay: 0.7, ease: EASE }}
            >
              <Mandala className="absolute -right-[45vmin] top-1/2 size-[90vmin] -translate-y-1/2 opacity-15" />
              <div className="absolute inset-y-0 right-3 w-px bg-gold/40" />
            </motion.div>
            {/* Right door */}
            <motion.div
              className="bg-royal absolute inset-y-0 right-0 w-1/2 overflow-hidden border-l border-gold/60"
              animate={opening ? { x: "101%" } : { x: 0 }}
              transition={{ duration: 1.8, delay: 0.7, ease: EASE }}
            >
              <Mandala className="absolute -left-[45vmin] top-1/2 size-[90vmin] -translate-y-1/2 opacity-15" />
              <div className="absolute inset-y-0 left-3 w-px bg-gold/40" />
            </motion.div>

            <motion.div
              className="frame-double pointer-events-none absolute inset-0"
              animate={{ opacity: opening ? 0 : 1 }}
              transition={{ duration: 0.6 }}
            >
              <Corners />
            </motion.div>

            {/* Seal + button */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-6 text-center"
              animate={{ opacity: opening ? 0 : 1 }}
              transition={{ duration: 0.8, delay: opening ? 0.5 : 0 }}
            >
              <motion.p
                className="font-display text-[0.7rem] text-gold-light/90 sm:text-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
              >
                You are invited
              </motion.p>

              <WaxSeal broken={opening} />

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="flex flex-col items-center gap-4"
              >
                <Button variant="gold" size="xl" onClick={open} autoFocus>
                  Tap to Open Invitation
                </Button>
                <p className="font-body text-base italic text-cream/70">
                  {EVENT.occasion} · {EVENT.bride} &amp; {EVENT.groom}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {showPetals && <PetalShower />}
    </>
  );
}

function WaxSeal({ broken }: { broken: boolean }) {
  const half = (side: "left" | "right") => (
    <motion.div
      className="absolute inset-0"
      style={{
        clipPath:
          side === "left"
            ? "polygon(0 0, 52% 0, 46% 30%, 54% 50%, 45% 72%, 50% 100%, 0 100%)"
            : "polygon(52% 0, 100% 0, 100% 100%, 50% 100%, 45% 72%, 54% 50%, 46% 30%)",
      }}
      animate={
        broken
          ? { x: side === "left" ? -46 : 46, rotate: side === "left" ? -18 : 18, opacity: 0 }
          : { x: 0, rotate: 0, opacity: 1 }
      }
      transition={{ duration: 1.1, ease: EASE }}
    >
      <SealFace />
    </motion.div>
  );

  return (
    <motion.div
      className="relative size-40 sm:size-48"
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.4, ease: EASE }}
    >
      <div className="animate-glow absolute -inset-6 rounded-full bg-gold/20 blur-2xl" />
      {half("left")}
      {half("right")}
    </motion.div>
  );
}

function SealFace() {
  return (
    <svg viewBox="0 0 200 200" className="size-full drop-shadow-xl" aria-hidden="true">
      <defs>
        <radialGradient id="seal" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="var(--gold-light)" />
          <stop offset="45%" stopColor="var(--gold)" />
          <stop offset="100%" stopColor="var(--gold-dark)" />
        </radialGradient>
      </defs>
      <path
        d="M100 6 C 122 4, 132 18, 150 22 C 170 28, 186 40, 188 64 C 192 84, 198 98, 192 118 C 188 140, 176 160, 156 172 C 138 186, 122 196, 100 194 C 78 196, 60 186, 44 174 C 24 162, 10 142, 8 118 C 2 98, 8 80, 12 62 C 18 40, 34 26, 52 20 C 70 14, 80 6, 100 6 Z"
        fill="url(#seal)"
      />
      <circle cx="100" cy="100" r="70" fill="none" stroke="var(--gold-dark)" strokeWidth="2" />
      <circle cx="100" cy="100" r="62" fill="none" stroke="var(--gold-light)" strokeWidth="0.8" strokeDasharray="2 4" />
      <text
        x="100"
        y="112"
        textAnchor="middle"
        fontFamily="Playfair Display, serif"
        fontStyle="italic"
        fontSize="38"
        fill="var(--maroon)"
      >
        {EVENT.initials}
      </text>
    </svg>
  );
}
