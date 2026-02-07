"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { AudioPlayerState, MusicTrack } from "@/types";
import { assetPath } from "@/lib/utils";

export function useAudioPlayer(tracks: MusicTrack[]) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    volume: 0.5,
    isMuted: false,
    currentTime: 0,
    duration: 0,
  });

  const currentTrack = tracks[currentTrackIndex] || null;

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    audio.volume = state.volume;

    const handleTimeUpdate = () => {
      setState((prev) => ({ ...prev, currentTime: audio.currentTime }));
    };

    const handleLoadedMetadata = () => {
      setState((prev) => ({ ...prev, duration: audio.duration }));
    };

    const handleEnded = () => {
      if (currentTrackIndex < tracks.length - 1) {
        setCurrentTrackIndex((prev) => prev + 1);
      } else {
        setState((prev) => ({ ...prev, isPlaying: false }));
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.src = assetPath(currentTrack.src);
    audio.load();

    if (state.isPlaying) {
      audio.play().catch(() => {
        setState((prev) => ({ ...prev, isPlaying: false }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex, currentTrack]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (state.isPlaying) {
      audio.pause();
      setState((prev) => ({ ...prev, isPlaying: false }));
    } else {
      audio.play().then(() => {
        setState((prev) => ({ ...prev, isPlaying: true }));
      }).catch(() => {
        setState((prev) => ({ ...prev, isPlaying: false }));
      });
    }
  }, [state.isPlaying, currentTrack]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const clampedVolume = Math.max(0, Math.min(1, volume));
    audio.volume = clampedVolume;
    setState((prev) => ({ ...prev, volume: clampedVolume }));
  }, []);

  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    setState((prev) => ({ ...prev, currentTime: time }));
  }, []);

  const nextTrack = useCallback(() => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex((prev) => prev + 1);
    }
  }, [currentTrackIndex, tracks.length]);

  const previousTrack = useCallback(() => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex((prev) => prev - 1);
    }
  }, [currentTrackIndex]);

  return {
    state,
    currentTrack,
    currentTrackIndex,
    togglePlay,
    toggleMute,
    setVolume,
    seekTo,
    nextTrack,
    previousTrack,
  };
}
