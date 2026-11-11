/**
 * ============================================================
 *  EVENT CONFIG — edit everything about the invitation here.
 * ============================================================
 */

import ganeshaArt from "@/assets/ganesha.webp";
import floralArt from "@/assets/floral-sprig.webp";
import ribbonArt from "@/assets/ribbon-bow.webp";

export const EVENT = {
  occasion: "Ring Ceremony",
  bride: "Shreya",
  groom: "Pranjal",
  initials: "P & S",

  shloka: "॥ श्री गणेशाय नमः ॥",
  blessingLine: "With Divine Blessings of the Almighty",

  dateLabel: "Friday, 27th November 2026",
  weekday: "Friday",
  day: "27",
  monthYear: "November 2026",
  shortDate: "27.11.2026",
  timeLabel: "4:00 PM onwards",
  city: "Prayagraj",

  /** Start of the ceremony in India Standard Time (Asia/Kolkata, UTC+5:30). */
  startISO: "2026-11-27T16:00:00+05:30",
  /**
   * Calendar apps need an end time; the invitation says "4:00 PM onwards",
   * so this is only used for the calendar entry length.
   */
  calendarDurationHours: 4,

  venue: {
    name: "Ajay International Hotel",
    addressLine: "Civil Lines, Prayagraj, Uttar Pradesh – 211001",
    full: "Ajay International Hotel, Civil Lines, Prayagraj, Uttar Pradesh – 211001",
    mapsQuery: "Ajay International Hotel Civil Lines Prayagraj",
  },

  invitationText:
    "With immense pleasure and happiness, we cordially invite you to grace the auspicious occasion of the Ring Ceremony of Shreya & Pranjal.",
  /** The same text split into lines for the line-by-line reveal. */
  invitationLines: [
    "With immense pleasure and happiness,",
    "we cordially invite you to grace",
    "the auspicious occasion of the",
    "Ring Ceremony of Pranjal & Shreya.",
  ],
  closingLine:
    "Your gracious presence and blessings will add warmth and joy to this special occasion.",

  blessingsFrom: ["Surbhi", "Avaneendra"],
  regards: "Balendu Bhushan Srivastava",

  contacts: [" 7905125152", "9035215767"],
  whatsappMessage:
    "Hello! I wanted to know a little more about the engagement...",
} as const;

export const SITE = {
  title: "Pranjal & Shreya – Ring Ceremony Invitation",
  description:
    "You are cordially invited to the Ring Ceremony of Pranjal & Shreya on 27th November 2026, Prayagraj",
  /**
   * PREVIEW IMAGE SLOT for WhatsApp / social shares.
   * Paste a full https:// URL to a 1200×630 image here (after publishing,
   * e.g. https://your-site.example.com/og.jpg). Leave empty to use the
   * automatic site preview.
   */
  ogImageUrl: "",
};

/**
 * ARTWORK SLOTS — replace these imports with your own files
 * (drop them into src/assets and update the paths above).
 */
export const ART = {
  ganesha: ganeshaArt,
  floral: floralArt,
  ribbon: ribbonArt,
};

/**
 * MUSIC SLOT — put a soft shehnai / instrumental track at
 * public/audio/background-music.mp3 (or change this path).
 */
export const MUSIC_SRC = "/audio/background-music.mp3";
