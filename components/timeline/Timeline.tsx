"use client";

import { useState } from "react";
import { TimelineEvent as TimelineEventType } from "@/types";
import TimelineEvent from "./TimelineEvent";
import TimelineNav from "./TimelineNav";

interface TimelineProps {
  events: TimelineEventType[];
}

export default function Timeline({ events }: TimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleToggle = (eventId: string) => {
    setExpandedId((prev) => (prev === eventId ? null : eventId));
    setActiveId(eventId);
  };

  const handleNavigate = (eventId: string) => {
    setActiveId(eventId);
  };

  return (
    <div className="relative">
      {/* Vertical line - center on desktop (aligned with 48px center col), left on mobile */}
      <div className="absolute left-5 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/5 via-primary/40 to-primary/5" />

      {/* Events */}
      <div className="flex flex-col gap-8 md:gap-12">
        {events.map((event, index) => (
          <div key={event.id} id={`event-${event.id}`}>
            <TimelineEvent
              event={event}
              index={index}
              isExpanded={expandedId === event.id}
              onToggle={() => handleToggle(event.id)}
            />
          </div>
        ))}
      </div>

      {/* Side navigation */}
      <TimelineNav
        events={events}
        activeId={activeId}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
