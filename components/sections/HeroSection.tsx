"use client";

import { motion } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";
import { SiteConfig } from "@/types";
import { GlowEffect, ParallaxLayer } from "@/components/ui";
import { formatDate } from "@/lib/utils";

interface HeroSectionProps {
  config: SiteConfig;
}

export default function HeroSection({ config }: HeroSectionProps) {
  const scrollToTimeline = () => {
    const element = document.getElementById("timeline");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* Background glow effects */}
      <ParallaxLayer speed={-0.3} className="absolute inset-0">
        <GlowEffect
          size="lg"
          color="primary"
          className="top-1/4 left-1/4 -translate-x-1/2"
        />
        <GlowEffect
          size="md"
          color="rose"
          className="bottom-1/3 right-1/4"
        />
        <GlowEffect
          size="sm"
          color="primary"
          className="top-1/2 right-1/3"
        />
      </ParallaxLayer>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-surface-border bg-surface/50 backdrop-blur-sm mb-8">
            <Heart className="w-3.5 h-3.5 text-accent-rose fill-accent-rose" />
            <span className="text-xs text-muted">
              Juntos desde {formatDate(config.start_date, "MMMM [de] YYYY")}
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4"
        >
          <span className="text-primary">{config.couple_name_1}</span>
          <span className="text-accent-rose mx-3">&</span>
          <span className="text-primary">{config.couple_name_2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-heading text-xl sm:text-2xl text-foreground/80 italic mb-3"
        >
          {config.hero_tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base text-muted max-w-lg mx-auto"
        >
          {config.hero_subtitle}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={scrollToTimeline}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted hover:text-primary transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
