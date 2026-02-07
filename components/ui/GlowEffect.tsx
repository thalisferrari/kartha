import { GlowEffectProps } from "@/types";
import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "w-64 h-64",
  md: "w-[32rem] h-[32rem]",
  lg: "w-[44rem] h-[44rem]",
};

const glowColors: Record<string, { center: string; mid: string }> = {
  primary: {
    center: "rgba(30, 144, 255, 0.18)",
    mid: "rgba(30, 144, 255, 0.05)",
  },
  rose: {
    center: "rgba(255, 107, 157, 0.18)",
    mid: "rgba(255, 107, 157, 0.05)",
  },
  gold: {
    center: "rgba(255, 215, 0, 0.15)",
    mid: "rgba(255, 215, 0, 0.04)",
  },
};

export default function GlowEffect({
  className,
  color = "primary",
  size = "md",
}: GlowEffectProps) {
  const colors = glowColors[color] || glowColors.primary;

  return (
    <div
      className={cn(
        "absolute rounded-full pointer-events-none",
        sizeClasses[size],
        className
      )}
      style={{
        background: `radial-gradient(circle, ${colors.center} 0%, ${colors.mid} 35%, transparent 70%)`,
      }}
      aria-hidden="true"
    />
  );
}
