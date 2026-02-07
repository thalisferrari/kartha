"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music, Play, Pause, Volume2, VolumeX,
  ChevronUp, ChevronDown,
} from "lucide-react";
import { MusicPlayerProps } from "@/types";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { Tooltip } from "@/components/ui";

export default function MusicPlayer({ tracks }: MusicPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    state,
    currentTrack,
    togglePlay,
    toggleMute,
    setVolume,
  } = useAudioPlayer(tracks);

  if (!currentTrack || tracks.length === 0) return null;

  return (
    <motion.div
      layout
      className="fixed bottom-6 left-6 z-40"
    >
      <motion.div
        layout
        className="bg-surface/95 backdrop-blur-md border border-surface-border rounded-2xl shadow-xl overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* Collapsed pill */
            <motion.button
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:text-primary transition-colors"
            >
              <Music className="w-4 h-4 text-primary" />
              <span className="font-medium">Ouvir</span>
              <ChevronUp className="w-3.5 h-3.5 text-muted" />
            </motion.button>
          ) : (
            /* Expanded player */
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 w-64"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <Music className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {currentTrack.title}
                    </p>
                    <p className="text-xs text-muted truncate">
                      {currentTrack.artist}
                    </p>
                  </div>
                </div>
                <Tooltip text="Minimizar">
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="flex-shrink-0 text-muted hover:text-foreground transition-colors"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </Tooltip>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1 bg-surface-border rounded-full mb-3 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{
                    width: state.duration > 0
                      ? `${(state.currentTime / state.duration) * 100}%`
                      : "0%",
                  }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <Tooltip text={state.isPlaying ? "Pausar" : "Reproduzir"}>
                  <button
                    onClick={togglePlay}
                    className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-background hover:bg-primary-light transition-colors"
                  >
                    {state.isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" />
                    )}
                  </button>
                </Tooltip>

                <div className="flex items-center gap-2">
                  <Tooltip text={state.isMuted ? "Ativar som" : "Silenciar"}>
                    <button
                      onClick={toggleMute}
                      className="text-muted hover:text-foreground transition-colors"
                    >
                      {state.isMuted ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                  </Tooltip>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={state.isMuted ? 0 : state.volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-16 h-1 accent-primary cursor-pointer"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
