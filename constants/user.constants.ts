export const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
  SUSPENDED: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
  DELETED: "bg-red-500/10 text-red-500 border border-red-500/20",
};

export const ROLE_STYLES: Record<string, string> = {
  ADMIN: "bg-purple-500/10 text-purple-500 border border-purple-500/20",
  MODERATOR: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
  USER: "bg-slate-500/10 text-slate-400 border border-slate-500/20",
  ADVERTISER: "bg-orange-500/10 text-orange-500 border border-orange-500/20",
};

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}