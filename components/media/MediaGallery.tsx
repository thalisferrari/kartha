"use client";

import { useState } from "react";
import Image from "next/image";
import { MediaGalleryProps, MediaItem } from "@/types";
import { assetPath } from "@/lib/utils";
import PhotoViewer from "./PhotoViewer";
import VideoPlayer from "./VideoPlayer";

export default function MediaGallery({ media }: MediaGalleryProps) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const images = media.filter((m): m is MediaItem & { type: "image" } => m.type === "image");

  const openViewer = (imageIndex: number) => {
    setViewerIndex(imageIndex);
    setViewerOpen(true);
  };

  if (media.length === 0) return null;

  let imageCounter = 0;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {media.map((item, index) => {
          if (item.type === "video") {
            return (
              <div key={index} className="col-span-2 sm:col-span-3">
                <VideoPlayer src={item.src} poster={item.thumbnail} />
              </div>
            );
          }

          const currentImageIndex = imageCounter;
          imageCounter++;

          return (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                openViewer(currentImageIndex);
              }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden bg-surface border border-surface-border hover:border-primary/50 transition-colors group"
            >
              <Image
                src={assetPath(item.src)}
                alt={item.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
            </button>
          );
        })}
      </div>

      <PhotoViewer
        images={images}
        currentIndex={viewerIndex}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        onNavigate={setViewerIndex}
      />
    </div>
  );
}
