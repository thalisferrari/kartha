"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { PhotoViewerProps } from "@/types";
import { assetPath } from "@/lib/utils";

export default function PhotoViewer({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: PhotoViewerProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (currentIndex > 0) onNavigate(currentIndex - 1);
          break;
        case "ArrowRight":
          if (currentIndex < images.length - 1) onNavigate(currentIndex + 1);
          break;
      }
    },
    [isOpen, currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          {/* Close button - fixed top right */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-surface border border-surface-border flex items-center justify-center text-foreground hover:text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 text-sm text-muted">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Image container */}
          <div
            className="flex items-center justify-center w-full h-full px-4 py-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous button */}
            {currentIndex > 0 && (
              <button
                onClick={() => onNavigate(currentIndex - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-surface/80 border border-surface-border flex items-center justify-center text-foreground hover:text-primary transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            <motion.div
              key={currentIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <Image
                src={assetPath(currentImage.src)}
                alt={currentImage.alt}
                width={1200}
                height={800}
                className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain rounded-lg"
              />
            </motion.div>

            {/* Next button */}
            {currentIndex < images.length - 1 && (
              <button
                onClick={() => onNavigate(currentIndex + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-surface/80 border border-surface-border flex items-center justify-center text-foreground hover:text-primary transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
