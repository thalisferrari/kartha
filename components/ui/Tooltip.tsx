"use client";

import { useState } from "react";
import { TooltipProps } from "@/types";
import { cn } from "@/lib/utils";

const positionClasses = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export default function Tooltip({
  children,
  text,
  position = "top",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            "absolute z-50 whitespace-nowrap rounded-md bg-surface border border-surface-border px-3 py-1.5 text-xs text-foreground shadow-lg pointer-events-none",
            positionClasses[position]
          )}
          role="tooltip"
        >
          {text}
        </div>
      )}
    </div>
  );
}
