import { cn } from "@/lib/utils";

/* All ornaments are pure SVG drawn in currentColor or gold gradients. */

function GoldDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--gold-dark)" />
        <stop offset="45%" stopColor="var(--gold-light)" />
        <stop offset="100%" stopColor="var(--gold)" />
      </linearGradient>
    </defs>
  );
}

export function Mandala({ className }: { className?: string }) {
  const petals = (count: number, r: number, len: number, w: number) =>
    Array.from({ length: count }, (_, i) => {
      const a = (360 / count) * i;
      return (
        <path
          key={`${count}-${i}`}
          d={`M0 ${-r} C ${w} ${-r - len * 0.35}, ${w} ${-r - len * 0.75}, 0 ${-r - len} C ${-w} ${-r - len * 0.75}, ${-w} ${-r - len * 0.35}, 0 ${-r} Z`}
          transform={`rotate(${a})`}
        />
      );
    });
  const dots = (count: number, r: number, size: number) =>
    Array.from({ length: count }, (_, i) => {
      const a = ((Math.PI * 2) / count) * i;
      return (
        <circle
          key={`d${count}-${i}`}
          cx={+(Math.cos(a) * r).toFixed(2)}
          cy={+(Math.sin(a) * r).toFixed(2)}
          r={size}
          fill="currentColor"
          stroke="none"
        />
      );
    });
  return (
    <svg viewBox="-200 -200 400 400" className={cn("text-gold", className)} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle r="196" />
        <circle r="188" strokeDasharray="2 5" />
        {petals(32, 150, 36, 9)}
        <circle r="148" />
        {dots(48, 140, 1.4)}
        {petals(16, 96, 44, 16)}
        <circle r="94" />
        <circle r="86" strokeDasharray="1 4" />
        {petals(12, 46, 36, 14)}
        <circle r="44" />
        {petals(8, 12, 30, 9)}
        <circle r="10" />
        {dots(24, 170, 1.8)}
      </g>
    </svg>
  );
}

export function Diamond({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <GoldDefs id="dg" />
      <path d="M12 1 L23 12 L12 23 L1 12 Z" fill="url(#dg)" />
      <path d="M12 6 L18 12 L12 18 L6 12 Z" fill="none" stroke="var(--maroon-deep)" strokeOpacity="0.35" />
    </svg>
  );
}

export function DiamondDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3 text-gold", className)} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold sm:w-28" />
      <svg viewBox="0 0 12 12" className="size-2"><path d="M6 0 L12 6 L6 12 L0 6 Z" fill="currentColor" /></svg>
      <Diamond className="size-4" />
      <svg viewBox="0 0 12 12" className="size-2"><path d="M6 0 L12 6 L6 12 L0 6 Z" fill="currentColor" /></svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold sm:w-28" />
    </div>
  );
}

export function Lotus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
      <GoldDefs id="lg" />
      <g fill="none" stroke="url(#lg)" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M60 6 C 70 20, 70 38, 60 50 C 50 38, 50 20, 60 6 Z" />
        <path d="M60 50 C 46 44, 38 30, 40 16 C 52 22, 58 36, 60 50 Z" />
        <path d="M60 50 C 74 44, 82 30, 80 16 C 68 22, 62 36, 60 50 Z" />
        <path d="M60 50 C 40 50, 26 40, 20 28 C 36 28, 50 38, 60 50 Z" />
        <path d="M60 50 C 80 50, 94 40, 100 28 C 84 28, 70 38, 60 50 Z" />
        <path d="M30 54 Q 60 46 90 54" />
      </g>
      <circle cx="60" cy="56" r="1.8" fill="url(#lg)" />
    </svg>
  );
}

export function LotusDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)} aria-hidden="true">
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold-dark sm:w-24" />
      <Lotus className="h-8 w-16" />
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold-dark sm:w-24" />
    </div>
  );
}

export function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={cn("pointer-events-none text-gold", className)} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M4 60 V4 H60" />
        <path d="M10 44 V10 H44" strokeOpacity="0.6" />
        <path d="M10 10 C 30 14, 40 26, 38 40 C 36 50, 24 50, 22 42 C 20 34, 30 30, 34 36" />
        <path d="M10 10 C 14 30, 26 40, 40 38" strokeOpacity="0.7" />
        <path d="M60 4 C 66 10, 74 10, 80 4" />
        <path d="M4 60 C 10 66, 10 74, 4 80" />
      </g>
      <path d="M10 4 L14 8 L10 12 L6 8 Z" transform="translate(-2 -2)" fill="currentColor" />
    </svg>
  );
}

/** Four corner flourishes positioned in a relative parent. */
export function Corners({ className, size = "size-14 sm:size-20" }: { className?: string; size?: string }) {
  return (
    <>
      <CornerFlourish className={cn("absolute left-2 top-2", size, className)} />
      <CornerFlourish className={cn("absolute right-2 top-2 -scale-x-100", size, className)} />
      <CornerFlourish className={cn("absolute bottom-2 left-2 -scale-y-100", size, className)} />
      <CornerFlourish className={cn("absolute bottom-2 right-2 -scale-100", size, className)} />
    </>
  );
}

export function LeafCorner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={cn("pointer-events-none", className)} aria-hidden="true">
      <g fill="var(--leaf)" fillOpacity="0.55">
        <path d="M0 0 C 40 10, 70 30, 80 70 C 50 60, 20 40, 0 0 Z" />
        <path d="M0 0 C 10 40, 30 70, 70 80 C 60 50, 40 20, 0 0 Z" fillOpacity="0.4" />
        <path d="M30 20 C 70 18, 100 30, 120 50 C 90 54, 56 44, 30 20 Z" fillOpacity="0.35" />
        <path d="M20 30 C 18 70, 30 100, 50 120 C 54 90, 44 56, 20 30 Z" fillOpacity="0.35" />
      </g>
      <g fill="var(--maroon-light)">
        <circle cx="86" cy="76" r="4" />
        <circle cx="94" cy="68" r="3" />
        <circle cx="76" cy="88" r="3" />
        <circle cx="124" cy="52" r="3" />
        <circle cx="52" cy="124" r="3" />
      </g>
      <g fill="none" stroke="var(--gold-dark)" strokeOpacity="0.5" strokeWidth="0.8">
        <path d="M0 0 L 80 70" />
        <path d="M0 0 L 70 80" />
      </g>
    </svg>
  );
}

/** Gold mehrab (arch) outline, scales to its container. */
export function ArchOutline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 260" preserveAspectRatio="none" className={cn("pointer-events-none", className)} aria-hidden="true">
      <GoldDefs id="ag" />
      <g fill="none" stroke="url(#ag)">
        <path d="M6 256 V110 C 6 50, 50 14, 100 4 C 150 14, 194 50, 194 110 V256 Z" strokeWidth="2" />
        <path d="M16 256 V114 C 16 60, 56 26, 100 15 C 144 26, 184 60, 184 114 V256" strokeWidth="0.8" strokeOpacity="0.7" />
      </g>
      <path d="M100 0 L105 6 L100 12 L95 6 Z" fill="url(#ag)" />
    </svg>
  );
}
