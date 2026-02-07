"use client";

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { VideoPlayerProps } from "@/types";
import { assetPath } from "@/lib/utils";

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden bg-surface">
      <video
        ref={videoRef}
        src={assetPath(src)}
        poster={poster ? assetPath(poster) : undefined}
        onEnded={handleEnded}
        className="w-full rounded-lg"
        playsInline
        preload="metadata"
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
        className="absolute inset-0 flex items-center justify-center bg-background/30 opacity-100 group-hover:opacity-100 transition-opacity"
      >
        <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center text-background shadow-lg">
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </div>
      </button>
    </div>
  );
}
