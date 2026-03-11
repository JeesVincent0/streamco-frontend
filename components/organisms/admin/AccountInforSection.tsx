import { ShieldIcon, CalendarIcon } from "lucide-react";
import Badge from "@/components/atoms/Badge";
import VerifiedBadge from "@/components/atoms/VerifiedBadge";
import BooleanBadge from "@/components/atoms/BooleanBadge";
import Field from "@/components/atoms/Field";
import Section from "@/components/molecules/admin/Section";
import {
  ROLE_STYLES,
  STATUS_STYLES,
  formatDate,
} from "@/constants/user.constants";
import { User } from "@/lib/types";

interface AccountInfoSectionProps {
  user: User;
}

const AccountInfoSection = ({ user }: AccountInfoSectionProps) => {
  return (
    <Section title="Account Info" icon={ShieldIcon} cols={3}>
      <Field label="First Name">{user.firstName || "—"}</Field>
      <Field label="Last Name">{user.lastName || "—"}</Field>
      <Field label="Display Name">{user.displayName}</Field>
      <Field label="Email">{user.email}</Field>
      <Field label="Role">
        <Badge label={user.role} styleClass={ROLE_STYLES[user.role] ?? ""} />
      </Field>
      <Field label="Status">
        <Badge
          label={user.status}
          styleClass={STATUS_STYLES[user.status] ?? ""}
        />
      </Field>
      <Field label="Verified">
        <VerifiedBadge value={user.isVerified} />
      </Field>
      <Field label="Profile Completed">
        <BooleanBadge value={user.isProfileCompleted} />
      </Field>
      <Field label="Joined">
        <span className="flex items-center gap-1.5">
          <CalendarIcon className="size-3.5 text-muted-foreground" />
          {formatDate(user.createdAt)}
        </span>
      </Field>
    </Section>
  );
};

export default AccountInfoSection;
