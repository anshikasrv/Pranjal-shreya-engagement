import { EVENT } from "@/config/event";

/* ---------------- Countdown ---------------- */

export type Remaining = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

export function getRemaining(target: Date, now: Date = new Date()): Remaining {
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    done: false,
  };
}

export const eventStart = () => new Date(EVENT.startISO);
export const eventEnd = () =>
  new Date(eventStart().getTime() + EVENT.calendarDurationHours * 3600 * 1000);

/* ---------------- Calendar ---------------- */

/** 2026-11-27T10:30:00.000Z -> 20261127T103000Z */
export function toCalendarStamp(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

const calendarTitle = () => `${EVENT.occasion} of ${EVENT.bride} & ${EVENT.groom}`;
const calendarLocation = () =>
  `${EVENT.venue.name}, Civil Lines, Prayagraj, Uttar Pradesh 211001`;

const escapeIcs = (v: string) => v.replace(/\\/g, "\\\\").replace(/([,;])/g, "\\$1");

export function buildIcs(): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Shreya and Pranjal//Ring Ceremony//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:ring-ceremony-shreya-pranjal-20261127@invite",
    `DTSTAMP:${toCalendarStamp(new Date())}`,
    `DTSTART:${toCalendarStamp(eventStart())}`,
    `DTEND:${toCalendarStamp(eventEnd())}`,
    `SUMMARY:${escapeIcs(calendarTitle())}`,
    `LOCATION:${escapeIcs(calendarLocation())}`,
    `DESCRIPTION:${escapeIcs(EVENT.invitationText)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function googleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: calendarTitle(),
    dates: `${toCalendarStamp(eventStart())}/${toCalendarStamp(eventEnd())}`,
    details: EVENT.invitationText,
    location: calendarLocation(),
    ctz: "Asia/Kolkata",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/* ---------------- Maps & contact ---------------- */

export const mapsSearchUrl = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EVENT.venue.mapsQuery)}`;

export const mapsEmbedUrl = () =>
  `https://www.google.com/maps?q=${encodeURIComponent(EVENT.venue.mapsQuery)}&output=embed`;

export const whatsappUrl = (number: string) =>
  `https://wa.me/91${number}?text=${encodeURIComponent(EVENT.whatsappMessage)}`;

export const telUrl = (number: string) => `tel:+91${number}`;
