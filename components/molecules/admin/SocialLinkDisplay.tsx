import { LinkIcon } from "lucide-react";
import { SocialLinks } from "@/lib/types";

interface SocialLinksDisplayProps {
  links: SocialLinks;
}

const SocialLinksDisplay = ({ links }: SocialLinksDisplayProps) => {
  const entries = Object.entries(links).filter(([, v]) => Boolean(v));

  if (entries.length === 0) {
    return <span className="text-muted-foreground text-sm">—</span>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {entries.map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-primary hover:bg-muted transition-colors"
        >
          <LinkIcon className="size-3" />
          <span className="capitalize">{platform}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinksDisplay;
