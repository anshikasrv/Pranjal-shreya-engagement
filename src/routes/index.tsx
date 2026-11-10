import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { useState } from "react";

import { SITE } from "@/config/event";
import {
  GoldCursor,
  MusicToggle,
  Navbar,
  ScrollProgress,
} from "@/components/invite/Chrome";
import { Contact } from "@/components/invite/Contact";
import { Countdown } from "@/components/invite/Countdown";
import { Details } from "@/components/invite/Details";
import { EnvelopeIntro } from "@/components/invite/EnvelopeIntro";
import { Footer } from "@/components/invite/Footer";
import { Hero } from "@/components/invite/Hero";
import { Invitation } from "@/components/invite/Invitation";
import { Venue } from "@/components/invite/Venue";

export const Route = createFileRoute("/")({
  head: () => {
    const meta = [
      { title: SITE.title },
      { name: "description", content: SITE.description },
      { property: "og:title", content: SITE.title },
      { property: "og:description", content: SITE.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE.title },
      { name: "twitter:description", content: SITE.description },
    ];
    // Preview image slot: set SITE.ogImageUrl to a full https:// URL.
    if (SITE.ogImageUrl) {
      meta.push(
        { property: "og:image", content: SITE.ogImageUrl },
        { name: "twitter:image", content: SITE.ogImageUrl },
      );
    }
    return { meta };
  },
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <EnvelopeIntro onOpen={() => setOpened(true)} />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero ready={opened} />
        <Invitation />
        <Countdown />

        <Venue />
        <Contact />
      </main>
      <Footer />

      <GoldCursor />
    </MotionConfig>
  );
}
//<MusicToggle />
//<Details />
