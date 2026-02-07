"use client";

import { Heart, Sparkles } from "lucide-react";
import { AnimatedSection, GlowEffect } from "@/components/ui";

interface ClosingSectionProps {
  message: string;
  coupleNames: string;
}

export default function ClosingSection({ message, coupleNames }: ClosingSectionProps) {
  return (
    <section
      id="closing"
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Background glows */}
      <GlowEffect
        size="lg"
        color="rose"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <GlowEffect
        size="md"
        color="primary"
        className="bottom-0 left-1/4"
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-accent-gold" />
            <span className="text-sm text-accent-gold font-medium uppercase tracking-wider">
              Para sempre
            </span>
            <Sparkles className="w-5 h-5 text-accent-gold" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="font-heading text-xl sm:text-2xl text-foreground/90 italic leading-relaxed mb-8">
            &ldquo;{message}&rdquo;
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
            <Heart className="w-5 h-5 text-accent-rose fill-accent-rose" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          <p className="mt-4 text-sm text-muted">
            Com todo meu amor, {coupleNames}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
