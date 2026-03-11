import { UserIcon, MapPinIcon, LinkIcon } from "lucide-react";
import Field from "@/components/atoms/Field";
import Section from "@/components/molecules/admin/Section";
import SocialLinksDisplay from "@/components/molecules/admin/SocialLinkDisplay";
import { formatDate } from "@/constants/user.constants";
import { ContentUser } from "@/lib/types";

interface ContentUserSectionProps {
  user: ContentUser;
}

const ContentUserSection = ({ user }: ContentUserSectionProps) => {
  return (
    <>
      {/* Personal Info */}
      <Section title="Personal Info" icon={UserIcon} cols={3}>
        <Field label="Date of Birth">
          {user.dob ? formatDate(user.dob) : "—"}
        </Field>
        <Field label="Gender">{user.gender ?? "—"}</Field>
        <Field label="Location">
          <span className="flex items-center gap-1.5">
            <MapPinIcon className="size-3.5 text-muted-foreground" />
            {user.location ?? "—"}
          </span>
        </Field>
        <Field label="Content Type">
          {user.contentType === "SAFE_MODE" ? "Safe Mode" : "Unrestricted"}
        </Field>
      </Section>

      {/* Bio — only rendered when present */}
      {user.bio && (
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <UserIcon className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Bio</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {user.bio}
          </p>
        </div>
      )}

      {/* Social Links */}
      <Section title="Social Links" icon={LinkIcon}>
        <div className="col-span-full">
          <SocialLinksDisplay links={user.socialLinks ?? {}} />
        </div>
      </Section>
    </>
  );
};

export default ContentUserSection;
