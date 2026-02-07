"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HeaderProps } from "@/types";
import { cn } from "@/lib/utils";

export default function Header({ coupleNames }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed top-0 left-0 right-0 z-50",
            "bg-background/80 backdrop-blur-md border-b border-surface-border"
          )}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <button
                onClick={() => scrollToSection("hero")}
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <Heart className="w-4 h-4 text-accent-rose" />
                <span className="font-heading text-sm font-medium">
                  {coupleNames}
                </span>
              </button>
              <nav className="flex items-center gap-6">
                <button
                  onClick={() => scrollToSection("timeline")}
                  className="text-sm text-muted hover:text-primary transition-colors"
                >
                  Timeline
                </button>
                <button
                  onClick={() => scrollToSection("closing")}
                  className="text-sm text-muted hover:text-primary transition-colors"
                >
                  Final
                </button>
              </nav>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
