import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { EVENT, MUSIC_SRC } from "@/config/event";
import { cn } from "@/lib/utils";

/* ---------------- Scroll progress ---------------- */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  return (
    <motion.div
      className="bg-gold fixed inset-x-0 top-0 z-[55] h-[2px] origin-left"
      style={{ scaleX }}
    />
  );
}

/* ---------------- Sticky navbar ---------------- */

const LINKS = [
  { href: "#invitation", label: "Invitation" },
  { href: "#date", label: "Date" },
  { href: "#venue", label: "Venue" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -70, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-[2px] z-50 border-b border-gold/40 bg-maroon-deep/85 backdrop-blur-md"
          aria-label="Sections"
        >
          <div className="mx-auto flex h-12 max-w-5xl items-center justify-center gap-1 px-2 sm:h-14 sm:justify-between sm:px-6">
            <a
              href="#top"
              className="font-names text-gold hidden text-lg italic sm:block"
            >
              {EVENT.bride} &amp; {EVENT.groom}
            </a>
            <ul className="flex items-center gap-0.5 sm:gap-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-display block rounded-full px-2 py-1.5 text-[0.55rem] text-cream/85 transition-colors duration-300 hover:text-gold min-[380px]:text-[0.6rem] sm:px-3 sm:text-[0.65rem]"
                    style={{ letterSpacing: "0.14em" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Background music ---------------- */

// export function MusicToggle() {
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const [playing, setPlaying] = useState(false);

//   const toggle = async () => {
//     const a = audioRef.current;
//     if (!a) return;
//     if (playing) {
//       a.pause();
//       setPlaying(false);
//       return;
//     }
//     try {
//       a.volume = 0.5;
//       await a.play();
//       setPlaying(true);
//     } catch {
//       setPlaying(false);
//       toast("Music will play once a track is added.");
//     }
//   };

//   return (
//     <>
//       {/* MUSIC SLOT — set MUSIC_SRC in src/config/event.ts */}
//       <audio ref={audioRef} src={MUSIC_SRC} loop preload="none" onEnded={() => setPlaying(false)} />
//       <button
//         type="button"
//         onClick={toggle}
//         aria-label={playing ? "Pause music" : "Play music"}
//         aria-pressed={playing}
//         className={cn(
//           "bg-gold fixed bottom-5 right-5 z-50 flex size-12 items-center justify-center rounded-full text-maroon-deep shadow-gold transition-transform duration-500 hover:scale-105",
//           playing && "glow-gold",
//         )}
//       >
//         {playing && <span className="absolute inset-0 animate-ping rounded-full border border-gold/60" />}
//         {playing ? <Music className="size-5" /> : <VolumeX className="size-5" />}
//       </button>
//     </>
//   );
// }

/* ---------------- Gold diamond cursor (desktop only) ---------------- */

export function GoldCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("has-gold-cursor");

    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const interactive = (e.target as HTMLElement | null)?.closest(
          "a,button,input,textarea,label,select,[role=button]",
        );
        el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) rotate(45deg) scale(${interactive ? 1.7 : 1})`;
        el.style.opacity = "1";
      });
    };
    const leave = () => {
      if (ref.current) ref.current.style.opacity = "0";
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-gold-cursor");
    };
  }, []);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="bg-gold pointer-events-none fixed -left-1.5 -top-1.5 z-[100] size-3 opacity-0 shadow-[0_0_10px_var(--gold)] outline outline-1 outline-offset-2 outline-gold/50 transition-[transform,opacity] duration-150 ease-out"
    />
  );
}
