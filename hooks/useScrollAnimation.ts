"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", once = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsInView(true);
      } else if (!once) {
        setIsInView(false);
      }
    },
    [once]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, handleIntersection]);

  return { ref, isInView };
}
