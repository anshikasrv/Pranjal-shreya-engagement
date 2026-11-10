import { MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EVENT } from "@/config/event";
import { telUrl, whatsappUrl } from "@/lib/invite";
import { Corners, DiamondDivider, Mandala } from "./Ornaments";
import { Reveal, ScrollCue } from "./motion";

const formatNumber = (n: string) => `+91 ${n.slice(0, 5)} ${n.slice(5)}`;

export function Contact() {
  const [first, second] = EVENT.blessingsFrom;
  return (
    <section
      id="contact"
      className="bg-royal frame-double relative overflow-hidden px-5 py-24 sm:py-32"
    >
      <Corners />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="animate-glow absolute size-[26rem] rounded-full bg-gold/10 blur-3xl" />
        <Mandala className="animate-spin-slower size-[34rem] opacity-[0.09] sm:size-[44rem]" />
      </div>

      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        <Reveal>
          <p className="font-display text-xs text-gold-light/90">
            With Love &amp; Best Wishes From
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-6 flex flex-col items-center">
          <p className="font-names text-gold-shimmer text-5xl italic leading-tight sm:text-6xl">
            Preksha
          </p>
        </Reveal>

        <DiamondDivider className="my-10" />

        <Reveal delay={0.1}>
          <p className="font-display text-xs text-gold-light/80">Regards</p>
          <p className="font-body mt-3 text-3xl text-cream sm:text-4xl">
            {EVENT.regards}
          </p>
        </Reveal>

        <div className="mt-14 grid w-full gap-5 sm:grid-cols-2">
          {EVENT.contacts.map((n, i) => (
            <Reveal key={n} delay={0.15 * i}>
              <div className="flex flex-col gap-3 rounded-2xl border border-gold/50 bg-maroon-deep/40 p-5 shadow-gold">
                <Button variant="gold" size="xl" asChild>
                  <a href={telUrl(n)} aria-label={`Call ${n}`}>
                    <Phone /> {formatNumber(n)}
                  </a>
                </Button>
                <Button variant="goldOutline" size="xl" asChild>
                  <a
                    href={whatsappUrl(n)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp ${n}`}
                  >
                    <MessageCircle /> WhatsApp
                  </a>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <ScrollCue href="#footer" label="the end" />
    </section>
  );
}
