import { Heart } from "lucide-react";

interface FooterProps {
  coupleNames: string;
}

export default function Footer({ coupleNames }: FooterProps) {
  return (
    <footer className="py-8 border-t border-surface-border bg-background">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 text-muted text-sm">
          <span>Feito com</span>
          <Heart className="w-4 h-4 text-accent-rose fill-accent-rose" />
          <span>para {coupleNames}</span>
        </div>
      </div>
    </footer>
  );
}
