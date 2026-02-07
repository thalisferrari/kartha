"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ParallaxLayerProps } from "@/types";
import { cn } from "@/lib/utils";

export default function ParallaxLayer({
  children,
  speed = 0.5,
  className,
}: ParallaxLayerProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div ref={ref} style={{ y }} className={cn(className)}>
      {children}
    </motion.div>
  );
}
