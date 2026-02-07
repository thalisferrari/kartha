"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Calendar, MapPin, Camera, Music, Star, Gift, Sparkles,
  ChevronDown,
} from "lucide-react";
import { TimelineEventProps } from "@/types";
import { cn, formatDate } from "@/lib/utils";
import { AnimatedSection } from "@/components/ui";
import MediaGallery from "@/components/media/MediaGallery";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  heart: Heart,
  calendar: Calendar,
  "map-pin": MapPin,
  camera: Camera,
  music: Music,
  star: Star,
  gift: Gift,
  sparkles: Sparkles,
};

function EventCard({
  event,
  isExpanded,
  onToggle,
  isHighlight,
  compact = false,
}: {
  event: TimelineEventProps["event"];
  isExpanded: boolean;
  onToggle: () => void;
  isHighlight: boolean;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-full text-left rounded-xl transition-all duration-300",
        "bg-surface border hover:shadow-lg hover:shadow-primary/5",
        compact ? "p-4" : "p-5",
        isHighlight
          ? "border-accent-gold/40 hover:border-accent-gold/60"
          : "border-surface-border hover:border-primary/40",
        isExpanded && "shadow-lg shadow-primary/10"
      )}
      style={isHighlight && event.color_accent ? {
        boxShadow: isExpanded ? `0 0 30px ${event.color_accent}15` : undefined,
      } : undefined}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <span className="text-xs text-primary font-medium uppercase tracking-wider">
            {formatDate(event.date)}
          </span>
          <h3 className={cn(
            "font-heading font-semibold text-foreground mt-1",
            compact ? "text-base" : "text-lg"
          )}>
            {event.title}
          </h3>
          {event.subtitle && (
            <p className="text-sm text-muted">{event.subtitle}</p>
          )}
          {event.location && (
            <div className="flex items-center gap-1 mt-2 text-xs text-muted">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span>{event.location}</span>
            </div>
          )}
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 mt-1"
        >
          <ChevronDown className={cn("text-muted", compact ? "w-4 h-4" : "w-5 h-5")} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={cn(
              "border-t border-surface-border",
              compact ? "pt-3 mt-3" : "pt-4 mt-4"
            )}>
              <p className={cn(
                "text-sm text-foreground/80 leading-relaxed",
                compact ? "mb-3" : "mb-4"
              )}>
                {event.description}
              </p>
              {event.media.length > 0 && (
                <MediaGallery media={event.media} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

function DotIcon({
  isHighlight,
  isExpanded,
  IconComponent,
}: {
  isHighlight: boolean;
  isExpanded: boolean;
  IconComponent: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 transition-all duration-300",
        isHighlight
          ? "bg-accent-gold/20 border-accent-gold text-accent-gold"
          : isExpanded
          ? "bg-primary/20 border-primary text-primary"
          : "bg-surface border-surface-border text-muted hover:border-primary hover:text-primary"
      )}
    >
      <IconComponent className="w-4 h-4" />
    </div>
  );
}

export default function TimelineEvent({
  event,
  index,
  isExpanded,
  onToggle,
}: TimelineEventProps) {
  const IconComponent = iconMap[event.icon || "heart"] || Heart;
  const isLeft = index % 2 === 0;
  const isHighlight = !!event.highlight;

  return (
    <>
      {/* Desktop layout: grid with 3 columns */}
      <div className="hidden md:block">
        <AnimatedSection
          direction={isLeft ? "left" : "right"}
          delay={0.1}
          className="grid grid-cols-[1fr_40px_1fr] gap-x-6 items-start"
        >
          {/* Left column */}
          <div>
            {isLeft && (
              <EventCard
                event={event}
                isExpanded={isExpanded}
                onToggle={onToggle}
                isHighlight={isHighlight}
              />
            )}
          </div>

          {/* Center dot column */}
          <div className="flex justify-center">
            <DotIcon
              isHighlight={isHighlight}
              isExpanded={isExpanded}
              IconComponent={IconComponent}
            />
          </div>

          {/* Right column */}
          <div>
            {!isLeft && (
              <EventCard
                event={event}
                isExpanded={isExpanded}
                onToggle={onToggle}
                isHighlight={isHighlight}
              />
            )}
          </div>
        </AnimatedSection>
      </div>

      {/* Mobile layout: dot + card */}
      <div className="md:hidden">
        <AnimatedSection
          direction="right"
          delay={0.1}
          className="flex items-start gap-4"
        >
          <div className="flex-shrink-0">
            <DotIcon
              isHighlight={isHighlight}
              isExpanded={isExpanded}
              IconComponent={IconComponent}
            />
          </div>
          <div className="flex-1 min-w-0">
            <EventCard
              event={event}
              isExpanded={isExpanded}
              onToggle={onToggle}
              isHighlight={isHighlight}
              compact
            />
          </div>
        </AnimatedSection>
      </div>
    </>
  );
}
