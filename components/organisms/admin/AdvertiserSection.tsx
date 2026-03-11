import { BuildingIcon } from "lucide-react";
import Field from "@/components/atoms/Field";
import Section from "@/components/molecules/admin/Section";
import { AdvertiserUser } from "@/lib/types";

interface AdvertiserSectionProps {
  user: AdvertiserUser;
}

const AdvertiserSection = ({ user }: AdvertiserSectionProps) => {
  return (
    <Section title="Company Info" icon={BuildingIcon}>
      <Field label="Company Name">{user.companyName ?? "—"}</Field>
    </Section>
  );
};

export default AdvertiserSection;
