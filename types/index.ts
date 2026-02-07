// =============================================
// Data Types (snake_case - JSON/API communication)
// =============================================

export interface MediaItem {
  type: "image" | "video";
  src: string;
  alt: string;
  thumbnail?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: string;
  media: MediaItem[];
  location?: string;
  highlight?: boolean;
  color_accent?: string;
}

export interface MusicTrack {
  title: string;
  artist: string;
  src: string;
}

export interface SiteConfig {
  couple_name_1: string;
  couple_name_2: string;
  site_title: string;
  hero_tagline: string;
  hero_subtitle: string;
  closing_message: string;
  start_date: string;
}

export interface TimelineData {
  config: SiteConfig;
  music: MusicTrack[];
  events: TimelineEvent[];
}

// =============================================
// Component Props
// =============================================

export interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export interface GlowEffectProps {
  className?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
}

export interface TooltipProps {
  children: React.ReactNode;
  text: string;
  position?: "top" | "bottom" | "left" | "right";
}

export interface PhotoViewerProps {
  images: MediaItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export interface VideoPlayerProps {
  src: string;
  poster?: string;
}

export interface MediaGalleryProps {
  media: MediaItem[];
}

export interface TimelineEventProps {
  event: TimelineEvent;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export interface TimelineNavProps {
  events: TimelineEvent[];
  activeId: string | null;
  onNavigate: (id: string) => void;
}

export interface MusicPlayerProps {
  tracks: MusicTrack[];
}

export interface AudioPlayerState {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
}

export interface HeaderProps {
  coupleNames: string;
}
