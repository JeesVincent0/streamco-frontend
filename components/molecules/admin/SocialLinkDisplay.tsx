import { LinkIcon } from "lucide-react";

export interface SocialLinkData {
  type: string;
  url: string;
}

interface SocialLinksDisplayProps {
  links?: SocialLinkData[];
}

const SocialLinksDisplay = ({ links = [] }: SocialLinksDisplayProps) => {
  // Filter out any links that might be empty/invalid just to be safe
  const validLinks = links.filter((link) => Boolean(link.url));

  if (validLinks.length === 0) {
    return <span className="text-muted-foreground text-sm">—</span>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {validLinks.map((link) => (
        <a
          key={link.type}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-primary hover:bg-muted transition-colors"
        >
          <LinkIcon className="size-3" />
          {/* Note: .toLowerCase() is needed here because CSS 'capitalize' 
              won't change "INSTAGRAM" to "Instagram" unless it's lowercase first */}
          <span className="capitalize">{link.type.toLowerCase()}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinksDisplay;
