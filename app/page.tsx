"use client";

import timelineData from "@/data/timeline.json";
import { TimelineData } from "@/types";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import HeroSection from "@/components/sections/HeroSection";
import TimelineSection from "@/components/sections/TimelineSection";
import ClosingSection from "@/components/sections/ClosingSection";
import MusicPlayer from "@/components/music/MusicPlayer";

const data = timelineData as TimelineData;

export default function Home() {
  const coupleNames = `${data.config.couple_name_1} & ${data.config.couple_name_2}`;

  return (
    <>
      <Header coupleNames={coupleNames} />

      <main>
        <HeroSection config={data.config} />
        <TimelineSection events={data.events} />
        <ClosingSection
          message={data.config.closing_message}
          coupleNames={coupleNames}
        />
      </main>

      <Footer coupleNames={coupleNames} />
      <MusicPlayer tracks={data.music} />
      <ScrollToTop />
    </>
  );
}
