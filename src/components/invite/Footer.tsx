import { EVENT } from "@/config/event";
import { DiamondDivider } from "./Ornaments";

export function Footer() {
  return (
    <footer id="footer" className="bg-maroon-deep px-5 pb-28 pt-16 text-center">
      <DiamondDivider />
      <p className="font-display mt-8 text-[0.65rem] text-gold-light sm:text-xs" style={{ letterSpacing: "0.3em" }}>
        We look forward to celebrating with you
      </p>
      <p className="font-names mt-4 text-xl italic text-gold">
        {EVENT.bride} &amp; {EVENT.groom} · {EVENT.shortDate}
      </p>
    </footer>
  );
}
