"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "@/components/ui";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Tooltip text="Voltar ao topo">
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-surface border border-surface-border flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-colors shadow-lg"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
