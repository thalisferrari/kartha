"use client";

import { TimelineNavProps } from "@/types";
import { cn, getYearFromDate } from "@/lib/utils";

export default function TimelineNav({ events, activeId, onNavigate }: TimelineNavProps) {
  const years = [...new Set(events.map((e) => getYearFromDate(e.date)))];

  const scrollToEvent = (eventId: string) => {
    onNavigate(eventId);
    const element = document.getElementById(`event-${eventId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-3">
      {years.map((year) => {
        const yearEvents = events.filter((e) => getYearFromDate(e.date) === year);
        const isActiveYear = yearEvents.some((e) => e.id === activeId);

        return (
          <div key={year} className="flex flex-col items-end gap-1.5">
            <span
              className={cn(
                "text-xs font-medium transition-colors",
                isActiveYear ? "text-primary" : "text-muted"
              )}
            >
              {year}
            </span>
            <div className="flex flex-col items-end gap-1">
              {yearEvents.map((event) => (
                <button
                  key={event.id}
                  onClick={() => scrollToEvent(event.id)}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    event.id === activeId
                      ? "w-3 h-3 bg-primary shadow-lg shadow-primary/30"
                      : "w-2 h-2 bg-surface-border hover:bg-primary/50"
                  )}
                  title={event.title}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
