import { describe, expect, it } from "vitest";

import {
  buildIcs,
  eventStart,
  getRemaining,
  googleCalendarUrl,
  whatsappUrl,
} from "@/lib/invite";

describe("event timing", () => {
  it("starts at 4:00 PM IST on 27 Nov 2026 (10:30 UTC)", () => {
    expect(eventStart().toISOString()).toBe("2026-11-27T10:30:00.000Z");
  });

  it("counts down days/hours/minutes/seconds to the start", () => {
    const now = new Date("2026-11-26T09:29:00.000Z");
    expect(getRemaining(eventStart(), now)).toEqual({
      days: 1,
      hours: 1,
      minutes: 1,
      seconds: 0,
      done: false,
    });
  });

  it("is done once the start time passes", () => {
    expect(getRemaining(eventStart(), new Date("2026-11-27T10:30:01Z")).done).toBe(true);
  });
});

describe("calendar", () => {
  it("ics starts at 4 PM IST at the venue", () => {
    const ics = buildIcs();
    expect(ics).toContain("DTSTART:20261127T103000Z");
    expect(ics).toContain("SUMMARY:Ring Ceremony of Shreya & Pranjal");
    expect(ics).toContain("LOCATION:Ajay International Hotel\\, Civil Lines\\, Prayagraj\\, Uttar Pradesh 211001");
  });

  it("google calendar link uses the same start", () => {
    expect(decodeURIComponent(googleCalendarUrl())).toContain("dates=20261127T103000Z/");
  });
});

describe("contact", () => {
  it("whatsapp link uses +91 and the prefilled message", () => {
    const url = whatsappUrl("9415388273");
    expect(url.startsWith("https://wa.me/919415388273?text=")).toBe(true);
    expect(decodeURIComponent(url)).toContain(
      "Hello, I would like to know more about the Ring Ceremony of Shreya & Pranjal.",
    );
  });
});
