"use client";

import { TimelineEvent } from "@/types";
import { AnimatedSection } from "@/components/ui";
import Timeline from "@/components/timeline/Timeline";

interface TimelineSectionProps {
  events: TimelineEvent[];
}

export default function TimelineSection({ events }: TimelineSectionProps) {
  return (
    <section id="timeline" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Nossa História
          </h2>
          <p className="text-muted max-w-md mx-auto">
            Cada momento especial que construímos juntos, guardado para sempre
          </p>
        </AnimatedSection>

        <Timeline events={events} />
      </div>
    </section>
  );
}
