import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EVENT } from "@/config/event";
import { mapsEmbedUrl, mapsSearchUrl } from "@/lib/invite";
import { ArchOutline, Corners, DiamondDivider, Mandala } from "./Ornaments";
import { Reveal, ScrollCue } from "./motion";

export function Venue() {
  return (
    <section id="venue" className="bg-royal frame-double relative overflow-hidden px-5 py-24 sm:py-32">
      <Corners />
      <Mandala className="animate-spin-slow pointer-events-none absolute left-1/2 top-10 size-[36rem] -translate-x-1/2 opacity-[0.06]" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal className="relative flex h-36 w-56 items-end justify-center pb-7 sm:h-40 sm:w-64">
          <ArchOutline className="absolute inset-0 size-full" />
          <h2 className="font-display relative text-sm text-gold-light sm:text-base" style={{ letterSpacing: "0.4em" }}>
            The Venue
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="font-names text-gold-shimmer mt-10 text-4xl italic leading-tight sm:text-6xl">{EVENT.venue.name}</p>
          <p className="font-body mt-4 text-lg text-cream/85 sm:text-xl">{EVENT.venue.addressLine}</p>
        </Reveal>

        <DiamondDivider className="my-10" />

        <Reveal delay={0.2}>
          <Button variant="gold" size="xl" asChild>
            <a href={mapsSearchUrl()} target="_blank" rel="noopener noreferrer">
              <MapPin /> Get Directions
            </a>
          </Button>
        </Reveal>

        <Reveal delay={0.3} className="mt-12 w-full">
          <div className="relative rounded-2xl border border-gold/70 p-2 shadow-gold sm:p-3">
            <div className="pointer-events-none absolute -inset-2 rounded-[1.4rem] border border-gold/25" />
            <Corners size="size-8" className="z-10" />
            <iframe
              title={`Map of ${EVENT.venue.name}`}
              src={mapsEmbedUrl()}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block aspect-[4/3] w-full rounded-xl border-0 sm:aspect-[16/9]"
            />
          </div>
        </Reveal>
      </div>
      <ScrollCue href="#contact" label="contact details" />
    </section>
  );
}
